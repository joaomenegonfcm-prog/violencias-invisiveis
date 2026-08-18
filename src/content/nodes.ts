import type { NodeContent } from '../types/game.types'

export const NODES: NodeContent[] = [
  {
    id: 'psicologica',
    kind: 'dialogue',
    title: 'A Lanterna do Zelo',
    mapLabel: 'Violência Psicológica',
    position: { x: 16, y: 12 },
    intro:
      'Marina está terminando de jantar com as amigas quando o celular vibra pela quarta vez.',
    beats: [
      {
        speaker: 'Rafael',
        text: 'Cadê você? Já faz 1h que devia ter respondido.',
      },
      {
        speaker: 'Rafael',
        text: 'Não fica bravo comigo, só pergunto porque me importo. Você sabe que é por amor, né?',
        options: [
          {
            id: 'responde-na-hora',
            label: '"Desculpa, tava sem sinal": responder na hora, pra evitar confusão',
            response:
              'Marina sente o estômago apertar e digita a desculpa, mesmo sabendo que não fez nada de errado.',
          },
          {
            id: 'questiona',
            label: '"Eu tava só jantando com as amigas, não preciso avisar toda hora"',
            response:
              'Rafael demora pra responder. Quando responde, é só um "ok", e Marina passa o resto da noite se perguntando se ele ficou chateado.',
          },
        ],
      },
    ],
    reveal: {
      term: 'Violência Psicológica',
      explanation:
        'Ciúme excessivo, cobrança de satisfação constante e culpa disfarçada de cuidado são formas de controle emocional. O termo técnico é gaslighting quando isso é usado pra fazer a pessoa duvidar da própria percepção: "eu só faço isso porque te amo" é uma frase clássica de manipulação, não de zelo genuíno.',
      signs: [
        'Cobrar satisfações sobre horários e companhias',
        'Fazer a pessoa se sentir culpada por ter uma vida social própria',
        'Justificar controle como prova de amor ou preocupação',
        'A pessoa começa a se policiar antes mesmo de ser questionada',
      ],
    },
  },
  {
    id: 'patrimonial',
    kind: 'dialogue',
    title: 'A Lanterna do Cofre',
    mapLabel: 'Violência Patrimonial',
    position: { x: 74, y: 24 },
    intro:
      'Camila quer comprar um curso online de R$120. O cartão da casa está no nome de Diego.',
    beats: [
      {
        speaker: 'Camila',
        text: 'Vou fazer aquele curso que te falei, pode passar o cartão pra mim?',
      },
      {
        speaker: 'Diego',
        text: 'De novo gastando com isso? Deixa eu ver se sobra depois das contas. Melhor você me mandar o link antes.',
        options: [
          {
            id: 'aceita-esperar',
            label: '"Tudo bem, te mando o link": aceitar esperar aprovação',
            response:
              'Camila manda o link. Três dias depois, ainda não teve resposta. O curso já não tem mais vaga.',
          },
          {
            id: 'insiste',
            label: '"Eu trabalho também, posso decidir isso sozinha"',
            response:
              'Diego revira os olhos. "Não é sobre isso, é sobre organização financeira." A conversa esfria por ali.',
          },
        ],
      },
    ],
    reveal: {
      term: 'Violência Patrimonial',
      explanation:
        'Controlar o acesso da outra pessoa ao próprio dinheiro, exigir "aprovação" para gastos básicos ou impedir que ela trabalhe e tenha independência financeira é uma forma de violência prevista até na Lei Maria da Penha. Não precisa envolver agressão física para ser uma forma de controle.',
      signs: [
        'Exigir prestação de contas de gastos pessoais pequenos',
        'Controlar cartões, salário ou acesso a contas em nome do outro',
        'Dificultar ou impedir que a pessoa trabalhe ou estude',
        'Usar dependência financeira como forma de manter a pessoa por perto',
      ],
    },
  },
  {
    id: 'digital',
    kind: 'phone',
    title: 'A Lanterna do Bolso',
    mapLabel: 'Violência Digital',
    position: { x: 28, y: 42 },
    intro:
      'O celular de Beatriz mostra uma notificação: seu namorado quer ativar o compartilhamento de localização em tempo real.',
    beats: [
      {
        speaker: 'Notificação',
        text: '"Pedro quer visualizar sua localização o tempo todo. Aceitar?"',
      },
      {
        speaker: 'Pedro',
        text: 'É só pra eu saber que você chegou bem em algum lugar, não é nada demais. Se você não tem nada a esconder, não tem problema, né?',
        options: [
          {
            id: 'compartilha',
            label: 'Aceitar compartilhar localização em tempo real',
            response:
              'A partir dali, toda saída de Beatriz vira assunto: "por que você tá aí?", "por que demorou nesse trajeto?"',
          },
          {
            id: 'nao-compartilha',
            label: '"Prefiro não deixar ligado o tempo todo, te aviso quando chegar"',
            response:
              'Pedro insiste mais duas vezes ao longo da semana, sempre emendando com "é estranho você não querer".',
          },
        ],
      },
    ],
    reveal: {
      term: 'Violência Digital (Stalking)',
      explanation:
        'Pedir senha de redes sociais, monitorar localização em tempo real ou vigiar conversas são formas de controle que usam a tecnologia como ferramenta. A frase "se não tem nada a esconder" é uma forma comum de fazer a vigilância parecer razoável, mas privacidade não é a mesma coisa que estar escondendo algo.',
      signs: [
        'Pedir ou exigir senhas de redes sociais e aplicativos',
        'Monitorar localização, mensagens ou ligações sem consentimento real',
        'Criar perfis falsos para checar o comportamento do outro',
        'Tratar recusa de vigilância como prova de culpa',
      ],
    },
  },
  {
    id: 'obstetrica',
    kind: 'narrative',
    title: 'A Lanterna da Sala Branca',
    mapLabel: 'Violência Obstétrica',
    position: { x: 68, y: 56 },
    intro:
      'Renata está em trabalho de parto há seis horas. Ela pede para mudar de posição: a dor na lombar está insuportável.',
    beats: [
      {
        speaker: 'Narrador',
        text:
          'A equipe responde: "Deita de novo, assim é mais fácil pra gente acompanhar." Renata volta a deitar, mesmo sentindo mais dor naquela posição.',
      },
      {
        speaker: 'Narrador',
        text:
          'Mais tarde, um procedimento é feito sem que ninguém explique o motivo, nem pergunte se ela concorda. "É protocolo", dizem, quando ela pergunta depois.',
      },
      {
        speaker: 'Narrador',
        text:
          'Renata sai da maternidade com o filho saudável nos braços, e uma sensação que vai levar meses pra conseguir nomear.',
      },
    ],
    reveal: {
      term: 'Violência Obstétrica',
      explanation:
        'Toda pessoa em trabalho de parto tem direito a receber explicações claras e a consentir ou recusar procedimentos. Ignorar a dor relatada, impor posições por conveniência da equipe (e não da paciente) ou realizar intervenções sem explicação e sem consentimento são formas de violência obstétrica, mesmo quando o resultado médico é "positivo".',
      signs: [
        'Procedimentos realizados sem explicação ou consentimento',
        'Dor relatada sendo minimizada ou ignorada',
        'Decisões sobre o corpo da paciente tomadas sem consultá-la',
        'Comentários que julgam as escolhas ou reações da paciente',
      ],
    },
  },
  {
    id: 'institucional',
    kind: 'dialogue',
    title: 'A Lanterna do Balcão',
    mapLabel: 'Violência Institucional',
    position: { x: 22, y: 74 },
    intro:
      'Juliana chega à delegacia para registrar um boletim de ocorrência sobre ameaças que vem recebendo do ex-companheiro.',
    beats: [
      {
        speaker: 'Atendente',
        text: 'Vocês já brigaram e voltaram antes, né? Às vezes é só uma fase, tem certeza que quer registrar isso?',
      },
      {
        speaker: 'Juliana',
        text: 'Tenho certeza. Ele disse que ia aparecer na minha casa.',
        options: [
          {
            id: 'insiste-registro',
            label: 'Insistir e pedir para falar com outro atendente',
            response:
              'Depois de repetir a mesma história duas vezes, o boletim é finalmente registrado, mas Juliana sai da delegacia se sentindo mais exausta do que quando chegou.',
          },
          {
            id: 'desiste',
            label: 'Desistir e ir embora, sem registrar',
            response:
              'Juliana volta pra casa sem o boletim. A ameaça continua sem nenhum registro oficial.',
          },
        ],
      },
    ],
    reveal: {
      term: 'Violência Institucional',
      explanation:
        'Quando instituições que deveriam proteger — delegacias, hospitais, órgãos públicos — minimizam, duvidam ou dificultam o acesso da vítima a direitos básicos, isso também é uma forma de violência. Ela não deixa marcas visíveis, mas afasta as pessoas de buscar ajuda no futuro.',
      signs: [
        'Minimizar o relato ("é só uma fase", "vocês vão se resolver")',
        'Burocracia excessiva ou desencorajamento sutil ao registro',
        'Colocar a responsabilidade da situação na vítima',
        'Falta de encaminhamento a redes de apoio (psicológico, jurídico)',
      ],
    },
  },
  {
    id: 'sintese',
    kind: 'summary',
    title: 'A Fogueira do Fim da Trilha',
    mapLabel: 'Rede de Apoio',
    position: { x: 62, y: 90 },
    intro: 'Você chegou ao fim da trilha.',
    beats: [],
    reveal: {
      term: 'O Ecossistema das Violências Invisíveis',
      explanation:
        'Psicológica, patrimonial, digital, obstétrica e institucional: nenhuma dessas formas deixa hematoma, mas todas deixam marca. Elas raramente aparecem sozinhas: normalmente se entrelaçam e se reforçam. Reconhecer os sinais é o primeiro passo pra romper o ciclo, tanto pra quem vive quanto pra quem observa de fora.',
      signs: [
        'Central de Atendimento à Mulher: Ligue 180',
        'Emergência: 190 (Polícia Militar)',
        'Delegacia da Mulher (DEAM) mais próxima',
        'Mapa do Acolhimento: encaminhamento a psicólogas e advogadas voluntárias',
      ],
    },
  },
]

export const getNode = (id: string) => NODES.find((n) => n.id === id)
