import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, FileText, Smartphone } from 'lucide-react';
import SVGTemplate from './SVGTemplate';

export default function QuotationPreview({ placeholders, previewRef }) {
  // Calculate initial zoom based on screen width for mobile responsiveness
  const getResponsiveDefaultZoom = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 400) return 0.40;
      if (width < 480) return 0.45;
      if (width < 640) return 0.55;
      if (width < 1024) return 0.72;
    }
    return 0.85;
  };

  const [zoom, setZoom] = useState(getResponsiveDefaultZoom);

  // Auto adjust zoom on window resize
  useEffect(() => {
    const handleResize = () => {
      setZoom(getResponsiveDefaultZoom());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3));
  const fitToScreen = () => setZoom(getResponsiveDefaultZoom());

  return (
    <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 flex flex-col h-full overflow-hidden">
      {/* Preview Header Bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-white">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <span className="font-semibold text-xs sm:text-sm">Live Quotation Preview</span>
          <span className="text-[10px] sm:text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            8 Pages (A4)
          </span>
        </div>

        {/* Zoom & Touch Controls */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={zoomOut}
            className="p-2 sm:p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-amber-400 px-1.5 min-w-[45px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 sm:p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Preset Zoom Buttons */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-1 ml-1">
            <button
              onClick={fitToScreen}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                Math.abs(zoom - getResponsiveDefaultZoom()) < 0.02
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              Fit
            </button>
            <button
              onClick={() => setZoom(0.5)}
              className={`hidden sm:inline-block px-1.5 py-1 rounded text-[11px] font-medium transition-colors ${
                Math.abs(zoom - 0.5) < 0.02 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              50%
            </button>
            <button
              onClick={() => setZoom(0.75)}
              className={`hidden sm:inline-block px-1.5 py-1 rounded text-[11px] font-medium transition-colors ${
                Math.abs(zoom - 0.75) < 0.02 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              75%
            </button>
            <button
              onClick={() => setZoom(1.0)}
              className={`px-1.5 py-1 rounded text-[11px] font-medium transition-colors ${
                Math.abs(zoom - 1.0) < 0.02 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Preview Canvas Container */}
      <div className="flex-1 overflow-auto p-2 sm:p-6 flex justify-center bg-slate-950/70 custom-scrollbar">
        <div
          ref={previewRef}
          className="transition-transform origin-top flex flex-col items-center gap-6 sm:gap-8"
          style={{ transform: `scale(${zoom})` }}
        >
          <SVGTemplate placeholders={placeholders} />
        </div>
      </div>
    </div>
  );
}

