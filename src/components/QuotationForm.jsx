import React from 'react';
import { Zap, Calculator, User, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import { CAPACITY_PRESETS, getDefaultFormData } from '../utils/placeholderUtils';
import { calculateQuotationAmounts } from '../utils/amountUtils';
import { numberToIndianWords } from '../utils/numberToWords';

export default function QuotationForm({ formData, setFormData, onSelectPreset }) {
  // Handle individual field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-update Inverter KW & Doc No when KW changes
      if (name === 'kw') {
        updated.inverterKw = value;
        updated.docNo = `UPS/ 2026-27/QTN071/${value}KW`;
      }
      return updated;
    });
  };

  // Perform calculations for live breakdown in form
  const sysAmt = formData.systemAmount === '' ? 0 : Number(formData.systemAmount);
  const gstPct = formData.gstPercent === '' ? 0 : Number(formData.gstPercent);
  const subAmt = formData.subsidy === '' ? 0 : Number(formData.subsidy);

  const amounts = calculateQuotationAmounts({
    systemAmount: sysAmt,
    gstPercent: gstPct,
    subsidy: subAmt,
  });

  const totalInWords = numberToIndianWords(amounts.totalAmount);

  // Validation checks
  const isSubsidyInvalid = amounts.subsidy > amounts.subtotal && amounts.subtotal > 0;
  const isKwInvalid = !formData.kw || Number(formData.kw) <= 0;

  return (
    <div className="bg-white text-slate-900 rounded-xl shadow-md border border-slate-200 p-6 flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            Solar Quotation Generator
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">Customize plant specs, pricing &amp; client information</p>
        </div>
        <button
          onClick={() => setFormData(getDefaultFormData('10'))}
          className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
          title="Reset Form"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Form
        </button>
      </div>

      {/* QUICK PRESETS (3 KW, 5 KW, 10 KW) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Capacity Selection Presets
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(CAPACITY_PRESETS).map((kwKey) => {
            const isActive = formData.kw === kwKey;
            return (
              <button
                key={kwKey}
                type="button"
                onClick={() => onSelectPreset(kwKey)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm ring-2 ring-amber-400/50'
                    : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isActive ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
                {kwKey} KW Preset
              </button>
            );
          })}
        </div>
      </div>

      {/* VALIDATION WARNINGS */}
      {(isSubsidyInvalid || isKwInvalid) && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-900 flex flex-col gap-1">
          {isKwInvalid && (
            <div className="flex items-center gap-1.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Solar Plant Capacity (KW) cannot be empty or zero.</span>
            </div>
          )}
          {isSubsidyInvalid && (
            <div className="flex items-center gap-1.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Subsidy amount cannot be greater than the subtotal amount.</span>
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: PLANT CAPACITY & HARDWARE */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Settings className="w-4 h-4 text-slate-600" />
          Plant &amp; Hardware Details
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Capacity KW */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Plant Capacity (KW) *
            </label>
            <input
              type="text"
              name="kw"
              value={formData.kw}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-bold text-slate-900 bg-white"
            />
          </div>

          {/* Panel Wattage */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Panel Wattage *
            </label>
            <input
              type="text"
              name="panelWatt"
              value={formData.panelWatt}
              onChange={handleChange}
              placeholder="e.g. 610 W"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          {/* Panel Quantity */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Panel Quantity (Nos) *
            </label>
            <input
              type="number"
              name="panelQty"
              value={formData.panelQty}
              onChange={handleChange}
              placeholder="e.g. 8"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          {/* Panel Make */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Panel Make
            </label>
            <input
              type="text"
              name="panelMake"
              value={formData.panelMake}
              onChange={handleChange}
              placeholder="e.g. V.Guard"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          {/* Inverter Capacity */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Inverter Capacity (KW)
            </label>
            <input
              type="text"
              name="inverterKw"
              value={formData.inverterKw}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          {/* Inverter Phase */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Inverter Phase
            </label>
            <select
              name="inverterPhase"
              value={formData.inverterPhase}
              onChange={handleChange}
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-slate-900 font-semibold"
            >
              <option value="1 Phase">1 Phase</option>
              <option value="3 Phase">3 Phase</option>
            </select>
          </div>

          {/* Inverter Make */}
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Inverter Make
            </label>
            <input
              type="text"
              name="inverterMake"
              value={formData.inverterMake}
              onChange={handleChange}
              placeholder="e.g. V.Guard"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: MANUAL PRICING & SUBSIDY INPUTS */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          Amount &amp; Subsidy Inputs (User Entered)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* System Amount */}
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              System Amount (₹) *
            </label>
            <input
              type="number"
              name="systemAmount"
              value={formData.systemAmount}
              onChange={handleChange}
              placeholder="e.g. 286965"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold text-slate-900 bg-white"
            />
          </div>

          {/* GST Percentage */}
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              GST (%) *
            </label>
            <input
              type="number"
              step="0.1"
              name="gstPercent"
              value={formData.gstPercent}
              onChange={handleChange}
              placeholder="e.g. 8.9"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold text-slate-900 bg-white"
            />
          </div>

          {/* Subsidy Amount */}
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Subsidy (₹)
            </label>
            <input
              type="number"
              name="subsidy"
              value={formData.subsidy}
              onChange={handleChange}
              placeholder="e.g. 78000"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold text-slate-900 bg-white"
            />
          </div>
        </div>

        {/* Live Calculation Summary Box */}
        <div className="bg-slate-900 text-white rounded-lg p-4 flex flex-col gap-2 shadow-inner">
          <div className="flex justify-between text-xs text-slate-300">
            <span>System Amount:</span>
            <span className="font-mono">{amounts.formattedSystemAmount}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-300">
            <span>GST ({amounts.gstPercent}%):</span>
            <span className="font-mono">{amounts.formattedGstAmount}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-300 border-t border-slate-800 pt-1">
            <span>Less Subsidy:</span>
            <span className="font-mono text-amber-400"> - {amounts.formattedSubsidy}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-emerald-400 border-t border-slate-700 pt-2 mt-1">
            <span>Total Payable Amount:</span>
            <span className="font-mono text-base">{amounts.formattedTotalAmount}</span>
          </div>
          <div className="text-[11px] text-amber-300 font-medium italic mt-1 border-t border-slate-800/80 pt-2">
            In Words: {totalInWords}
          </div>
        </div>
      </div>

      {/* SECTION 3: CLIENT & DOCUMENT INFO */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <User className="w-4 h-4 text-blue-600" />
          Client &amp; Quotation Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Mr. Suresh Kumar"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Quotation Date
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Document No
            </label>
            <input
              type="text"
              name="docNo"
              value={formData.docNo}
              onChange={handleChange}
              placeholder="UPS/ 2026-27/QTN071/5KW"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Mobile No
            </label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="+91 93666 53164"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Address
            </label>
            <textarea
              rows={2}
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="Near vishnu mahal, Poolanginaru, Mukkonam, Udumalaipettai, Tamil Nadu 642122"
              className="w-full text-base sm:text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 font-medium bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
