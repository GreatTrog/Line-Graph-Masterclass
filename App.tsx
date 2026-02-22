
import React, { useState } from 'react';
import { StepInstructions } from './components/StepInstructions';
import { DataPanel } from './components/DataPanel';
import { GraphCanvas } from './components/GraphCanvas';
import { STEPS, DATASETS } from './constants';
import { StepId, Dataset } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'menu' | 'graphing'>('menu');
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(DATASETS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const currentStep = STEPS[currentStepIndex];

  const handleStartGraphing = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setCurrentStepIndex(0);
    setView('graphing');
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleBackToMenu = () => {
    setView('menu');
  };

  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>
        
        <div className="max-w-5xl w-full z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Line Graph <span className="text-indigo-600">Masterclass</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Master the art of scientific graphing. Pick a dataset below to learn the step-by-step process of creating a perfect line graph.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATASETS.map((ds) => (
              <button
                key={ds.id}
                onClick={() => handleStartGraphing(ds)}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-left flex flex-col items-start hover:shadow-xl hover:border-indigo-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${ds.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${ds.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{ds.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                  {ds.description}
                </p>
                <div className="flex items-center text-indigo-600 font-bold text-sm">
                  Start Graphing
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </button>
            ))}
          </div>

          <footer className="mt-16 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">
            Science Skills for KS2 Students
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBackToMenu}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Back to Menu"
            >
              <i className="fas fa-home"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{selectedDataset.name}</h1>
              <p className="text-indigo-100 text-xs opacity-90">Science Skill: Line Graph Construction</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Progress</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-indigo-900 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-300 h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold">{currentStepIndex + 1} / {STEPS.length}</span>
                </div>
             </div>
             <button 
                onClick={handleReset}
                className="bg-indigo-800 hover:bg-indigo-900 transition-colors px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
             >
               <i className="fas fa-undo"></i>
               Restart Steps
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Data and Instructions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <DataPanel 
            data={selectedDataset.data} 
            config={selectedDataset.config} 
            currentStepId={currentStep.id} 
          />
          <StepInstructions step={currentStep} />
        </div>

        {/* Right Column: Visualizer */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <GraphCanvas 
            config={selectedDataset.config} 
            data={selectedDataset.data} 
            currentStepId={currentStep.id} 
          />
          
          {/* Controls */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between sticky bottom-4 z-40">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                currentStepIndex === 0 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50 active:scale-95'
              }`}
            >
              <i className="fas fa-chevron-left"></i>
              Previous
            </button>

            <div className="flex gap-2">
              {STEPS.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStepIndex ? 'bg-indigo-600 w-5' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === STEPS.length - 1}
              className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all ${
                currentStepIndex === STEPS.length - 1
                ? 'bg-emerald-100 text-emerald-600 cursor-default'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-95'
              }`}
            >
              {currentStepIndex === STEPS.length - 1 ? 'All Done!' : 'Next Step'}
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] uppercase tracking-wider font-bold">
        Scientific Modeling for KS2 Science Curriculum
      </footer>
    </div>
  );
};

export default App;
