import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho/Cabecalho.jsx'
import Rodape from './components/Rodape/Rodape.jsx'
import './App.css'


const App = () => {
  return (
    <div className="app">
      <Cabecalho />

      <main className="app-conteudo">
        <Outlet />
      </main>

      <Rodape />
    </div>
  )
}

export default App
