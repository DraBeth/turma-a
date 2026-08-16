import { useMemo, useState } from 'react'
import contatos from '../data/contatos'
import disciplinas from '../data/disciplinas'

const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

function Contatos() {
  const [busca, setBusca] = useState('')

  const contatosDoSemestre = useMemo(() => disciplinas
    .filter((disciplina) => disciplina.professor !== 'A definir')
    .map((disciplina) => contatos.find((contato) => contato.nome === disciplina.professor))
    .filter(Boolean), [])

  const contatosFiltrados = useMemo(() => {
    const termo = normalizar(busca)
    if (!termo) return contatosDoSemestre

    return contatos.filter((contato) =>
      normalizar(`${contato.nome} ${contato.email}`).includes(termo)
    )
  }, [busca, contatosDoSemestre])

  return (
    <div className="contacts">
      <div className="contacts-heading">
        <strong>{busca ? 'Resultados da busca' : 'Professores deste semestre'}</strong>
        <span>
          {busca
            ? 'A busca consulta somente os professores presenciais deste semestre.'
            : `${contatosDoSemestre.length} professores presenciais com e-mail cadastrado.`}
        </span>
      </div>

      <input
        aria-label="Buscar contato"
        placeholder="Buscar professor ou e-mail"
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />

      <ul>
        {contatosFiltrados.map((contato) => (
          <li key={contato.email}>
            <strong>{contato.nome}</strong>
            <a href={`mailto:${contato.email}`}>{contato.email}</a>
          </li>
        ))}
      </ul>

      {!busca && <small>O contato da professora EaD acontece pela própria disciplina online.</small>}
    </div>
  )
}

export default Contatos
