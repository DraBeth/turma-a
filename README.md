# Turma A - Direito

Portal simples da Turma A para reunir avisos, links uteis e ferramentas de apoio ao semestre.

## Funcionalidades atuais

- Painel automatico de hoje e proximos eventos
- Grade semanal com horarios, predios, salas e modalidade
- Quadro de disciplinas, docentes e inicio do periodo letivo
- Excecoes de agenda por data especifica
- Selos de fonte, atualizacao e responsavel nas informacoes sensiveis
- Avisos da turma
- Links uteis
- Calculadora de media ponderada: N1 40%, N2 60%, APS e SUB/N3
- Tracker inicial de APS e entregas
- Contatos dos professores presenciais do semestre
- Achados e perdidos simples
- Espaco para capsula do tempo

## Rodando localmente

```bash
npm install
npm run dev
```

## Publicacao

O Vite esta configurado com `base: '/turma-a/'` para funcionar no GitHub Pages do repositorio.

O portal e compartilhado diretamente por link e usa `noindex` para nao aparecer nos resultados dos buscadores. Isso reduz a descoberta casual, mas nao impede que o endereco seja encaminhado.
