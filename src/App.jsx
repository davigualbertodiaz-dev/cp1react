import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho/Cabecalho.jsx'
import Rodape from './components/Rodape/Rodape.jsx'
import './App.css'

// Layout do site. O Outlet é onde entra a página da rota atual.
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
