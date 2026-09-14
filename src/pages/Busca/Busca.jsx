import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'

import CardSerie from '../../components/CardSerie/CardSerie.jsx'
import Carregando from '../../components/Carregando/Carregando.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import { getBusca } from '../../services/api.js'
import { lerLista } from '../../services/lista.js'
import './Busca.css'

const Busca = () => {
  const [termo, setTermo] = useState('')
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [buscou, setBuscou] = useState(false)

  const minhaLista = lerLista()

  useEffect(() => {
    if (termo.length < 2) {
      setResultados([])
      setBuscou(false)
      return
    }

    // Espera meio segundo depois da última tecla pra não buscar a cada letra.
    const tempo = setTimeout(async () => {
      setCarregando(true)
      setResultados(await getBusca(termo))
      setBuscou(true)
      setCarregando(false)
    }, 500)

    return () => clearTimeout(tempo)
  }, [termo])

  return (
    <div className="container">
      <h1 className="titulo-pagina">Buscar séries</h1>

      <div className="campo-busca">
        <FiSearch />
        <input
          type="text"
          placeholder="Ex: Vinland Saga, Breaking Bad..."
          value={termo}
          onChange={(evento) => setTermo(evento.target.value)}
        />
      </div>

      {carregando && <Carregando texto="Procurando..." />}

      {!carregando && termo.length < 2 && (
        <Aviso
          titulo="Digite o nome de uma série"
          texto="A busca começa sozinha a partir de 2 letras."
        />
      )}

      {!carregando && buscou && resultados.length === 0 && (
        <Aviso titulo={`Nada encontrado para "${termo}"`} texto="Tente o nome em inglês." />
      )}

      {!carregando && resultados.length > 0 && (
        <div className="grade">
          {resultados.map((serie) => (
            <CardSerie
              key={serie.id}
              serie={serie}
              naLista={minhaLista.some((item) => item.id === serie.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Busca
