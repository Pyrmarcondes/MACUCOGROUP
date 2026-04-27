# Project TODO — Macuco Group

- [x] Design system Deep Tech Noir global (fundo #0a1628, Playfair Display gold #c9a84c, accent cyan #00d4ff, Montserrat, Source Sans 3)
- [x] Banco de dados: tabelas contents, chatConversations, chatMessages, leads
- [x] Navegação principal: Homepage, Content Studio, MacucoBot, Contato
- [x] Homepage hero section com tagline "A primeira DAO de Venture Capital do Brasil"
- [x] Homepage KPIs de mercado (Economia Digital, Empresas em Transformação, Unicórnios, Investimentos VC)
- [x] Homepage seção "A Parábola dos Ovos Azuis"
- [x] Homepage seção de depoimentos
- [x] Homepage CTA dedicado ao MacucoBot com card glow, badge "Assistente IA", citação da persona, topic pills, botão cyan
- [x] Content Studio: listagem de estudos/artigos/guias em cards Deep Tech Noir
- [x] Content Studio: página de leitura individual com renderização HTML inline (tabelas, KPIs, blockquotes)
- [x] MacucoBot: chatbot proativo com persona do pássaro macuco
- [x] MacucoBot: quick replies e respostas geradas via LLM
- [x] MacucoBot: captura de leads após 5+ mensagens (nome, email, empresa) — frontend
- [x] MacucoBot: salvar leads no banco e notificar owner
- [x] Testes vitest para auth, content e leads
- [x] Adicionar estilização SWOT na renderização de conteúdo
- [x] Validar no backend que lead só pode ser capturado após 5+ mensagens trocadas
- [x] Adicionar testes vitest para chat.sendMessage e chat.submitLead
- [ ] Push para GitHub https://github.com/Pyrmarcondes/MACUCOGROUP.git

## Fase 2 — Expansão

- [x] Página "Ovos da Macuco" (/portfolio) com 23 startups em 10 categorias
- [x] Navegação com abas horizontais no header (scroll horizontal no mobile)
- [x] Rota /portfolio registrada no App.tsx
- [x] Skill Macuco Content Platform atualizado com documentação completa

## Fase 3 — Conteúdos

- [x] Popular Content Studio com 13 conteúdos editoriais no banco de dados
- [x] Verificar renderização dos conteúdos na listagem e página de leitura

## Fase 3b — SEO

- [x] Meta description (50-160 caracteres) no index.html
- [x] Meta keywords no index.html
- [x] Open Graph tags para compartilhamento social

## Fase 4 — Stripe Integration

- [x] Instalar feature Stripe via webdev_add_feature
- [x] Configurar chaves API do Stripe (auto-provisionadas pelo sandbox)
- [x] Implementar página de produtos/planos com checkout Stripe
- [x] Implementar webhook para processar pagamentos
- [x] Testes vitest para integração Stripe (4 testes passando)
