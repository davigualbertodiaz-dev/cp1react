import './Aviso.css'

// Caixa usada quando não tem nada pra mostrar: lista vazia, busca sem
// resultado ou erro na API.
const Aviso = ({ titulo, texto, children }) => {
  return (
    <div className="aviso">
      <h2>{titulo}</h2>
      {texto && <p>{texto}</p>}
      {children}
    </div>
  )
}

export default Aviso
