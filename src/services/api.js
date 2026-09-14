// Tudo que fala com a API do TMDB fica aqui.
// Documentação: https://developer.themoviedb.org/docs/getting-started

const URL_BASE = 'https://api.themoviedb.org/3'
const CHAVE = import.meta.env.VITE_TMDB_API_KEY

export const temChave = () => Boolean(CHAVE) && CHAVE !== 'sua_chave_aqui'

export const urlImagem = (caminho, tamanho = 'w342') => {
  if (!caminho) return null
  return `https://image.tmdb.org/t/p/${tamanho}${caminho}`
}

// Monta a URL, faz o fetch e devolve o JSON.
const buscarNaApi = async (caminho, extras = '') => {
  const url = `${URL_BASE}${caminho}?api_key=${CHAVE}&language=pt-BR${extras}`
  const resposta = await fetch(url)

  if (!resposta.ok) {
    throw new Error('Não consegui buscar os dados no TMDB.')
  }

  return resposta.json()
}

// O TMDB devolve muitos campos que não usamos. Essa função deixa só o que precisamos.
const arrumarSerie = (serie) => ({
  id: serie.id,
  nome: serie.name,
  poster: serie.poster_path,
  nota: serie.vote_average ? serie.vote_average.toFixed(1) : '-',
  ano: serie.first_air_date ? serie.first_air_date.slice(0, 4) : '-',
})

export const getPopulares = async () => {
  const dados = await buscarNaApi('/tv/popular')
  return dados.results.map(arrumarSerie)
}

export const getEmAlta = async () => {
  const dados = await buscarNaApi('/trending/tv/week')
  return dados.results.map(arrumarSerie)
}

export const getBusca = async (termo) => {
  // encodeURIComponent arruma espaços e acentos do termo digitado
  const dados = await buscarNaApi('/search/tv', `&query=${encodeURIComponent(termo)}`)
  return dados.results.map(arrumarSerie)
}

export const getSerie = async (id) => {
  const dados = await buscarNaApi(`/tv/${id}`)

  return {
    id: dados.id,
    nome: dados.name,
    poster: dados.poster_path,
    fundo: dados.backdrop_path,
    sinopse: dados.overview || 'Sem sinopse em português.',
    nota: dados.vote_average ? dados.vote_average.toFixed(1) : '-',
    ano: dados.first_air_date ? dados.first_air_date.slice(0, 4) : '-',
    generos: dados.genres.map((g) => g.name),
    duracao: dados.episode_run_time?.[0] || 45,
    totalEpisodios: dados.number_of_episodes || 0,
    // A temporada 0 é a de especiais. Tiramos ela da lista.
    temporadas: dados.seasons
      .filter((t) => t.season_number > 0)
      .map((t) => ({
        numero: t.season_number,
        nome: t.name,
        totalEpisodios: t.episode_count,
        ano: t.air_date ? t.air_date.slice(0, 4) : '-',
      })),
  }
}

export const getTemporada = async (id, numero) => {
  const dados = await buscarNaApi(`/tv/${id}/season/${numero}`)

  return {
    nome: dados.name,
    episodios: dados.episodes.map((ep) => ({
      numero: ep.episode_number,
      nome: ep.name,
      sinopse: ep.overview,
      data: ep.air_date,
      duracao: ep.runtime,
    })),
  }
}
