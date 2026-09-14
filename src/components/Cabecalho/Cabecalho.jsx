import { NavLink } from 'react-router'
import { FiHome, FiSearch, FiBookmark, FiBarChart2 } from 'react-icons/fi'
import { GiDrakkar } from 'react-icons/gi'
import './Cabecalho.css'

const Cabecalho = () => {
  // O NavLink já sabe qual rota está aberta e manda isActive pra gente.
  const estiloLink = ({ isActive }) => (isActive ? 'nav-link ativo' : 'nav-link')

  return (
    <header className="cabecalho">
      <div className="container cabecalho-interno">
        <NavLink to="/" className="logo">
          <GiDrakkar />
          <span>Próximo Episódio</span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" className={estiloLink} end>
            <FiHome />
            <span>Início</span>
          </NavLink>

          <NavLink to="/busca" className={estiloLink}>
            <FiSearch />
            <span>Buscar</span>
          </NavLink>

          <NavLink to="/minha-lista" className={estiloLink}>
            <FiBookmark />
            <span>Minha lista</span>
          </NavLink>

          <NavLink to="/estatisticas" className={estiloLink}>
            <FiBarChart2 />
            <span>Estatísticas</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Cabecalho
