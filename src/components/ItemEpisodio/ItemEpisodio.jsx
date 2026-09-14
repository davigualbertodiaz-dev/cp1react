import { FiCheck } from 'react-icons/fi'
import './ItemEpisodio.css'

const ItemEpisodio = ({ episodio, assistido, aoClicar, bloqueado }) => {
  return (
    <li className={assistido ? 'episodio visto' : 'episodio'}>
      <button className="episodio-botao" onClick={aoClicar} disabled={bloqueado}>
        {assistido ? <FiCheck /> : episodio.numero}
      </button>

      <div>
        <h3>{episodio.nome}</h3>
        <p className="episodio-info">
          Episódio {episodio.numero}
          {episodio.duracao && ` · ${episodio.duracao} min`}
          {episodio.data && ` · ${episodio.data.split('-').reverse().join('/')}`}
        </p>
        {episodio.sinopse && <p className="episodio-sinopse">{episodio.sinopse}</p>}
      </div>
    </li>
  )
}

export default ItemEpisodio
