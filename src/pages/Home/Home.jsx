import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FiSearch, FiTrendingUp, FiStar } from 'react-icons/fi'

import CardSerie from '../../components/CardSerie/CardSerie.jsx'
import Carregando from '../../components/Carregando/Carregando.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import { getPopulares, getEmAlta, temChave } from '../../services/api.js'
import { lerLista } from '../../services/lista.js'
import './Home.css'

const Home = () => {
  const [emAlta, setEmAlta] = useState([])
  const [populares, setPopulares] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const minhaLista = lerLista()

  useEffect(() => {
    const carregar = async () => {
      try {
        setEmAlta(await getEmAlta())
        setPopulares(await getPopulares())
      } catch {
        setErro('Não consegui carregar as séries. Confira a chave da API no arquivo .env.')
      }
      setCarregando(false)
    }

    carregar()
  }, [])

  const estaNaLista = (id) => minhaLista.some((serie) => serie.id === id)

  return (
    <div className="container">
      <section className="hero">
        <h1>
          Toda série é uma saga.
          <br />A sua parou no <span>T3 E7</span>.
        </h1>

        <p>
          Marque os episódios que você assistir e o site guarda onde você parou em cada série.
        </p>

        <Link to="/busca" className="botao botao-principal">
          <FiSearch /> Buscar uma série
        </Link>
      </section>

      {!temChave() && (
        <Aviso
          titulo="Falta configurar a chave da API"
          texto="Crie um arquivo .env na raiz do projeto com VITE_TMDB_API_KEY e reinicie o npm run dev."
        />
      )}

      {carregando && <Carregando texto="Buscando séries..." />}

      {!carregando && erro && <Aviso titulo="Deu erro" texto={erro} />}

      {!carregando && !erro && (
        <>
          <section className="secao">
            <h2 className="titulo-secao">
              <FiTrendingUp /> Em alta esta semana
            </h2>

            <div className="grade">
              {emAlta.slice(0, 12).map((serie) => (
                <CardSerie key={serie.id} serie={serie} naLista={estaNaLista(serie.id)} />
              ))}
            </div>
          </section>

          <section className="secao">
            <h2 className="titulo-secao">
              <FiStar /> Populares
            </h2>

            <div className="grade">
              {populares.slice(0, 12).map((serie) => (
                <CardSerie key={serie.id} serie={serie} naLista={estaNaLista(serie.id)} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Home
