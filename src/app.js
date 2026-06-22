// PromZona Vanilla B2B Client Application Framework
import { companies, services, reviews, staticCategories, dialogs } from './data.js';

// Application Global State Engine
const state = {
  currentPage: 'about', // 'about' | 'catalog' | 'production' | 'services' | 'construction' | 'companies' | 'service-detail' | 'company-detail' | 'dashboard' | 'messages' | 'create-ad'
  selectedCompanyId: null,
  selectedServiceId: null,
  searchQueryGlobal: '',
  activeDialogId: 'nordic', // Active chat contact ID
  localAds: [...services], // Live array of ads/services
  chatDialogs: [...dialogs], // Live dialogs
  userQuotes: [] // Submitted customized commercial proposal queries
};

// Main state mutations and helper routers
function navigateTo(page, params = {}) {
  state.currentPage = page;
  if (params.companyId) state.selectedCompanyId = params.companyId;
  if (params.serviceId) state.selectedServiceId = params.serviceId;
  if (params.search) state.searchQueryGlobal = params.search;
  
  renderApp();
  window.scrollTo(0, 0);
}

// Global scope attachment for HTML button callbacks
window.go = navigateTo;

// Core layout rendering router
function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div class="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-500 selection:text-slate-950">
      
      <!-- Premium B2B Header -->
      <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            
            <!-- Logo area -->
            <div class="flex items-center space-x-3 cursor-pointer" onclick="go('about')">
              <div class="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
                <i data-lucide="compass" class="h-5.5 w-5.5 font-black"></i>
              </div>
              <div>
                <span class="block text-lg font-black text-white tracking-tight leading-none">PromZona <span class="text-amber-500 font-medium text-xs font-mono uppercase tracking-widest pl-1">B2B</span></span>
                <span class="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Единый реестр промышленности</span>
              </div>
            </div>

            <!-- Desktop Navigation links -->
            <nav class="hidden md:flex items-center space-x-1">
              ${[
                { label: 'О проекте', page: 'about' },
                { label: 'Каталог', page: 'catalog' },
                { label: 'Производители', page: 'production' },
                { label: 'Услуги', page: 'services' },
                { label: 'Строительство', page: 'construction' },
                { label: 'Компании', page: 'companies' }
              ].map(item => {
                const isActive = state.currentPage === item.page || 
                  (item.page === 'catalog' && state.currentPage === 'service-detail') ||
                  (item.page === 'companies' && state.currentPage === 'company-detail') ||
                  (item.page === 'production' && state.currentPage === 'company-detail' && companies.find(c => c.id === state.selectedCompanyId)?.type === 'Manufacturing');
                
                return `
                  <button 
                    onclick="go('${item.page}')"
                    class="px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                      isActive 
                        ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/10' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }"
                  >
                    ${item.label}
                  </button>
                `;
              }).join('')}
            </nav>

            <!-- Dashboard workspace buttons -->
            <div class="flex items-center space-x-2">
              <button 
                onclick="go('dashboard')"
                class="px-4 py-2 border border-slate-700 hover:border-amber-400 text-xs font-bold text-slate-300 hover:text-amber-400 rounded-xl transition-all flex items-center space-x-1.5 uppercase tracking-wider"
              >
                <i data-lucide="user" class="h-3.5 w-3.5"></i>
                <span class="hidden sm:inline">Личный кабинет</span>
              </button>

              <button 
                onclick="go('messages')"
                class="relative p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl transition-all"
                title="Диалоги"
              >
                <i data-lucide="message-square" class="h-4.5 w-4.5"></i>
                <!-- Dot unread tag -->
                <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              </button>
            </div>

          </div>
        </div>
      </header>

      <!-- Main Central Context view -->
      <main class="flex-grow">
        ${renderCoreBody()}
      </main>

      <!-- Humble B2B Footer -->
      <footer class="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-black">
                <i data-lucide="compass" class="h-4 w-4"></i>
              </div>
              <span class="font-extrabold text-sm text-white uppercase tracking-wider">PromZona B2B</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Главная федеральная B2B-система верификации и контрактации промышленных, строительных и технологических предприятий.
            </p>
          </div>

          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-slate-200 mb-4">Навигация</h4>
            <div class="flex flex-col space-y-2 text-xs font-semibold">
              <button onclick="go('about')" class="hover:text-amber-500 text-left transition-colors">О проекте</button>
              <button onclick="go('catalog')" class="hover:text-amber-500 text-left transition-colors">Каталог заказов</button>
              <button onclick="go('production')" class="hover:text-amber-500 text-left transition-colors">Производители</button>
            </div>
          </div>

          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-slate-200 mb-4">Кабинет</h4>
            <div class="flex flex-col space-y-2 text-xs font-semibold">
              <button onclick="go('dashboard')" class="hover:text-amber-500 text-left transition-colors">Мои объявления</button>
              <button onclick="go('messages')" class="hover:text-amber-500 text-left transition-colors">Сообщения</button>
              <button onclick="go('create-ad')" class="hover:text-amber-500 text-left transition-colors">Разместить цех</button>
            </div>
          </div>

          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-slate-200 mb-4">Статус реестра</h4>
            <div class="space-y-2.5 text-xs font-mono">
              <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-500">Предприятий:</span>
                <span class="text-emerald-400 font-bold">4,120</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Проверка ОТК:</span>
                <span class="text-amber-400 font-bold">A++ Активна</span>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 PromZona LLC. Проект разработан в соответствии с ГОСТ 56239-2019. Все права защищены.
        </div>
      </footer>

      <!-- Floating ZIP Exporter Panel for Easy Downloading -->
      <div class="fixed bottom-6 right-6 z-50 max-w-xs bg-slate-900 border border-amber-500/30 text-white p-5 rounded-2xl shadow-2xl flex flex-col space-y-3 transition-all duration-300 transform hover:scale-[1.02]">
        <div class="flex items-start justify-between space-x-3">
          <div class="flex items-center space-x-2">
            <span class="p-1 px-1.5 bg-amber-500 text-slate-950 font-black rounded-lg text-[9px] uppercase">Экспорт B2B</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-white transition-colors text-xs font-black">✕</button>
        </div>
        <div class="space-y-1">
          <h4 class="text-xs font-black tracking-tight text-white flex items-center">
            <i data-lucide="folder-archive" class="h-4 w-4 text-amber-400 mr-2"></i>
            Ваш проект готов к запуску!
          </h4>
          <p class="text-[10px] text-slate-400 leading-relaxed font-semibold">
            Мы перенесли его на классическую связку <b>HTML5, Vanilla JS и Tailwind CSS</b>. Скачайте весь код готовым архивом!
          </p>
        </div>
        <button 
          id="zip-download-btn"
          onclick="window.downloadProjectAsZip()"
          class="w-full py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-2xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
        >
          <i data-lucide="download" class="h-3.5 w-3.5"></i>
          <span>Скачать ZIP-архив</span>
        </button>
      </div>

    </div>
  `;

  // Hydrate custom interactions for active views
  lucide.createIcons();
  bindPageEvents();
}

// Router switcher returning custom template strings for each viewpoint
function renderCoreBody() {
  switch (state.currentPage) {
    case 'about': return renderAboutView();
    case 'catalog': return renderCatalogView();
    case 'production': return renderProductionView(); // Manufacturers list
    case 'services': return renderServicesView();
    case 'construction': return renderConstructionView();
    case 'companies': return renderCompaniesRegistryView();
    case 'service-detail': return renderServiceDetailView();
    case 'company-detail': return renderCompanyDetailView();
    case 'dashboard': return renderDashboardView();
    case 'messages': return renderMessagesView();
    case 'create-ad': return renderCreateAdFormView();
    default: return renderAboutView();
  }
}

// ================= PAGE TEMPLATES AND VIEWS =================

// 1. LANDING/ABOUT VIEW
function renderAboutView() {
  return `
    <!-- Top Hero Header -->
    <section class="bg-slate-900 text-white py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-orange-500/10 opacity-40"></div>
      <div class="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-6">
        <span class="px-3.5 py-1 bg-amber-500/15 border border-amber-500/25 rounded-md text-amber-400 text-xs font-black uppercase tracking-widest inline-block">
          Индустриальная безопасность • ГОСТ координация
        </span>
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tighter">
          Проверенные заводы и подрядчики всей России
        </h1>
        <p class="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
          Организуйте бесперебойную B2B-цепь поставок: аренда промышленных мощностей, субподрядная металлообработка, строительство цехов и контрактная сборка.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button onclick="go('catalog')" class="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center space-x-2">
            <span>Открыть Каталог</span>
            <i data-lucide="arrow-right" class="h-4 w-4"></i>
          </button>
          <button onclick="go('production')" class="px-6 py-3.5 bg-slate-800 hover:bg-slate-750 font-extrabold text-white text-xs uppercase tracking-widest rounded-xl transition-all border border-slate-700">
            Реестр Производителей
          </button>
        </div>
      </div>
    </section>

    <!-- Stats grid -->
    <section class="-mt-8 max-w-7xl mx-auto px-4 relative z-20">
      <div class="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl">
        <div class="space-y-1">
          <span class="block text-3xl font-black text-slate-900 font-mono">1,400+</span>
          <span class="block text-2xs uppercase font-extrabold text-gray-400 tracking-wider">Заводов ЧПУ</span>
        </div>
        <div class="space-y-1 border-l border-gray-100 pl-6 animate-pulse">
          <span class="block text-3xl font-black text-amber-600 font-mono">312</span>
          <span class="block text-2xs uppercase font-extrabold text-gray-400 tracking-wider">Верифицировано СРО</span>
        </div>
        <div class="space-y-1 border-l border-gray-100 pl-6">
          <span class="block text-3xl font-black text-slate-900 font-mono">24/7</span>
          <span class="block text-2xs uppercase font-extrabold text-gray-400 tracking-wider">Арбитраж сделок</span>
        </div>
        <div class="space-y-1 border-l border-gray-100 pl-6">
          <span class="block text-3xl font-black text-slate-900 font-mono">15 млн ₽</span>
          <span class="block text-2xs uppercase font-extrabold text-gray-400 tracking-wider">Средний контракт</span>
        </div>
      </div>
    </section>

    <!-- Detailed description of capabilities -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
         <span class="text-3xs text-amber-600 uppercase font-extrabold tracking-widest">Промышленная Безопасность</span>
         <h2 class="text-3xl font-black text-slate-900 tracking-tight leading-none">Устраняем посредников при сложных тендерах</h2>
         <p class="text-sm text-gray-650 leading-relaxed font-semibold">
           Платформа PromZona объединяет непосредственных держателей оборудования. Больше никаких субподрядных наценок от пустых офисов: вы общаетесь в зашифрованных диалогах напрямую с главными технологами заводов.
         </p>
         <div class="space-y-3">
           <div class="flex items-start space-x-3">
             <div class="h-6 w-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
               <i data-lucide="check-circle-2" class="h-4 w-4"></i>
             </div>
             <div>
               <h4 class="font-extrabold text-xs text-slate-900">Государственные нормативы ТУ и ГОСТ</h4>
               <p class="text-[11px] text-gray-400 font-semibold leading-relaxed">Все исполнители загружают ИНН, устав СРО и отчетность ОТК на верификационный узел.</p>
             </div>
           </div>
           <div class="flex items-start space-x-3">
             <div class="h-6 w-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
               <i data-lucide="check-circle-2" class="h-4 w-4"></i>
             </div>
             <div>
               <h4 class="font-extrabold text-xs text-slate-900">Поэтапное финансовое сопровождение аккредитивами</h4>
               <p class="text-[11px] text-gray-400 font-semibold leading-relaxed">Деньги подрядчику перечисляются исключительно после успешной приемки деталей вашей лабораторией качества.</p>
             </div>
           </div>
         </div>
      </div>
      
      <!-- Graphic presentation card -->
      <div class="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-md space-y-6 relative">
        <div class="absolute right-6 top-6 h-12 w-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold font-mono text-sm shadow">
          A++
        </div>
        <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80" alt="Цех ЧПУ станков" class="rounded-2xl h-64 w-full object-cover border border-gray-150" />
        <div class="space-y-1.5">
          <span class="block text-rxs text-amber-600 font-black tracking-widest uppercase">Ситуационный центр ОПК</span>
          <h3 class="font-black text-sm text-slate-900 leading-snug">Оперативный контроль загрузки свободных мощностей</h3>
          <p class="text-2xs text-gray-500 leading-relaxed font-semibold">Все цехи регулярно обновляют интерактивный статус занятости своего оборудования, чтобы вам не пришлось часами ждать ответа.</p>
        </div>
      </div>
    </section>
  `;
}

// 2. BENTO CATALOG PAGE
function renderCatalogView() {
  return `
    <section class="bg-slate-900 text-white py-14 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-30"></div>
      <div class="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-4">
        <h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-none text-white">Индустриальный каталог услуг</h1>
        <p class="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-semibold">
          Быстрый поиск готовых предложений, свободных мощностей цехов и строительных подрядов
        </p>

        <!-- Search Form Component -->
        <div class="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto text-slate-900 mt-6">
          <div class="flex-1 flex items-center space-x-2 px-3">
            <i data-lucide="search" class="h-4.5 w-4.5 text-gray-400 shrink-0"></i>
            <input 
              type="text" 
              id="catalog-search-input"
              value="${state.searchQueryGlobal}"
              placeholder="Какая деталь или услуга нужна? (Напр. ЧПУ, Лазерная)..." 
              class="w-full bg-transparent focus:outline-none text-xs font-bold py-2"
            />
          </div>
          <button 
            onclick="triggerCatalogSearch()"
            class="bg-amber-500 hover:bg-amber-600 font-extrabold text-xs uppercase tracking-wider text-slate-950 px-6 py-3 rounded-xl transition-all"
          >
            Найти
          </button>
        </div>
      </div>
    </section>

    <!-- Categories list grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div>
        <h2 class="text-xl font-black text-slate-900 tracking-tight uppercase">Отраслевые группы</h2>
        <p class="text-xs text-gray-400 mt-1 font-semibold">Выберите группу для перехода к подробному поиску подрядчиков</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${staticCategories.map(cat => `
          <div 
            onclick="triggerCategoryFilter('${cat.name}')"
            class="bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-amber-500/80 cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <i data-lucide="building-2" class="h-5 w-5"></i>
              </div>
              <div class="space-y-1">
                <h3 class="font-extrabold text-sm text-slate-900 tracking-tight">${cat.name}</h3>
                <p class="text-3xs text-gray-400 font-semibold leading-relaxed">${cat.desc}</p>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 mt-6 border-t border-gray-50">
              <span class="text-[10px] uppercase font-mono font-black text-amber-600">${cat.count}</span>
              <div class="h-7 w-7 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center">
                <i data-lucide="arrow-right" class="h-3.5 w-3.5"></i>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Feature services grid -->
      <div class="pt-8 space-y-6">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-xl font-black text-slate-900 tracking-tight uppercase">Рекомендованные предложения</h2>
            <p class="text-xs text-gray-400 mt-1 font-semibold">Размещено фабриками с наивысшим рейтингом качества ОТК</p>
          </div>
          <button onclick="go('services')" class="text-xs font-bold text-amber-600 hover:text-amber-700">Смотреть все</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${(() => {
            const listToDraw = state.searchQueryGlobal 
              ? state.localAds.filter(s => s.title.toLowerCase().includes(state.searchQueryGlobal.toLowerCase()) || s.category.toLowerCase().includes(state.searchQueryGlobal.toLowerCase()))
              : state.localAds;

            if (listToDraw.length === 0) {
              return `
                <div class="col-span-full py-12 text-center text-gray-400 font-semibold">
                  По вашему запросу объявлений не обнаружено. Попробуйте ввести другое ключевое слово.
                </div>
              `;
            }

            return listToDraw.slice(0, 4).map(service => `
              <div 
                onclick="navigateToService('${service.id}')"
                class="bg-white rounded-2xl border border-gray-200/80 hover:border-amber-500/50 shadow-2xs hover:shadow-md cursor-pointer overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div>
                  <div class="relative h-44 w-full bg-slate-100">
                    <img referrerPolicy="no-referrer" src="${service.image}" alt="${service.title}" class="h-full w-full object-cover transition-transform group-hover:scale-102 duration-300" />
                    <span class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/80 rounded text-[10px] text-white uppercase font-bold tracking-wider">${service.category}</span>
                  </div>
                  <div class="p-4 space-y-2">
                    <h3 class="font-extrabold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">${service.title}</h3>
                    <div class="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase">
                      <span class="flex items-center text-amber-600">
                        <i data-lucide="star" class="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5 shrink-0"></i>
                        ${service.rating}
                      </span>
                      <span>•</span>
                      <span>${service.location}</span>
                    </div>
                  </div>
                </div>
                <div class="p-4 pt-2 mt-4 border-t border-gray-50 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <span class="text-[9px] text-gray-400 font-extrabold uppercase block">Стоимость от:</span>
                    <span class="font-black text-xs text-slate-950">${service.price} ₽ / ${service.unit}</span>
                  </div>
                  <div class="h-8 w-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <i data-lucide="arrow-right" class="h-4 w-4"></i>
                  </div>
                </div>
              </div>
            `).join('');
          })()}
        </div>
      </div>
    </section>
  `;
}

// 3. MANUFACTURERS LIST (PRODUCTION) VIEW
function renderProductionView() {
  const matchingCompanies = companies.filter(c => c.type === 'Manufacturing');
  
  return `
    <section class="bg-slate-900 text-white py-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-30"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 space-y-2">
        <h1 class="text-2xl sm:text-3.5xl font-black text-white tracking-tight uppercase">Промышленные Производители</h1>
        <p class="text-xs text-slate-300 font-semibold max-w-xl">
          Автоматизированные цеха, тяжелые заводы и холдинги, прошедшие выездную проверку PromZona ОТК.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar filters -->
        <div class="bg-white p-5 rounded-2xl border border-gray-200 space-y-6 h-fit">
          <div class="flex justify-between items-center pb-3 border-b border-gray-100">
            <span class="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center">
              <i data-lucide="sliders-horizontal" class="h-4 w-4 mr-1.5 text-amber-500"></i>
              Фильтр заводов
            </span>
            <button onclick="resetFiltersAndReload('production')" class="text-3xs font-extrabold text-amber-600 uppercase tracking-widest hover:text-amber-700">Сбросить</button>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Масштаб цеха</label>
            <div class="space-y-2 text-xs font-semibold text-slate-700">
              <label class="flex items-center space-x-2.5 cursor-pointer">
                <input type="checkbox" checked class="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4" />
                <span>Enterprise (Крупный заводы)</span>
              </label>
              <label class="flex items-center space-x-2.5 cursor-pointer">
                <input type="checkbox" checked class="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4" />
                <span>Medium (Средние фабрики)</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Rendered grid in col-span-3 -->
        <div class="lg:col-span-3 space-y-6">
          <div class="flex items-center justify-between text-xs font-bold text-gray-500 bg-white p-4 rounded-xl border border-gray-150">
            <span>Всего холдингов: <span class="text-slate-900 font-extrabold">${matchingCompanies.length}</span></span>
            <span>Фильтрация: <span class="text-emerald-500">ОТК Верифицированны</span></span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${matchingCompanies.map(company => `
              <div class="bg-white rounded-2xl border border-gray-200/80 p-5 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center">
                    <span class="px-2 py-0.5 bg-amber-500/10 text-amber-750 rounded text-3xs font-black uppercase tracking-wider border border-amber-500/15">${company.scale}</span>
                    <span class="flex items-center text-3xs text-gray-400 font-bold uppercase">
                      <i data-lucide="map-pin" class="h-3 w-3 text-slate-400 mr-0.5 shrink-0"></i>
                      ${company.region}
                    </span>
                  </div>

                  <div class="flex items-center space-x-4 mt-4">
                    <div onclick="navigateToCompany('${company.id}')" class="h-12 w-12 rounded-xl bg-slate-50 border border-gray-150 p-1 flex items-center justify-center cursor-pointer">
                      <img src="${company.logo}" alt="${company.name}" class="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 onclick="navigateToCompany('${company.id}')" class="font-extrabold text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer flex items-center">
                        ${company.name}
                        <i data-lucide="shield-check" class="ml-1 h-4 w-4 text-emerald-500"></i>
                      </h3>
                      <span class="text-[9px] text-gray-400 font-extrabold tracking-widest uppercase">${company.category}</span>
                    </div>
                  </div>

                  <p class="text-[11px] text-gray-500 leading-relaxed font-semibold mt-4 line-clamp-2">${company.description}</p>
                </div>

                <div class="pt-4 mt-6 border-t border-gray-50 flex items-center justify-between">
                  <span class="text-3xs font-semibold text-gray-400 uppercase">Основано: ${company.establishedYear}г.</span>
                  
                  <div class="flex space-x-2">
                    <button onclick="startInstantChat('${company.id}', '${company.name}', '${company.logo}')" class="px-3 py-1.5 border border-gray-200 hover:border-slate-800 text-3xs font-black uppercase tracking-widest rounded-lg text-slate-700 hover:text-slate-900">Чат</button>
                    <button onclick="navigateToCompany('${company.id}')" class="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-3xs uppercase tracking-widest rounded-lg">Профиль</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}

// 4. DETAILED SERVICES CATALOG VIEW
function renderServicesView() {
  return `
    <section class="bg-slate-900 text-white py-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-30"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 space-y-1">
        <h1 class="text-2xl sm:text-3.5xl font-black text-white tracking-tight uppercase">Доступные Услуги и Заказы</h1>
        <p class="text-xs text-slate-300 font-semibold max-w-xl">
          Сравнивайте цены, заказывайте детали из стали, сплавов, пластиков и дерева напрямую у производства.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Filter rail -->
        <div class="lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 space-y-6 h-fit">
          <div class="flex justify-between items-center pb-3 border-b border-gray-100">
            <span class="font-extrabold text-xs text-slate-900 uppercase tracking-widest">Услуги Фильтр</span>
            <button onclick="resetFiltersAndReload('services')" class="text-3xs font-extrabold text-amber-600 uppercase tracking-widest">Сбросить</button>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Категория</label>
            <div class="flex flex-col space-y-1.5 text-xs text-slate-700">
              <button onclick="triggerCategoryFilter('')" class="text-left px-2 py-1 hover:bg-slate-50 font-semibold text-amber-600">Все услуги</button>
              <button onclick="triggerCategoryFilter('Металлообработка')" class="text-left px-2 py-1 hover:bg-slate-50 font-semibold">Металлообработка</button>
              <button onclick="triggerCategoryFilter('Электроника')" class="text-left px-2 py-1 hover:bg-slate-50 font-semibold">Электроника</button>
              <button onclick="triggerCategoryFilter('Деревообработка')" class="text-left px-2 py-1 hover:bg-slate-50 font-semibold">Деревообработка</button>
            </div>
          </div>
        </div>

        <!-- Main listings column -->
        <div class="lg:col-span-9 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${state.localAds.map(service => `
              <div 
                onclick="navigateToService('${service.id}')"
                class="bg-white rounded-2xl border border-gray-200 hover:border-amber-500/50 cursor-pointer overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div>
                  <div class="relative h-44 w-full bg-slate-100">
                    <img src="${service.image}" alt="${service.title}" class="h-full w-full object-cover" />
                    <span class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/80 rounded text-[9px] text-white uppercase font-bold tracking-wider">${service.category}</span>
                  </div>
                  <div class="p-4 space-y-2">
                    <h3 class="font-extrabold text-xs text-slate-950 leading-snug line-clamp-2">${service.title}</h3>
                    <span class="flex items-center text-[10px] text-gray-400 font-semibold">
                      <i data-lucide="map-pin" class="h-3 w-3 mr-0.5"></i>
                      ${service.location}
                    </span>
                  </div>
                </div>

                <div class="p-4 pt-2 mt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span class="text-[9px] text-gray-400 font-semibold block">Стоимость:</span>
                    <span class="font-extrabold text-xs text-slate-900">${service.price} ₽ / ${service.unit}</span>
                  </div>
                  <div class="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <i data-lucide="arrow-right" class="h-4 w-4"></i>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}

// 5. INDUSTRIAL CONSTRUCTION VIEW
function renderConstructionView() {
  const constructionCompanies = companies.filter(c => c.type === 'Construction');

  return `
    <section class="bg-slate-900 text-white py-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-30"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 space-y-1">
        <h1 class="text-2xl sm:text-3.5xl font-black text-white tracking-tight uppercase">Промышленное Строительство</h1>
        <p class="text-xs text-slate-300 font-semibold max-w-xl">
          Генподрядчики СРО лицензированные под возведение каркасных ангаров, металлургических цехов и складов.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${constructionCompanies.map(company => `
          <div class="bg-white rounded-2xl border border-gray-200/85 p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 bg-emerald-55 text-emerald-700 rounded text-3xs font-extrabold uppercase border border-emerald-100">Лицензия СРО</span>
                <span class="text-3xs text-gray-400 font-bold uppercase flex items-center">
                  <i data-lucide="map-pin" class="h-3 w-3 mr-0.5 text-slate-400"></i>
                  ${company.region}
                </span>
              </div>

              <div class="flex items-center space-x-3.5">
                <div class="h-11 w-11 rounded-lg border border-gray-150 p-1 flex items-center justify-center shrink-0">
                  <img src="${company.logo}" alt="${company.name}" class="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 onclick="navigateToCompany('${company.id}')" class="font-extrabold text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer">${company.name}</h3>
                  <span class="text-3xs text-gray-400 font-bold uppercase tracking-wider">${company.category}</span>
                </div>
              </div>

              <p class="text-[11px] text-gray-500 leading-relaxed font-semibold line-clamp-3">${company.description}</p>
            </div>

            <div class="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between">
              <div class="text-3xs text-gray-400 font-bold uppercase">Оценка ОТК: ${company.rating} // ${company.reviewsCount} отзывов</div>
              <button onclick="navigateToCompany('${company.id}')" class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-white rounded-lg text-3xs font-black uppercase tracking-widest transition-all">Профиль</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// 6. MASTER COMPANIES CYRILLIC SEARCH REGISTRY
function renderCompaniesRegistryView() {
  const letters = ['Все', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Э', 'Ю', 'Я', 'A-Z'];
  const activeChar = state.activeLetter || 'Все';

  const filtered = companies.filter(c => {
    if (activeChar === 'Все') return true;
    if (activeChar === 'A-Z') return /^[a-zA-Z]/i.test(c.name);
    return c.name.toUpperCase().startsWith(activeChar);
  });

  return `
    <section class="bg-slate-900 text-white py-12 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-30"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 space-y-1">
        <h1 class="text-2xl sm:text-3.5xl font-black text-white tracking-tight uppercase">Единый промышленный реестр</h1>
        <p class="text-xs text-slate-300 font-semibold max-w-xl">
          Официальный список проверенных юрлиц РФ, имеющих право выполнять заказы по ГОСТ и ОСТ стандартам.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Alphabet filter row -->
      <div class="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-2xs">
        <span class="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-3">Поиск по первой букве названия:</span>
        <div class="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-gray-100">
          ${letters.map(letItem => `
            <button 
              onclick="triggerLetterFilter('${letItem}')"
              class="h-7 min-w-8 text-2xs font-extrabold px-2 rounded-lg border transition-all ${
                activeChar === letItem 
                  ? 'bg-amber-505 border-amber-500 text-slate-950 font-black bg-amber-500' 
                  : 'border-transparent text-gray-500 hover:bg-slate-50'
              }"
            >
              ${letItem}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Companies list -->
      <div class="space-y-4">
        <div class="text-xs font-bold text-gray-500">Всего в выборке: <span class="text-slate-900 font-extrabold">${filtered.length} предприятий</span></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filtered.map(company => `
            <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div onclick="navigateToCompany('${company.id}')" class="h-12 w-12 rounded-xl border border-gray-150 p-1 flex items-center justify-center shrink-0 cursor-pointer">
                  <img src="${company.logo}" alt="${company.name}" class="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 onclick="navigateToCompany('${company.id}')" class="font-extrabold text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer flex items-center">
                    ${company.name}
                    ${company.verified ? '<i data-lucide="shield-check" class="ml-1 h-4 w-4 text-emerald-500 shrink-0"></i>' : ''}
                  </h3>
                  <span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">${company.region} // ${company.type}</span>
                </div>
              </div>
              <button onclick="navigateToCompany('${company.id}')" class="h-8 w-8 rounded-full bg-slate-50 text-slate-500 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all">
                <i data-lucide="chevron-right" class="h-4.5 w-4.5"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

    </section>
  `;
}

// 7. SPECIFIC SERVICE DETAIL PAGE
function renderServiceDetailView() {
  const service = state.localAds.find(s => s.id === state.selectedServiceId) || state.localAds[0];
  const company = companies.find(c => c.id === service.authorId) || companies[0];

  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      <!-- Back breadcrumbs -->
      <div class="flex items-center space-x-2 text-2xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
        <button onclick="go('catalog')" class="hover:text-amber-600 flex items-center"><i data-lucide="arrow-left" class="h-3 w-3 mr-1"></i> Назад в каталог</button>
        <span>/</span>
        <span>Услуга</span>
        <span>/</span>
        <span class="text-slate-900 truncate max-w-xs">${service.title}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left details panel -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <h1 class="text-xl sm:text-2.5xl font-black text-slate-900 leading-snug">${service.title}</h1>
            <div class="flex flex-wrap gap-4 text-3xs font-extrabold uppercase tracking-wider text-gray-400">
              <span class="px-2.5 py-0.5 bg-amber-500/10 text-amber-700 rounded border border-amber-500/15 font-black">${service.category}</span>
              <span class="flex items-center text-slate-800"><i data-lucide="star" class="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1 shrink-0"></i> ${service.rating}</span>
              <span>•</span>
              <span class="flex items-center"><i data-lucide="map-pin" class="h-3.5 w-3.5 text-slate-400 mr-1 shrink-0"></i> ${service.location}</span>
            </div>

            <!-- Main graphic banner -->
            <div class="h-68 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-50 border border-gray-150 relative mt-4">
              <img src="${service.image}" alt="${service.title}" class="h-full w-full object-cover" />
            </div>

            <div class="pt-4 space-y-2">
              <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-gray-100">Описание услуги</h3>
              <p class="text-sm font-semibold text-gray-650 leading-relaxed">${service.description}</p>
            </div>
          </div>

          <!-- Specs Table -->
          <div class="bg-white p-6 rounded-3xl border border-gray-200">
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2.5 border-b border-gray-100 mb-4">Технические характеристики и Ограничения</h3>
            <div class="border border-gray-150 rounded-xl overflow-hidden">
              <table class="w-full text-xs text-left text-slate-700">
                <tbody>
                  ${service.specs.map((spec, idx) => `
                    <tr class="${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-gray-100 last:border-0">
                      <td class="px-4 py-3 font-bold text-slate-500">${spec.label}</td>
                      <td class="px-4 py-3 font-extrabold text-slate-900">${spec.value}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right action panel -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-6 shadow-lg">
            <div>
              <span class="text-3xs uppercase font-extrabold text-slate-400 tracking-wider">Приблизительная ставка:</span>
              <div class="text-2xl sm:text-3.5xl font-black text-white mt-1">${service.price} ₽ <span class="text-xs font-medium text-slate-400">/ ${service.unit}</span></div>
            </div>

            <div class="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
              <span class="font-extrabold text-xs text-amber-400 flex items-center uppercase"><i data-lucide="shield-check" class="h-4 w-4 mr-1 text-amber-500 shrink-0"></i> Протекция PromZona</span>
              <p class="text-[10px] text-slate-300 leading-relaxed font-semibold">Сделка застрахована. Промышленные споры СРО арбитраж решает за счет обеспечительного фонда платформы.</p>
            </div>

            <div class="space-y-2 pt-2">
              <button onclick="startInstantChat('${company.id}', '${company.name}', '${company.logo}')" class="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2">
                <i data-lucide="message-square" class="h-4 w-4"></i>
                <span>Обсудить в чате</span>
              </button>
              <button onclick="navigateToCompany('${company.id}')" class="w-full py-3.5 border border-slate-700 hover:border-slate-500 text-xs font-bold uppercase tracking-widest rounded-xl transition-all">Открыть Профиль Завода</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

// 8. SPECIFIC COMPANY DETAIL PAGE
function renderCompanyDetailView() {
  const company = companies.find(c => c.id === state.selectedCompanyId) || companies[0];
  const companyServices = services.filter(s => s.authorId === company.id);

  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      <!-- Back breadcrumbs -->
      <div class="flex items-center space-x-2 text-2xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
        <button onclick="go('production')" class="hover:text-amber-600 flex items-center"><i data-lucide="arrow-left" class="h-3 w-3 mr-1"></i> В реестр производителей</button>
        <span>/</span>
        <span class="text-slate-900">${company.name}</span>
      </div>

      <div class="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <!-- Banner backdrop banner -->
        <div class="h-48 md:h-64 bg-slate-900 relative">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div class="p-6 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-150">
          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            <div class="h-28 w-28 rounded-2xl border border-gray-150 p-2 bg-white shadow-xl flex items-center justify-center shrink-0">
              <img src="${company.logo}" alt="${company.name}" class="h-full w-full object-contain" />
            </div>

            <div class="space-y-1.5 text-slate-900">
              <h1 class="text-xl sm:text-2.5xl font-black tracking-tight flex items-center">
                ${company.name}
                ${company.verified ? '<i data-lucide="shield-check" class="ml-1.5 h-6 w-6 text-emerald-500 fill-emerald-50 shrink-0"></i>' : ''}
              </h1>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-3xs font-extrabold uppercase tracking-wider text-gray-400">
                <span class="text-amber-600">${company.category}</span>
                <span>•</span>
                <span>${company.region}</span>
              </div>
            </div>
          </div>

          <button onclick="startInstantChat('${company.id}', '${company.name}', '${company.logo}')" class="flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
            <i data-lucide="message-square" class="h-4 w-4"></i>
            <span>Обсудить заказ</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Side: Basic Info -->
        <div class="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 min-h-[250px] space-y-6">
          <div class="space-y-3">
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-gray-100">О заводе / холдинге</h3>
            <p class="text-sm font-semibold text-gray-650 leading-relaxed">${company.fullDescription || company.description}</p>
          </div>

          <div class="pt-4 space-y-4">
            <h4 class="text-3xs font-black uppercase tracking-widest text-slate-400">Квалификации и Сертификаты</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${company.certifications.map(cert => `
                <div class="p-3 border border-gray-150 rounded-xl flex items-center space-x-3 bg-slate-50/50">
                  <div class="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <i data-lucide="shield-check" class="h-4 w-4"></i>
                  </div>
                  <span class="text-2xs font-extrabold text-slate-800 uppercase tracking-wide">${cert}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Side: Logistics & Contacts -->
        <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200 h-fit space-y-5">
          <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-gray-100">Логистика и связь</h3>
          <div class="space-y-3 text-xs font-semibold text-slate-700">
            <div>
              <span class="block text-3xs text-gray-400 font-extrabold uppercase">ИНН / ЮР. АДРЕС:</span>
              <p class="text-slate-900 mt-0.5">${company.address}</p>
            </div>
            <div>
              <span class="block text-3xs text-gray-400 font-extrabold uppercase">ТЕЛЕФОН СНАБЖЕНИЯ:</span>
              <p class="text-slate-900 mt-0.5">${company.phone}</p>
            </div>
            <div>
              <span class="block text-3xs text-gray-400 font-extrabold uppercase">EMAIL ДЛЯ КП / ТЕНДЕРОВ:</span>
              <p class="text-slate-900 mt-0.5 hover:text-amber-600 transition-colors cursor-pointer">${company.email}</p>
            </div>
            <div>
              <span class="block text-3xs text-gray-400 font-extrabold uppercase">РЕЖИМ ОТГРУЗОК ОТК:</span>
              <p class="text-slate-900 mt-0.5">${company.workHours}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

// 9. MESSAGES VIEW (REAL CHAT SYSTEM)
function renderMessagesView() {
  const activeDialog = state.chatDialogs.find(d => d.id === state.activeDialogId) || state.chatDialogs[0];

  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="bg-white rounded-3xl border border-gray-250/80 shadow-md h-[550px] overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        <!-- Sidebar and chats -->
        <div class="md:col-span-4 border-r border-gray-200 flex flex-col h-full bg-slate-50/50">
          <div class="p-4 border-b border-gray-150 bg-white">
            <h2 class="text-xs uppercase font-extrabold tracking-widest text-slate-400">Чаты и Переговоры</h2>
          </div>
          <div class="flex-grow overflow-y-auto divide-y divide-gray-100">
            ${state.chatDialogs.map(dialog => {
              const isSelected = dialog.id === state.activeDialogId;
              return `
                <div 
                  onclick="selectDialog('${dialog.id}')"
                  class="p-4 flex items-center space-x-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-500/10 border-l-4 border-amber-500' : 'hover:bg-slate-55'
                  }"
                >
                  <img src="${dialog.avatar}" alt="${dialog.name}" class="h-9 w-9 rounded-xl border border-gray-200 bg-white shrink-0 object-contain" />
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-baseline mb-0.5">
                      <h4 class="font-bold text-xs text-slate-900 truncate">${dialog.name}</h4>
                      <span class="text-[9px] text-gray-400 font-bold">${dialog.lastMessageTime}</span>
                    </div>
                    <p class="text-[10px] text-gray-400 font-semibold truncate leading-normal">${dialog.lastMessageText}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Chat screen and engine -->
        <div class="md:col-span-8 flex flex-col h-full">
          <!-- Active chat head -->
          <div class="p-4 bg-white border-b border-gray-150 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img src="${activeDialog.avatar}" alt="${activeDialog.name}" class="h-9 w-9 rounded-xl border border-gray-150 object-contain" />
              <div>
                <h4 class="font-extrabold text-xs text-slate-900">${activeDialog.name}</h4>
                <div class="flex items-center text-[10px] font-extrabold text-emerald-500 uppercase"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Линия ОТК активна</div>
              </div>
            </div>
            <button onclick="navigateToCompany('${activeDialog.id}')" class="px-3 py-1.5 border border-gray-250 text-rxs font-extrabold uppercase tracking-wider rounded-lg text-slate-650 hover:bg-slate-50 transition-colors">Спецификация</button>
          </div>

          <!-- Messages display area -->
          <div class="flex-grow p-4 space-y-3.5 overflow-y-auto bg-slate-55/30" id="dialog-chat-container">
            ${activeDialog.messages.map(msg => {
              const isMe = msg.sender === 'me';
              return `
                <div class="flex ${isMe ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[70%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-3xs ${
                    isMe 
                      ? 'bg-slate-900 text-white rounded-br-none' 
                      : 'bg-white text-slate-800 rounded-bl-none border border-gray-200'
                  }">
                    <p>${msg.text}</p>
                    <span class="block text-[8px] mt-1 text-right text-gray-400 font-bold font-mono uppercase tracking-widest">${msg.timestamp}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Form input -->
          <form onsubmit="handleSendChatMessage(event)" class="p-3 bg-white border-t border-gray-150 flex items-center space-x-2">
            <input 
              type="text" 
              id="chat-text-input"
              placeholder="Введите коммерческие условия, ТЗ или вопрос по оборудованию..." 
              required
              class="flex-grow bg-slate-50 border border-gray-200 focus:border-amber-500 hover:border-amber-500 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none"
            />
            <button 
              type="submit"
              class="h-10 w-10 bg-amber-500 hover:bg-amber-600 rounded-xl flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/10 transition-all font-black"
            >
              <i data-lucide="arrow-right" class="h-4.5 w-4.5"></i>
            </button>
          </form>

        </div>

      </div>
    </section>
  `;
}

// 10. SUPPLIER DASHBOARD (MAIN CAB)
function renderDashboardView() {
  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Top user profiling bar -->
      <div class="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow">
        <div>
          <span class="text-3xs uppercase font-extrabold tracking-widest text-slate-400">Кабинет завода // Снабжение</span>
          <h2 class="text-xl sm:text-2.5xl font-black mt-1">ОАО Промышленный Узел</h2>
          <span class="block text-rxs text-emerald-400 font-mono mt-0.5">ИНН: 7704112233 // Лицензия СРО №4432-АК</span>
        </div>
        <button onclick="go('create-ad')" class="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center space-x-2">
          <i data-lucide="plus" class="h-4.5 w-4.5"></i>
          <span>Разместить объявление</span>
        </button>
      </div>

      <!-- Main core columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Current Ads list -->
        <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-200 space-y-6 shadow-3xs">
          <div>
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-gray-100">Мои активные объявления о мощностях</h3>
            <p class="text-3xs text-gray-400 mt-1">Эти лоты видны B2B покупателям по всей России</p>
          </div>

          <div class="space-y-4">
            ${state.localAds.slice(0, 3).map(ad => `
              <div class="p-4 border border-gray-150 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-amber-500 transition-all">
                <div class="flex items-center space-x-3.5 min-w-0">
                  <img src="${ad.image}" alt="${ad.title}" class="h-12 w-12 rounded-xl object-cover border border-gray-150 shrink-0" />
                  <div class="min-w-0">
                    <h4 class="font-extrabold text-xs text-slate-900 truncate leading-snug">${ad.title}</h4>
                    <span class="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5 block">${ad.category} // ${ad.location}</span>
                  </div>
                </div>

                <div class="flex items-center space-x-3 shrink-0">
                  <span class="font-black text-xs text-slate-800">${ad.price} ₽ / ${ad.unit}</span>
                  <button onclick="deleteAd('${ad.id}')" class="p-2 bg-red-50 text-red-650 hover:bg-red-100 rounded-xl transition-all" title="Снять с публикации">
                    <i data-lucide="trash-2" class="h-4 w-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right stats metrics -->
        <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200 h-fit space-y-6">
          <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 pb-2 border-b border-gray-100">Статистика показов за май</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-slate-50 border border-gray-150 rounded-2xl">
              <span class="block text-2xs font-extrabold text-gray-400 uppercase tracking-wide">Просмотры</span>
              <span class="block text-xl font-black text-slate-900 mt-1">420</span>
            </div>
            <div class="p-3 bg-slate-50 border border-gray-150 rounded-2xl">
              <span class="block text-2xs font-extrabold text-gray-400 uppercase tracking-wide">Запросов КП</span>
              <span class="block text-xl font-black text-amber-600 mt-1">18</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

// 11. CREATE AD FORM VIEW
function renderCreateAdFormView() {
  return `
    <section class="max-w-2xl mx-auto px-4 py-12">
      <div class="bg-white p-8 rounded-3xl border border-gray-250/80 shadow-md space-y-6">
        
        <div class="space-y-1">
          <h1 class="text-xl sm:text-2.5xl font-black text-slate-900 tracking-tight leading-none uppercase">Разместить оборудование / цех</h1>
          <p class="text-3xs text-gray-400 uppercase tracking-widest font-extrabold">Укажите параметры мощностей вашего предприятия</p>
        </div>

        <form onsubmit="handleCreateAdFormSubmit(event)" class="space-y-5">
          <div class="space-y-1">
            <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Название объявления / услуги</label>
            <input 
              type="text" 
              id="ad-title"
              placeholder="Напр. Литейные работы под давлением стали Ст3..." 
              required
              class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none transition-all text-slate-900"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Главная отрасль</label>
              <select 
                id="ad-category"
                class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-900"
              >
                <option value="Металлообработка">Металлообработка</option>
                <option value="Электроника">Электроника</option>
                <option value="Деревообработка">Деревообработка</option>
                <option value="Химическая промышленность">Химическая промышленность</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Стоимость базовой единицы</label>
              <input 
                type="number" 
                id="ad-price"
                placeholder="2200" 
                required
                class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-900"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Единица измерения</label>
              <input 
                type="text" 
                id="ad-unit"
                placeholder="куб. метр / час / точка" 
                required
                class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-900"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Местоположение цеха (город)</label>
              <input 
                type="text" 
                id="ad-location"
                placeholder="Екатеринбург, РФ" 
                required
                class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-900"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-black uppercase tracking-wider text-slate-600 block">Детальное описание (оборудование, режимы ОТК)</label>
            <textarea 
              id="ad-desc"
              rows="4"
              placeholder="Перечислите станки, заготовки, допуски в микронах, требования к чертежам..."
              required
              class="w-full bg-slate-50 border border-gray-250 hover:border-amber-500 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-900"
            ></textarea>
          </div>

          <button 
            type="submit"
            class="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-amber-500/10 mt-6"
          >
            Опубликовать лот в реестре
          </button>
        </form>

      </div>
    </section>
  `;
}

// ================= ACTION EVENT HANDLERS AND CALLS =================

function bindPageEvents() {
  // Setup inputs if present on catalog page
  const catInput = document.getElementById('catalog-search-input');
  if (catInput) {
    catInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') triggerCatalogSearch();
    });
  }
}

// 1. Trigger catalog search queries
function triggerCatalogSearch() {
  const catInput = document.getElementById('catalog-search-input');
  if (catInput) {
    state.searchQueryGlobal = catInput.value;
  }
  navigateTo('catalog');
}

// 2. Click category filtering
function triggerCategoryFilter(category) {
  state.searchQueryGlobal = category;
  navigateTo('catalog');
}

// 3. Alphabet filter trigger
function triggerLetterFilter(letter) {
  state.activeLetter = letter;
  navigateTo('companies');
}

// 4. Details routers
function navigateToService(id) {
  navigateTo('service-detail', { serviceId: id });
}

function navigateToCompany(id) {
  navigateTo('company-detail', { companyId: id });
}

// 5. Dial chat connection helper
function startInstantChat(id, name, avatar) {
  // Match or create matching dialog
  const dialogExists = state.chatDialogs.find(d => d.id === id);
  if (!dialogExists) {
    state.chatDialogs.unshift({
      id: id,
      name: name,
      avatar: avatar,
      lastMessageText: 'Здравствуйте! Мы готовы принять ваш чертеж.',
      lastMessageTime: 'Только что',
      unread: false,
      type: 'orders',
      messages: [
        { id: '1', text: 'Здравствуйте! Да, мы готовы обсудить технические требования к партии. Какой объем планируется?', timestamp: 'Только что', sender: 'them' }
      ]
    });
  }
  
  state.activeDialogId = id;
  navigateTo('messages');
  setTimeout(() => {
    const el = document.getElementById('dialog-chat-container');
    if (el) el.scrollTop = el.scrollHeight;
  }, 100);
}

window.startInstantChat = startInstantChat;

// 6. Action: Delete active publishing listing
function deleteAd(id) {
  state.localAds = state.localAds.filter(ad => ad.id !== id);
  renderApp();
}

window.deleteAd = deleteAd;

// 7. Action: Send messages inside active chat dialog
function handleSendChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chat-text-input');
  if (!input || !input.value.trim()) return;

  const userMessageText = input.value.trim();
  const activeDialog = state.chatDialogs.find(d => d.id === state.activeDialogId);
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Update dialogues
  activeDialog.messages.push({
    id: String(Date.now()),
    text: userMessageText,
    timestamp: timeStr,
    sender: 'me'
  });
  activeDialog.lastMessageText = userMessageText;
  activeDialog.lastMessageTime = timeStr;

  input.value = '';
  renderApp();

  // Scroll to bottom
  const container = document.getElementById('dialog-chat-container');
  if (container) container.scrollTop = container.scrollHeight;

  // Real-time simulated response from corporate partner is queued
  setTimeout(() => {
    activeDialog.messages.push({
      id: String(Date.now() + 1),
      text: `Коммерческий представитель ${activeDialog.name} принял сообщение: "${userMessageText.substring(0, 30)}...". Спецификация формируется. Мы свяжемся с вами в течение 10 минут.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'them'
    });
    activeDialog.lastMessageText = `Коммерческий представитель принял сообщение.`;
    renderApp();
    const containerSec = document.getElementById('dialog-chat-container');
    if (containerSec) containerSec.scrollTop = containerSec.scrollHeight;
  }, 2000);
}

window.handleSendChatMessage = handleSendChatMessage;

// 8. Action: Create new publication
function handleCreateAdFormSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('ad-title').value;
  const category = document.getElementById('ad-category').value;
  const price = document.getElementById('ad-price').value;
  const unit = document.getElementById('ad-unit').value;
  const location = document.getElementById('ad-location').value;
  const desc = document.getElementById('ad-desc').value;

  const newAd = {
    id: 'custom_ad_' + Date.now(),
    authorId: 'my_company',
    title: title,
    category: category,
    price: Number(price).toLocaleString(),
    unit: unit,
    rating: 5.0,
    location: location,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    description: desc,
    portfolioImages: [],
    reviewsCount: 0,
    specs: [
      { label: 'Режим проверки', value: 'ГОСТ стандарт' },
      { label: 'Верифицированно', value: 'Да' }
    ]
  };

  state.localAds.unshift(newAd);
  navigateTo('dashboard');
  
  // Show standard alert toast popup
  alert('Объявление о свободных мощностях успешно внесено в федеральный реестр!');
}

window.handleCreateAdFormSubmit = handleCreateAdFormSubmit;

// Helper search click direct
window.selectDialog = (id) => {
  state.activeDialogId = id;
  renderApp();
};

window.triggerLetterFilter = triggerLetterFilter;
window.triggerCategoryFilter = triggerCategoryFilter;
window.navigateToService = navigateToService;
window.navigateToCompany = navigateToCompany;
window.triggerCatalogSearch = triggerCatalogSearch;

window.resetFiltersAndReload = (page) => {
  state.searchQueryGlobal = '';
  state.activeLetter = 'Все';
  navigateTo(page);
};

// Standalone ZIP Download Generator (loads via JSZip CDN)
async function downloadProjectAsZip() {
  const btn = document.getElementById('zip-download-btn');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-spin mr-1">⌛</span> Формирование ZIP...';
  }
  
  try {
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip библиотека не загрузилась. Пожалуйста, убедитесь, что есть интернет-соединение.');
    }
    const zip = new JSZip();

    // Fetch index.html
    const indexRes = await fetch('/index.html');
    const indexText = await indexRes.text();
    zip.file("index.html", indexText);

    // Fetch src/app.js
    const appRes = await fetch('/src/app.js');
    const appText = await appRes.text();
    // In our standalone zip we save src/app.js so index.html works out-of-the-box
    zip.file("src/app.js", appText);

    // Fetch src/data.js
    const dataRes = await fetch('/src/data.js');
    const dataText = await dataRes.text();
    zip.file("src/data.js", dataText);

    // Add a simple instructions README.md inside the zip
    zip.file("README.md", `# PromZona B2B Project

Этот проект полностью переведён на стандартную верстку HTML, JS (Vanilla) и CSS (Tailwind)!

## Как запустить проект локально:

1. Просто откройте файл \`index.html\` в любом современном веб-браузере (Google Chrome, Firefox, Safari и др.).
2. Из-за требований безопасности современных браузеров для ES-модулей (\`type="module" \`), запуск рекомендуется производить через любой локальный веб-сервер. Например:
   - Если у вас установлен VS Code, установите популярное расширение **Live Server** и нажмите "Go Live".
   - Или в консоли выполните: \`npx serve\` или \`python -m http.server 8000\`.

Все функции проекта (каталоги, интерактивные чаты, реестры промышленности, добавление предложений) работают и функционируют прямо в вашем браузере!
`);

    // Generate zip blob
    const content = await zip.generateAsync({ type: "blob" });
    
    // Create virtual download element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "promzona_b2b_html_css_js.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (btn) {
      btn.innerHTML = '✅ Проект скачан!';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
      }, 3000);
    }
  } catch (err) {
    console.error("Ошибка при скачивании архива проекта: ", err);
    alert("Не удалось сгенерировать ZIP-архив автоматически: " + err.message + "\n\nВы можете скопировать файлы вручную из вкладки просмотра кода.");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
      lucide.createIcons();
    }
  }
}
window.downloadProjectAsZip = downloadProjectAsZip;

// Initial system boots
window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
renderApp();
