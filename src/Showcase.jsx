import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function Showcase() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function fetchApps() {
      const { data } = await supabase.from('showcase_apps').select('*').order('order_index', { ascending: true });
      setApps(data || []);
    }
    fetchApps();
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic">
          L'Arsenal dell'<span className="text-ansia-red">Esorcista</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Non sono semplici software. Sono strumenti di liberazione progettati per uccidere il caos e restituirti il tuo tempo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map((app) => (
          <a 
            key={app.id} 
            href={app.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-ansia-dark border-2 border-gray-800 p-8 rounded-3xl hover:border-ansia-red transition-all hover:scale-105 shadow-xl flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-ansia-red transition-colors">{app.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{app.description}</p>
            </div>
            <div className="flex items-center gap-2 text-ansia-red font-bold uppercase tracking-widest text-sm">
              Prova l'App →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Showcase;