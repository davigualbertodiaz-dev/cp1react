import './Filtro.css'

// Abas de status da Minha Lista. Recebe as opções prontas da página.
const Filtro = ({ opcoes, ativo, aoTrocar }) => {
  return (
    <div className="filtro">
      {opcoes.map((opcao) => (
        <button
          key={opcao.valor}
          className={ativo === opcao.valor ? 'filtro-item ativo' : 'filtro-item'}
          onClick={() => aoTrocar(opcao.valor)}
        >
          {opcao.texto} <span>{opcao.quantidade}</span>
        </button>
      ))}
    </div>
  )
}

export default Filtro
