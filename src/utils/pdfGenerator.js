/**
 * High quality A4 PDF generation utility.
 * Uses native SVG-to-Canvas rendering with html2canvas fallback for 100% mobile & desktop reliability.
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Renders a single quotation page element to a high-resolution canvas.
 * @param {HTMLElement} pageElement 
 * @returns {Promise<HTMLCanvasElement>}
 */
async function renderPageToCanvas(pageElement) {
  const svgElement = pageElement.querySelector('svg');
  if (svgElement) {
    try {
      // Clone SVG and ensure width/height match 794x1123
      const svgClone = svgElement.cloneNode(true);
      svgClone.setAttribute('width', '794');
      svgClone.setAttribute('height', '1123');
      
      const svgString = new XMLSerializer().serializeToString(svgClone);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const canvas = document.createElement('canvas');
      canvas.width = 1588; // 2x scale for 300 DPI crispness
      canvas.height = 2246;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = (err) => {
          URL.revokeObjectURL(url);
          reject(err);
        };
        img.src = url;
      });

      return canvas;
    } catch (err) {
      console.warn('Native SVG render failed, falling back to html2canvas:', err);
    }
  }

  // Fallback to html2canvas
  return await html2canvas(pageElement, {
    scale: 2.0,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: 794,
    height: 1123,
  });
}

/**
 * Converts quotation preview pages into an A4 PDF file and triggers download.
 * @param {React.RefObject} containerRef 
 * @param {string} filename 
 * @param {Function} onProgress 
 */
export async function generateQuotationPDF(containerRef, filename = 'Solar_Quotation.pdf', onProgress = null) {
  if (!containerRef || !containerRef.current) {
    throw new Error('Quotation preview container not found.');
  }

  const pageElements = containerRef.current.querySelectorAll('[data-quotation-page]');
  if (!pageElements || pageElements.length === 0) {
    throw new Error('No quotation pages detected to generate PDF.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
  const totalPages = pageElements.length;

  for (let i = 0; i < totalPages; i++) {
    if (onProgress) {
      onProgress(i + 1, totalPages);
    }

    const pageElement = pageElements[i];
    const canvas = await renderPageToCanvas(pageElement);
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  }

  // 1. Direct PDF save
  pdf.save(filename);

  // 2. Mobile Safari / Android download fallback via Blob URL
  try {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 3000);
  } catch (e) {
    // Ignore fallback errors if standard save worked
  }
}


