import { Link } from 'react-router'
import Aviso from '../../components/Aviso/Aviso.jsx'
import './NaoEncontrada.css'

const NaoEncontrada = () => {
  return (
    <div className="container nao-encontrada">
      <span className="codigo">404</span>

      <Aviso titulo="Essa página não existe" texto="O endereço que você abriu não faz parte do site.">
        <Link to="/" className="botao botao-principal">
          Voltar para o início
        </Link>
      </Aviso>
    </div>
  )
}

export default NaoEncontrada
