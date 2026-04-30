# FakeStore API Mobile MVP

Aplicação mobile em React Native com Expo que consome a Fake Store API via Axios, exibe listagem de produtos, busca por termo, tela de detalhes e favoritos com persistência local.

## Objetivo do MVP

Entregar uma base moderna, modular e escalável com navegação entre telas, consumo de API REST externa, interface responsiva e estrutura de pastas organizada.

## Requisitos Funcionais

1. Listar produtos da API em uma tela inicial.
2. Buscar itens por nome ou categoria.
3. Abrir a tela de detalhes de um produto selecionado.
4. Favoritar e desfavoritar produtos com persistência local.

## Requisitos Não Funcionais

1. Exibir feedback de carregamento com ActivityIndicator.
2. Tratar falhas de conexão e mostrar mensagem de erro com retry.
3. Persistir favoritos localmente com AsyncStorage.
4. Usar SafeAreaView para evitar sobreposição com a barra de status.
5. Ser executável em emulador Android Studio ou Expo Go.

## Style Guide

### Cores

- Primária: #2563EB
- Primária escura: #1D4ED8
- Fundo: #F8FAFC
- Superfície: #FFFFFF
- Texto: #0F172A
- Texto secundário: #64748B
- Borda: #E2E8F0
- Erro: #EF4444
- Sucesso: #10B981

### Tipografia

- Títulos: 28px
- Subtítulos: 18px
- Corpo: 15px
- Legendas: 13px
- Pequeno: 12px

### Componentes principais

- Header
- SearchBar
- ProductCard
- Botões de ação
- Badges de preço e avaliação

## Estrutura de Pastas

### src/assets
Imagens, ícones e fontes locais do app.

### src/components
Componentes reutilizáveis como Header, SearchBar e ProductCard.

### src/services
Configuração do Axios e persistência local.

### src/screens
Telas principais da aplicação: Home e Details.

### src/styles
Tema global com cores, tipografia, espaçamento e raio de borda.

### src/routes
Configuração de navegação com React Navigation.

Essa separação reduz acoplamento, facilita manutenção, simplifica testes e permite crescimento do MVP para uma aplicação maior sem bagunçar a base do código.

## Como executar

1. Instale as dependências.
2. Execute o projeto com Expo.
3. Abra no emulador Android Studio ou no Expo Go.

## Observações de validação

- A navegação está configurada entre Home e Details.
- A listagem usa FlatList.
- O consumo da API usa Axios com GET.
- O carregamento usa useEffect e useState.
- A persistência básica de favoritos usa AsyncStorage.
