/**
 * Utility functions for Solar Quotation Amount Calculations and Formatting
 */

/**
 * Format number into Indian Currency format (e.g., 2,86,965.00)
 * @param {number|string} num 
 * @param {boolean} includeSymbol 
 * @returns {string}
 */
export function formatIndianCurrency(num, includeSymbol = true) {
  if (num === null || num === undefined || num === '' || isNaN(Number(num))) {
    return includeSymbol ? 'Rs. 0.00' : '0.00';
  }
  
  const val = Number(num);
  const isNegative = val < 0;
  const absVal = Math.abs(val).toFixed(2);
  const [integerPart, decimalPart] = absVal.split('.');

  let lastThree = integerPart.substring(integerPart.length - 3);
  let otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  
  const result = `${formattedInteger}.${decimalPart}`;
  const prefix = isNegative ? '-' : '';
  const currencyPrefix = includeSymbol ? 'Rs. ' : '';
  return `${prefix}${currencyPrefix}${result}`;
}

/**
 * Calculates GST, Subtotal, and Final Total
 * @param {Object} params
 * @param {number} params.systemAmount
 * @param {number} params.gstPercent
 * @param {number} params.subsidy
 * @returns {Object} Calculated values
 */
export function calculateQuotationAmounts({ systemAmount = 0, gstPercent = 8.9, subsidy = 0 }) {
  const sysAmt = Math.max(0, Number(systemAmount) || 0);
  const gstPct = Math.max(0, Number(gstPercent) || 0);
  const subAmt = Math.max(0, Number(subsidy) || 0);

  const gstAmount = (sysAmt * gstPct) / 100;
  const subtotal = sysAmt + gstAmount;
  const totalAmount = Math.max(0, subtotal - subAmt);

  return {
    systemAmount: sysAmt,
    gstPercent: gstPct,
    gstAmount: gstAmount,
    subtotal: subtotal,
    subsidy: subAmt,
    totalAmount: totalAmount,
    formattedSystemAmount: formatIndianCurrency(sysAmt),
    formattedGstAmount: formatIndianCurrency(gstAmount),
    formattedSubsidy: formatIndianCurrency(subAmt),
    formattedTotalAmount: formatIndianCurrency(totalAmount),
  };
}
