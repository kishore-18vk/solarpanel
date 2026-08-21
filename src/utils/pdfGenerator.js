/**
 * High quality A4 PDF generation utility for SK PowerTech Quotations.
 * Temporarily resets container scale during capture for high-DPI untainted rendering.
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Converts quotation preview pages into an A4 PDF file and triggers download.
 * @param {React.RefObject} containerRef 
 * @param {string} filename 
 * @param {Function} onProgress 
 */
export async function generateQuotationPDF(containerRef, filename = 'skpowertech_quatation.pdf', onProgress = null) {
  if (!containerRef || !containerRef.current) {
    throw new Error('Quotation preview container not found.');
  }

  const containerEl = containerRef.current;
  const pageElements = containerEl.querySelectorAll('[data-quotation-page]');
  if (!pageElements || pageElements.length === 0) {
    throw new Error('No quotation pages detected to generate PDF.');
  }

  // Preserve original CSS transform style (zoom scale)
  const savedTransform = containerEl.style.transform;
  const savedOrigin = containerEl.style.transformOrigin;

  try {
    // 1. Temporarily reset scale transform so elements render at exact 1:1 A4 dimensions (794px x 1123px)
    containerEl.style.transform = 'none';
    containerEl.style.transformOrigin = 'top left';

    // Force layout reflow
    void containerEl.offsetHeight;

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

      // Render high resolution canvas using html2canvas with oklch color sanitization in onclone
      const canvas = await html2canvas(pageElement, {
        scale: 2.0, // 300 DPI equivalent
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          // 1. Sanitize style tags containing Tailwind v4 oklch rules
          const styleElements = clonedDoc.querySelectorAll('style');
          styleElements.forEach((s) => {
            if (s.innerHTML && s.innerHTML.includes('oklch')) {
              s.innerHTML = s.innerHTML.replace(/oklch\([^)]+\)/g, '#ffffff');
            }
          });

          // 2. Iterate through all cloned elements and replace oklch computed colors with safe fallbacks
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            try {
              const cs = window.getComputedStyle(el);
              ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'boxShadow', 'fill', 'stroke'].forEach((prop) => {
                const val = cs.getPropertyValue(prop);
                if (val && val.includes('oklch')) {
                  if (prop === 'backgroundColor') el.style.backgroundColor = '#ffffff';
                  else if (prop === 'color') el.style.color = '#000000';
                  else if (prop === 'borderColor') el.style.borderColor = '#000000';
                  else if (prop === 'boxShadow') el.style.boxShadow = 'none';
                  else if (prop === 'fill') el.style.fill = '#000000';
                  else if (prop === 'stroke') el.style.stroke = '#000000';
                  else el.style[prop] = 'transparent';
                }
              });

              if (el.getAttribute && el.getAttribute('style')) {
                const styleAttr = el.getAttribute('style');
                if (styleAttr.includes('oklch')) {
                  el.setAttribute('style', styleAttr.replace(/oklch\([^)]+\)/g, '#ffffff'));
                }
              }
            } catch (err) {
              // Ignore computed style errors on unsupported nodes
            }
          });
        },
      });

      // Export canvas to JPEG data URL
      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    // 2. Trigger standard PDF save
    pdf.save(filename);

    // 3. Mobile browser fallback download via Blob
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
      // Fallback handled by pdf.save
    }

  } finally {
    // Restore original zoom transform on preview container
    containerEl.style.transform = savedTransform;
    containerEl.style.transformOrigin = savedOrigin;
  }
}



