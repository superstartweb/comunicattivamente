import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function AdminPanel({ onExit }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState({ title: '', description: '', url: '' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApps();
      fetchSettings();
    }
  }, [isAuthenticated]);

  async function fetchApps() {
    const { data, error } = await supabase.from('showcase_apps').select('*').order('order_index');
    if (error) console.error("Errore app:", error);
    setApps(data || []);
  }

  async function fetchSettings() {
    const { data, error } = await supabase.from('settings').select('value').eq('key', 'showcase_visible').single();
    if (error) console.error("Errore settings:", error);
    setIsVisible(data?.value === 'true');
  }

  async function toggleVisibility() {
    const newValue = !isVisible;
    const { error } = await supabase.from('settings').update({ value: String(newValue) }).eq('key', 'showcase_visible');
    if (error) {
      alert("Errore salvataggio visibilità");
    } else {
      setIsVisible(newValue);
    }
  }

  async function addApp() {
    if (!newApp.title || !newApp.url) return;
    const { error } = await supabase.from('showcase_apps').insert([newApp]);
    if (error) {
      alert("Errore aggiunta app");
    } else {
      setNewApp({ title: '', description: '', url: '' });
      fetchApps();
    }
  }

  async function deleteApp(id) {
    const { error } = await supabase.from('showcase_apps').delete().eq('id', id);
    if (error) {
      alert("Errore eliminazione");
    } else {
      fetchApps();
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 w-full max-w-md text-center">
          <h3 className="text-2xl font-bold mb-6 uppercase">Area Riservata</h3>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="w-full px-6 py-4 bg-ansia-dark border border-gray-700 rounded-xl mb-4 text-center outline-none focus:border-ansia-red"
          />
          <button 
            onClick={() => password === 'ansia2026' ? setIsAuthenticated(true) : alert('Sbagliata!')}
            className="w-full py-4 bg-ansia-red font-bold rounded-xl uppercase tracking-widest"
          >
            Entra nel Comando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-black uppercase italic">Centro di <span className="text-ansia-red">Comando</span></h2>
        <button onClick={onExit} className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">Esci</button>
      </div>

      <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 mb-12 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Visibilità Vetrina App</h3>
          <p className="text-gray-500 text-sm">Rendi visibili i tuoi lavori al pubblico</p>
        </div>
        <button 
          onClick={toggleVisibility}
          className={`px-6 py-3 rounded-full font-bold transition-all ${isVisible ? 'bg-green-600' : 'bg-gray-700'}`}
        >
          {isVisible ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 mb-12">
        <h3 className="text-xl font-bold mb-6 uppercase">Aggiungi Nuova App</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            placeholder="Titolo" 
            value={newApp.title} 
            onChange={e => setNewApp({...newApp, title: e.target.value})}
            className="px-4 py-3 bg-ansia-dark border border-gray-700 rounded-xl outline-none focus:border-ansia-red"
          />
          <input 
            placeholder="URL" 
            value={newApp.url} 
            onChange={e => setNewApp({...newApp, url: e.target.value})}
            className="px-4 py-3 bg-ansia-dark border border-gray-700 rounded-xl outline-none focus:border-ansia-red"
          />
          <input 
            placeholder="Descrizione breve" 
            value={newApp.description} 
            onChange={e => setNewApp({...newApp, description: e.target.value})}
            className="px-4 py-3 bg-ansia-dark border border-gray-700 rounded-xl outline-none focus:border-ansia-red"
          />
        </div>
        <button onClick={addApp} className="w-full py-4 bg-ansia-red font-bold rounded-xl uppercase tracking-widest">
          Aggiungi alla Vetrina
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold uppercase mb-4">App Attive</h3>
        {apps.length === 0 ? <p className="text-gray-600 italic">Nessuna app inserita.</p> : 
          apps.map(app => (
            <div key={app.id} className="flex justify-between items-center bg-gray-900 p-4 rounded-2xl border border-gray-800">
              <div>
                <p className="font-bold">{app.title}</p>
                <p className="text-xs text-gray-500">{app.url}</p>
              </div>
              <button onClick={() => deleteApp(app.id)} className="text-ansia-red font-bold hover:underline">Elimina</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AdminPanel;