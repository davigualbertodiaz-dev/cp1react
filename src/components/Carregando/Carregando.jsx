import './Carregando.css'

const Carregando = ({ texto = 'Carregando...' }) => {
  return (
    <div className="carregando">
      <div className="carregando-bola"></div>
      <p>{texto}</p>
    </div>
  )
}

export default Carregando
