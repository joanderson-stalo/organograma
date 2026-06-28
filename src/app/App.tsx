import { useState } from 'react';
import { Building2, ArrowLeft, Users, ChevronRight, Target, Briefcase, Network, FileText } from 'lucide-react';

interface Person {
  name: string;
  role: string;
  vacant?: boolean;
}

interface Department {
  id: string;
  title: string;
  manager?: Person;
  team: Person[];
  description: string;
  responsibilities: string[];
  color: string;
}

interface DetailedInfo {
  overview: string;
  objectives: string[];
  roles?: { title: string; description: string; responsibilities: string[] }[];
  relationships?: { area: string; description: string }[];
}

const departments: Department[] = [
  {
    id: 'products',
    title: 'Produtos',
    manager: { name: 'Vaga aberta', role: 'Gestor de Produtos - PM', vacant: true },
    team: [
      { name: 'Stephany', role: 'Product Owner - PO' },
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
      { name: 'Cainã Sena', role: 'Especialista em Implementação Técnica' },
      { name: 'Vaga aberta', role: 'Quality Assurance - QA', vacant: true },
      { name: 'Vaga aberta', role: 'Quality Assurance - QA', vacant: true },
    ],
    description: 'PMO, cronogramas e governança de produtos',
    responsibilities: ['Gestão de produtos', 'Roadmap', 'Priorização', 'Quality Assurance', 'Implementação Técnica'],
    color: 'bg-teal-600',
  },
  {
    id: 'data',
    title: 'Ciência de Dados',
    manager: { name: 'Vaga aberta', role: 'Gestor de Ciências e Dados - DSM', vacant: true },
    team: [
      { name: 'Ronald Gonçalves', role: 'Engenheiro de Dados - DE' },
      { name: 'Vaga aberta', role: 'Engenheiro de Dados - DE', vacant: true },
      { name: 'Lara Calude', role: 'DBA' },
      { name: 'Vaga aberta', role: 'DPO - Encarregado de Proteção de Dados', vacant: true },
    ],
    description: 'Indicadores e governança de dados',
    responsibilities: ['Data Engineering', 'Governança de dados', 'Analytics', 'Database Administration', 'Proteção de Dados'],
    color: 'bg-blue-600',
  },
  {
    id: 'ia',
    title: 'IA - ASO',
    manager: { name: 'Eduardo', role: 'ASO Manager' },
    team: [
      { name: 'Filipe Paulo', role: 'Engenheiro de Machine Learning - ML' },
      { name: 'Jônathan Henrique', role: 'Engenheiro de Machine Learning - ML' },
      { name: 'Nayane', role: 'Engenheiro de Machine Learning - ML' },
      { name: 'Paulo Victor', role: 'Engenheiro de Machine Learning - ML' },
      { name: 'Vaga aberta', role: 'AIOps', vacant: true },
    ],
    description: 'Inteligência Artificial e Automação',
    responsibilities: ['Automações', 'IA generativa', 'Machine Learning', 'AIOps'],
    color: 'bg-purple-600',
  },
  {
    id: 'engineering',
    title: 'Engenharia de Software',
    manager: { name: 'Eudócio Dantas', role: 'Project Manager' },
    team: [
      { name: 'Anderson Melo', role: 'Engenheiro de Softwares - SE' },
      { name: 'Joanderson Silva', role: 'Engenheiro de Softwares - SE' },
      { name: 'Pedro Gomes', role: 'Engenheiro de Softwares - SE' },
      { name: 'Levi Santos', role: 'Engenheiro de Softwares - SE' },
      { name: 'Lucas Araujo', role: 'Engenheiro de Softwares - SE' },
      { name: 'Marcelo Gomes', role: 'Engenheiro de Softwares - SE' },
      { name: 'Murilo Doria', role: 'Engenheiro de Softwares - SE' },
      { name: 'Rodrigo Henrique', role: 'Engenheiro de Softwares - SE' },
      { name: 'Rozângela Silva', role: 'Engenheiro de Softwares - SE' },
      { name: 'Tatyana Medeiros', role: 'UX/UI' },
      { name: 'Vanessa Galeno', role: 'UX/UI' },
      { name: 'Aline Vilar', role: 'UX/UI' },
    ],
    description: 'Desenvolvimento de software e interfaces',
    responsibilities: ['Desenvolvimento frontend/backend', 'Arquitetura de software', 'UX/UI Design', 'Code review'],
    color: 'bg-cyan-600',
  },
  {
    id: 'gateways',
    title: 'Gateways e Processamento - WEQI',
    manager: { name: 'Kennedy Allef', role: 'Gestor de Gateways e Processamento' },
    team: [
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
      { name: 'Vaga aberta', role: 'Engenheiro de Softwares - SE', vacant: true },
      { name: 'Vaga aberta', role: 'UX/UI', vacant: true },
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
      { name: 'Vaga aberta', role: 'Engenheiro de Softwares - SE', vacant: true },
      { name: 'Vaga aberta', role: 'UX/UI', vacant: true },
    ],
    description: 'APIs, regras de negócio e integrações',
    responsibilities: ['Desenvolvimento de gateways', 'Processamento de transações', 'Integrações', 'WEQI'],
    color: 'bg-indigo-600',
  },
  {
    id: 'sustentation',
    title: 'Sustentação',
    manager: { name: 'Matson Leite', role: 'Gestor de Sustentação' },
    team: [
      { name: 'Abran Arley', role: 'Engenheiro de Software' },
      { name: 'Gabriel Queiroga', role: 'Engenheiro de Software' },
      { name: 'Ana Beatriz A', role: 'Engenheiro de Software' },
      { name: 'Lara Calude', role: 'DevOps' },
    ],
    description: 'Correções, manutenção e evolução dos sistemas',
    responsibilities: ['Manutenção de sistemas', 'Correção de bugs', 'DevOps', 'Monitoramento'],
    color: 'bg-orange-600',
  },
  {
    id: 'lab',
    title: 'Laboratório de Desenvolvimento',
    team: [
      { name: 'Vaga aberta', role: 'UX/UI', vacant: true },
      { name: 'Vaga aberta', role: 'UX/UI', vacant: true },
      { name: 'Vaga aberta', role: 'Engenheiro de Softwares - SE', vacant: true },
      { name: 'Vaga aberta', role: 'Engenheiro de Softwares - SE', vacant: true },
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
      { name: 'Vaga aberta', role: 'Product Owner - PO', vacant: true },
    ],
    description: 'Laboratório de inovação e experimentação',
    responsibilities: ['Pesquisa e desenvolvimento', 'Prototipagem', 'Inovação tecnológica'],
    color: 'bg-violet-600',
  },
];

const detailedInfo: Record<string, DetailedInfo> = {
  cto: {
    overview: 'O CTO (Chief Technology Officer) é o principal executivo de tecnologia da Confrapag, responsável por definir a estratégia tecnológica e o direcionamento de inovação, garantindo o alinhamento entre a tecnologia e os objetivos de crescimento do negócio. Ele supervisiona as operações da área de Tecnologia e assegura que toda a arquitetura e infraestrutura tecnológica sejam robustas, seguras e escaláveis, sustentando o crescimento da empresa no longo prazo.',
    objectives: [
      'Definição da visão tecnológica da empresa',
      'Alinhamento da tecnologia com os objetivos estratégicos do negócio',
      'Direcionamento de iniciativas de inovação e evolução tecnológica',
      'Supervisão das operações diárias da área de Tecnologia',
      'Garantia de funcionamento contínuo dos sistemas e aplicações',
      'Validação de decisões técnicas de alto nível',
      'Definição de diretrizes de segurança da informação',
      'Acompanhamento de métricas técnicas e operacionais',
    ],
    roles: [
      {
        title: 'Estratégia Tecnológica',
        description: 'Define a visão e direção tecnológica da empresa.',
        responsibilities: [
          'Definição da visão tecnológica da empresa',
          'Alinhamento da tecnologia com os objetivos estratégicos do negócio',
          'Direcionamento de iniciativas de inovação e evolução tecnológica',
        ],
      },
      {
        title: 'Supervisão Operacional',
        description: 'Garante o funcionamento contínuo das operações tecnológicas.',
        responsibilities: [
          'Supervisão das operações diárias da área de Tecnologia',
          'Garantia de funcionamento contínuo dos sistemas e aplicações',
          'Atuação como ponto de escalonamento para problemas críticos',
        ],
      },
      {
        title: 'Arquitetura e Infraestrutura',
        description: 'Assegura que a arquitetura seja robusta, segura e escalável.',
        responsibilities: [
          'Garantia de que a arquitetura dos sistemas seja robusta, segura e escalável',
          'Validação de decisões técnicas de alto nível',
          'Supervisão da infraestrutura tecnológica (servidores, integrações, redes)',
        ],
      },
      {
        title: 'Governança e Segurança',
        description: 'Define políticas de segurança e proteção de dados.',
        responsibilities: [
          'Definição de diretrizes de segurança da informação',
          'Garantia de proteção dos sistemas e dados da empresa',
          'Supervisão de práticas de acesso e controle de permissões',
        ],
      },
      {
        title: 'Gestão de Subáreas',
        description: 'Coordena todas as frentes de tecnologia.',
        responsibilities: [
          'Supervisão de Suporte Técnico, Sustentação, Engenharia de Softwares, Dados e Produtos',
          'Garantia de integração e sinergia entre as áreas',
        ],
      },
      {
        title: 'Performance e Indicadores',
        description: 'Acompanha métricas e resultados técnicos.',
        responsibilities: [
          'Acompanhamento de métricas técnicas e operacionais',
          'Avaliação de estabilidade dos sistemas e performance das aplicações',
          'Avaliação de eficiência operacional das equipes',
          'Reporte de resultados para a diretoria',
        ],
      },
    ],
    relationships: [
      { area: 'Gestor de Suporte', description: 'Recebe alertas sobre problemas recorrentes, falhas operacionais e segurança' },
      { area: 'Gestor de Sustentação', description: 'Alinhamento sobre correção de bugs, melhorias e estabilidade dos sistemas' },
      { area: 'Gestor de Produtos', description: 'Alinhamento entre estratégia de produto e capacidade tecnológica' },
      { area: 'Arquiteto de Software', description: 'Validação das decisões arquiteturais e direcionamento técnico' },
      { area: 'Gestor de Gateways e Processamento', description: 'Acompanhamento de performance e estabilidade das aplicações críticas de pagamento' },
    ],
  },
  products: {
    overview: 'A subárea de Produtos da Confrapag é responsável por gerenciar o ciclo de vida dos produtos tecnológicos da empresa, desde a concepção até a evolução contínua. Ela atua como o elo entre negócio, mercado e tecnologia, garantindo que os produtos desenvolvidos entreguem valor real para clientes, parceiros e para a empresa, sempre alinhados à estratégia organizacional.',
    objectives: [
      'Definição da visão estratégica dos produtos tecnológicos',
      'Alinhamento entre objetivos de negócio e evolução dos produtos',
      'Identificação de oportunidades de melhoria e inovação',
      'Gestão de objetivos e metas dos produtos',
      'Acompanhamento da evolução dos produtos no mercado',
      'Priorização de entregas com foco em valor',
    ],
    roles: [
      {
        title: 'Product Owner (PO)',
        description: 'Responsável pela gestão estratégica de um produto específico.',
        responsibilities: [
          'Atuar como o dono estratégico do produto',
          'Ser a voz do cliente e dos stakeholders internos',
          'Definir visão, estratégia e objetivos do produto',
          'Gerenciar e priorizar o Product Backlog',
          'Transformar necessidades de negócio em épicos, features e histórias de usuário',
          'Acompanhar performance e efetividade',
        ],
      },
      {
        title: 'Product Manager (Gestor de Produtos)',
        description: 'Responsável pela gestão estratégica da subárea de Produtos.',
        responsibilities: [
          'Coordenar todos os Product Owners (POs) da empresa',
          'Apresentar ao CTO e diretores a visão estratégica dos produtos tecnológicos',
          'Definir direcionamento estratégico dos produtos',
          'Identificar GAPs técnicos e oportunidades de negócio',
          'Monitorar desempenho de cada produto',
          'Avaliar desempenho individual de cada PO',
        ],
      },
      {
        title: 'Quality Assurance (QA)',
        description: 'Responsável pela garantia da qualidade do software.',
        responsibilities: [
          'Prevenção de defeitos durante o desenvolvimento',
          'Validação das regras de negócio',
          'Execução de testes manuais e automatizados',
          'Testes de regressão',
          'Trabalhar junto com Produto e Engenharia',
          'Melhora contínua do processo de desenvolvimento',
        ],
      },
      {
        title: 'Especialista de Implementação Técnica',
        description: 'Responsável pela implantação técnica das soluções da Confrapag.',
        responsibilities: [
          'Onboarding técnico de clientes e fornecedores',
          'Integração de APIs',
          'Acompanhamento de integrações',
          'Diagnóstico de falhas técnicas',
          'Criação de playbooks e documentação',
          'Automação de processos de implantação',
        ],
      },
    ],
    relationships: [
      { area: 'Engenharia de Software', description: 'Desenvolve as soluções definidas pelos produtos' },
      { area: 'Dados', description: 'Fornece métricas e insights estratégicos' },
      { area: 'Sustentação', description: 'Atua na correção e melhoria dos produtos existentes' },
      { area: 'Suporte Técnico', description: 'Fornece feedbacks operacionais e problemas reais da rede' },
      { area: 'CTO', description: 'Recebe visão estratégica, métricas e direcionamentos da subárea' },
    ],
  },
  data: {
    overview: 'A subárea de Dados da Confrapag é responsável por gerar insights estratégicos para toda a empresa, por meio de análises de dados e insumos provenientes das aplicações e bancos de dados. Além disso, atua diretamente na automação de processos utilizando Inteligência Artificial (IA) e na construção de uma central de alertas para problemas, contribuindo para a eficiência operacional e tomada de decisão baseada em dados.',
    objectives: [
      'Geração de insights estratégicos para todas as áreas da empresa',
      'Tratamento e análise de dados oriundos de aplicações internas e bancos de dados',
      'Apoio na tomada de decisão baseada em dados',
      'Desenvolvimento de automações com IA',
      'Criação de agentes inteligentes',
      'Monitoramento de dados e sistemas',
      'Geração de alertas sobre problemas operacionais',
    ],
    roles: [
      {
        title: 'Gestor de Ciência de Dados',
        description: 'Responsável pela liderança estratégica da subárea.',
        responsibilities: [
          'Orquestrar os profissionais da equipe (Engenheiro de Dados, Engenheiro de ML, DBA)',
          'Reportar ao CTO métricas, insights e alertas',
          'Promover a integração e exposição de dados para toda a empresa',
          'Garantir alinhamento entre dados e estratégia de negócio',
        ],
      },
      {
        title: 'Engenheiro de Dados',
        description: 'Responsável pela manipulação, análise e apresentação de dados.',
        responsibilities: [
          'Extração e tratamento de dados',
          'Criação de indicadores e análises',
          'Proposição de visões estratégicas para a empresa',
          'Apoio na criação e prototipagem de dashboards',
          'Demonstração de visualizações nas ferramentas de BI (MetaBase, Grafana)',
        ],
      },
      {
        title: 'DBA (Administrador de Banco de Dados)',
        description: 'Responsável pela gestão e proteção dos dados da empresa.',
        responsibilities: [
          'Garantir disponibilidade contínua (24/7) dos bancos de dados',
          'Administração de SGBDs (MySQL, PostgreSQL)',
          'Monitoramento de performance',
          'Tuning de queries e índices',
          'Gestão de backups e recuperação de desastres',
          'Definição de políticas de acesso',
          'Proteção contra acessos não autorizados',
        ],
      },
      {
        title: 'DPO (Data Protection Officer)',
        description: 'Responsável pela proteção de dados e conformidade com normas de privacidade.',
        responsibilities: [
          'Garantia de conformidade com normas de privacidade (LGPD)',
          'Gestão de políticas de proteção de dados',
          'Supervisão de práticas de acesso e controle de permissões',
          'Auditoria de segurança de dados',
        ],
      },
    ],
    relationships: [
      { area: 'Engenharia de Software', description: 'Consome dados e integra soluções baseadas em dados e IA' },
      { area: 'Sustentação', description: 'Recebe insights e alertas de problemas identificados via dados' },
      { area: 'Suporte Técnico', description: 'Utiliza dados para identificar padrões de problemas e instabilidades' },
      { area: 'CTO', description: 'Recebe métricas, insights estratégicos e alertas operacionais' },
    ],
  },
  engineering: {
    overview: 'A subárea de Engenharia de Softwares da Confrapag é responsável por criar novos produtos, implementar conexões com novos fornecedores e desenvolver soluções tecnológicas que impulsionam o crescimento da empresa. Ela atua como o núcleo de inovação e desenvolvimento, sendo responsável pela criação de novas soluções, testes de tecnologias emergentes e definição de novas arquiteturas.',
    objectives: [
      'Criar novos produtos e funcionalidades',
      'Implementar conexões com novos fornecedores',
      'Desenvolver soluções tecnológicas escaláveis e seguras',
      'Testar novas tecnologias e arquiteturas',
      'Garantir qualidade técnica das entregas',
      'Promover inovação contínua',
    ],
    roles: [
      {
        title: 'Project Manager',
        description: 'Responsável pela gestão de projetos e coordenação de squads.',
        responsibilities: [
          'Coordenar equipes multidisciplinares',
          'Gerenciar cronogramas e entregas',
          'Garantir alinhamento entre tecnologia e negócio',
          'Acompanhar métricas de performance',
          'Facilitar comunicação entre áreas',
        ],
      },
      {
        title: 'Engenheiro de Software (Front-end)',
        description: 'Responsável pela criação das interfaces dos sistemas e aplicativos.',
        responsibilities: [
          'Transformar designs do UX/UI em interfaces funcionais',
          'Desenvolvimento de interfaces interativas',
          'Componentização para reutilização de código',
          'Otimização de performance',
          'Consumo de APIs internas (Back-end)',
          'Tecnologias: React, React Native, Next.js',
        ],
      },
      {
        title: 'Engenheiro de Software (Back-end)',
        description: 'Responsável pela lógica, dados e infraestrutura das aplicações.',
        responsibilities: [
          'Implementação de regras de negócio',
          'Integração com APIs internas e externas',
          'Comunicação com banco de dados',
          'Testes (Unit e Feature)',
          'Segurança (autenticação, autorização)',
          'Otimização de performance',
          'Tecnologias: PHP, Laravel, SQL',
        ],
      },
      {
        title: 'UX/UI Designer',
        description: 'Responsável pela experiência e interface do usuário.',
        responsibilities: [
          'Criação de protótipos',
          'Definição de fluxos de navegação',
          'Garantia de usabilidade',
          'Definição de aparência visual',
          'Uso do Figma para design e prototipagem',
        ],
      },
    ],
    relationships: [
      { area: 'Produto (PO / PM)', description: 'Definição de features e prioridades' },
      { area: 'Suporte Técnico', description: 'Recebe feedbacks de problemas em produção' },
      { area: 'Sustentação', description: 'Recebe bugs para correção' },
      { area: 'CTO', description: 'Validação técnica e direcionamento estratégico' },
    ],
  },
  sustentation: {
    overview: 'A subárea de Sustentação da Confrapag é responsável por corrigir problemas (bugs) e realizar melhorias contínuas nos sistemas e aplicativos existentes. Ela atua de forma complementar ao Suporte Técnico, sendo a área responsável por atuar diretamente no código e nas soluções técnicas quando há necessidade de ajustes mais profundos. Diferente da Engenharia de Software, essa área não tem foco na criação de novas funcionalidades, mas sim na estabilidade, correção e evolução dos sistemas já existentes.',
    objectives: [
      'Correção de falhas identificadas nos sistemas',
      'Atuação direta no código das aplicações',
      'Resolução de problemas encaminhados pelo Suporte Técnico',
      'Evolução de sistemas e aplicativos já existentes',
      'Ajustes técnicos para melhoria de funcionamento',
      'Garantia de funcionamento contínuo das aplicações',
      'Redução de falhas recorrentes',
    ],
    roles: [
      {
        title: 'Gestor de Sustentação',
        description: 'Responsável pela gestão estratégica e técnica da área.',
        responsibilities: [
          'Metrificação e gestão de bugs',
          'Distribuição de demandas para a equipe',
          'Construção de padrões de resolução de problemas',
          'Atuar como ponto de conexão entre equipe técnica e gestores',
          'Alinhar prioridades com o CTO',
          'Indicação de melhorias de usabilidade, performance, segurança e integrações',
          'Alertas sobre instabilidades',
        ],
      },
      {
        title: 'Desenvolvedores Front-end e Back-end',
        description: 'Responsáveis pela execução técnica das demandas da área.',
        responsibilities: [
          'Correção de bugs',
          'Implementação de melhorias nos sistemas',
          'Ajustes em aplicações existentes',
          'Execução das demandas distribuídas pelo Gestor de Sustentação',
        ],
      },
      {
        title: 'DevOps',
        description: 'Responsável pela sustentação da infraestrutura e servidores.',
        responsibilities: [
          'Operação e manutenção dos servidores',
          'Garantia de que as aplicações estejam online',
          'Monitoramento de estabilidade e segurança',
          'Gestão do parque de servidores',
          'Aplicação de ajustes técnicos conforme demanda da equipe',
          'Proteção e segurança das aplicações e infraestrutura',
        ],
      },
    ],
    relationships: [
      { area: 'Suporte Técnico', description: 'Origem principal das demandas (bugs e problemas)' },
      { area: 'CTO', description: 'Alinhamento estratégico e direcionamento de prioridades' },
      { area: 'Fornecedores', description: 'Identificação de problemas externos e acompanhamento de falhas' },
    ],
  },
  gateways: {
    overview: 'Squad responsável pelo processamento de transações de pagamento, principalmente oriundas de POS (maquinetas), TEF e transações online. Abriga a WeQi, gateway de processamento de cartão de crédito, conectada diretamente às bandeiras de cartão e adquirentes. A WeQi atua como camada central de processamento e validação de transações, responsável por intermediação com bandeiras e adquirentes, validação de dados transacionais e processamento completo do fluxo de pagamento.',
    objectives: [
      'Processar transações de pagamento com alta disponibilidade',
      'Garantir integração com bandeiras e adquirentes',
      'Manter certificação PCI',
      'Validar dados transacionais',
      'Processar fluxo completo de pagamento',
      'Oferecer solução completa para subadquirentes',
      'Melhorar uptime, performance e custos de transação',
    ],
    roles: [
      {
        title: 'Gestor de Gateways e Processamento',
        description: 'Líder técnico e estratégico dos sistemas de pagamento.',
        responsibilities: [
          'Supervisão de sistemas críticos (pagamentos, captura, processamento)',
          'Liderança de Squads multifuncionais (PO, Engenheiros, UX/UI)',
          'Alinhamento de tecnologia com objetivos de negócio',
          'Melhoria de uptime, performance e custos de transação',
          'Garantia de estabilidade e inovação dos sistemas',
        ],
      },
    ],
    relationships: [
      { area: 'Engenharia de Software', description: 'Desenvolvimento de novas funcionalidades do gateway' },
      { area: 'Sustentação', description: 'Correção de bugs e manutenção dos sistemas de pagamento' },
      { area: 'CTO', description: 'Acompanhamento de performance e estabilidade das aplicações críticas' },
      { area: 'Bandeiras e Adquirentes', description: 'Integração e processamento de transações' },
    ],
  },
  ia: {
    overview: 'A área de IA - ASO (Automation and Smart Operations) é responsável por desenvolver soluções de Inteligência Artificial e automação para toda a empresa. Atua na criação de agentes inteligentes, automações de processos, IA generativa e modelos de Machine Learning que impulsionam a eficiência operacional e inovação tecnológica da Confrapag.',
    objectives: [
      'Desenvolvimento de automações com IA',
      'Criação de agentes inteligentes',
      'Implementação de IA generativa',
      'Construção de modelos de Machine Learning',
      'Automação de processos operacionais',
      'AIOps - Operações de TI assistidas por IA',
    ],
    roles: [
      {
        title: 'ASO Manager',
        description: 'Responsável pela gestão estratégica da área de IA e Automação.',
        responsibilities: [
          'Coordenar equipe de Engenheiros de Machine Learning',
          'Definir estratégia de automação e IA',
          'Alinhar iniciativas de IA com objetivos de negócio',
          'Supervisionar desenvolvimento de agentes inteligentes',
          'Reportar ao CTO sobre inovações e resultados',
        ],
      },
      {
        title: 'Engenheiro de Machine Learning',
        description: 'Responsável pelo desenvolvimento e operacionalização de modelos de IA.',
        responsibilities: [
          'Desenvolvimento de modelos preditivos e generativos',
          'Construção de pipelines de Machine Learning',
          'Automação de processos com IA',
          'Criação de agentes inteligentes',
          'Integração de modelos com sistemas da empresa',
          'Otimização de performance e escalabilidade',
        ],
      },
      {
        title: 'AIOps',
        description: 'Responsável por operações de TI assistidas por IA.',
        responsibilities: [
          'Monitoramento inteligente de sistemas',
          'Detecção automática de anomalias',
          'Automação de respostas a incidentes',
          'Análise preditiva de problemas',
          'Otimização de recursos de infraestrutura',
        ],
      },
    ],
    relationships: [
      { area: 'Dados', description: 'Colaboração em análise de dados e insights' },
      { area: 'Engenharia de Software', description: 'Integração de modelos de IA nas aplicações' },
      { area: 'Sustentação', description: 'Automação de processos de manutenção' },
      { area: 'CTO', description: 'Direcionamento estratégico de iniciativas de IA' },
    ],
  },
  lab: {
    overview: 'O Laboratório de Desenvolvimento é uma squad focada em inovação e experimentação. Seu objetivo é acelerar novos projetos, validar ideias rapidamente e testar integrações com novos fornecedores. Atua no desenvolvimento de produtos experimentais, provas de conceito (POCs) e integrações iniciais, com alta velocidade, baixo acoplamento e foco em validação antes de escalar.',
    objectives: [
      'Acelerar novos projetos e iniciativas',
      'Validar ideias rapidamente através de POCs',
      'Testar integrações com novos fornecedores',
      'Desenvolver produtos experimentais',
      'Provar viabilidade técnica antes de escalar',
      'Inovar e testar novas tecnologias',
    ],
    roles: [
      {
        title: 'Engenheiro de Software',
        description: 'Responsável pelo desenvolvimento de protótipos e POCs.',
        responsibilities: [
          'Desenvolvimento rápido de protótipos',
          'Criação de provas de conceito',
          'Testes de novas tecnologias',
          'Integração experimental com fornecedores',
          'Validação técnica de soluções',
        ],
      },
      {
        title: 'UX/UI Designer',
        description: 'Responsável pelo design de interfaces experimentais.',
        responsibilities: [
          'Criação de protótipos de interface',
          'Design de experiências inovadoras',
          'Testes de usabilidade em POCs',
          'Validação de conceitos de design',
        ],
      },
      {
        title: 'Product Owner',
        description: 'Responsável pela definição e priorização de experimentos.',
        responsibilities: [
          'Definir escopo de POCs',
          'Priorizar experimentos',
          'Validar hipóteses de produto',
          'Alinhar experimentos com estratégia',
          'Decidir escalabilidade de projetos',
        ],
      },
    ],
    relationships: [
      { area: 'Engenharia de Software', description: 'Escala projetos validados no laboratório' },
      { area: 'Produtos', description: 'Define e prioriza experimentos estratégicos' },
      { area: 'CTO', description: 'Validação de inovações e direcionamento estratégico' },
    ],
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | string>('home');

  const handleDeptClick = (dept: Department) => {
    setCurrentView(dept.id);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const DepartmentCard = ({ dept }: { dept: Department }) => {
    const teamCount = dept.team.length + (dept.manager ? 1 : 0);
    const vacantCount = dept.team.filter(p => p.vacant).length + (dept.manager?.vacant ? 1 : 0);

    return (
      <div
        onClick={() => handleDeptClick(dept)}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer p-3 border-t-4 w-44"
        style={{ borderTopColor: dept.color.replace('bg-', '#') }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-xs text-slate-800 flex-1 leading-tight">{dept.title}</h3>
          <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
        </div>

        {dept.manager && (
          <div className="mb-2 pb-2 border-b border-slate-200">
            <p className={`text-xs ${dept.manager.vacant ? 'text-red-500 italic' : 'text-slate-700 font-medium'} truncate`}>
              {dept.manager.name}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Users className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{teamCount} {teamCount === 0 ? '(vazio)' : 'pessoas'}</span>
        </div>
        {vacantCount > 0 && (
          <div className="text-xs text-red-500 mt-1">{vacantCount} vaga{vacantCount > 1 ? 's' : ''}</div>
        )}
      </div>
    );
  };

  if (currentView !== 'home') {
    const dept = departments.find(d => d.id === currentView);
    const info = detailedInfo[currentView];

    if (!info) return null;

    // CTO special case
    const isCTO = currentView === 'cto';
    const title = isCTO ? 'CTO - Chief Technology Officer' : dept?.title || '';
    const description = isCTO ? 'Liderança Estratégica de Tecnologia' : dept?.description || '';
    const color = isCTO ? 'bg-blue-600' : dept?.color || 'bg-slate-600';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className={`${color} text-white p-6 shadow-lg`}>
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Organograma</span>
            </button>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-white/90 text-lg">{description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-8">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Visão Geral</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{info.overview}</p>
          </div>

          {/* Team - only for departments, not CTO */}
          {dept && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Equipe</h2>
              </div>

              {dept.manager && (
                <div className="mb-6">
                  <h3 className="font-bold text-slate-700 mb-3">Gestor</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className={`font-medium ${dept.manager.vacant ? 'text-red-500 italic' : 'text-slate-800'}`}>
                      {dept.manager.name}
                    </p>
                    <p className="text-sm text-slate-600">{dept.manager.role}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-slate-700 mb-3">Membros da Equipe ({dept.team.length})</h3>
                {dept.team.length === 0 ? (
                  <div className="bg-slate-50 rounded-lg p-6 text-center">
                    <p className="text-slate-500 italic">Equipe em formação - vagas em aberto</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dept.team.map((person, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-3">
                        <p className={`font-medium text-sm ${person.vacant ? 'text-red-500 italic' : 'text-slate-800'}`}>
                          {person.name}
                        </p>
                        <p className="text-xs text-slate-600">{person.role}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTO Person Info */}
          {isCTO && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">CTO</h2>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-medium text-slate-800">Lettiery</p>
                <p className="text-sm text-slate-600">Chief Technology Officer</p>
              </div>
            </div>
          )}

          {/* Objectives */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Objetivos e Responsabilidades</h2>
            </div>
            <ul className="space-y-2">
              {info.objectives.map((obj, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Roles */}
          {info.roles && info.roles.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Estrutura de Cargos</h2>
              </div>
              <div className="space-y-6">
                {info.roles.map((role, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{role.title}</h3>
                    <p className="text-slate-600 mb-3 italic">{role.description}</p>
                    <ul className="space-y-1">
                      {role.responsibilities.map((resp, rIndex) => (
                        <li key={rIndex} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-blue-600 mt-1">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relationships */}
          {info.relationships && info.relationships.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">Relações com Outras Áreas</h2>
              </div>
              <div className="space-y-3">
                {info.relationships.map((rel, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="font-bold text-blue-600 text-sm">→</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{rel.area}</p>
                      <p className="text-slate-600 text-sm">{rel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 overflow-x-auto">
      <div className="min-w-max mx-auto pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Building2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">CONFRAPAG</h1>
          </div>
          <p className="text-lg text-slate-600">Organograma de Tecnologia</p>
          <p className="text-sm text-slate-500 mt-2">Clique em cada área para ver informações detalhadas</p>
        </div>

        {/* CTO Level */}
        <div className="flex justify-center mb-8">
          <div
            onClick={() => setCurrentView('cto')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105"
          >
            <p className="text-sm opacity-90 mb-1">CTO</p>
            <p className="text-xl font-bold">Lettiery</p>
          </div>
        </div>

        {/* Vertical Line from CTO */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-slate-400"></div>
        </div>

        {/* Horizontal Line connecting all departments */}
        <div className="flex justify-center mb-8">
          <div className="relative" style={{ width: '1500px' }}>
            <div className="absolute top-0 left-12 right-12 h-0.5 bg-slate-400"></div>
            <div className="flex justify-between pt-8 px-4 gap-2">
              {departments.map((dept) => (
                <div key={dept.id} className="relative flex flex-col items-center">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-0.5 h-8 bg-slate-400"></div>
                  <DepartmentCard dept={dept} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
