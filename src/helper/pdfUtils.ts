import html2pdf from 'html2pdf.js';

/**
 * Generates a PDF from HTML content and downloads it
 * @param htmlContent - The HTML content to convert to PDF
 * @param filename - The filename for the downloaded PDF
 */
export const downloadPDF = (htmlContent: string, filename: string) => {
  const element = document.createElement('div');
  element.innerHTML = htmlContent;

  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(options).from(element).save();
};

/**
 * Fetches PDF content from an API endpoint and triggers download
 * @param endpoint - The API endpoint to fetch the PDF from
 * @param filename - The filename for the downloaded PDF
 */
export const downloadPDFFromAPI = async (endpoint: string, filename: string) => {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};
