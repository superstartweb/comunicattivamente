import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function ResultScreen({ score, sector, onRestart }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getProfile = () => {
    if (score <= 3) return {
      title: "L'Ammiraglio",
      desc: "Complimenti. Hai domato il caos. La tua azienda è un sistema che lavora per te, e non viceversa. Sei nel 5% degli imprenditori che hanno capito il gioco.",
      color: "text-green-500",
      advice: "Continua a navigare e ispira gli altri."
    };
    if (score <= 8) return {
      title: "L'Eroe Esausto",
      desc: "L'azienda fattura, ma tu stai pagando il prezzo in salute e tempo. Sei in equilibrio precario: un imprevisto più grosso e il sistema crolla.",
      color: "text-yellow-500",
      advice: "È ora di smettere di remare e iniziare a guidare."
    };
    return {
      title: "L'Ostaggio di Ansia S.P.A.",
      desc: "Situazione critica. Non guidi un'azienda, guidi un'ambulanza a sirene spiegate 24h su 24. Sei il collo di bottiglia di ogni processo.",
      color: "text-ansia-red",
      advice: "L'esorcismo non è più opzionale. È una questione di sopravvivenza."
    };
  };

  const profile = getProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('test_results').insert([
        { email: email, score: score, profile: profile.title, sector: sector }
      ]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      alert("Errore nell'invio. Riprova!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 animate-fade-in text-center">
      <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
        LA TUA <span className="text-ansia-red">SENTENZA</span>
      </h2>
      
      <div className="bg-ansia-dark border-4 border-ansia-red p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(227,6,19,0.3)] mb-12">
        <h3 className={`text-4xl md:text-6xl font-black mb-6 ${profile.color} uppercase italic`}>
          {profile.title}
        </h3>
        <p className="text-xl md:text-3xl text-white leading-relaxed mb-8 font-medium">
          {profile.desc}
        </p>
        <div className="bg-ansia-red text-white p-4 rounded-xl font-bold text-lg uppercase italic">
          {profile.advice}
        </div>
      </div>

      {!submitted ? (
        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 max-w-md mx-auto">
          <h4 className="text-2xl font-bold mb-4">Vuoi uscire dalla ruota?</h4>
          <p className="text-gray-400 mb-6">Lascia la tua mail per scaricare gratuitamente il manuale <b>"ANSIA S.P.A."</b> e iniziare l'esorcismo.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tua@email.com"
              className="px-6 py-4 bg-ansia-dark border border-gray-700 rounded-xl text-white focus:border-ansia-red outline-none transition-all text-center"
            />
            <button 
              disabled={loading}
              className="px-8 py-4 bg-ansia-red text-white font-bold rounded-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
            >
              {loading ? "ELABORAZIONE..." : "SCARICA IL LIBRO GRATIS →"}
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-fade-in space-y-10">
          <div className="space-y-6">
            <div className="text-green-500 text-3xl font-bold uppercase tracking-widest">Accesso Consentito!</div>
            <a 
              href="https://www.superstart.it/wp-content/uploads/2026/05/ansia-spa.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-12 py-6 bg-ansia-red text-white font-black text-2xl rounded-full hover:scale-110 transition-all shadow-lg uppercase"
            >
              📖 SCARICA IL LIBRO ORA
            </a>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl border-2 border-dashed border-gray-700 text-center space-y-4">
            <h4 className="text-xl font-bold">Hai la teoria, ora vuoi la pratica?</h4>
            <p className="text-gray-400">Guarda come ho risolto il caos in altre aziende con le mie WebApp.</p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('go-to-showcase'))} 
              className="px-8 py-3 bg-white text-ansia-dark font-bold rounded-full hover:bg-gray-200 transition-all uppercase text-sm tracking-widest"
            >
              Esplora l'Arsenal →
            </button>
          </div>

          <div className="border-t border-gray-800 pt-10">
            <p className="text-gray-400 mb-6 font-medium">Vuoi accelerare l'esorcismo? Contattami direttamente:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+393929334563" className="px-6 py-3 bg-gray-800 rounded-full hover:bg-ansia-red transition-all font-bold flex items-center gap-2">
                <span>📞</span> Chiama
              </a>
              <a href="https://wa.me/393929334563" className="px-6 py-3 bg-gray-800 rounded-full hover:bg-ansia-red transition-all font-bold flex items-center gap-2">
                <span>💬</span> WhatsApp
              </a>
              <a href="mailto:daniele@superstart.it" className="px-6 py-3 bg-gray-800 rounded-full hover:bg-ansia-red transition-all font-bold flex items-center gap-2">
                <span>✉️</span> Email
              </a>
            </div>
          </div>

          <button 
            onClick={onRestart}
            className="text-gray-600 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold"
          >
            ← Riprova il test
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultScreen;