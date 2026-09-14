import { Link } from 'react-router'
import { FiStar, FiCheck } from 'react-icons/fi'
import { urlImagem } from '../../services/api.js'
import './CardSerie.css'

const CardSerie = ({ serie, naLista = false, progresso = null }) => {
  const poster = urlImagem(serie.poster)

  return (
    <Link to={`/serie/${serie.id}`} className="card">
      <div className="card-poster">
        {poster ? (
          <img src={poster} alt={serie.nome} />
        ) : (
          <div className="card-sem-poster">sem imagem</div>
        )}

        {naLista && (
          <span className="card-selo">
            <FiCheck />
          </span>
        )}

        {serie.nota && (
          <span className="card-nota">
            <FiStar /> {serie.nota}
          </span>
        )}

        {progresso !== null && (
          <div className="card-barra">
            <div style={{ width: `${progresso}%` }} />
          </div>
        )}
      </div>

      <h3>{serie.nome}</h3>
      <p>{serie.ano}</p>
    </Link>
  )
}

export default CardSerie
