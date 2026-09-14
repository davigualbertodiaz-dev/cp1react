import './CardNumero.css'

const CardNumero = ({ icone, numero, texto }) => {
  return (
    <div className="card-numero">
      <div className="card-numero-icone">{icone}</div>
      <strong>{numero}</strong>
      <span>{texto}</span>
    </div>
  )
}

export default CardNumero
