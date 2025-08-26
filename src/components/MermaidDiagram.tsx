'use client';

import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const loadMermaid = async () => {
      if (typeof window !== 'undefined') {
        // Dynamically import mermaid
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({ 
          startOnLoad: true,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#1e3a5f',
            primaryTextColor: '#fff',
            primaryBorderColor: '#3b82f6',
            lineColor: '#475569',
            secondaryColor: '#1e293b',
            tertiaryColor: '#059669',
            background: '#0f172a',
            mainBkg: '#1e3a5f',
            secondBkg: '#1e293b',
            tertiaryBkg: '#059669',
            textColor: '#e2e8f0',
            lineColor: '#64748b',
            fontSize: '14px'
          }
        });

        if (containerRef.current) {
          containerRef.current.innerHTML = diagram;
          await mermaid.run({
            querySelector: '.mermaid'
          });
        }
      }
    };

    loadMermaid();
  }, [diagram]);

  return (
    <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-lg">
      <div ref={containerRef} className="mermaid text-center min-w-[600px]">
        {diagram}
      </div>
    </div>
  );
};