import { useMemo, useState } from 'react'

const clampNota = (nota) => Math.min(Math.max(nota, 0), 10)

const parseNota = (valor) => {
  if (valor.trim() === '') return null

  const numero = Number(valor.replace(',', '.'))
  return Number.isFinite(numero) ? clampNota(numero) : null
}

const formatNota = (nota) =>
  nota.toLocaleString('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(nota) ? 0 : 1,
  })

function CalculadoraMedia() {
  const [n1, setN1] = useState('')
  const [n2, setN2] = useState('')
  const [meta, setMeta] = useState('6')

  const resultado = useMemo(() => {
    const nota1 = parseNota(n1)
    const nota2 = parseNota(n2)
    const mediaAlvo = parseNota(meta) ?? 6

    if (nota1 === null && nota2 === null) {
      return {
        tipo: 'vazio',
        texto: 'Preencha a N1 e/ou N2 para calcular.',
      }
    }

    if (nota1 !== null && nota2 !== null) {
      const media = (nota1 + nota2) / 2
      return {
        tipo: media >= mediaAlvo ? 'ok' : 'alerta',
        texto: `Média: ${formatNota(media)}. ${
          media >= mediaAlvo ? 'Fechou a meta.' : `Faltaram ${formatNota(mediaAlvo - media)} ponto(s).`
        }`,
      }
    }

    const notaExistente = nota1 ?? nota2
    const notaNecessaria = (mediaAlvo * 2) - notaExistente

    if (notaNecessaria <= 0) {
      return {
        tipo: 'ok',
        texto: `Com ${formatNota(notaExistente)}, a meta já está garantida mesmo com 0 na outra nota.`,
      }
    }

    if (notaNecessaria > 10) {
      return {
        tipo: 'alerta',
        texto: `Para média ${formatNota(mediaAlvo)}, precisaria tirar ${formatNota(notaNecessaria)} na outra nota.`,
      }
    }

    return {
      tipo: 'parcial',
      texto: `Para média ${formatNota(mediaAlvo)}, precisa tirar ${formatNota(notaNecessaria)} na outra nota.`,
    }
  }, [n1, n2, meta])

  return (
    <div className="calculator">
      <div className="calculator-fields">
        <label>
          <span>N1</span>
          <input
            inputMode="decimal"
            placeholder="ex.: 8,5"
            value={n1}
            onChange={(event) => setN1(event.target.value)}
          />
        </label>

        <label>
          <span>N2</span>
          <input
            inputMode="decimal"
            placeholder="ex.: 7"
            value={n2}
            onChange={(event) => setN2(event.target.value)}
          />
        </label>

        <label>
          <span>Meta</span>
          <input
            inputMode="decimal"
            value={meta}
            onChange={(event) => setMeta(event.target.value)}
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