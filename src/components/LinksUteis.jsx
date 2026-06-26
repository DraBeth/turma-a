import links from '../data/links'

function LinksUteis() {
  return (
    <div className="link-list">
      {links.map((link) => (
        <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
          <strong>{link.titulo}</strong>
          <span>{link.descricao}</span>
        </a>
      ))}
    </div>
  )
}

export default LinksUteis
