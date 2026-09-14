import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import Busca from './pages/Busca/Busca.jsx'
import Serie from './pages/Serie/Serie.jsx'
import Temporada from './pages/Temporada/Temporada.jsx'
import MinhaLista from './pages/MinhaLista/MinhaLista.jsx'
import Estatisticas from './pages/Estatisticas/Estatisticas.jsx'
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'busca', element: <Busca /> },
      { path: 'serie/:id', element: <Serie /> },
      { path: 'serie/:id/temporada/:numero', element: <Temporada /> },
      { path: 'minha-lista', element: <MinhaLista /> },
      { path: 'estatisticas', element: <Estatisticas /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
