# Próximo Episódio

Site pra acompanhar séries: você marca os episódios que assistiu e ele guarda onde você parou.

**Site publicado:** https://cp1react.vercel.app/
**Repositório:** https://github.com/davigualbertodiaz-dev/cp1react

## Integrante

 Davi Diaz  RM: 569825 ESPT 

## O problema

O TV Time foi descontinuado em julho de 2026. Junto com ele foi embora a ferramenta que resolvia uma
coisa bem chata: lembrar em que episódio você parou.

Quem acompanha várias séries ao mesmo tempo, em serviços diferentes, e assiste de forma irregular
sempre passa pela mesma cena — abrir a série depois de três semanas e não fazer ideia de onde parou.
Aí ou revê um episódio à toa, ou fica adivinhando.

Do enunciado, escolhi o problema **"acompanhar séries e episódios"**. Como consequência disso,
também entrou **"acompanhar estatísticas pessoais"**, porque o mesmo registro que resolve o problema
já dá os números de graça.

Não tentei refazer o TV Time inteiro. Ficaram de fora: comunidade, comentários, anti-spoiler, "onde
assistir", filmes e gamificação.

## A solução

1. Busca a série e adiciona na sua lista com um status
2. Marca os episódios assistidos — um por um ou a temporada inteira
3. O site mostra sempre qual é o próximo episódio, com link direto
4. A página de estatísticas mostra episódios assistidos, horas e gêneros favoritos

Tudo fica salvo no navegador. Não tem login nem servidor.

## Funcionalidades

- Séries em alta e populares na home
- Busca que dispara sozinha depois de 2 letras (com debounce de 500ms)
- Página da série com sinopse, nota, gêneros e temporadas
- Lista com 3 status: quero assistir, assistindo e concluída
- Marcar episódio individual ou temporada inteira
- Próximo episódio calculado automaticamente
- Barra de progresso da série
- Nota de 1 a 5 estrelas
- Filtro por status na Minha Lista
- Estatísticas: episódios, horas, séries concluídas e top 5 gêneros
- Tela de carregando, tela de vazio e tela de erro em todas as páginas
- Página 404
- Responsivo, testado até 360px

## Tecnologias

- **React 18** com Vite
- **React Router 7** — `createBrowserRouter` e `RouterProvider`
- **React Icons** — conjunto Feather (`Fi`) e um ícone do Game Icons (`Gi`) no logo
- **CSS puro** — um arquivo por componente, cores em variáveis no `:root`
- **localStorage** pra salvar a lista

Sem Context API, sem Redux, sem Tailwind, sem Axios.

### O que usei de React

| Recurso | Onde |
|---|---|
| Componentização | 11 componentes em `src/components`, um por pasta |
| Props | todos os componentes recebem dados por props, com desestruturação |
| `useState` | Home, Busca, Serie, Temporada e MinhaLista |
| `useEffect` | busca na API (Home, Serie, Temporada) e debounce (Busca) |
| `createBrowserRouter` | `main.jsx` |
| `Outlet` | `App.jsx`, que é o layout |
| `useParams` | rotas `/serie/:id` e `/serie/:id/temporada/:numero` |
| `NavLink` | menu do cabeçalho, com destaque na rota ativa |
| Renderização condicional e `.map` com `key` | todas as páginas |

## API

**TMDB** — https://developer.themoviedb.org/docs/getting-started

| Endpoint | Onde |
|---|---|
| `/tv/popular` | Home |
| `/trending/tv/week` | Home |
| `/search/tv` | Busca |
| `/tv/{id}` | página da série |
| `/tv/{id}/season/{n}` | página da temporada |

Todas as chamadas usam `language=pt-BR`. Tudo que fala com a API está em `src/services/api.js`.

> Esse site usa a API do TMDB, mas não é endossado nem certificado por eles.

## Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/busca` | Busca |
| `/serie/:id` | Série (rota dinâmica) |
| `/serie/:id/temporada/:numero` | Temporada (rota dinâmica, 2 parâmetros) |
| `/minha-lista` | Minha lista |
| `/estatisticas` | Estatísticas |
| `*` | 404 |

## Como rodar

Precisa do Node 18 ou mais novo.

```bash
git clone <url-do-repositorio>
cd proximo-episodio
npm install
```

Depois pegue uma chave da API em https://www.themoviedb.org/settings/api (opção Developer) e copie
o valor de **"Chave da API (v3 auth)"**.

```bash
cp .env.example .env
```

Abra o `.env` e cole a chave:

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

Depois:

```bash
npm run dev
```

O site abre em http://localhost:5173.

> O `.env` está no `.gitignore` e não vai pro GitHub. Se esquecer essa parte, a home mostra um aviso
> explicando o que fazer em vez de abrir em branco.

Pra gerar a versão de produção: `npm run build`.

## Deploy na Vercel

1. Suba o projeto no GitHub
2. Na Vercel, importe o repositório (ela reconhece o Vite sozinha)
3. Antes de clicar em Deploy, vá em **Environment Variables** e cadastre `VITE_TMDB_API_KEY`
4. Deploy

O `vercel.json` já tem o rewrite que faz rotas como `/minha-lista` funcionarem quando você recarrega
a página direto nelas.

## Uso de IA

Usei o Claude durante o projeto, seguindo a ideia do Spec Driven Development: primeiro escrevi o que
o site tinha que fazer, depois o código.

**Onde usei:**

- Pra organizar o `docs/requirements.md` e o `docs/architecture.md` a partir do problema que escolhi
- Pra escrever código a partir dessa especificação, seguindo os padrões das aulas
  (`createBrowserRouter` no `main.jsx`, componente em pasta própria, props por desestruturação)
- Pra revisar se o que ficou pronto batia com o que eu tinha escrito na spec

**O que foi decisão minha:**

- A escolha do problema e o que ficou de fora do MVP
- As regras do produto (não concluir a série sozinho, ignorar os especiais, ignorar temporada 0 no
  cálculo do próximo episódio)
- As referências visuais e a paleta de cores
- Não usar Context API nem biblioteca de estado



## Referências

- Enunciado da CP1 – 2TRI – Web Development
- Referências visuais: Letterboxd, Notion, Duolingo, Spotify Wrapped e a paleta de Vinland Saga,
  explicadas em [`references/references.md`](references/references.md)
- [Documentação do TMDB](https://developer.themoviedb.org/docs/getting-started)
- [Documentação do React Router](https://reactrouter.com)
