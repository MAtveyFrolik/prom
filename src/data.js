// PromZona Shared Business Data Model

export const companies = [
  {
    id: 'nordic',
    name: 'Nordic Metal Works',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
    description: 'Специализированный завод по прецизионной металлообработке. Парк из 25 станков ЧПУ, лазерная резка и порошковая покраска.',
    fullDescription: 'Nordic Metal Works — ведущий производитель точных металлических компонентов на Северо-Западе РФ. Мы располагаем собственным конструкторским бюро и осуществляем полный цикл производства деталей по чертежам заказчиков.',
    region: 'Санкт-Петербург, РФ',
    category: 'Металлообработка',
    type: 'Manufacturing',
    rating: 4.9,
    reviewsCount: 124,
    establishedYear: 2015,
    certifications: ['ISO 9001:2015', 'CE Marking', 'ISO 14001'],
    scale: 'Enterprise',
    tags: ['CNC Machining', 'Laser Cutting', 'Welding'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (812) 345-67-89',
    email: 'info@nordicmetal.ru',
    address: 'г. Санкт-Петербург, Промышленный проезд, д. 4',
    workHours: 'Пн-Пт: 09:00 - 18:00',
    verified: true
  },
  {
    id: 'techpro',
    name: 'TechPro Electronics',
    logo: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=120&auto=format&fit=crop&q=80',
    description: 'Производство печатных плат и контрактная сборка электроники. Сертификация ISO 9001. Мощности до 100к единиц в месяц.',
    fullDescription: 'TechPro Electronics предоставляет услуги комплексного контрактного производства электроники: от трассировки печатных плат и автоматического монтажа компонентов до финального тестирования и упаковки готовых изделий.',
    region: 'Казань, РФ',
    category: 'Электроника',
    type: 'Manufacturing',
    rating: 4.7,
    reviewsCount: 342,
    establishedYear: 2018,
    certifications: ['ISO 9001:2015'],
    scale: 'Medium',
    tags: ['SMT Assembly', 'PCB Design', 'Testing'],
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (843) 555-01-23',
    email: 'contact@techpro-el.ru',
    address: 'г. Казань, ул. Техническая, д. 22',
    workHours: 'Пн-Пт: 08:00 - 17:00',
    verified: true
  },
  {
    id: 'siberian',
    name: 'Siberian Timber Co.',
    logo: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=120&auto=format&fit=crop&q=80',
    description: 'Полный цикл деревообработки: от лесозаготовки до производства мебели и стройматериалов. Крупный опт.',
    fullDescription: 'Сибирская Лесозаготовительная Компания занимается экологически чистой заготовкой и глубокой переработкой сибирской лиственницы, ангарской сосны и кедра для нужд строительства и мебельных фабрик.',
    region: 'Красноярск, РФ',
    category: 'Деревообработка',
    type: 'Manufacturing',
    rating: 4.5,
    reviewsCount: 215,
    establishedYear: 2011,
    certifications: ['Eco-Cert'],
    scale: 'Enterprise',
    tags: ['Woodworking', 'Wholesale', 'Eco-Cert'],
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (391) 200-88-99',
    email: 'sales@sibtimber.ru',
    address: 'г. Красноярск, Шоссе Энтузиастов, д. 101',
    workHours: 'Пн-Пт: 08:00 - 18:00',
    verified: true
  },
  {
    id: 'uralchem',
    name: 'Ural Chemical Solutions',
    logo: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=120&auto=format&fit=crop&q=80',
    description: 'Синтез промышленной химии, полимеров и реагентов. Собственная R&D лаборатория и жесткий контроль качества.',
    fullDescription: 'Уральские Химические Решения осуществляют производство широкого спектра вспомогательной химии для буровых установок, гальванических цехов и очистных систем, разрабатывая составы под требования заказчика.',
    region: 'Екатеринбург, РФ',
    category: 'Химическая промышленность',
    type: 'Manufacturing',
    rating: 4.8,
    reviewsCount: 96,
    establishedYear: 2014,
    certifications: ['ISO 9001:2015', 'ISO 14001'],
    scale: 'Enterprise',
    tags: ['Polymers', 'Industrial', 'R&D'],
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (343) 222-11-00',
    email: 'info@uralchem.ru',
    address: 'г. Екатеринбург, ул. Строителей, д. 45',
    workHours: 'Пн-Пт: 09:00 - 18:00',
    verified: true
  },
  {
    id: 'stroytech',
    name: 'СтройТехМонтаж Инжиниринг',
    logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&auto=format&fit=crop&q=80',
    description: 'Специализируемся на возведении сложных промышленных объектов, логистических центров и заводов «под ключ». Собственный парк техники из 150 единиц.',
    fullDescription: 'СтройТехМонтаж Инжиниринг один из лидеров отечественного рынка генподрядных услуг для промышленного строительства. Мы строим металлургические, химические заводы и технологические хабы.',
    region: 'Москва, РФ',
    category: 'Промышленное строительство',
    type: 'Construction',
    rating: 4.9,
    reviewsCount: 78,
    establishedYear: 2008,
    certifications: ['СРО Лицензия', 'ISO 9001:2015'],
    scale: 'Enterprise',
    tags: ['Промышленное', 'СРО', 'Генподряд'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (495) 123-45-67',
    email: 'tender@stroytech-eng.ru',
    address: 'г. Москва, Набережная Академика Туполева, д. 15',
    workHours: 'Пн-Пт: 09:00 - 19:00',
    verified: true
  },
  {
    id: 'elitstroy',
    name: 'ЭлитСтрой Групп',
    logo: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=120&auto=format&fit=crop&q=80',
    description: 'Инженерные промышленные коммуникации, вентиляционные узлы, пусконаладка газовых систем и объектов теплоснабжения.',
    fullDescription: 'Компания ЭлитСтрой Групп проектирует, комплектует и осуществляет монтаж технологических трубопроводов, климатических агрегатов большой мощности и котельных установок.',
    region: 'Нижний Новгород, РФ',
    category: 'Промышленное строительство',
    type: 'Construction',
    rating: 4.6,
    reviewsCount: 62,
    establishedYear: 2012,
    certifications: ['СРО Лицензия'],
    scale: 'Medium',
    tags: ['Вентиляция', 'Пусконаладка', 'Котельные'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (831) 411-22-33',
    email: 'elstroy@nn-mail.ru',
    address: 'г. Нижний Новгород, Сормовское шоссе, д. 12А',
    workHours: 'Пн-Пт: 08:30 - 17:30',
    verified: true
  },
  {
    id: 'specsplav',
    name: 'СпецСтальСплав холдинг',
    logo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=120&auto=format&fit=crop&q=80',
    description: 'Литейное производство, художественное литье и отливка стальных заготовок любой сложности под давлением.',
    fullDescription: 'СпецСтальСплав специализируется на высокоточном литье металлов и литейном инжиниринге. Изготавливаем инструментальную оснастку и заготовки по газифицируемым моделям.',
    region: 'Новосибирск, РФ',
    category: 'Металлообработка',
    type: 'Manufacturing',
    rating: 4.8,
    reviewsCount: 112,
    establishedYear: 2010,
    certifications: ['ISO 9001:2015', 'CE Marking'],
    scale: 'Enterprise',
    tags: ['Casting', 'Steel', 'Molds'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    phone: '+7 (383) 909-88-77',
    email: 'cast@specspas.ru',
    address: 'г. Новосибирск, Сибирский тракт, д. 88',
    workHours: 'Пн-Пт: 08:00 - 18:00',
    verified: true
  }
];

export const services = [
  {
    id: 'cnc_m_1',
    authorId: 'nordic',
    title: 'Высокоточная токарно-фрезерная обработка деталей на 5-осевых станках ЧПУ',
    category: 'Металлообработка',
    price: '1,500',
    unit: 'час',
    rating: 4.9,
    location: 'Санкт-Петербург, РФ',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    portfolioImages: [
      'https://images.unsplash.com/photo-1581092162384-8987c1794ed9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Мы выполняем прецизионное изготовление валов, фланцев, корпусов и штуцеров по чертежам заказчика. Максимальный диаметр обработки — до 400 мм. Допуски до 0.005 мм. Работаем со сталью, титаном, латунью и алюминием.',
    reviewsCount: 34,
    specs: [
      { label: 'Класс точности', value: 'IT6 - IT7' },
      { label: 'Параметры шероховатости', value: 'Ra 0.8 - Ra 0.4' },
      { label: 'Оборудование', value: 'Mazak Integrex i-100 Bartran' },
      { label: 'Максимальный вес детали', value: '55 кг' },
      { label: 'Минимальная партия', value: '10 шт' }
    ]
  },
  {
    id: 'pcb_a_2',
    authorId: 'techpro',
    title: 'Автоматизированный SMT монтаж печатных плат любой степени плотности на чипах 0201',
    category: 'Электроника',
    price: '0.45',
    unit: 'точка пайки',
    rating: 4.7,
    location: 'Казань, РФ',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    portfolioImages: [],
    description: 'Професcиональная контрактная сборка модулей на автоматической линии ASM SIPLACE. Поддержка двухстороннего монтажа SMT, пайки в азотной среде, AOI (автоматической оптической инспекции) и тестирования.',
    reviewsCount: 52,
    specs: [
      { label: 'Минимальный размер чипа', value: '0201 (0603 метрический)' },
      { label: 'Скорость линии SMT', value: '45,000 комп/час' },
      { label: 'Пайка волной', value: 'Есть' },
      { label: 'Контроль качества', value: 'АОИ + Рентген по требованию' }
    ]
  },
  {
    id: 'wood_w_3',
    authorId: 'siberian',
    title: 'Производство профилированного бруса камерной сушки из ангарской лиственницы',
    category: 'Деревообработка',
    price: '24,500',
    unit: 'куб. м',
    rating: 4.5,
    location: 'Красноярск, РФ',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80',
    portfolioImages: [],
    description: 'Изготовление профилированных деталей стен деревянных домов с нарезкой чаш по проекту заказчика. Собственные сушильные комплексы Katres. Влажность на выходе — 12-14%.',
    reviewsCount: 18,
    specs: [
      { label: 'Порода дерева', value: 'Ангарская лиственница / Сосна' },
      { label: 'Влажность древесины', value: '12% ± 2%' },
      { label: 'Стандартный профиль', value: 'Гребенка / Финский (двухшиповой)' },
      { label: 'Геометрия среза', value: 'Предельные отклонения до 0.5 мм' }
    ]
  },
  {
    id: 'chem_c_1',
    authorId: 'uralchem',
    title: 'Разработка и оптовый синтез полимерных водорастворимых ингибиторов коррозии',
    category: 'Химическая промышленность',
    price: '185',
    unit: 'кг',
    rating: 4.8,
    location: 'Екатеринбург, РФ',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&auto=format&fit=crop&q=80',
    portfolioImages: [],
    description: 'Производство профессиональных антикоррозийных добавок для консервации трубопроводов, резервуаров и деталей машин. Сертифицированные составы, стабильная структура при температуре до +180 градусов.',
    reviewsCount: 12,
    specs: [
      { label: 'Агрегатное состояние', value: 'Жидкость / Тонкий концентрат' },
      { label: 'Класс опасности вещества', value: '3 класс (умеренно опасные)' },
      { label: 'Эффективность защиты', value: '99.2% на сталях марки Ст3' }
    ]
  }
];

export const reviews = [
  {
    id: 'rev_1',
    name: 'Алексей Егоров (СнабТехОпт)',
    rating: 5,
    comment: 'Заказывали у Nordic Metal прецизионную партию валов. Изготовили с опережением графика на 3 дня и в строгом допуске! Рекомендуем как надежнейшего партнера.',
    date: '12.05.2026'
  },
  {
    id: 'rev_2',
    name: 'Игорь Снегирев (НПП Радар)',
    rating: 5,
    comment: 'Обслуживанием автоматической сборки SMT довольны на все сто. Процент брака на 5000 плат составил всего 0.05%, что является выдающимся показателем!',
    date: '10.04.2026'
  }
];

export const staticCategories = [
  { name: 'Металлообработка', count: '1,420 заводов', desc: 'ЧПУ сверление, токарные операции, гибка, штамповка и отливка сплавов' },
  { name: 'Промышленное строительство', count: '540 подрядчиков', desc: 'Монтаж металлических ангаров, монолитные фундаменты, инженерная инфраструктура' },
  { name: 'Электроника', count: '310 линий', desc: 'Автоматический SMT/DIP монтаж плат, трассировка СВЧ, тестирование датчиков' },
  { name: 'Деревообработка', count: '780 производств', desc: 'Заготовка бруса, мебельные щиты, распил пиломатериалов, обработка антипиренами' },
  { name: 'Химическая промышленность', count: '290 заводов', desc: 'Реагенты для бурения, полимерные пленки, смазки, лакокрасочное производство' }
];

export const dialogs = [
  {
    id: 'nordic',
    name: 'Nordic Metal Works',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
    lastMessageText: 'Здравствуйте! Да, мы готовы обсудить технические требования к партии. Чертеж уже передали инженеру.',
    lastMessageTime: '14:24',
    unread: true,
    type: 'orders',
    messages: [
      { id: '1', text: 'Добрый день, Nordic! Ваша компания выполняет заказ фрезеровки по стандарту ГОСТ 25347-82?', timestamp: '14:15', sender: 'me' },
      { id: '2', text: 'Здравствуйте! Да, мы готовы обсудить технические требования к партии. Чертеж уже передали инженеру.', timestamp: '14:24', sender: 'them' }
    ]
  },
  {
    id: 'techpro',
    name: 'TechPro Electronics',
    avatar: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=120&auto=format&fit=crop&q=80',
    lastMessageText: 'Коммерческое предложение отправлено на вашу электронную почту.',
    lastMessageTime: 'Вчера',
    unread: false,
    type: 'orders',
    messages: [
      { id: '1', text: 'Приветствуем! Нужен монтаж 500 плат контроллеров до конца июня.', timestamp: '10:00', sender: 'me' },
      { id: '2', text: 'Коммерческое предложение отправлено на вашу электронную почту.', timestamp: '12:30', sender: 'them' }
    ]
  }
];
