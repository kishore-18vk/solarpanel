import React, { useState, useRef } from 'react';
import { Download, Sun, Loader2, CheckCircle2, FileDown, Edit3, Eye } from 'lucide-react';
import QuotationForm from './components/QuotationForm';
import QuotationPreview from './components/QuotationPreview';
import { getDefaultFormData, CAPACITY_PRESETS, getPlaceholderValues } from './utils/placeholderUtils';
import { generateQuotationPDF } from './utils/pdfGenerator';

export default function App() {
  const [formData, setFormData] = useState(() => getDefaultFormData('5'));
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('form'); // 'form' | 'preview'

  const previewRef = useRef(null);

  // Handle Preset Button selection (3 KW / 5 KW)
  const handleSelectPreset = (capacityKey) => {
    const preset = CAPACITY_PRESETS[capacityKey];
    if (!preset) return;

    setFormData((prev) => ({
      ...prev,
      kw: preset.kw,
      panelWatt: preset.panelWatt,
      panelQty: preset.panelQty,
      panelMake: preset.panelMake,
      inverterKw: preset.inverterKw,
      inverterPhase: preset.inverterPhase,
      inverterMake: preset.inverterMake,
      docNo: `UPS/ 2026-27/QTN071/${preset.kw}KW`,
      // Retain user entered systemAmount, gstPercent, subsidy
    }));
  };

  // Compute live placeholders
  const placeholders = getPlaceholderValues(formData);

  // PDF Export Handler
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      setDownloadSuccess(false);

      const filename = `skpowertech_quatation.pdf`;

      await generateQuotationPDF(previewRef, filename, (currentPage, totalPages) => {
        setPdfProgress({ currentPage, totalPages });
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF Generation Failed:', err);
      alert(`Failed to generate PDF: ${err.message}`);
    } finally {
      setIsGeneratingPDF(false);
      setPdfProgress(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 lg:pb-0">
      {/* TOP APPLICATION NAVBAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-3 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-white p-1 sm:p-1.5 rounded-xl shadow-lg flex items-center justify-center border border-amber-500/40 shrink-0">
            <img src="/logo.png" alt="S.K. PowerTech Logo" className="h-6 sm:h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
              SK POWERTECH <span className="hidden sm:inline-block text-amber-400 font-medium text-xs border border-amber-500/30 px-2 py-0.5 rounded-full bg-amber-500/10">Quotation Generator</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400">Dynamic Solar Quotation &amp; A4 PDF Export</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Status Message */}
          {downloadSuccess && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              PDF Downloaded!
            </div>
          )}

          {/* Download PDF Button (Header) */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg min-h-[40px] ${
              isGeneratingPDF
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                <span className="hidden sm:inline">Generating PDF ({pdfProgress?.currentPage || 1}/{pdfProgress?.totalPages || 8})...</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 stroke-[2.5]" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE TAB SWITCHER (Visible on screens < 1024px) */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-center gap-2 sticky top-[57px] z-40">
        <button
          onClick={() => setActiveMobileTab('form')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeMobileTab === 'form'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Quotation Form</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('preview')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeMobileTab === 'preview'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live PDF Preview (8 Pages)</span>
        </button>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-3 sm:p-6 max-w-[1800px] w-full mx-auto">
        {/* LEFT COLUMN: INPUT FORM */}
        <div className={`lg:col-span-5 xl:col-span-4 flex flex-col ${activeMobileTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          <QuotationForm
            formData={formData}
            setFormData={setFormData}
            onSelectPreset={handleSelectPreset}
          />
        </div>

        {/* RIGHT COLUMN: REAL-TIME SVG PREVIEW */}
        <div className={`lg:col-span-7 xl:col-span-8 flex flex-col min-h-[70vh] lg:h-[calc(100vh-120px)] lg:sticky lg:top-20 ${activeMobileTab === 'form' ? 'hidden lg:flex' : 'flex'}`}>
          <QuotationPreview
            placeholders={placeholders}
            previewRef={previewRef}
          />
        </div>
      </main>

      {/* FLOATING MOBILE STICKY BOTTOM BAR (Visible on < 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3 z-50 shadow-2xl">
        <button
          onClick={() => setActiveMobileTab(activeMobileTab === 'form' ? 'preview' : 'form')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 active:scale-95 min-h-[44px]"
        >
          {activeMobileTab === 'form' ? (
            <>
              <Eye className="w-4 h-4 text-amber-400" />
              <span>View Preview</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>Edit Form</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs shadow-lg min-h-[44px] active:scale-95 disabled:opacity-50"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Exporting ({pdfProgress?.currentPage || 1}/8)...</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 stroke-[2.5]" />
              <span>Download Quotation PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

