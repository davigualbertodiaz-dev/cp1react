import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { FiPlus, FiTrash2, FiChevronRight, FiCheck } from 'react-icons/fi'

import Carregando from '../../components/Carregando/Carregando.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import BarraProgresso from '../../components/BarraProgresso/BarraProgresso.jsx'
import Estrelas from '../../components/Estrelas/Estrelas.jsx'
import SeletorStatus from '../../components/SeletorStatus/SeletorStatus.jsx'
import { getSerie, urlImagem } from '../../services/api.js'
import {
  buscarSalva,
  adicionar,
  remover,
  mudarStatus,
  avaliar,
  calcularProgresso,
  proximoEpisodio,
} from '../../services/lista.js'
import './Serie.css'

const Serie = () => {
  // O :id vem da rota /serie/:id
  const { id } = useParams()

  const [serie, setSerie] = useState(null)
  const [salva, setSalva] = useState(buscarSalva(id))
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregar = async () => {
      setCarregando(true)
      try {
        setSerie(await getSerie(id))
      } catch {
        setErro('Não achei essa série.')
      }
      setCarregando(false)
    }

    carregar()
    window.scrollTo(0, 0)
  }, [id])

  // Depois de mexer na lista, lê de novo pra tela atualizar.
  const atualizar = () => setSalva(buscarSalva(id))

  const adicionarNaLista = (status) => {
    adicionar(serie, status)
    atualizar()
  }

  if (carregando) return <Carregando />

  if (erro) {
    return (
      <div className="container">
        <Aviso titulo="Série não encontrada" texto={erro}>
          <Link to="/" className="botao botao-principal">
            Voltar para o início
          </Link>
        </Aviso>
      </div>
    )
  }

  const progresso = salva ? calcularProgresso(salva) : 0
  const proximo = salva ? proximoEpisodio(salva, serie.temporadas) : null
  const fundo = urlImagem(serie.fundo, 'w1280')

  return (
    <div className="serie">
      {fundo && <div className="serie-fundo" style={{ backgroundImage: `url(${fundo})` }}></div>}

      <div className="container serie-conteudo">
        <div className="serie-topo">
          <img className="serie-poster" src={urlImagem(serie.poster, 'w500')} alt={serie.nome} />

          <div>
            <h1>{serie.nome}</h1>

            <p className="serie-info">
              {serie.ano} · nota {serie.nota} no TMDB · ~{serie.duracao} min por episódio ·{' '}
              {serie.temporadas.length} temporadas · {serie.totalEpisodios} episódios
            </p>

            <ul className="serie-generos">
              {serie.generos.map((genero) => (
                <li key={genero}>{genero}</li>
              ))}
            </ul>

            <p className="serie-sinopse">{serie.sinopse}</p>

            {!salva ? (
              <div className="serie-botoes">
                <button className="botao botao-principal" onClick={() => adicionarNaLista('quero')}>
                  <FiPlus /> Quero assistir
                </button>

                <button
                  className="botao botao-secundario"
                  onClick={() => adicionarNaLista('assistindo')}
                >
                  Já estou assistindo
                </button>
              </div>
            ) : (
              <div className="painel">
                <BarraProgresso
                  porcentagem={progresso}
                  texto={`${salva.vistos.length} de ${serie.totalEpisodios} episódios`}
                />

                {proximo ? (
                  <Link
                    to={`/serie/${serie.id}/temporada/${proximo.temporada}`}
                    className="proximo"
                  >
                    Próximo episódio: <strong>T{proximo.temporada} E{proximo.episodio}</strong>
                    <FiChevronRight />
                  </Link>
                ) : (
                  <p className="em-dia">
                    <FiCheck /> Você está em dia com essa série.
                  </p>
                )}

                <SeletorStatus
                  atual={salva.status}
                  aoTrocar={(status) => {
                    mudarStatus(id, status)
                    atualizar()
                  }}
                />

                <Estrelas
                  nota={salva.nota}
                  aoClicar={(nota) => {
                    avaliar(id, nota)
                    atualizar()
                  }}
                />

                <button
                  className="botao remover"
                  onClick={() => {
                    remover(id)
                    atualizar()
                  }}
                >
                  <FiTrash2 /> Remover da lista
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className="titulo-secao serie-titulo-temporadas">Temporadas</h2>

        <ul className="temporadas">
          {serie.temporadas.map((temporada) => {
            const vistos = salva
              ? salva.vistos.filter((codigo) => codigo.startsWith(`${temporada.numero}-`)).length
              : 0

            return (
              <li key={temporada.numero}>
                <Link to={`/serie/${serie.id}/temporada/${temporada.numero}`}>
                  <div>
                    <strong>{temporada.nome}</strong>
                    <span>
                      {temporada.totalEpisodios} episódios · {temporada.ano}
                    </span>
                  </div>

                  <div className="temporada-direita">
                    {salva && (
                      <span className="temporada-contagem">
                        {vistos}/{temporada.totalEpisodios}
                      </span>
                    )}
                    <FiChevronRight />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Serie
