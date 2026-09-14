import { useState } from 'react'
import { Link } from 'react-router'

import CardSerie from '../../components/CardSerie/CardSerie.jsx'
import Filtro from '../../components/Filtro/Filtro.jsx'
import Aviso from '../../components/Aviso/Aviso.jsx'
import { lerLista, calcularProgresso } from '../../services/lista.js'

const MinhaLista = () => {
  const [filtro, setFiltro] = useState('todas')

  const lista = lerLista()

  const contar = (status) => lista.filter((serie) => serie.status === status).length

  const opcoes = [
    { valor: 'todas', texto: 'Todas', quantidade: lista.length },
    { valor: 'assistindo', texto: 'Assistindo', quantidade: contar('assistindo') },
    { valor: 'quero', texto: 'Quero assistir', quantidade: contar('quero') },
    { valor: 'concluida', texto: 'Concluídas', quantidade: contar('concluida') },
  ]

  const visiveis =
    filtro === 'todas' ? lista : lista.filter((serie) => serie.status === filtro)

  if (lista.length === 0) {
    return (
      <div className="container">
        <h1 className="titulo-pagina">Minha lista</h1>

        <Aviso
          titulo="Sua lista está vazia"
          texto="Busque uma série que você acompanha e adicione. Depois é só marcar os episódios."
        >
          <Link to="/busca" className="botao botao-principal">
            Buscar séries
          </Link>
        </Aviso>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="titulo-pagina">Minha lista</h1>

      <Filtro opcoes={opcoes} ativo={filtro} aoTrocar={setFiltro} />

      {visiveis.length === 0 ? (
        <Aviso titulo="Nada aqui" texto="Mude o status de alguma série para ela aparecer." />
      ) : (
        <div className="grade">
          {visiveis.map((serie) => (
            <CardSerie key={serie.id} serie={serie} progresso={calcularProgresso(serie)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MinhaLista
