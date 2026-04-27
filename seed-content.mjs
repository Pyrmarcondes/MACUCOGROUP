import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const contents = [
  {
    title: "Manifesto CONTAIN NOW — O Futuro é Conteúdo",
    slug: "manifesto-contain-now",
    summary: "O manifesto fundacional do Macuco Group sobre a era do conteúdo como ativo estratégico. Uma visão bilíngue (PT/EN) sobre como o conteúdo se tornou a moeda mais valiosa do ecossistema digital.",
    category: "Manifesto",
    tags: JSON.stringify(["conteúdo", "estratégia", "manifesto", "CONTAIN NOW"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-01-15"),
    htmlContent: `<div class="dtn-content">
<h2>CONTAIN NOW — O Futuro é Conteúdo</h2>
<blockquote>"Conteúdo não é o que você publica. É o que você é."</blockquote>
<p>O mundo mudou. A economia mudou. O marketing mudou. E no centro de tudo isso, uma verdade se impõe com força irreversível: <strong>conteúdo é o novo ativo estratégico</strong>.</p>
<p>Não estamos falando de posts em redes sociais ou blogs corporativos. Estamos falando de uma revolução silenciosa que transformou a forma como marcas se conectam, vendem e existem no mundo digital.</p>
<h3>A Tese Central</h3>
<p>O Macuco Group nasceu da convicção de que o conteúdo — quando tratado como <strong>inteligência estratégica</strong> e não como commodity — se torna o diferencial competitivo mais poderoso de qualquer negócio.</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">$6.8T</div><div class="kpi-label">Economia Digital Global</div></div>
<div class="kpi-card"><div class="kpi-value">85%</div><div class="kpi-label">Empresas em Transformação Digital</div></div>
<div class="kpi-card"><div class="kpi-value">72%</div><div class="kpi-label">Decisões B2B influenciadas por conteúdo</div></div>
</div>
<h3>Os Três Pilares</h3>
<table><thead><tr><th>Pilar</th><th>Descrição</th><th>Impacto</th></tr></thead>
<tbody>
<tr><td><strong>Content Strategy</strong></td><td>Planejamento editorial com inteligência de dados</td><td>Direcionamento preciso de audiência</td></tr>
<tr><td><strong>Content Production</strong></td><td>Criação com IA generativa + curadoria humana</td><td>Escala com qualidade premium</td></tr>
<tr><td><strong>Content Intelligence</strong></td><td>Métricas preditivas e análise de performance</td><td>ROI mensurável e otimização contínua</td></tr>
</tbody></table>
<h3>CONTAIN NOW</h3>
<p>Este manifesto é um chamado. Para marcas, para criadores, para investidores. O futuro não pertence a quem tem mais dinheiro — pertence a quem tem mais <strong>relevância</strong>. E relevância se constrói com conteúdo.</p>
<blockquote>"The future belongs to those who contain it now."</blockquote>
</div>`
  },
  {
    title: "Estudo: Brazilian Market — O Ecossistema Digital Brasileiro",
    slug: "estudo-brazilian-market",
    summary: "Análise aprofundada do ecossistema digital brasileiro: tamanho de mercado, tendências de investimento, oportunidades em IA e o papel do Brasil na economia digital global.",
    category: "Estudo",
    tags: JSON.stringify(["Brasil", "mercado digital", "investimento", "ecossistema"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-02-10"),
    htmlContent: `<div class="dtn-content">
<h2>Brazilian Market — O Ecossistema Digital Brasileiro</h2>
<p>O Brasil se consolidou como o maior mercado digital da América Latina e um dos mais dinâmicos do mundo. Com mais de <strong>180 milhões de usuários de internet</strong> e uma economia digital que cresce a taxas de dois dígitos, o país oferece oportunidades únicas para investidores e empreendedores.</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">$90B</div><div class="kpi-label">E-commerce Brasil 2024</div></div>
<div class="kpi-card"><div class="kpi-value">180M</div><div class="kpi-label">Usuários de Internet</div></div>
<div class="kpi-card"><div class="kpi-value">13</div><div class="kpi-label">Unicórnios Brasileiros</div></div>
<div class="kpi-card"><div class="kpi-value">$15B</div><div class="kpi-label">Investimentos VC 2023</div></div>
</div>
<h3>Tendências Estruturais</h3>
<table><thead><tr><th>Tendência</th><th>Maturidade</th><th>Potencial</th></tr></thead>
<tbody>
<tr><td>IA Generativa</td><td>Emergente</td><td>Muito Alto</td></tr>
<tr><td>Live Commerce</td><td>Crescimento</td><td>Alto</td></tr>
<tr><td>Retail Media</td><td>Emergente</td><td>Muito Alto</td></tr>
<tr><td>Connected TV</td><td>Crescimento</td><td>Alto</td></tr>
<tr><td>EdTech com IA</td><td>Emergente</td><td>Alto</td></tr>
</tbody></table>
<h3>O Papel do Macuco Group</h3>
<p>O Macuco Group atua como uma <strong>DAO de Venture Capital</strong> posicionada na interseção entre Marketing, Commerce e Inteligência Artificial — o que chamamos de <strong>MarKommerce</strong>. Nosso portfólio de 23 startups reflete essa tese de investimento.</p>
<blockquote>"O Brasil não é apenas um mercado emergente. É um mercado que está definindo o futuro do commerce digital."</blockquote>
</div>`
  },
  {
    title: "Tese AI MARKOMMERCE DISRUP v6.0",
    slug: "tese-ai-markommerce",
    summary: "A tese de investimento central do Macuco Group: como a convergência entre Marketing, Commerce e IA está criando a maior oportunidade de investimento da década no Brasil.",
    category: "Tese",
    tags: JSON.stringify(["investimento", "IA", "MarKommerce", "tese", "venture capital"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-03-01"),
    htmlContent: `<div class="dtn-content">
<h2>Tese AI MARKOMMERCE DISRUP v6.0</h2>
<blockquote>"O futuro é Agentic. E nós estamos construindo os agentes."</blockquote>
<h3>A Convergência MarKommerce</h3>
<p><strong>MarKommerce</strong> é o termo cunhado pelo Macuco Group para descrever a convergência inevitável entre Marketing, Commerce e Inteligência Artificial. Não se trata de uma tendência — é uma <strong>transformação estrutural</strong> que está redefinindo como empresas criam valor, se comunicam e vendem.</p>
<h3>Por que agora?</h3>
<table><thead><tr><th>Fator</th><th>Impacto</th><th>Horizonte</th></tr></thead>
<tbody>
<tr><td>IA Generativa madura</td><td>Redução de 70% no custo de produção de conteúdo</td><td>2024-2026</td></tr>
<tr><td>Agentes autônomos</td><td>Automação de jornadas completas de compra</td><td>2025-2027</td></tr>
<tr><td>Commerce everywhere</td><td>Dissolução das fronteiras entre mídia e loja</td><td>2024-2028</td></tr>
<tr><td>Data-driven creativity</td><td>Criatividade guiada por dados em tempo real</td><td>2024-2026</td></tr>
</tbody></table>
<h3>A Arquitetura de Investimento</h3>
<p>O Macuco Group opera como uma <strong>DAO (Organização Autônoma Descentralizada)</strong> que investe em startups posicionadas nos eixos do MarKommerce:</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">23</div><div class="kpi-label">Startups no Portfólio</div></div>
<div class="kpi-card"><div class="kpi-value">10</div><div class="kpi-label">Categorias de Investimento</div></div>
<div class="kpi-card"><div class="kpi-value">R$300M</div><div class="kpi-label">Em Ativos</div></div>
</div>
<h3>Análise SWOT</h3>
<div class="swot-grid">
<div class="swot-card swot-strengths"><h4>Forças</h4><ul><li>Rede de 23 startups complementares</li><li>Expertise única em MarKommerce</li><li>Fundador com 30+ anos de mercado</li><li>Modelo DAO inovador</li></ul></div>
<div class="swot-card swot-weaknesses"><h4>Fraquezas</h4><ul><li>Concentração no mercado brasileiro</li><li>Modelo DAO ainda em maturação</li><li>Dependência de ciclos de investimento</li></ul></div>
<div class="swot-card swot-opportunities"><h4>Oportunidades</h4><ul><li>Explosão da IA Generativa</li><li>Retail Media em crescimento exponencial</li><li>Internacionalização via LATAM</li><li>Tokenização de ativos</li></ul></div>
<div class="swot-card swot-threats"><h4>Ameaças</h4><ul><li>Big Techs entrando no espaço</li><li>Regulação de IA</li><li>Volatilidade econômica</li></ul></div>
</div>
</div>`
  },
  {
    title: "Whitepaper: Connected TV — A Nova Fronteira da Mídia",
    slug: "whitepaper-connected-tv",
    summary: "Como a Connected TV está transformando o ecossistema de mídia e publicidade no Brasil, criando oportunidades para Shoppable TV e Retail Media.",
    category: "Whitepaper",
    tags: JSON.stringify(["CTV", "mídia", "publicidade", "Shoppable TV", "Zedia"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-04-05"),
    htmlContent: `<div class="dtn-content">
<h2>Connected TV — A Nova Fronteira da Mídia</h2>
<p>A <strong>Connected TV (CTV)</strong> representa a maior transformação na indústria de mídia desde a chegada da internet. No Brasil, com mais de 60 milhões de TVs conectadas, o mercado está pronto para uma revolução que une entretenimento, publicidade e commerce em uma única experiência.</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">60M+</div><div class="kpi-label">TVs Conectadas no Brasil</div></div>
<div class="kpi-card"><div class="kpi-value">$2.5B</div><div class="kpi-label">Mercado CTV Brasil 2025</div></div>
<div class="kpi-card"><div class="kpi-value">340%</div><div class="kpi-label">Crescimento em 3 anos</div></div>
</div>
<h3>Shoppable TV: O Commerce na Tela Grande</h3>
<p>A convergência entre CTV e e-commerce está criando uma nova categoria: <strong>Shoppable TV</strong>. Imagine assistir a um programa e comprar o produto que aparece na tela com um clique no controle remoto.</p>
<table><thead><tr><th>Modelo</th><th>Descrição</th><th>Exemplo</th></tr></thead>
<tbody>
<tr><td>Overlay Commerce</td><td>Produtos sobrepostos ao conteúdo em tempo real</td><td>QR Code durante novela</td></tr>
<tr><td>Interactive Ads</td><td>Anúncios com botão de compra integrado</td><td>Zedia CTV 4.0</td></tr>
<tr><td>Live Shopping TV</td><td>Transmissões ao vivo com carrinho de compras</td><td>Mimo + CTV</td></tr>
</tbody></table>
<blockquote>"A TV conectada não é apenas um novo canal de mídia. É o ponto de convergência entre conteúdo, dados e commerce." — Pyr Marcondes</blockquote>
</div>`
  },
  {
    title: "Estudo: AI Search Optimization Platform",
    slug: "estudo-ai-search-optimization",
    summary: "Como a IA está transformando o SEO tradicional em uma nova disciplina: GEO (Generative Engine Optimization) e o impacto para marcas e publishers.",
    category: "Estudo",
    tags: JSON.stringify(["IA", "SEO", "GEO", "search", "otimização"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-05-12"),
    htmlContent: `<div class="dtn-content">
<h2>AI Search Optimization Platform</h2>
<p>O SEO como conhecemos está morrendo. Em seu lugar, nasce o <strong>GEO — Generative Engine Optimization</strong>. Com a ascensão de buscadores baseados em IA como o Google SGE, Perplexity e ChatGPT Search, as regras do jogo mudaram completamente.</p>
<h3>De SEO para GEO</h3>
<table><thead><tr><th>Aspecto</th><th>SEO Tradicional</th><th>GEO (Novo Paradigma)</th></tr></thead>
<tbody>
<tr><td>Foco</td><td>Keywords e backlinks</td><td>Autoridade semântica e citações</td></tr>
<tr><td>Resultado</td><td>Lista de links</td><td>Resposta sintetizada com fontes</td></tr>
<tr><td>Métrica</td><td>Posição no ranking</td><td>Frequência de citação pela IA</td></tr>
<tr><td>Conteúdo</td><td>Otimizado para crawlers</td><td>Otimizado para compreensão de IA</td></tr>
</tbody></table>
<h3>Oportunidade para o Brasil</h3>
<p>O mercado brasileiro de search movimenta <strong>R$ 32 bilhões por ano</strong>. A transição para GEO representa uma janela de oportunidade para startups e marcas que se posicionarem primeiro.</p>
<blockquote>"Quem dominar a otimização para IA generativa dominará a próxima década do marketing digital."</blockquote>
</div>`
  },
  {
    title: "Estudo: GEO Business Opportunity Brazil",
    slug: "estudo-geo-business-opportunity",
    summary: "Mapeamento das oportunidades de negócio em Generative Engine Optimization no Brasil: mercado, players, modelos de negócio e projeções.",
    category: "Estudo",
    tags: JSON.stringify(["GEO", "Brasil", "oportunidade", "negócios", "IA"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-06-20"),
    htmlContent: `<div class="dtn-content">
<h2>GEO Business Opportunity Brazil</h2>
<p>O Brasil está na vanguarda da adoção de IA generativa na América Latina. Este estudo mapeia as oportunidades concretas de negócio na interseção entre <strong>busca generativa</strong> e o mercado brasileiro.</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">R$32B</div><div class="kpi-label">Mercado de Search no Brasil</div></div>
<div class="kpi-card"><div class="kpi-value">67%</div><div class="kpi-label">Empresas testando IA em marketing</div></div>
<div class="kpi-card"><div class="kpi-value">4x</div><div class="kpi-label">Crescimento projetado GEO 2025-2028</div></div>
</div>
<h3>Modelos de Negócio Emergentes</h3>
<table><thead><tr><th>Modelo</th><th>Descrição</th><th>Potencial</th></tr></thead>
<tbody>
<tr><td>GEO SaaS</td><td>Plataforma de otimização para IA generativa</td><td>R$ 500M em 3 anos</td></tr>
<tr><td>GEO Agency</td><td>Serviço consultivo de otimização</td><td>R$ 200M em 3 anos</td></tr>
<tr><td>GEO Analytics</td><td>Monitoramento de citações em IA</td><td>R$ 150M em 3 anos</td></tr>
</tbody></table>
<blockquote>"O GEO não é uma evolução do SEO. É uma nova disciplina que exige novos skills, novas ferramentas e uma nova mentalidade."</blockquote>
</div>`
  },
  {
    title: "Whitepaper: Fluxo de Caixa Descontado para Startups de IA",
    slug: "whitepaper-fluxo-caixa-descontado",
    summary: "Metodologia de valuation adaptada para startups de IA: como aplicar DCF em empresas de tecnologia com alto crescimento e margens não-lineares.",
    category: "Whitepaper",
    tags: JSON.stringify(["valuation", "DCF", "startups", "IA", "investimento"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-07-08"),
    htmlContent: `<div class="dtn-content">
<h2>Fluxo de Caixa Descontado para Startups de IA</h2>
<p>Avaliar startups de IA é um dos maiores desafios do venture capital moderno. Este whitepaper apresenta uma <strong>metodologia adaptada de DCF</strong> que incorpora as particularidades de empresas de inteligência artificial.</p>
<h3>O Desafio do Valuation em IA</h3>
<p>Startups de IA apresentam características que desafiam modelos tradicionais de valuation:</p>
<table><thead><tr><th>Característica</th><th>Impacto no Valuation</th><th>Ajuste Necessário</th></tr></thead>
<tbody>
<tr><td>Crescimento exponencial</td><td>Projeções lineares subestimam valor</td><td>Curvas de crescimento em S</td></tr>
<tr><td>Efeitos de rede</td><td>Valor cresce com base de dados</td><td>Multiplicador de dados</td></tr>
<tr><td>Margens não-lineares</td><td>Custo marginal tende a zero</td><td>Projeção de margem dinâmica</td></tr>
<tr><td>Moat tecnológico</td><td>Barreira de entrada por modelo proprietário</td><td>Prêmio de propriedade intelectual</td></tr>
</tbody></table>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">15-25x</div><div class="kpi-label">Múltiplo ARR típico em IA</div></div>
<div class="kpi-card"><div class="kpi-value">3-5 anos</div><div class="kpi-label">Horizonte de projeção recomendado</td></div>
<div class="kpi-card"><div class="kpi-value">18-22%</div><div class="kpi-label">Taxa de desconto ajustada</div></div>
</div>
<blockquote>"O valor de uma startup de IA não está no código. Está nos dados, no modelo e na capacidade de escalar inteligência."</blockquote>
</div>`
  },
  {
    title: "O Futuro do Retail Media Farmacêutico",
    slug: "futuro-retail-media-farmaceutico",
    summary: "Como o Retail Media está transformando o setor farmacêutico brasileiro: oportunidades, desafios regulatórios e cases de sucesso.",
    category: "Estudo",
    tags: JSON.stringify(["retail media", "farmacêutico", "publicidade", "saúde"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-08-15"),
    htmlContent: `<div class="dtn-content">
<h2>O Futuro do Retail Media Farmacêutico</h2>
<p>O <strong>Retail Media</strong> é a terceira onda da publicidade digital, e o setor farmacêutico brasileiro está no epicentro dessa transformação. Com mais de 90 mil farmácias no país, o potencial de monetização de dados e mídia no ponto de venda é imenso.</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">90K+</div><div class="kpi-label">Farmácias no Brasil</div></div>
<div class="kpi-card"><div class="kpi-value">R$150B</div><div class="kpi-label">Mercado Farma Brasil</div></div>
<div class="kpi-card"><div class="kpi-value">R$8B</div><div class="kpi-label">Potencial Retail Media Farma</div></div>
</div>
<h3>Oportunidades por Canal</h3>
<table><thead><tr><th>Canal</th><th>Formato</th><th>Potencial</th></tr></thead>
<tbody>
<tr><td>App de farmácia</td><td>Mídia programática + recomendação IA</td><td>Muito Alto</td></tr>
<tr><td>Tela no PDV</td><td>Digital signage contextual</td><td>Alto</td></tr>
<tr><td>E-commerce farma</td><td>Sponsored products + search ads</td><td>Muito Alto</td></tr>
<tr><td>Programa de fidelidade</td><td>Dados de compra para targeting</td><td>Alto</td></tr>
</tbody></table>
<blockquote>"Retail Media farmacêutico não é publicidade. É inteligência de saúde monetizada com ética e precisão."</blockquote>
</div>`
  },
  {
    title: "Guia: Mitigar Demissão em Massa nas Agências com IA",
    slug: "guia-mitigar-demissao-agencias",
    summary: "Guia estratégico para agências de publicidade: como usar IA para transformar operações, reter talentos e evitar demissões em massa.",
    category: "Guia",
    tags: JSON.stringify(["agências", "IA", "transformação", "talentos", "gestão"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-09-01"),
    htmlContent: `<div class="dtn-content">
<h2>Mitigar Demissão em Massa nas Agências com IA</h2>
<p>A indústria de agências de publicidade enfrenta uma crise existencial. A pressão por eficiência, a commoditização de serviços e a ascensão da IA generativa estão levando a ondas de demissão em massa. Mas existe um caminho alternativo.</p>
<h3>O Cenário Atual</h3>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">35%</div><div class="kpi-label">Agências que demitiram em 2024</div></div>
<div class="kpi-card"><div class="kpi-value">40%</div><div class="kpi-label">Redução média de equipes</div></div>
<div class="kpi-card"><div class="kpi-value">70%</div><div class="kpi-label">Tarefas automatizáveis com IA</div></div>
</div>
<h3>Estratégia de Transformação em 4 Fases</h3>
<table><thead><tr><th>Fase</th><th>Ação</th><th>Prazo</th><th>Resultado</th></tr></thead>
<tbody>
<tr><td>1. Diagnóstico</td><td>Mapear processos automatizáveis</td><td>30 dias</td><td>Roadmap de IA</td></tr>
<tr><td>2. Capacitação</td><td>Treinar equipe em ferramentas IA</td><td>90 dias</td><td>Equipe AI-ready</td></tr>
<tr><td>3. Automação</td><td>Implementar IA em produção e mídia</td><td>180 dias</td><td>+40% produtividade</td></tr>
<tr><td>4. Reinvenção</td><td>Novos serviços de alto valor com IA</td><td>360 dias</td><td>Novo modelo de negócio</td></tr>
</tbody></table>
<blockquote>"A IA não veio para substituir criativos. Veio para libertar criativos de tarefas que nunca deveriam ter sido deles."</blockquote>
</div>`
  },
  {
    title: "Guia Estratégico de Marketing 2025-2030",
    slug: "guia-estrategico-marketing-2025-2030",
    summary: "O guia definitivo para líderes de marketing: tendências, tecnologias e estratégias que definirão os próximos 5 anos do marketing digital no Brasil.",
    category: "Guia",
    tags: JSON.stringify(["marketing", "estratégia", "2025-2030", "tendências", "IA"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-10-20"),
    htmlContent: `<div class="dtn-content">
<h2>Guia Estratégico de Marketing 2025-2030</h2>
<p>Os próximos cinco anos serão os mais transformadores da história do marketing. A convergência de <strong>IA generativa, commerce everywhere e dados em tempo real</strong> está criando um novo paradigma que exige uma revisão completa de estratégias, estruturas e competências.</p>
<h3>As 5 Mega-Tendências</h3>
<table><thead><tr><th>#</th><th>Tendência</th><th>Impacto</th><th>Prontidão do Mercado BR</th></tr></thead>
<tbody>
<tr><td>1</td><td>Agentes Autônomos de Marketing</td><td>Revolucionário</td><td>Baixa</td></tr>
<tr><td>2</td><td>Commerce Everywhere</td><td>Transformador</td><td>Média</td></tr>
<tr><td>3</td><td>Hyper-Personalization em Escala</td><td>Transformador</td><td>Média</td></tr>
<tr><td>4</td><td>Creator Economy 3.0</td><td>Significativo</td><td>Alta</td></tr>
<tr><td>5</td><td>Privacy-First Marketing</td><td>Estrutural</td><td>Baixa</td></tr>
</tbody></table>
<h3>O Novo Stack de Marketing</h3>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">IA</div><div class="kpi-label">Core de toda operação</div></div>
<div class="kpi-card"><div class="kpi-value">Data</div><div class="kpi-label">First-party como ativo</div></div>
<div class="kpi-card"><div class="kpi-value">Content</div><div class="kpi-label">Moeda de troca com audiência</div></div>
<div class="kpi-card"><div class="kpi-value">Commerce</div><div class="kpi-label">Integrado em todo touchpoint</div></div>
</div>
<blockquote>"Marketing em 2030 não será uma disciplina. Será uma camada de inteligência que permeia todo o negócio."</blockquote>
</div>`
  },
  {
    title: "Aula FAAP: Disruptive Branding na Era da IA",
    slug: "aula-faap-disruptive-branding",
    summary: "Material da aula ministrada na FAAP sobre como a IA está redefinindo branding, identidade de marca e conexão emocional com consumidores.",
    category: "Aula",
    tags: JSON.stringify(["FAAP", "branding", "IA", "educação", "disrupção"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-03-15"),
    htmlContent: `<div class="dtn-content">
<h2>Disruptive Branding na Era da IA</h2>
<p><em>Aula ministrada na FAAP — Fundação Armando Alvares Penteado</em></p>
<p>O branding como disciplina está sendo fundamentalmente transformado pela inteligência artificial. Não se trata apenas de usar IA para criar logos ou campanhas — trata-se de repensar o que significa <strong>construir uma marca</strong> em um mundo onde máquinas podem criar, personalizar e distribuir conteúdo em escala infinita.</p>
<h3>Os 4 Pilares do Disruptive Branding</h3>
<table><thead><tr><th>Pilar</th><th>Antes da IA</th><th>Com IA</th></tr></thead>
<tbody>
<tr><td><strong>Identidade</strong></td><td>Manual de marca estático</td><td>Identidade adaptativa e contextual</td></tr>
<tr><td><strong>Narrativa</strong></td><td>Storytelling linear</td><td>Narrativas generativas e personalizadas</td></tr>
<tr><td><strong>Experiência</strong></td><td>Touchpoints planejados</td><td>Experiências autônomas e preditivas</td></tr>
<tr><td><strong>Comunidade</strong></td><td>Gestão de redes sociais</td><td>Ecossistemas de co-criação com IA</td></tr>
</tbody></table>
<blockquote>"Uma marca que não usa IA é como uma marca que não usa internet em 2005. Possível, mas com prazo de validade."</blockquote>
</div>`
  },
  {
    title: "Aula Belas Artes: O Futuro da Criatividade com IA",
    slug: "aula-belas-artes-criatividade-ia",
    summary: "Material da aula na Belas Artes sobre o impacto da IA generativa na criatividade, design e produção artística.",
    category: "Aula",
    tags: JSON.stringify(["Belas Artes", "criatividade", "IA", "design", "educação"]),
    authorName: "Pyr Marcondes",
    published: true,
    publishedAt: new Date("2025-04-20"),
    htmlContent: `<div class="dtn-content">
<h2>O Futuro da Criatividade com IA</h2>
<p><em>Aula ministrada na Universidade Belas Artes de São Paulo</em></p>
<p>A criatividade humana está sendo amplificada — não substituída — pela inteligência artificial. Este é o ponto de partida para entender o futuro da produção criativa, do design e da arte na era da IA generativa.</p>
<h3>O Novo Processo Criativo</h3>
<p>O processo criativo tradicional (briefing → pesquisa → ideação → produção → revisão) está sendo transformado em um ciclo contínuo onde a IA participa de cada etapa:</p>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">10x</div><div class="kpi-label">Mais variações por hora</div></div>
<div class="kpi-card"><div class="kpi-value">60%</div><div class="kpi-label">Menos tempo em produção</div></div>
<div class="kpi-card"><div class="kpi-value">∞</div><div class="kpi-label">Possibilidades de iteração</div></div>
</div>
<blockquote>"A IA é o pincel mais poderoso já inventado. Mas sem a mão do artista, é apenas tecnologia."</blockquote>
</div>`
  },
  {
    title: "Apresentação Nuvini: Parceria Estratégica",
    slug: "apresentacao-nuvini-parceria",
    summary: "Análise da parceria estratégica entre Macuco Group e Nuvini: sinergias em SaaS, IA e consolidação de empresas de tecnologia.",
    category: "Estudo",
    tags: JSON.stringify(["Nuvini", "parceria", "SaaS", "consolidação", "Pierre Schurmann"]),
    authorName: "Macuco Research",
    published: true,
    publishedAt: new Date("2025-05-30"),
    htmlContent: `<div class="dtn-content">
<h2>Nuvini: Parceria Estratégica</h2>
<p>A <strong>Nuvini</strong>, liderada por Pierre Schurmann, é uma das maiores plataformas de consolidação de empresas SaaS da América Latina. A parceria com o Macuco Group representa a convergência entre <strong>venture capital descentralizado</strong> e <strong>consolidação estratégica de tecnologia</strong>.</p>
<h3>Sinergias Identificadas</h3>
<table><thead><tr><th>Área</th><th>Macuco Group</th><th>Nuvini</th><th>Sinergia</th></tr></thead>
<tbody>
<tr><td>Modelo</td><td>DAO de VC</td><td>Consolidadora SaaS</td><td>Pipeline de aquisições</td></tr>
<tr><td>Foco</td><td>MarKommerce + IA</td><td>SaaS vertical</td><td>IA aplicada a SaaS</td></tr>
<tr><td>Estágio</td><td>Early stage</td><td>Growth/Scale</td><td>Jornada completa</td></tr>
<tr><td>Rede</td><td>23 startups</td><td>30+ empresas</td><td>Ecossistema de 50+ empresas</td></tr>
</tbody></table>
<blockquote>"O Pyr é um parceiro estratégico raro. Consegue combinar visão, execução e uma leitura precisa de mercado." — Pierre Schurmann, CEO da Nuvini</blockquote>
</div>`
  },
];

async function seed() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  console.log('Conectado ao banco de dados. Inserindo conteúdos...\n');
  
  let inserted = 0;
  let skipped = 0;
  
  for (const content of contents) {
    try {
      // Check if slug already exists
      const [existing] = await connection.execute(
        'SELECT id FROM contents WHERE slug = ?',
        [content.slug]
      );
      
      if (Array.isArray(existing) && existing.length > 0) {
        console.log(`⏭  Já existe: "${content.title}"`);
        skipped++;
        continue;
      }
      
      await connection.execute(
        `INSERT INTO contents (title, slug, summary, category, tags, authorName, published, publishedAt, htmlContent, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          content.title,
          content.slug,
          content.summary,
          content.category,
          content.tags,
          content.authorName,
          content.published ? 1 : 0,
          content.publishedAt,
          content.htmlContent,
        ]
      );
      
      console.log(`✅ Inserido: "${content.title}"`);
      inserted++;
    } catch (error) {
      console.error(`❌ Erro ao inserir "${content.title}":`, error.message);
    }
  }
  
  console.log(`\n--- Resultado ---`);
  console.log(`Inseridos: ${inserted}`);
  console.log(`Já existiam: ${skipped}`);
  console.log(`Total de conteúdos no seed: ${contents.length}`);
  
  await connection.end();
}

seed().catch(console.error);
