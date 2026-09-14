import { FiStar } from 'react-icons/fi'
import './Estrelas.css'

const Estrelas = ({ nota, aoClicar }) => {
  const estrelas = [1, 2, 3, 4, 5]

  return (
    <div className="estrelas">
      {estrelas.map((numero) => (
        <button
          key={numero}
          onClick={() => aoClicar(numero)}
          aria-label={`Dar nota ${numero}`}
        >
          <FiStar className={numero <= nota ? 'estrela cheia' : 'estrela'} />
        </button>
      ))}

      <span>{nota > 0 ? `${nota}/5` : 'sem nota'}</span>
    </div>
  )
}

export default Estrelas
