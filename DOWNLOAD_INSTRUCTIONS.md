# Como Baixar e Rodar o Organograma CONFRAPAG

## Arquivos Essenciais para Download

### 1. Arquivo Principal
- **src/app/App.tsx** - Todo o código do organograma

### 2. Configurações
- **package.json** - Dependências do projeto
- **tsconfig.json** - Configuração TypeScript (se existir)
- **vite.config.ts** - Configuração Vite (se existir)

### 3. Estilos
- **src/styles/theme.css** - Estilos do tema
- **src/styles/fonts.css** - Fontes

### 4. Arquivos de entrada (criar se não existirem)
- **index.html** - Arquivo HTML principal
- **src/main.tsx** - Ponto de entrada React

## Como Usar os Arquivos

### Opção 1: Copiar para um novo projeto Vite + React

```bash
# Criar novo projeto
npm create vite@latest confrapag-organograma -- --template react-ts

# Entrar na pasta
cd confrapag-organograma

# Instalar dependências
npm install

# Instalar dependências específicas
npm install lucide-react

# Copiar o arquivo App.tsx para src/App.tsx
# Rodar o projeto
npm run dev
```

### Opção 2: Usar os arquivos diretamente

1. Copie todo o conteúdo da pasta `/workspaces/default/code`
2. Execute `npm install` ou `pnpm install`
3. Execute `npm run dev` ou `pnpm dev`

## Arquivos que você pode ignorar

- Pasta `node_modules/` (será recriada ao rodar npm install)
- Pasta `dist/` (build output)
- Arquivos `.env` (configurações locais)
- Pasta `.git/` (histórico git)

## Hospedagem Gratuita

Após baixar, você pode hospedar gratuitamente em:

- **Vercel**: https://vercel.com (Recomendado para React)
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com
- **Cloudflare Pages**: https://pages.cloudflare.com

### Deploy na Vercel (mais fácil)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel

# Seguir as instruções
```
