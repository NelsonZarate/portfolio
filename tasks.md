Task 2: Configuração do Shadcn/ui e Temas (Dark/Light Mode)

Contexto: Preciso de uma biblioteca de componentes base e suporte a modo escuro.

Prompt para o Kiro: "Instale e configure o shadcn/ui no projeto Next.js recém-criado. Em seguida, adicione o suporte a Dark Mode utilizando next-themes. Crie um componente de botão simples para alternar entre o modo claro e escuro e adicione-o na raiz da página para teste."

Fase 2: Componentes Globais e Layout
Task 3: Criação do Layout Principal (Navbar e Footer)

Contexto: O site precisa de uma navegação responsiva e um rodapé com links sociais.

Prompt para o Kiro: "Crie um componente de Navbar e um de Footer dentro de src/components. A Navbar deve ser fixa no topo, ter efeito de desfoque de fundo (backdrop-blur) no scroll, links para as seções (Home, Sobre, Projetos, Contato) e o botão de alternar tema. No mobile, a Navbar deve virar um menu hambúrguer interativo. O Footer deve conter links para o GitHub, LinkedIn e e-mail."

Fase 3: Seções do Portfólio (Conteúdo)
Task 4: Seção Hero (Introdução) com Animações

Contexto: A primeira dobra do site que impacta o visitante.

Prompt para o Kiro: "Instale a biblioteca framer-motion. Crie a seção Hero na página principal. Ela deve conter: um título forte (ex: 'Olá, eu sou [Seu Nome]'), um subtítulo dinâmico (ex: 'Desenvolvedor Full Stack especializado em React & Next.js'), e dois botões de chamada para ação ('Ver Projetos' e 'Contato'). Use o Framer Motion para fazer os textos aparecerem com um efeito suave de fade-in e subida (fade-in-up) assim que a página carregar."

Task 5: Seção de Projetos (Grid Dinâmico)

Contexto: Exibir os cards dos meus projetos de forma elegante.

Prompt para o Kiro: "Crie uma seção de Projetos. Primeiro, defina um array de objetos em TypeScript para simular os dados dos projetos (título, descrição, tecnologias usadas, link do GitHub, link do deploy e imagem de capa). Em seguida, renderize esses projetos em um grid responsivo (1 coluna no mobile, 2 ou 3 no desktop) usando cards estilizados do Shadcn/ui. Adicione um efeito de hover nos cards."

Task 6: Formulário de Contato Interativo

Contexto: Um local para recrutadores e clientes enviarem mensagens.

Prompt para o Kiro: "Crie uma seção de Contato com um formulário contendo os campos: Nome, E-mail e Mensagem. Utilize os componentes de input e textarea do Shadcn/ui. O formulário deve ter validação básica de campos e simular um estado de 'Enviando...' e 'Enviado com sucesso' ao clicar no botão de submissão."