# PETZ

Teste técnico para desenvolvimento frontend – React/NextJS.

## Setup

```shell
yarn 
```

## Inicie o projeto

```shell
yarn dev
```

## Executar tests

```shell
yarn test:ci
```

## Objetivo

Desenvolver um web app em Typescript, a partir deste projeto nextjs (clone o repositório e desenvolva em cima dele), que implemente o design descrito na próxima seção.

### Considerações finais

Devido a correria dessa última semana, peço desculpas por não ter dado todo a atneção que gostaria ao teste. Vou descrever alguns pontos que mudaria/melhoraria se fosse meu único projeto em foco.

## Estilização e Design

Minha abordagem usual envolve o uso do styled-components e a tematização a partir de uma biblioteca de componentes, visando economizar tempo e padronizar, nesse caso ao aplicar o atomic design, os átomos podem perder relevância, dando destaque aos organismos e moléculas. Embora para este projeto tenha sido necessário desenvolver até mesmo os botões e inputs do zero, devido ao seu tamanho reduzido, optei por criar apenas os diretórios de components e containers. Essa escolha pode sacrificar a escalabilidade e reutilização em um sistema maior, mas nessas condições, a organização é mantida.

No que diz respeito ao CSS, devido ao tempo limitado, optei por manter o mesmo padrão de pastas simplificado. No entanto, para projetos maiores, seria mais eficiente trazer os módulos diretamente para os diretórios de components e containers. Neste projeto, essa abordagem não apresenta problemas.

## Testes

Os testes que implementei são superficiais, mas acredito que eles servem para demonstração e cobrem o básico. Normalmente, quando os testes são um requisito específico de uma tarefa, gosto de criar os casos de uso e escrever primeiro, seguindo a abordagem BDD. No entanto, para tarefas com descrições mais concisas ou com pouco tempo disponível para desenvolvimento, busco cobrir os casos básicos e, após alcançar o objetivo principal, retorno para ajustar os casos mais específicos.

## GetServerSideProps

Optei por não utilizar esta funcionalidade, uma vez que, de acordo com as métricas do Google Lighthouse, o SEO já estava avaliado em 100%.

## Components

Com um design guide, seria possível criar componentes mais robustos. Por exemplo, botões que abrangem uma variedade maior de cenários e inputs combinados com labels. No entanto, optei por manter as coisas simples neste caso.

## Gerações dos Pokemons

Pode ter sido falha minha, porém só consegui retorno para primeira geração.

## Selects

No final tive um tempo extra para finalizar o projeto, mas atuei na parte de testes e lógica, acabei deixando o estilo correto do select para o final e fiquei sem tempo.
