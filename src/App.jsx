import React, { useState, useEffect } from 'react';
import TestExorcism from './TestExorcism';
import ResultScreen from './ResultScreen';
import Showcase from './Showcase';
import AdminPanel from './AdminPanel';
import { supabase } from './supabaseClient';

function App() {
  const [status, setStatus] = useState('hero'); 
  const [sector, setSector] = useState(null); 
  const [finalScore, setFinalScore] = useState(0);
  const [showcaseVisible, setShowcaseVisible] = useState(false);

  useEffect(() => {
    async function checkVisibility() {
      const { data } = await supabase.from('settings').select('value').eq('key', 'showcase_visible').single();
      setShowcaseVisible(data?.value === 'true');
    }
    checkVisibility();
  }, []);

  useEffect(() => {
    const handleShowcaseEvent = () => setStatus('showcase');
    window.addEventListener('go-to-showcase', handleShowcaseEvent);
    return () => window.removeEventListener('go-to-showcase', handleShowcaseEvent);
  }, []);

  return (
    <div className="min-h-screen bg-ansia-dark font-montserrat text-white selection:bg-ansia-red flex flex-col">
      
      {/* BARRA NAV SUPERIORE - Ora con padding per non sovrapporsi */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-end gap-4 z-50">
        {showcaseVisible && (
          <button onClick={() => setStatus('showcase')} className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 hover:text-ansia-red transition-colors">Vetrina App</button>
        )}
        <button onClick={() => setStatus('admin')} className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-700 hover:text-white transition-colors">Admin</button>
      </div>

      {status === 'hero' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative pt-20 pb-12">
          <div className="animate-fade-in-down">
            <h2 className="text-ansia-red text-xs md:text-xl font-bold tracking-[0.3em] uppercase mb-4">
              Manuale di Sopravvivenza per Imprenditori
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
              ANSIA <span className="text-ansia-red">S.P.A.</span>
            </h1>
            <p className="text-base md:text-2xl max-w-2xl mx-auto mb-10 text-gray-400 leading-relaxed">
              Benvenuto nell'inferno che ti sei costruito con ottime intenzioni. 
              <br className="hidden md:block" /> 
              Sei il proprietario della tua azienda o il suo prigioniero più stressato?
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => setStatus('sector')}
                className="group relative px-8 py-4 bg-ansia-red text-white font-bold text-xl rounded-full transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(227,6,19,0.6)] active:scale-95"
              >
                SCOPRI SE SEI UN CRICETO →
              </button>
              {showcaseVisible && (
                <button 
                  onClick={() => setStatus('showcase')}
                  className="text-gray-400 hover:text-white transition-colors font-medium text-xs underline underline-offset-8 decoration-ansia-red hover:decoration-white"
                >
                  Preferisco vedere i risultati concreti → Guarda l'Arsenal
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {status === 'sector' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-fade-in pt-10 pb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Qual è il tuo <span className="text-ansia-red">campo di battaglia?</span></h2>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center">
            <button 
              onClick={() => { setSector('general'); setStatus('testing'); }}
              className="px-6 py-8 bg-gray-800 border-2 border-gray-700 rounded-3xl hover:border-ansia-red transition-all group text-left flex-1"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-ansia-red transition-colors">Azienda / PMI</h3>
              <p className="text-gray-400 text-xs md:text-sm">Servizi, Produzione, Commercio e Gestione Aziendale.</p>
            </button>
            <button 
              onClick={() => { setSector('horeca'); setStatus('testing'); }}
              className="px-6 py-8 bg-gray-800 border-2 border-gray-700 rounded-3xl hover:border-ansia-red transition-all group text-left flex-1"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-ansia-red transition-colors">Mondo Horeca</h3>
              <p className="text-gray-400 text-xs md:text-sm">Ristorazione, Hotel e Food & Beverage (SuPeR Edition).</p>
            </button>
          </div>
        </div>
      )}

      {status === 'testing' && (
        <div className="flex-1 pb-12">
          <TestExorcism sector={sector} onComplete={(score) => {
            setFinalScore(score);
            setStatus('result');
          }} />
        </div>
      )}

      {status === 'result' && (
        <div className="flex-1 pb-12">
          <ResultScreen 
            score={finalScore} 
            sector={sector} 
            onRestart={() => setStatus('hero')} 
          />
        </div>
      )}

      {status === 'showcase' && (
        <div className="flex-1 pb-12 pt-16">
          <Showcase />
          <div className="text-center mb-12">
             <button onClick={() => setStatus('hero')} className="text-gray-600 hover:text-white uppercase text-xs tracking-widest font-bold">← Torna alla Home</button>
          </div>
        </div>
      )}

      {status === 'admin' && (
        <div className="flex-1 pb-12 pt-16">
          <AdminPanel onExit={() => setStatus('hero')} />
        </div>
      )}

      <footer className="py-8 px-6 bg-black border-t border-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-bold tracking-widest uppercase text-sm mb-1">ComunicAttivamente</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider leading-relaxed">
              Gestione del Caos & Esorcismi Aziendali
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-3 text-gray-400 text-xs font-medium">
              <a href="tel:+393929334563" className="hover:text-ansia-red transition-colors flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full">
                <span>📞</span> 3929334563
              </a>
              <a href="mailto:daniele@superstart.it" className="hover:text-ansia-red transition-colors flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full">
                <span>✉️</span> daniele@superstart.it
              </a>
              <a href="https://wa.me/393929334563" className="hover:text-ansia-red transition-colors flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full">
                <span>💬</span> WhatsApp
              </a>
            </div>
            <a 
              href="https://www.superstart.it" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[9px] text-gray-600 hover:text-white transition-all uppercase tracking-[0.3em]"
            >
              Partner: <span className="text-ansia-red font-bold">SuPeR</span>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-[9px] text-gray-800 uppercase tracking-widest">
          © {new Date().getFullYear()} ComunicAttivamente
        </div>
      </footer>
    </div>
  );
}

export default App;