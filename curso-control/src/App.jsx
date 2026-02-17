import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Llms } from './pages/Llms';
import { Pathologies } from './pages/Pathologies';
import { Control } from './pages/Control';

// Home component inline for simplicity or move to pages/Home.jsx
const Home = () => (
  <div className="prose prose-invert prose-lg max-w-none animate-in fade-in zoom-in-95 duration-500">
    <h1 className="text-5xl font-black bg-gradient-to-r from-control-primary via-indigo-500 to-control-accent bg-clip-text text-transparent mb-6 tracking-tight">
      Curso C.O.N.T.R.O.L.
    </h1>
    <p className="lead text-2xl text-slate-300 font-light mb-12">
      Domina la ingeniería de prompts con un framework sistemático y profesional.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
      <a href="/llms" className="group block p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-control-primary/50 hover:bg-slate-900/80 transition-all hover:shadow-lg hover:shadow-control-primary/10">
        <div className="w-12 h-12 rounded-lg bg-control-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-control-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-control-primary transition-colors">Fundamentos Sólidos</h3>
        <p className="text-slate-400 text-sm leading-relaxed">Entiende cómo "piensan" los modelos de lenguaje, desde la atención hasta la predicción probabilística.</p>
      </a>

      <a href="/control" className="group block p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-control-accent/50 hover:bg-slate-900/80 transition-all hover:shadow-lg hover:shadow-control-accent/10">
        <div className="w-12 h-12 rounded-lg bg-control-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-control-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-control-accent transition-colors">Metodología C.O.N.T.R.O.L.</h3>
        <p className="text-slate-400 text-sm leading-relaxed">Aplica las 7 fases del framework para obtener resultados consistentes y libres de alucinaciones.</p>
      </a>
    </div>

    <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
      <p>Progreso guardado localmente en tu navegador.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="llms" element={<Llms />} />
          <Route path="pathologies" element={<Pathologies />} />
          <Route path="control" element={<Control />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
