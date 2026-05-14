import React, { useState } from 'react';

const questionSets = {
  general: [
    { q: "Ti capita di dire 'Faccio prima io' per non spiegare una cosa?", yes: "💥 Stai bruciando ore da 100€ per fare lavori da 15€. Sei un collo di bottiglia.", no: "✅ Ottimo. Significa che sai delegare o che hai processi che funzionano." },
    { q: "Se non controlli tu ogni dettaglio, hai la sensazione che tutto crolli?", yes: "💥 Non hai un'azienda, hai un lavoro dipendente molto stressante.", no: "✅ Bravo. Hai costruito un sistema che non dipende dal tuo respiro." },
    { q: "Le tue riunioni finiscono spesso con 'ci aggiorniamo settimana prossima'?", yes: "💥 Hai appena bruciato centinaia di euro per decidere di non decidere nulla.", no: "✅ Efficiente. Le tue riunioni sono decisioni, non chiacchiere." },
    { q: "Convochi riunioni 'per fare il punto' senza un ordine del giorno scritto?", yes: "💥 Stai confondendo il movimento con l'avanzamento.", no: "✅ Metodo. L'ordine del giorno è la bussola del profitto." },
    { q: "Guardi il bilancio solo quando il commercialista ti dice quanto pagare di tasse?", yes: "💥 Stai guidando l'auto guardando solo lo specchietto retrovisore.", no: "✅ Visionario. Guardi i flussi, non solo le tasse." },
    { q: "Hai fatturato bene ma il conto in banca è perennemente vicino al rosso?", yes: "💥 Attenzione: potresti essere la banca gratuita dei tuoi clienti.", no: "✅ Sanità. Il tuo fatturato è reale e liquido." },
    { q: "Hai un 'Cliente Top' che fattura molto ma ti chiede sconti e urgenze costanti?", yes: "💥 Complimenti, hai un Vampiro in azienda. Ti sta succhiando l'utile.", no: "✅ Equilibrio. Hai clienti che rispettano il tuo valore." },
    { q: "Ti senti in colpa se alzi i prezzi a un cliente storico?", yes: "💥 L'idolatria del fatturato è una droga. Il margine è l'unica sanità.", no: "✅ Coraggio. Sai che il valore che dai giustifica il prezzo." },
    { q: "Se domani dovessi stare via 15 giorni senza telefono, l'azienda si fermerebbe?", yes: "💥 Soffri di Oralità Cronica. La tua azienda vive solo nella tua testa.", no: "✅ Libertà. Hai creato un sistema indipendente da te." },
    { q: "Spieghi la stessa procedura a voce ogni volta che arriva un nuovo dipendente?", yes: "💥 Stai clonando il caos, non il sapere. Scrivilo o registralo!", no: "✅ Scalabilità. Le tue procedure sono asset aziendali." },
    { q: "Rispondi a mail o WhatsApp di lavoro dopo le 22:00 o nel weekend?", yes: "💥 Benvenuto nel club dei prigionieri. L'Ansia S.P.A. sta incassando.", no: "✅ Salute. Hai capito che il riposo è parte della produttività." },
    { q: "Senti che l'unico modo per far andare le cose è 'spingere' tu personalmente?", yes: "💥 Sei il motore, ma sei anche il freno a mano tirato della tua crescita.", no: "✅ Leadership. Sai guidare la nave senza dover remare tu." },
  ],
  horeca: [
    { q: "Passi tutto il servizio in cucina perché 'se non controlli tu i piatti escono sbagliati'?", yes: "💥 Sei il collo di bottiglia del tuo ristorante. Se sparisci tu, la cucina muore.", no: "✅ Standard. La tua brigata sa esattamente cosa fare." },
    { q: "La tua carta dei vini è un PDF noioso o un libro polveroso che nessuno legge?", yes: "💥 Stai perdendo margine su ogni bottiglia. Il vino è emozione, non un elenco.", no: "✅ Vendita. Sai come guidare il cliente verso l'alto spending." },
    { q: "Gestisci le prenotazioni e i turni con fogli di carta o messaggi sparsi su WhatsApp?", yes: "💥 Benvenuto nel caos analogico. Stai perdendo tempo (e soldi) in coordinazione.", no: "✅ Digitalizzazione. Il tuo flusso è fluido e tracciabile." },
    { q: "Il tuo magazzino è un mistero e scopri che manca qualcosa solo quando l'ordinazione è al tavolo?", yes: "💥 Gestione amatoriale. Il food cost ti sta mangiando l'utile senza che tu lo sappia.", no: "✅ Controllo. Sai esattamente cosa hai e quanto vale." },
    { q: "Ti capita di fare sconti 'per amicizia' a clienti che occupano il tavolo per ore?", yes: "💥 Stai regalando il tuo margine. Il tavolo è spazio, lo spazio è denaro.", no: "✅ Business. Sai dare valore senza svendere il tuo lavoro." },
    { q: "Le procedure di apertura e chiusura sono solo 'nella testa' dello staff?", yes: "💥 Se il tuo responsabile si licenzia, l'azienda va in tilt. Hai un rischio operativo enorme.", no: "✅ Sistema. Chiunque entri sa come far girare la macchina." },
    { q: "Senti che l'unico modo per avere un servizio perfetto è che tu sia presente fisicamente?", yes: "💥 Sei un ostaggio del tuo locale. Non hai un business, hai un lavoro usurante.", no: "✅ Imprenditore. Il locale gira bene anche se non ci sei." },
    { q: "Il tuo staff si lamenta spesso di non sapere cosa fare o di 'non aver capito' le istruzioni?", yes: "💥 Problema di comunicazione. L'oralità è il nemico della qualità.", no: "✅ Allineamento. Tutti remano nella stessa direzione." },
    { q: "Usi i dati delle vendite per decidere il menu o vai 'a sensazione'?", yes: "💥 Stai scommettendo sul tuo futuro. I dati non mentono, l'istinto a volte sì.", no: "✅ Strategia. Il tuo menu è ottimizzato per il profitto." },
    { q: "Gestisci i fornitori 'a voce' senza un controllo rigoroso delle bolle di consegna?", yes: "💥 Stai regalando soldi ai fornitori per ogni errore di consegna non visto.", no: "✅ Rigore. Ogni centesimo in entrata e uscita è tracciato." },
    { q: "Ti ritrovi a fare il cameriere, il cuoco e il contabile nello stesso turno?", yes: "💥 Sei il 'tuttofare' disperato. Stai ignorando la tua funzione di Manager.", no: "✅ Delegazione. Ognuno fa ciò per cui è pagato." },
    { q: "Senti che l'Ansia S.P.A. è il tuo socio principale ogni volta che apri la porta?", yes: "💥 Sei in modalità sopravvivenza. È ora di passare alla modalità navigazione.", no: "✅ Serenità. Gestisci l'azienda, non lasci che l'azienda gestisca te." },
  ]
};

function TestExorcism({ sector, onComplete }) {
  const questions = questionSets[sector];
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isPositive, setIsPositive] = useState(false);

  const handleAnswer = (isYes) => {
    setIsPositive(isYes);
    if (isYes) setScore(score + 1);
    setShowTip(true);
  };

  const nextQuestion = () => {
    setShowTip(false);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(score);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full px-6 py-12 animate-fade-in">
      <div className="w-full bg-gray-800 h-2 rounded-full mb-12 overflow-hidden">
        <div className="bg-ansia-red h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bg-ansia-dark border-2 border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {!showTip ? (
          <div className="text-center space-y-8">
            <span className="text-ansia-red font-bold uppercase tracking-widest text-sm">
              {sector === 'horeca' ? 'Analisi Horeca' : 'Analisi Aziendale'} - Domanda {currentStep + 1} di 12
            </span>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              {questions[currentStep].q}
            </h3>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleAnswer(true)} className="px-8 py-4 bg-ansia-red text-white font-bold rounded-xl hover:scale-105 transition-all active:scale-95">
                SÌ, SUCCEDE
              </button>
              <button onClick={() => handleAnswer(false)} className="px-8 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-all active:scale-95">
                NO, MAI
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-fade-in">
            <span className={`font-bold uppercase tracking-widest text-sm ${isPositive ? 'text-ansia-red' : 'text-green-500'}`}>
              {isPositive ? 'L\'Analisi dello Schiaffo' : 'Analisi di Controllo'}
            </span>
            <p className={`text-xl md:text-2xl italic leading-relaxed ${isPositive ? 'text-gray-300' : 'text-green-400'}`}>
              "{isPositive ? questions[currentStep].yes : questions[currentStep].no}"
            </p>
            <button onClick={nextQuestion} className="px-8 py-4 bg-white text-ansia-dark font-bold rounded-xl hover:bg-gray-200 transition-all">
              PROSSIMA DOMANDA →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestExorcism;