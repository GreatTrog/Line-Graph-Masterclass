
import React from 'react';
import { GraphStep } from '../types';

interface StepInstructionsProps {
  step: GraphStep;
}

export const StepInstructions: React.FC<StepInstructionsProps> = ({ step }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-full">
      <h3 className="text-xl font-bold text-indigo-700 mb-3">{step.title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">
        {step.description}
      </p>
      
      {step.tip && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md">
          <div className="flex items-start">
            <i className="fas fa-lightbulb text-amber-500 mt-1 mr-3"></i>
            <div>
              <span className="font-semibold text-amber-900 block mb-1 uppercase text-xs tracking-wider">Top Tip</span>
              <p className="text-amber-800 text-sm italic">{step.tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
