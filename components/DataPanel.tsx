
import React from 'react';
import { DataPoint, StepId, ChartConfig } from '../types';

interface DataPanelProps {
  data: DataPoint[];
  config: ChartConfig;
  currentStepId: StepId;
}

export const DataPanel: React.FC<DataPanelProps> = ({ data, config, currentStepId }) => {
  const isIdentifyingRange = currentStepId === StepId.IDENTIFY_RANGE;
  
  // Calculate min/max for highlighting
  const xValues = data.map(p => p.x);
  const yValues = data.map(p => p.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-widest">Data Table</h4>
        {data.length > 8 && (
          <span className="text-[10px] text-slate-400 italic">Scroll for more ↓</span>
        )}
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-2.5 text-indigo-600 font-bold bg-slate-50">{config.xLabel}</th>
              <th className="px-4 py-2.5 text-indigo-600 font-bold bg-slate-50">{config.yLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point, idx) => {
              const isMinX = point.x === minX && isIdentifyingRange;
              const isMaxX = point.x === maxX && isIdentifyingRange;
              const isMinY = point.y === minY && isIdentifyingRange;
              const isMaxY = point.y === maxY && isIdentifyingRange;

              return (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-indigo-50/30 transition-colors">
                  <td className={`px-4 py-2 font-medium transition-all duration-300 ${isMinX || isMaxX ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-400 ring-inset z-0' : 'text-slate-600'}`}>
                    {point.x}
                  </td>
                  <td className={`px-4 py-2 font-medium transition-all duration-300 ${isMinY || isMaxY ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-400 ring-inset z-0' : 'text-slate-600'}`}>
                    {point.y}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
