import { useMemo, useState } from 'react'

const parseNota = (valor) => {
  if (valor.trim() === '') return null

  const numero = Number(valor.replace(',', '.'))
  return Number.isFinite(numero) ? numero : null
}

const atualizaNota = (setValor, maximo, valorDigitado) => {
  const valor = valorDigitado.replace('.', ',')

  if (!/^\d{0,2}(,\d{0,2})?$/.test(valor)) return

  const numero = parseNota(valor)

  if (numero !== null && numero > maximo) return

  setValor(valor)
}

const formatNota = (nota) =>
  nota.toLocaleString('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(nota) ? 0 : 1,
  })

function CalculadoraMedia() {
  const [n1, setN1] = useState('')
  const [instrumentoN2, setInstrumentoN2] = useState('')
  const [aps, setAps] = useState('')
  const [n3, setN3] = useState('')
  const [meta, setMeta] = useState('6')

  const resultado = useMemo(() => {
    const nota1 = parseNota(n1)
    const provaN2 = parseNota(instrumentoN2)
    const notaAps = parseNota(aps)
    const notaSub = parseNota(n3)
    const mediaAlvo = parseNota(meta) ?? 6
    const provaN2Informada = provaN2 !== null
    const n2Informada = provaN2 !== null || notaAps !== null
    const nota2 = n2Informada
      ? (provaN2 ?? 0) + (notaAps ?? 0)
      : null
    const n2ComSub = notaSub !== null && nota2 !== null
      ? Math.max(nota2, notaSub)
      : (notaSub ?? nota2)
    const subUsada = notaSub !== null && nota2 !== null && notaSub > nota2

    if (nota1 === null && n2ComSub === null) {
      return {
        tipo: 'vazio',
        texto: 'Preencha a N1, a N2 e/ou a SUB para calcular.',
      }
    }

    if (nota1 !== null && !provaN2Informada && notaSub === null) {
      const n2Necessaria = (mediaAlvo - (nota1 * 0.4)) / 0.6
      const apsConsiderada = notaAps ?? 1
      const provaNecessaria = Math.max(n2Necessaria - apsConsiderada, 0)

      if (n2Necessaria <= 0) {
        return {
          tipo: 'ok',
          texto: `Com Prova N1 ${formatNota(nota1)}, a meta já está garantida mesmo com 0 na N2.`,
        }
      }

      if (n2Necessaria > 10) {
        const maiorMedia = (nota1 * 0.4) + 6

        return {
          tipo: 'alerta',
          texto: `Não é possível chegar à média ${formatNota(mediaAlvo)}: seria necessário somar ${formatNota(n2Necessaria)} na N2, cujo máximo é 10. A maior média possível é ${formatNota(maiorMedia)}.`,
        }
      }

      if (notaAps !== null && provaNecessaria > 9) {
        const apsMinima = n2Necessaria - 9

        return {
          tipo: 'alerta',
          texto: `Com APS ${formatNota(notaAps)}, a Prova N2 teria que ser ${formatNota(provaNecessaria)}, mas o máximo é 9. Para alcançar a meta, precisa de 9 na prova e pelo menos ${formatNota(apsMinima)} na APS.`,
        }
      }

      if (notaAps !== null) {
        return {
          tipo: 'parcial',
          texto: `Mínimo para média ${formatNota(mediaAlvo)}: ${formatNota(provaNecessaria)} na Prova N2, considerando ${formatNota(notaAps)} na APS.`,
        }
      }

      return {
        tipo: 'parcial',
        texto: `Mínimo para média ${formatNota(mediaAlvo)}: somar ${formatNota(n2Necessaria)} na N2. Se fizer 1 na APS, precisa de ${formatNota(provaNecessaria)} na Prova N2.`,
      }
    }

    if (nota1 !== null && n2ComSub !== null) {
      const media = (nota1 * 0.4) + (n2ComSub * 0.6)
      const detalheSub = subUsada ? ' A SUB substituiu a N2.' : ''

      return {
        tipo: media >= mediaAlvo ? 'ok' : 'alerta',
        texto: `Média: ${formatNota(media)}. ${
          media >= mediaAlvo ? 'Fechou a meta.' : `Faltaram ${formatNota(mediaAlvo - media)} ponto(s).`
        }${detalheSub}`,
      }
    }

    if (n2ComSub !== null) {
      const n1Necessaria = (mediaAlvo - (n2ComSub * 0.6)) / 0.4

      if (n1Necessaria <= 0) {
        return {
          tipo: 'ok',
          texto: `Com N2 ${formatNota(n2ComSub)}, a meta já está garantida mesmo com 0 na N1.`,
        }
      }

      if (n1Necessaria > 10) {
        return {
          tipo: 'alerta',
          texto: `Para média ${formatNota(mediaAlvo)}, precisaria de N1 ${formatNota(n1Necessaria)}.`,
        }
      }

      return {
        tipo: 'parcial',
        texto: `Para média ${formatNota(mediaAlvo)}, precisa de N1 ${formatNota(n1Necessaria)}.`,
      }
    }

    return {
      tipo: 'vazio',
      texto: 'Preencha uma nota para calcular.',
    }
  }, [n1, instrumentoN2, aps, n3, meta])

  return (
    <div className="calculator">
      <p className="calculator-rule">
        MF = N1 40% + N2 60%. N2 = prova (0-9) + APS (0-1).
      </p>

      <div className="calculator-fields">
        <label>
          <span>Prova N1</span>
          <input
            inputMode="decimal"
            placeholder="ex.: 8,5"
            value={n1}
            onChange={(event) => atualizaNota(setN1, 10, event.target.value)}
          />
        </label>

        <label>
          <span>Prova N2</span>
          <input
            inputMode="decimal"
            placeholder="0 a 9"
            value={instrumentoN2}
            onChange={(event) => atualizaNota(setInstrumentoN2, 9, event.target.value)}
          />
        </label>

        <label>
          <span>APS</span>
          <input
            inputMode="decimal"
            placeholder="0 a 1"
            value={aps}
            onChange={(event) => atualizaNota(setAps, 1, event.target.value)}
          />
        </label>

        <label>
          <span>SUB/N3</span>
          <input
            inputMode="decimal"
            placeholder="opcional"
            value={n3}
            onChange={(event) => atualizaNota(setN3, 10, event.target.value)}
          />
        </label>

        <label>
          <span>Meta</span>
          <input
            inputMode="decimal"
            value={meta}
            onChange={(event) => atualizaNota(setMeta, 10, event.target.value)}
          />
        </label>
      </div>

      <output className={`calculator-result ${resultado.tipo}`}>
        {resultado.texto}
      </output>
    </div>
  )
}

export default CalculadoraMedia
