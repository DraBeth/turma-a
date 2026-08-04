import links from '../data/links'

function LinksUteis() {
  return (
    <div className="link-list">
      {links.map((link) => (
        link.url === '#'
          ? (
            <div className="link-placeholder" key={link.titulo}>
              {link.status && <small className="link-status">{link.status}</small>}
              <strong>{link.titulo}</strong>
              <span>{link.descricao}</span>
            </div>
          )
          : (
            <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
              <strong>{link.titulo}</strong>
              <span>{link.descricao}</span>
            </a>
          )
      ))}
    </div>
  )
}

export default LinksUteis
