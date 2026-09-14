import './SeletorStatus.css'

const opcoes = [
  { valor: 'quero', texto: 'Quero assistir' },
  { valor: 'assistindo', texto: 'Assistindo' },
  { valor: 'concluida', texto: 'Concluída' },
]

const SeletorStatus = ({ atual, aoTrocar }) => {
  return (
    <div className="status">
      {opcoes.map((opcao) => (
        <button
          key={opcao.valor}
          className={atual === opcao.valor ? 'status-botao ativo' : 'status-botao'}
          onClick={() => aoTrocar(opcao.valor)}
        >
          {opcao.texto}
        </button>
      ))}
    </div>
  )
}

export default SeletorStatus
