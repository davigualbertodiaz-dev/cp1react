import './Rodape.css'

const Rodape = () => {
  return (
    <footer className="rodape">
      <div className="container">
        <p>Sua lista fica salva só neste navegador. Não tem login nem servidor.</p>
        <p>
          Dados das séries vindos da API do{' '}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            TMDB
          </a>
          . Projeto acadêmico de Web Development.
        </p>
      </div>
    </footer>
  )
}

export default Rodape
