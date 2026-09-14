# references.md

Quatro produtos digitais que usei como referência de interface, mais a paleta de cores.

> **Sobre as imagens:** os `.svg` dessa pasta são desenhos que eu fiz pra registrar o padrão que
> observei em cada referência, não print da tela original. Os links de cada produto estão abaixo se
> quiser ver o original.

---

## 1. Letterboxd — grade de pôsteres

**Imagem:** `01-grade.svg` · https://letterboxd.com
**Usei em:** `components/CardSerie`

**O que observei:** no Letterboxd o pôster é praticamente a única coisa do card. Não tem título
grande nem sinopse. A nota fica em cima da imagem, num canto, com fundo escuro atrás.

**Por que combina com o meu site:** quem acompanha 5 ou 6 séries não lê a lista, passa o olho. O
pôster a pessoa reconhece na hora; texto ela tem que ler. E jogar a nota em cima da imagem economiza
altura, o que faz diferença no celular.

**O que fiz diferente:** o Letterboxd é sobre o que você já viu, o meu é sobre onde você parou.
Então coloquei uma barrinha de progresso na base do pôster e um selo pra mostrar que a série já está
na lista. Nenhum dos dois existe na referência.

---

## 2. Notion — abas com a contagem dentro

**Imagem:** `02-abas.svg` · https://www.notion.so
**Usei em:** `components/Filtro`, na página Minha Lista

**O que observei:** nas views de banco de dados do Notion, cada aba mostra quantos itens tem dentro
dela. E a aba aberta é marcada por duas coisas ao mesmo tempo: a cor muda e aparece um traço
embaixo.

**Por que combina:** minha lista tem quatro filtros e um deles é o que realmente importa no dia a
dia ("Assistindo"). Com a contagem na aba, a pessoa não clica numa aba vazia à toa — que é
exatamente o que aconteceria com quem acabou de começar e tem tudo em "Quero assistir".

O detalhe dos dois sinais (cor + traço) eu copiei por causa de quem não enxerga bem a diferença de
cor.

**O que fiz diferente:** no Notion o usuário cria as views que quiser. No meu site as quatro abas
são fixas, porque os três status são uma regra do produto, não uma preferência.

---

## 3. Duolingo — o botão de marcar como feito

**Imagem:** `03-botao-episodio.svg` · https://www.duolingo.com
**Usei em:** `components/ItemEpisodio`

**O que observei:** a ação que a pessoa mais repete (concluir a lição) é o maior elemento da tela.
É um círculo grande, com espaço em volta, e quando conclui ele muda de cor, muda de ícone e o
fundo da linha inteira muda junto.

**Por que combina:** marcar episódio é a ação principal do meu site e ela é feita várias vezes
seguidas, no celular, geralmente com uma mão só. Se for difícil de acertar o clique, o site perde a
razão de existir. Por isso o botão tem 44x44 pixels mesmo com a linha sendo compacta, e a mudança de
estado acontece na hora, sem esperar a internet, porque ela vem do localStorage e não da API.

**O que fiz diferente:** o Duolingo tem XP, ofensiva, som, comemoração. Não coloquei nada disso. A
pessoa não quer ser premiada por assistir TV, ela só não quer se perder. Peguei o jeito de dar o
retorno visual, não a parte de jogo.

---

## 4. Spotify Wrapped — ranking com barra proporcional

**Imagem:** `04-barras.svg` · https://www.spotify.com/wrapped
**Usei em:** página Estatísticas

**O que observei:** duas coisas se repetem no Wrapped. O ranking é sempre curto, quase nunca passa
de 5 itens. E a barra é proporcional ao primeiro colocado, então o topo sempre enche a linha toda.

**Por que combina:** minha página de estatísticas corria o risco de virar relatório. Saber que
assisti 62 episódios de drama em número absoluto não diz nada; ver que drama enche a barra e
comédia ocupa um pedacinho diz. Por isso limitei em 5 gêneros e calculei a largura dividindo pelo
maior valor.

**O que fiz diferente:** o Wrapped é uma vez por ano e é cheio de animação. O meu atualiza toda vez
que marco um episódio, então deixei sóbrio, sem animação nenhuma.

---

## 5. Vinland Saga — a paleta de cores

**Imagem:** `05-paleta.svg`
**Usei em:** `src/index.css`

As quatro referências acima resolveram a estrutura, mas nenhuma resolveu a cara do site. Escolhi
Vinland Saga porque é uma série que eu gosto e porque a fotografia dela tem uma regra de cor muito
clara.

**O que observei:** a primeira temporada é quase toda fria e sem saturação — azul do mar do norte,
cinza do aço, neblina. A única cor quente que aparece é o vermelho: sangue, fogo, vela de drakkar.
Quando tem vermelho no quadro, é porque alguma coisa vai acontecer. E o bronze dos escudos e elmos
aparece bem menos, quase sempre ligado ao que já foi conquistado.

**Como isso virou regra de interface:** só existe uma cor quente no site e ela é sempre uma ação —
botão principal, barra de progresso, próximo episódio, aba ativa. O bronze é o que já está feito —
episódio assistido, temporada completa, estrelas de nota.

Uma consequência disso: **não tem verde nenhum no site.** Verde é o óbvio pra "concluído", mas
quebraria a paleta inteira. Trocando por bronze, o significado continua o mesmo e o contraste ainda
melhorou no fundo escuro.

**O que fiz diferente:** na série o vermelho aparece o tempo todo. No site ele é raro de propósito;
se tudo fosse ferrugem, nada seria ação. Em qualquer tela dá pra contar no máximo três elementos com
essa cor.

Só peguei a paleta e o ícone de drakkar no logo. Não tem nome, arte, personagem nem marca da série
em lugar nenhum, e o site continua servindo pra qualquer série.
