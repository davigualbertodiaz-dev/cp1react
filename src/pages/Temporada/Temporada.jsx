import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi'

import ItemEpisodio from '../../components/ItemEpisodio/ItemEpisodio.jsx'
import Carregando from '../../components/Carregando/Carregando.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import { getTemporada, getSerie } from '../../services/api.js'
import { buscarSalva, marcarEpisodio, marcarTemporada } from '../../services/lista.js'
import './Temporada.css'

const Temporada = () => {
  // Essa rota tem dois parâmetros: /serie/:id/temporada/:numero
  const { id, numero } = useParams()

  const [serie, setSerie] = useState(null)
  const [temporada, setTemporada] = useState(null)
  const [salva, setSalva] = useState(buscarSalva(id))
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true)
      try {
        setSerie(await getSerie(id))
        setTemporada(await getTemporada(id, numero))
      } catch {
        setErro('Não achei essa temporada.')
      }
      setCarregando(false)
      window.scrollTo(0, 0)
    }

    carregar()
  }, [id, numero])

  const atualizar = () => setSalva(buscarSalva(id))

  if (carregando) return <Carregando texto="Carregando episódios..." />

  if (erro) {
    return (
      <div className="container">
        <Aviso titulo="Temporada não encontrada" texto={erro}>
          <Link to={`/serie/${id}`} className="botao botao-principal">
            Voltar para a série
          </Link>
        </Aviso>
      </div>
    )
  }

  const assistidos = salva
    ? temporada.episodios.filter((ep) => salva.vistos.includes(`${numero}-${ep.numero}`)).length
    : 0

  const temporadaCompleta = assistidos === temporada.episodios.length

  return (
    <div className="container temporada">
      <Link to={`/serie/${id}`} className="voltar">
        <FiArrowLeft /> {serie.nome}
      </Link>

      <div className="temporada-topo">
        <div>
          <h1>{temporada.nome}</h1>
          <p>
            {temporada.episodios.length} episódios
            {salva && ` · ${assistidos} assistidos`}
          </p>
        </div>

        {salva ? (
          <button
            className="botao botao-secundario"
            onClick={() => {
              marcarTemporada(id, numero, temporada.episodios, !temporadaCompleta)
              atualizar()
            }}
          >
            {temporadaCompleta ? 'Desmarcar temporada' : 'Marcar temporada inteira'}
          </button>
        ) : (
          <p className="bloqueado">
            <Link to={`/serie/${id}`}>Adicione a série à sua lista</Link> para marcar episódios.
          </p>
        )}
      </div>

      <ul className="lista-episodios">
        {temporada.episodios.map((episodio) => (
          <ItemEpisodio
            key={episodio.numero}
            episodio={episodio}
            assistido={salva ? salva.vistos.includes(`${numero}-${episodio.numero}`) : false}
            bloqueado={!salva}
            aoClicar={() => {
              marcarEpisodio(id, numero, episodio.numero)
              atualizar()
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default Temporada
