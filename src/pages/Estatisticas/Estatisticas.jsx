import { Link } from 'react-router'
import { FiFilm, FiClock, FiCheckCircle, FiBookmark } from 'react-icons/fi'

import CardNumero from '../../components/CardNumero/CardNumero.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import { lerLista } from '../../services/lista.js'
import './Estatisticas.css'

const Estatisticas = () => {
  const lista = lerLista()

  // Soma quantos episódios foram marcados em todas as séries.
  const totalEpisodios = lista.reduce((soma, serie) => soma + serie.vistos.length, 0)

  // Multiplica os episódios de cada série pela duração dela.
  const minutos = lista.reduce((soma, serie) => soma + serie.vistos.length * serie.duracao, 0)
  const horas = Math.floor(minutos / 60)

  const concluidas = lista.filter((serie) => serie.status === 'concluida').length

  // Conta quantos episódios foram vistos de cada gênero.
  const contagemGeneros = {}
  lista.forEach((serie) => {
    serie.generos.forEach((genero) => {
      contagemGeneros[genero] = (contagemGeneros[genero] || 0) + serie.vistos.length
    })
  })

  const generos = Object.keys(contagemGeneros)
    .map((nome) => ({ nome, quantidade: contagemGeneros[nome] }))
    .filter((genero) => genero.quantidade > 0)
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5)

  if (totalEpisodios === 0) {
    return (
      <div className="container">
        <h1 className="titulo-pagina">Estatísticas</h1>

        <Aviso
          titulo="Ainda não tem nada pra mostrar"
          texto="Marque pelo menos um episódio como assistido e os números aparecem aqui."
        >
          <Link to="/busca" className="botao botao-principal">
            Buscar uma série
          </Link>
        </Aviso>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="titulo-pagina">Estatísticas</h1>

      <div className="numeros">
        <CardNumero icone={<FiFilm />} numero={totalEpisodios} texto="episódios assistidos" />
        <CardNumero icone={<FiClock />} numero={`${horas}h`} texto="de tempo assistido" />
        <CardNumero icone={<FiCheckCircle />} numero={concluidas} texto="séries concluídas" />
        <CardNumero icone={<FiBookmark />} numero={lista.length} texto="séries na lista" />
      </div>

      <h2 className="titulo-secao">Gêneros que você mais assiste</h2>

      <div className="generos">
        {generos.map((genero) => (
          <div className="genero" key={genero.nome}>
            <div className="genero-topo">
              <span>{genero.nome}</span>
              <span>{genero.quantidade} ep.</span>
            </div>

            <div className="genero-trilha">
              {/* A barra é proporcional ao primeiro colocado */}
              <div
                className="genero-cheio"
                style={{ width: `${(genero.quantidade / generos[0].quantidade) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Estatisticas
