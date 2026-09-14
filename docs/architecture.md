# architecture.md

Como o que está no `requirements.md` virou código.

## Páginas e rotas

As rotas ficam no `main.jsx`, com `createBrowserRouter` e `RouterProvider`.

| Rota | Página | Observação |
|---|---|---|
| `/` | Home | populares e em alta |
| `/busca` | Busca | campo de texto com debounce |
| `/serie/:id` | Serie | **rota dinâmica** |
| `/serie/:id/temporada/:numero` | Temporada | **rota dinâmica com 2 parâmetros** |
| `/minha-lista` | MinhaLista | filtro por status |
| `/estatisticas` | Estatisticas | números da lista |
| `*` | NaoEncontrada | 404 |

Todas as rotas são `children` da rota `/`, que carrega o `App`. O `App` é o layout: ele desenha o
`Cabecalho`, o `Rodape` e coloca um `<Outlet />` no meio, que é onde a página da rota entra.

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'serie/:id', element: <Serie /> },
      // ...
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])
```

Os parâmetros da rota são lidos com `useParams`:

```jsx
const { id, numero } = useParams()
```

## Componentes e props

Cada componente está numa pasta própria dentro de `src/components`, com o `.jsx` e o `.css` juntos.
Todos recebem os dados por props, usando desestruturação.

| Componente | Props |
|---|---|
| `Cabecalho` | — |
| `Rodape` | — |
| `CardSerie` | `serie`, `naLista`, `progresso` |
| `ItemEpisodio` | `episodio`, `assistido`, `aoClicar`, `bloqueado` |
| `BarraProgresso` | `porcentagem`, `texto` |
| `Estrelas` | `nota`, `aoClicar` |
| `Filtro` | `opcoes`, `ativo`, `aoTrocar` |
| `SeletorStatus` | `atual`, `aoTrocar` |
| `CardNumero` | `icone`, `numero`, `texto` |
| `Carregando` | `texto` |
| `Aviso` | `titulo`, `texto`, `children` |

As props que são função começam com "ao" (`aoClicar`, `aoTrocar`). É a página que decide o que
acontece; o componente só avisa que foi clicado.

## Estados (useState)

| Página | Estados | Pra quê |
|---|---|---|
| Home | `emAlta`, `populares`, `carregando`, `erro` | dados da API e situação da tela |
| Busca | `termo`, `resultados`, `carregando`, `buscou` | `termo` é o input controlado |
| Serie | `serie`, `salva`, `carregando`, `erro` | `salva` é a versão da série que está na lista |
| Temporada | `serie`, `temporada`, `salva`, `carregando`, `erro` | |
| MinhaLista | `filtro` | qual aba está aberta |
| Estatisticas | nenhum | os números são calculados na hora, a partir da lista |

Coisas que dá pra calcular não viram estado. O progresso, o próximo episódio e os números das
estatísticas são calculados na renderização, senão eu teria que lembrar de atualizar dois lugares
toda vez.

## Efeitos (useEffect)

| Onde | Dependências | O que faz |
|---|---|---|
| Home | `[]` | busca populares e em alta uma vez, quando a página monta |
| Busca | `[termo]` | espera 500ms depois da última tecla e busca. O `return` limpa o `setTimeout` |
| Serie | `[id]` | busca os dados da série. Refaz quando o `:id` da URL muda |
| Temporada | `[id, numero]` | busca a série e os episódios da temporada |

O debounce da busca é só um `setTimeout` com `clearTimeout` no retorno do efeito:

```jsx
useEffect(() => {
  const tempo = setTimeout(() => { /* busca */ }, 500)
  return () => clearTimeout(tempo)
}, [termo])
```

Sem isso, digitar "vinland" faria 7 requisições.

## Onde ficam os dados

Tem dois arquivos em `src/services`:

**`api.js`** — tudo que fala com o TMDB. Nenhum componente faz `fetch` direto. As funções já
devolvem o objeto no formato que o site usa, porque a resposta do TMDB tem muito campo que não
interessa.

**`lista.js`** — tudo que mexe na lista do usuário no localStorage (`lerLista`, `adicionar`,
`marcarEpisodio`, etc.), mais dois cálculos usados em mais de uma página (`calcularProgresso` e
`proximoEpisodio`).

Como a lista fica no localStorage, cada página lê ela quando precisa. Nas páginas onde a lista muda
(Serie e Temporada), eu guardo a série num `useState` e chamo `buscarSalva` de novo depois de cada
alteração, pra tela atualizar:

```jsx
const atualizar = () => setSalva(buscarSalva(id))
```

Foi a forma mais simples que achei de não ter que passar a lista inteira por props através das
rotas.

## Pastas

```
src/
├── components/     uma pasta por componente (.jsx + .css)
├── pages/          uma pasta por página (.jsx + .css)
├── services/       api.js (TMDB) e lista.js (localStorage)
├── App.jsx         layout com Cabecalho + Outlet + Rodape
├── main.jsx        rotas
└── index.css       cores, reset e classes repetidas
```

## Cores

Ficam como variáveis no `:root` do `index.css`.

| Variável | Cor | Uso |
|---|---|---|
| `--fundo` | `#0a0e13` | fundo do site |
| `--caixa` | `#121821` | cards e painéis |
| `--caixa-clara` | `#1b2331` | hover e preenchimentos |
| `--borda` | `#27323f` | bordas |
| `--texto` | `#e7ebf0` | texto |
| `--texto-fraco` | `#8e9bad` | texto secundário |
| `--ferrugem` | `#e05a3d` | ações e progresso |
| `--ferrugem-forte` | `#b8402a` | fundo de botão |
| `--bronze` | `#d0a05a` | episódio assistido e estrelas |
| `--azul` | `#7fa9c9` | links |

A ideia da paleta está explicada no `references/references.md`.
