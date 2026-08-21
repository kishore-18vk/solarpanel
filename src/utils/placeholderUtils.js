/**
 * Placeholder engine & preset configurations for Solar Quotation
 * Presets: Only 3 KW and 5 KW as requested.
 * Company Name: S.K. PowerTech
 * Address: Near vishnu mahal , Poolanginaru, Mukkonam, Udumalaipettai, Tamil Nadu 642122
 */
import { calculateQuotationAmounts } from './amountUtils';
import { numberToIndianWords } from './numberToWords';

export const CAPACITY_PRESETS = {
  '3': {
    kw: '3',
    panelWatt: '610 W',
    panelQty: '5',
    panelMake: 'V.Guard',
    inverterKw: '3',
    inverterPhase: '1 Phase',
    inverterMake: 'V.Guard',
  },
  '5': {
    kw: '5',
    panelWatt: '610 W',
    panelQty: '8',
    panelMake: 'V.Guard',
    inverterKw: '5',
    inverterPhase: '1 Phase',
    inverterMake: 'V.Guard',
  },
  '10': {
    kw: '10',
    panelWatt: '610 W',
    panelQty: '16',
    panelMake: 'V.Guard',
    inverterKw: '10',
    inverterPhase: '3 Phase',
    inverterMake: 'V.Guard',
  },
};

export const getDefaultFormData = (capacity = '10') => {
  const preset = CAPACITY_PRESETS[capacity] || CAPACITY_PRESETS['10'];
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  return {
    kw: preset.kw,
    panelWatt: preset.panelWatt,
    panelQty: preset.panelQty,
    panelMake: preset.panelMake,
    inverterKw: preset.inverterKw,
    inverterPhase: preset.inverterPhase,
    inverterMake: preset.inverterMake,
    systemAmount: '550000', // Starting value for 10 KW
    gstPercent: '8.9', // Default starting value (manual entry allowed)
    subsidy: '78000', // Default starting value (manual entry allowed)
    clientName: 'Mr. Suresh Kumar',
    date: dateStr,
    docNo: `UPS/ 2026-27/QTN071/${preset.kw}KW`,
    mobileNo: '+91 93666 53164 / +91 63821 42274',
    companyName: 'S.K. PowerTech',
    address: 'Near vishnu mahal, Poolanginaru, Mukkonam, Udumalaipettai, Tamil Nadu 642122',
  };
};

/**
 * Computes all computed values and placeholder map for the quotation
 */
export function getPlaceholderValues(formData) {
  const sysAmt = formData.systemAmount === '' ? 0 : Number(formData.systemAmount);
  const gstPct = formData.gstPercent === '' ? 0 : Number(formData.gstPercent);
  const subAmt = formData.subsidy === '' ? 0 : Number(formData.subsidy);

  const amounts = calculateQuotationAmounts({
    systemAmount: sysAmt,
    gstPercent: gstPct,
    subsidy: subAmt,
  });

  const totalInWords = numberToIndianWords(amounts.totalAmount);

  return {
    KW: `${formData.kw} KW`,
    KW_NUM: formData.kw,
    PANEL_WATT: formData.panelWatt,
    PANEL_QTY: `${formData.panelQty} Nos`,
    PANEL_QTY_NUM: formData.panelQty,
    PANEL_MAKE: formData.panelMake,
    INVERTER_KW: `${formData.inverterKw || formData.kw} KW`,
    INVERTER_PHASE: formData.inverterPhase,
    INVERTER_MAKE: formData.inverterMake,
    SYSTEM_AMOUNT: amounts.formattedSystemAmount,
    GST_PERCENT: `${amounts.gstPercent} %`,
    GST_PERCENT_NUM: `${amounts.gstPercent}`,
    GST_AMOUNT: amounts.formattedGstAmount,
    SUBSIDY: subAmt > 0 ? `- ${amounts.formattedSubsidy}` : amounts.formattedSubsidy,
    TOTAL_AMOUNT: amounts.formattedTotalAmount,
    TOTAL_IN_WORDS: totalInWords,
    CLIENT_NAME: formData.clientName || 'Mr. Suresh Kumar',
    DATE: formData.date,
    DOC_NO: formData.docNo,
    MOBILE_NO: formData.mobileNo,
    COMPANY_NAME: formData.companyName || 'S.K. PowerTech',
    COMPANY_SUBHEAD: 'SOLAR & UPS POWER SOLUTIONS',
    ADDRESS: formData.address || 'Near vishnu mahal, Poolanginaru, Mukkonam, Udumalaipettai, Tamil Nadu 642122',
  };
}

/**
 * Replace placeholders in string template e.g. {{KW}}
 */
export function replacePlaceholders(templateStr, placeholders) {
  if (!templateStr) return '';
  let result = templateStr;
  Object.keys(placeholders).forEach((key) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, placeholders[key]);
  });
  return result;
}

