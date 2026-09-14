# requirements.md

## Objetivo

O TV Time acabou em julho de 2026 e junto com ele foi embora a ferramenta que as pessoas usavam
pra uma coisa bem específica: **lembrar em que episódio pararam**.

Esse é o problema que eu escolhi resolver. O site deixa a pessoa marcar cada episódio que assistiu
e mostra sempre qual é o próximo. Como sobra um histórico do que foi marcado, também dá pra montar
uma página de estatísticas no final.

Da lista de problemas do enunciado, peguei **"acompanhar séries e episódios"** e, como consequência,
**"acompanhar estatísticas pessoais"**.

### O que não vou fazer

Não é pra refazer o TV Time inteiro, então ficaram de fora de propósito: comunidade, comentários,
anti-spoiler, "onde assistir", filmes e gamificação. Só séries, só acompanhamento.

## Público

Quem acompanha várias séries ao mesmo tempo, em serviços diferentes, e assiste de forma
irregular — umas 5 num domingo e depois nada por três semanas. Quando volta, não lembra onde parou
e acaba revendo episódio à toa.

O uso é quase todo no celular e bem rápido: abre, marca um ou dois episódios, fecha. Por isso o
site é pensado primeiro pro celular e o botão de marcar episódio é grande.

## User stories

1. Como visitante, quero ver séries populares na home pra achar algo sem precisar pensar num nome.
2. Como visitante, quero buscar uma série pelo nome.
3. Como visitante, quero abrir a página da série e ver sinopse, nota, gêneros e temporadas.
4. Como usuário, quero adicionar a série na minha lista com um status.
5. Como usuário, quero ver os episódios de uma temporada.
6. Como usuário, quero marcar e desmarcar episódios como assistidos.
7. Como usuário, quero marcar a temporada inteira de uma vez.
8. Como usuário, quero ver qual é o próximo episódio que eu tenho que assistir.
9. Como usuário, quero ver o quanto já assisti da série.
10. Como usuário, quero dar uma nota de 1 a 5 estrelas.
11. Como usuário, quero tirar uma série da lista.
12. Como usuário, quero filtrar minha lista por status.
13. Como usuário, quero que minha lista continue lá quando eu fechar o navegador.
14. Como usuário, quero ver quantos episódios assisti e quanto tempo isso deu.
15. Como usuário, quero ver quais gêneros eu mais assisto.

## Critérios de aceitação

- Na home aparecem pelo menos 12 séries. Enquanto carrega, mostra "carregando"; se der erro,
  mostra uma mensagem em português.
- A busca dispara sozinha a partir de 2 letras, meio segundo depois da última tecla.
- Se a busca não achar nada, aparece "Nada encontrado para ..." e não uma tela vazia.
- Clicar num card leva pra `/serie/:id` com a sinopse, os gêneros e a lista de temporadas.
- Se a série não estiver na lista, aparecem os botões de adicionar. Se estiver, aparece o painel
  com progresso, status, estrelas e o botão de remover.
- Clicar no círculo de um episódio marca ou desmarca na hora, sem esperar a internet.
- O "próximo episódio" mostra o primeiro episódio não assistido, indo na ordem das temporadas.
  Se não sobrar nenhum, mostra "Você está em dia com essa série".
- Fechando e abrindo o navegador, a lista continua igual.
- Na página de estatísticas sem nenhum episódio marcado, aparece um aviso explicando o que fazer.
- Em 360px de largura nenhuma tela tem rolagem lateral.
- Uma URL que não existe cai na página 404, com o cabeçalho e o rodapé normais.

## Estados da aplicação

### O que fica salvo

A lista de séries fica no localStorage, na chave `minhasSeries`. Cada série é assim:

```js
{
  id: 459256,
  nome: "Vinland Saga",
  poster: "/abc.jpg",
  ano: "2019",
  generos: ["Animação", "Drama"],
  duracao: 24,             // minutos de um episódio
  totalEpisodios: 48,
  status: "assistindo",    // "quero" | "assistindo" | "concluida"
  nota: 5,                 // 0 = sem nota
  vistos: ["1-1", "1-2"]   // "temporada-episodio"
}
```

### Estados de tela

Toda página que busca dados na API passa por três situações:

| Situação | O que aparece |
|---|---|
| carregando | componente `Carregando` |
| deu certo, mas sem resultado | componente `Aviso` explicando o que fazer |
| deu erro | componente `Aviso` com a mensagem do erro |

Tem mais uma: se a chave da API não estiver configurada, a home avisa isso em vez de abrir em
branco.

## Regras do produto

1. Uma série só entra uma vez na lista. A chave é o id do TMDB.
2. Só dá pra marcar episódio de série que já está na lista. Sem isso, os botões ficam desativados.
3. Episódios especiais (temporada 0) são ignorados, porque não fazem parte da história principal e
   bagunçariam o "próximo episódio".
4. Marcar o último episódio não conclui a série sozinho. Quem decide isso é o usuário, porque a
   série pode ganhar temporada nova.
5. Clicar na mesma estrela de novo tira a nota.
6. O tempo assistido usa a duração média que o TMDB informa. Quando não tem, uso 45 minutos.
7. Tudo fica salvo só no navegador. Sem conta e sem sincronização — isso está escrito no rodapé.
8. O site todo é em português, e as buscas na API usam `language=pt-BR`.
