// A lista de séries do usuário fica salva no localStorage do navegador.
// Todas as funções que mexem nela ficam aqui.

const CHAVE = 'minhasSeries'

export const lerLista = () => {
  const salvo = localStorage.getItem(CHAVE)
  return salvo ? JSON.parse(salvo) : []
}

const gravar = (lista) => {
  localStorage.setItem(CHAVE, JSON.stringify(lista))
}

export const buscarSalva = (id) => {
  return lerLista().find((serie) => serie.id === Number(id))
}

export const adicionar = (serie, status) => {
  const lista = lerLista()

  if (lista.some((item) => item.id === serie.id)) return

  lista.push({
    id: serie.id,
    nome: serie.nome,
    poster: serie.poster,
    ano: serie.ano,
    generos: serie.generos,
    duracao: serie.duracao,
    totalEpisodios: serie.totalEpisodios,
    status: status,
    nota: 0,
    vistos: [],
  })

  gravar(lista)
}

export const remover = (id) => {
  gravar(lerLista().filter((serie) => serie.id !== Number(id)))
}

export const mudarStatus = (id, status) => {
  const lista = lerLista()
  const serie = lista.find((item) => item.id === Number(id))
  serie.status = status
  gravar(lista)
}

export const avaliar = (id, nota) => {
  const lista = lerLista()
  const serie = lista.find((item) => item.id === Number(id))
  // Clicar na mesma estrela de novo tira a nota.
  serie.nota = serie.nota === nota ? 0 : nota
  gravar(lista)
}

// Cada episódio assistido é guardado como "temporada-episodio", ex: "1-3".
export const marcarEpisodio = (id, temporada, episodio) => {
  const lista = lerLista()
  const serie = lista.find((item) => item.id === Number(id))
  const codigo = `${temporada}-${episodio}`

  if (serie.vistos.includes(codigo)) {
    serie.vistos = serie.vistos.filter((item) => item !== codigo)
  } else {
    serie.vistos.push(codigo)
  }

  gravar(lista)
}

export const marcarTemporada = (id, temporada, episodios, marcar) => {
  const lista = lerLista()
  const serie = lista.find((item) => item.id === Number(id))
  const codigos = episodios.map((ep) => `${temporada}-${ep.numero}`)

  if (marcar) {
    const novos = codigos.filter((codigo) => !serie.vistos.includes(codigo))
    serie.vistos = [...serie.vistos, ...novos]
  } else {
    serie.vistos = serie.vistos.filter((codigo) => !codigos.includes(codigo))
  }

  gravar(lista)
}

// ----- cálculos usados em mais de uma página -----

export const calcularProgresso = (serie) => {
  if (!serie.totalEpisodios) return 0
  const porcentagem = (serie.vistos.length / serie.totalEpisodios) * 100
  return Math.min(100, Math.round(porcentagem))
}

// Primeiro episódio ainda não assistido, indo na ordem das temporadas.
export const proximoEpisodio = (serie, temporadas) => {
  for (const temporada of temporadas) {
    for (let numero = 1; numero <= temporada.totalEpisodios; numero++) {
      if (!serie.vistos.includes(`${temporada.numero}-${numero}`)) {
        return { temporada: temporada.numero, episodio: numero }
      }
    }
  }
  return null
}
