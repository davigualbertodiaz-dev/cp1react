import './BarraProgresso.css'

const BarraProgresso = ({ porcentagem, texto }) => {
  return (
    <div className="progresso">
      <div className="progresso-topo">
        <span>{texto}</span>
        <strong>{porcentagem}%</strong>
      </div>

      <div className="progresso-trilha">
        <div className="progresso-cheio" style={{ width: `${porcentagem}%` }}></div>
      </div>
    </div>
  )
}

export default BarraProgresso
