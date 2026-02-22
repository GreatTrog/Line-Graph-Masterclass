
import React, { useState, useEffect, useMemo } from 'react';
import { DataPoint, StepId, ChartConfig } from '../types';

interface GraphCanvasProps {
  config: ChartConfig;
  data: DataPoint[];
  currentStepId: StepId;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ config, data, currentStepId }) => {
  const { width, height, margin, xMax, yMax, xInterval, yInterval } = config;
  const [plottingIndex, setPlottingIndex] = useState<number>(-1);
  const [tickRevealIndex, setTickRevealIndex] = useState<number>(-1);

  // Scale functions
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const getX = (val: number) => margin.left + (val / xMax) * chartWidth;
  const getY = (val: number) => height - margin.bottom - (val / yMax) * chartHeight;

  const xTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i <= xMax; i += xInterval) ticks.push(i);
    return ticks;
  }, [xMax, xInterval]);

  const yTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i <= yMax; i += yInterval) ticks.push(i);
    return ticks;
  }, [yMax, yInterval]);

  // Total ticks to animate in Step 3
  const totalTicks = yTicks.length + xTicks.length;

  // Animation logic for Step 3: Draw & Number Axes
  useEffect(() => {
    if (currentStepId === StepId.DRAW_AXES) {
      setTickRevealIndex(0);
      const interval = setInterval(() => {
        setTickRevealIndex(prev => {
          if (prev >= totalTicks) {
            return 0; // Loop the numbering animation
          }
          return prev + 1;
        });
      }, 600); // Reveal a number every 600ms
      return () => clearInterval(interval);
    } else {
      setTickRevealIndex(-1);
    }
  }, [currentStepId, totalTicks]);

  // Animation logic for plotting points
  useEffect(() => {
    if (currentStepId === StepId.PLOT_POINTS) {
      setPlottingIndex(-1);
      const interval = setInterval(() => {
        setPlottingIndex(prev => {
          if (prev >= data.length - 1) {
            return 0; // Loop the plotting step
          }
          return prev + 1;
        });
      }, 2500); // Slower animation for educational purposes
      return () => clearInterval(interval);
    } else {
      setPlottingIndex(-1);
    }
  }, [currentStepId, data.length]);

  const showAxes = currentStepId >= StepId.DRAW_AXES;
  const showLabels = currentStepId >= StepId.LABEL_AXES;
  const showPlot = currentStepId >= StepId.PLOT_POINTS;
  const showLines = currentStepId >= StepId.JOIN_POINTS;
  const showTitle = currentStepId >= StepId.ADD_TITLE;

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="max-w-full h-auto drop-shadow-sm"
        style={{ transition: 'all 0.5s ease-in-out' }}
      >
        {/* Step 2 & 3: Grid Lines - Draw them first so they are in the background */}
        {currentStepId >= StepId.CHOOSE_INTERVAL && (
          <g className="grid-lines">
            {yTicks.map(tick => (
              <line
                key={`y-grid-${tick}`}
                x1={margin.left}
                y1={getY(tick)}
                x2={width - margin.right}
                y2={getY(tick)}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}
            {xTicks.map(tick => (
              <line
                key={`x-grid-${tick}`}
                x1={getX(tick)}
                y1={margin.top}
                x2={getX(tick)}
                y2={height - margin.bottom}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Step 3: Axes */}
        {showAxes && (
          <g className="axes">
            {/* Y Axis */}
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={height - margin.bottom}
              stroke="#475569"
              strokeWidth="2.5"
            />
            {/* X Axis */}
            <line
              x1={margin.left}
              y1={height - margin.bottom}
              x2={width - margin.right}
              y2={height - margin.bottom}
              stroke="#475569"
              strokeWidth="2.5"
            />

            {/* Y Ticks & Numbers - Animated Reveal */}
            {yTicks.map((tick, index) => {
              const isVisible = currentStepId > StepId.DRAW_AXES || (currentStepId === StepId.DRAW_AXES && index < tickRevealIndex);
              return (
                <g key={`y-tick-${tick}`} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
                  <line 
                    x1={margin.left - 5} y1={getY(tick)} 
                    x2={margin.left} y2={getY(tick)} 
                    stroke="#475569" strokeWidth="2" 
                  />
                  <text 
                    x={margin.left - 12} y={getY(tick) + 5} 
                    textAnchor="end" fontSize="14" fill="#64748b" fontWeight="600"
                  >
                    {tick}
                  </text>
                  {/* Visual Highlight for Step 3 specifically */}
                  {currentStepId === StepId.DRAW_AXES && index === tickRevealIndex - 1 && (
                     <circle cx={margin.left} cy={getY(tick)} r="4" fill="#fbbf24" opacity="0.8">
                       <animate attributeName="r" values="4;8;4" dur="0.6s" repeatCount="1" />
                     </circle>
                  )}
                </g>
              );
            })}

            {/* X Ticks & Numbers - Animated Reveal (after Y ticks) */}
            {xTicks.map((tick, index) => {
              const adjustedIndex = index + yTicks.length;
              const isVisible = currentStepId > StepId.DRAW_AXES || (currentStepId === StepId.DRAW_AXES && adjustedIndex < tickRevealIndex);
              return (
                <g key={`x-tick-${tick}`} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
                  <line 
                    x1={getX(tick)} y1={height - margin.bottom} 
                    x2={getX(tick)} y2={height - margin.bottom + 5} 
                    stroke="#475569" strokeWidth="2" 
                  />
                  <text 
                    x={getX(tick)} y={height - margin.bottom + 24} 
                    textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="600"
                  >
                    {tick}
                  </text>
                  {/* Visual Highlight for Step 3 specifically */}
                  {currentStepId === StepId.DRAW_AXES && adjustedIndex === tickRevealIndex - 1 && (
                     <circle cx={getX(tick)} cy={height - margin.bottom} r="4" fill="#fbbf24" opacity="0.8">
                       <animate attributeName="r" values="4;8;4" dur="0.6s" repeatCount="1" />
                     </circle>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Step 4: Labels */}
        {showLabels && (
          <g className="labels animate-fadeIn">
            {/* Y Label */}
            <text
              transform={`rotate(-90, ${margin.left / 3}, ${height / 2})`}
              x={margin.left / 3}
              y={height / 2}
              textAnchor="middle"
              className="font-bold text-slate-800"
              fontSize="16"
            >
              {config.yLabel}
            </text>
            {/* X Label */}
            <text
              x={margin.left + chartWidth / 2}
              y={height - 20}
              textAnchor="middle"
              className="font-bold text-slate-800"
              fontSize="16"
            >
              {config.xLabel}
            </text>
          </g>
        )}

        {/* Step 5: Plotting with "Ruler" visualization */}
        {showPlot && (
          <g className="plot">
            {data.map((p, i) => {
              const isCurrent = currentStepId === StepId.PLOT_POINTS ? i === plottingIndex : i <= data.length;
              const isPermanent = currentStepId > StepId.PLOT_POINTS || (currentStepId === StepId.PLOT_POINTS && i < plottingIndex);
              
              if (!isCurrent && !isPermanent) return null;

              return (
                <g key={`point-${i}`}>
                  {/* Ruler lines for active plotting */}
                  {isCurrent && currentStepId === StepId.PLOT_POINTS && (
                    <g opacity="0.4">
                      <line 
                        x1={getX(p.x)} y1={height - margin.bottom} 
                        x2={getX(p.x)} y2={getY(p.y)} 
                        stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
                      />
                      <line 
                        x1={margin.left} y1={getY(p.y)} 
                        x2={getX(p.x)} y2={getY(p.y)} 
                        stroke="#6366f1" strokeWidth="2" strokeDasharray="4"
                      />
                    </g>
                  )}
                  {/* The Cross Marker */}
                  <g transform={`translate(${getX(p.x)}, ${getY(p.y)})`}>
                    <line x1="-6" y1="-6" x2="6" y2="6" stroke="#4f46e5" strokeWidth="2.5" />
                    <line x1="-6" y1="6" x2="6" y2="-6" stroke="#4f46e5" strokeWidth="2.5" />
                  </g>
                </g>
              );
            })}
          </g>
        )}

        {/* Step 6: Joining lines */}
        {showLines && (
          <g className="lines">
            {data.slice(0, -1).map((p, i) => (
              <line
                key={`line-${i}`}
                x1={getX(p.x)}
                y1={getY(p.y)}
                x2={getX(data[i + 1].x)}
                y2={getY(data[i + 1].y)}
                stroke="#4f46e5"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-grow"
              />
            ))}
          </g>
        )}

        {/* Step 7: Title */}
        {showTitle && (
          <text
            x={width / 2}
            y={35}
            textAnchor="middle"
            className="font-bold text-slate-900"
            fontSize="20"
          >
            {config.mainTitle}
          </text>
        )}
      </svg>
      
      {/* Reminder Overlays for specific steps */}
      {currentStepId === StepId.DRAW_AXES && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg border-2 border-amber-300 shadow-lg text-xs font-bold text-amber-800 animate-bounce max-w-[150px]">
          <i className="fas fa-exclamation-circle mr-1"></i>
          REMEMBER: Numbers go ON the lines!
        </div>
      )}
    </div>
  );
};
