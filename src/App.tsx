import React, { useState } from 'react';
import { Menu, Search, BookOpen, HeartHandshake, ShieldAlert, PhoneCall, ChevronDown, ChevronUp, X, ArrowLeft } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // FUTURO: Conectar com a API de busca do banco de dados
    console.log('Buscando por:', searchQuery);
    alert(`Buscando por: ${searchQuery}\n\n(Integração com banco de dados futura)`);
  };

  const renderView = () => {
    switch (activeView) {
      case 'direitos':
        return <DireitosView onBack={() => setActiveView('home')} />;
      case 'beneficios':
        return <BeneficiosView onBack={() => setActiveView('home')} />;
      case 'racismo':
        return <RacismoView onBack={() => setActiveView('home')} />;
      case 'emergencia':
        return <EmergenciaView onBack={() => setActiveView('home')} />;
      default:
        return <HomeView onNavigate={setActiveView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Menu principal"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer" onClick={() => setActiveView('home')}>
              KMS da Cidadania
            </h1>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
          <nav className="absolute top-16 left-0 w-3/4 max-w-sm bg-white h-full shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <h2 className="text-lg font-bold text-blue-900">Menu Principal</h2>
            </div>
            <ul className="flex-1 overflow-y-auto py-2">
              <li>
                <button onClick={() => { setActiveView('home'); setIsMenuOpen(false); }} className="w-full text-left px-6 py-4 text-lg font-medium border-b hover:bg-gray-50">Início</button>
              </li>
              <li>
                <button onClick={() => { setActiveView('direitos'); setIsMenuOpen(false); }} className="w-full text-left px-6 py-4 text-lg font-medium border-b hover:bg-gray-50">Direitos e Dignidade</button>
              </li>
              <li>
                <button onClick={() => { setActiveView('beneficios'); setIsMenuOpen(false); }} className="w-full text-left px-6 py-4 text-lg font-medium border-b hover:bg-gray-50">Benefícios Sociais</button>
              </li>
              <li>
                <button onClick={() => { setActiveView('racismo'); setIsMenuOpen(false); }} className="w-full text-left px-6 py-4 text-lg font-medium border-b hover:bg-gray-50">Combate ao Racismo</button>
              </li>
              <li>
                <button onClick={() => { setActiveView('emergencia'); setIsMenuOpen(false); }} className="w-full text-left px-6 py-4 text-lg font-medium border-b hover:bg-gray-50">Contatos Úteis</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">CRAS - Centro de Referência de Assistência Social</h3>
            <p className="text-gray-300">Rua da Cidadania, 123 - Bairro Esperança</p>
            <p className="text-gray-300">Telefone: (00) 1234-5678</p>
            <p className="text-gray-300">Horário: Seg a Sex, 08h às 17h</p>
          </div>
          <div className="text-sm text-gray-400">
            <p>KMS da Cidadania &copy; 2026</p>
            <p>Plataforma de Apoio Social</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ onNavigate, searchQuery, setSearchQuery, onSearch }: { onNavigate: (v: string) => void, searchQuery: string, setSearchQuery: (s: string) => void, onSearch: (e: React.FormEvent) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Bar */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Como podemos ajudar hoje?</h2>
        <form onSubmit={onSearch} className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite o que você procura..."
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors"
            aria-label="Campo de busca"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={24} />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Buscar
          </button>
        </form>
      </section>

      {/* Categories Grid */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">Acesso Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('direitos')}
            className="flex flex-col items-center justify-center p-8 bg-emerald-800 text-white rounded-2xl shadow-md hover:bg-emerald-900 hover:shadow-xl border-2 border-emerald-900 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-4 focus:ring-emerald-500"
          >
            <BookOpen size={48} className="mb-4" />
            <span className="text-xl md:text-2xl font-extrabold text-center tracking-wide">Direitos e Dignidade</span>
          </button>

          <button 
            onClick={() => onNavigate('beneficios')}
            className="flex flex-col items-center justify-center p-8 bg-blue-800 text-white rounded-2xl shadow-md hover:bg-blue-900 hover:shadow-xl border-2 border-blue-900 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            <HeartHandshake size={48} className="mb-4" />
            <span className="text-xl md:text-2xl font-extrabold text-center tracking-wide">Benefícios Sociais</span>
          </button>

          <button 
            onClick={() => onNavigate('racismo')}
            className="flex flex-col items-center justify-center p-8 bg-purple-800 text-white rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-xl border-2 border-purple-900 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-4 focus:ring-purple-500"
          >
            <ShieldAlert size={48} className="mb-4" />
            <span className="text-xl md:text-2xl font-extrabold text-center tracking-wide">Combate ao Racismo</span>
          </button>

          <button 
            onClick={() => onNavigate('emergencia')}
            className="flex flex-col items-center justify-center p-8 bg-red-800 text-white rounded-2xl shadow-md hover:bg-red-900 hover:shadow-xl border-2 border-red-900 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-500"
          >
            <PhoneCall size={48} className="mb-4" />
            <span className="text-xl md:text-2xl font-extrabold text-center tracking-wide">Contatos Úteis</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function DireitosView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-blue-700 font-bold hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" /> Voltar para o Início
      </button>
      
      <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BookOpen size={28} /> Direitos e Dignidade
        </h2>
        <p className="mt-2 text-emerald-50 text-lg">Informações sobre seus direitos básicos, saúde e cidadania.</p>
      </div>

      <div className="space-y-4">
        {/* FUTURO: Buscar estes itens do banco de dados */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">Constituição Cidadã Explicada</h3>
          <p className="text-gray-600 mt-2">Um guia simples sobre seus direitos garantidos por lei.</p>
          {/* FUTURO: Link para arquivo PDF */}
          <button className="mt-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold hover:bg-emerald-200">
            Baixar Cartilha (PDF)
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">Direitos na Saúde Pública (SUS)</h3>
          <p className="text-gray-600 mt-2">Como acessar medicamentos gratuitos e marcar consultas.</p>
          {/* FUTURO: Link para conteúdo externo ou PDF */}
          <button className="mt-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold hover:bg-emerald-200">
            Ler Artigo
          </button>
        </div>
      </div>
    </div>
  );
}

function BeneficiosView({ onBack }: { onBack: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-blue-700 font-bold hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" /> Voltar para o Início
      </button>
      
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <HeartHandshake size={28} /> Benefícios Sociais
        </h2>
        <p className="mt-2 text-blue-50 text-lg">Passo a passo para acessar os programas do governo.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* FUTURO: Buscar lista de benefícios do banco de dados */}
        
        {/* Accordion Item 1 */}
        <div className="border-b border-gray-200 last:border-0">
          <button 
            onClick={() => toggleAccordion(0)}
            className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50"
          >
            <h3 className="text-xl font-bold text-gray-900">Bolsa Família</h3>
            {openAccordion === 0 ? <ChevronUp size={24} className="text-blue-600" /> : <ChevronDown size={24} className="text-gray-400" />}
          </button>
          {openAccordion === 0 && (
            <div className="p-5 pt-0 bg-gray-50 text-gray-700 text-lg leading-relaxed">
              <p className="mb-3"><strong>O que é:</strong> Programa de transferência de renda para famílias em situação de pobreza.</p>
              <p className="mb-2"><strong>Passo a passo:</strong></p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Reúna os documentos de todos da família (RG, CPF, Certidão de Nascimento).</li>
                <li>Vá até o CRAS mais próximo.</li>
                <li>Inscreva-se no Cadastro Único (CadÚnico).</li>
                <li>Aguarde a análise do governo federal.</li>
              </ol>
              {/* FUTURO: Link para site oficial do governo */}
              <button className="mt-4 text-blue-700 font-bold underline">Acessar site oficial</button>
            </div>
          )}
        </div>

        {/* Accordion Item 2 */}
        <div className="border-b border-gray-200 last:border-0">
          <button 
            onClick={() => toggleAccordion(1)}
            className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50"
          >
            <h3 className="text-xl font-bold text-gray-900">Tarifa Social de Energia</h3>
            {openAccordion === 1 ? <ChevronUp size={24} className="text-blue-600" /> : <ChevronDown size={24} className="text-gray-400" />}
          </button>
          {openAccordion === 1 && (
            <div className="p-5 pt-0 bg-gray-50 text-gray-700 text-lg leading-relaxed">
              <p className="mb-3"><strong>O que é:</strong> Desconto na conta de luz para famílias de baixa renda.</p>
              <p className="mb-2"><strong>Como conseguir:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>É necessário estar no Cadastro Único.</li>
                <li>A renda familiar deve ser de até meio salário mínimo por pessoa.</li>
                <li>O desconto é aplicado automaticamente pela companhia de energia.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RacismoView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-blue-700 font-bold hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" /> Voltar para o Início
      </button>
      
      <div className="bg-purple-700 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <ShieldAlert size={28} /> Combate ao Racismo
        </h2>
        <p className="mt-2 text-purple-100 text-lg">Educação, história e canais de denúncia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FUTURO: Conteúdo dinâmico do CMS/Banco de Dados */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Como Denunciar</h3>
          <p className="text-gray-600 mb-4">Racismo é crime. Saiba como e onde registrar uma denúncia com segurança.</p>
          <div className="bg-red-50 text-red-800 p-4 rounded-xl font-bold text-lg text-center border border-red-200">
            Disque 100 (Direitos Humanos)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">História e Cultura</h3>
          <p className="text-gray-600 mb-4">Materiais educativos sobre a história afro-brasileira e indígena.</p>
          {/* FUTURO: Link para vídeo ou PDF */}
          <button className="w-full bg-purple-100 text-purple-800 px-4 py-3 rounded-xl font-bold hover:bg-purple-200">
            Acessar Biblioteca
          </button>
        </div>
      </div>
    </div>
  );
}

function EmergenciaView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-blue-700 font-bold hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" /> Voltar para o Início
      </button>
      
      <div className="bg-red-600 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <PhoneCall size={28} /> Contatos Úteis
        </h2>
        <p className="mt-2 text-red-100 text-lg">Telefones importantes para emergências e serviços.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {/* FUTURO: Buscar contatos do banco de dados */}
          <li className="p-5 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Polícia Militar</h3>
              <p className="text-gray-500">Emergências policiais</p>
            </div>
            <a href="tel:190" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-xl hover:bg-gray-800">190</a>
          </li>
          <li className="p-5 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">SAMU</h3>
              <p className="text-gray-500">Ambulância e resgate</p>
            </div>
            <a href="tel:192" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-xl hover:bg-gray-800">192</a>
          </li>
          <li className="p-5 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Bombeiros</h3>
              <p className="text-gray-500">Incêndios e resgates</p>
            </div>
            <a href="tel:193" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-xl hover:bg-gray-800">193</a>
          </li>
          <li className="p-5 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Defesa Civil</h3>
              <p className="text-gray-500">Desastres naturais</p>
            </div>
            <a href="tel:199" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-xl hover:bg-gray-800">199</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
