'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    mermaid: any;
  }
}

interface MermaidDiagramProps {
  diagram: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (typeof window !== 'undefined' && containerRef.current) {
        try {
          // Dynamically import mermaid
          const mermaid = (await import('mermaid')).default;
          
          mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              primaryColor: '#1e3a5f',
              primaryTextColor: '#ffffff',
              primaryBorderColor: '#3b82f6',
              lineColor: '#64748b',
              secondaryColor: '#1e293b',
              tertiaryColor: '#059669',
              background: '#0f172a',
              mainBkg: '#1e3a5f',
              secondBkg: '#1e293b',
              tertiaryBkg: '#059669',
              textColor: '#e2e8f0',
              fontSize: '14px',
              fontFamily: 'monospace'
            },
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              curve: 'basis'
            }
          });

          // Clear container
          containerRef.current.innerHTML = '';
          
          // Create a div for the diagram
          const diagramDiv = document.createElement('div');
          diagramDiv.id = id;
          diagramDiv.innerHTML = diagram;
          containerRef.current.appendChild(diagramDiv);
          
          // Render the diagram
          await mermaid.run({
            nodes: [diagramDiv]
          });
        } catch (error) {
          console.warn('Mermaid diagram rendering fallback triggered');
          // Fallback to showing the raw diagram
          if (containerRef.current) {
            containerRef.current.innerHTML = `<pre style="text-align: left; font-size: 12px; color: #e2e8f0;">${diagram}</pre>`;
          }
        }
      }
    };

    renderDiagram();
  }, [diagram, id]);

  return (
    <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-lg">
      <div ref={containerRef} className="flex justify-center min-w-[600px]">
        <div className="text-gray-400">Loading diagram...</div>
      </div>
    </div>
  );
};