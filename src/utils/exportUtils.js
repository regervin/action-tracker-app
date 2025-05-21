import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { DOMParser } from '@xmldom/xmldom';
import { saveAs } from 'file-saver';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const printActions = (actions, formData) => {
  const content = generatePrintContent(actions, formData);
  const html = htmlToPdfmake(content);
  
  const docDefinition = {
    content: html,
    styles: {
      'table-header': {
        bold: true,
        fontSize: 13,
        color: 'black',
        fillColor: '#f3f4f6'
      }
    }
  };

  pdfMake.createPdf(docDefinition).print();
};

export const exportToODT = (actions, formData) => {
  const content = generateODTContent(actions, formData);
  const blob = new Blob([content], { type: 'application/vnd.oasis.opendocument.text' });
  saveAs(blob, 'action-items.odt');
};

const generatePrintContent = (actions, formData) => {
  return `
    <div>
      <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">Action Items</h1>
      
      <div style="margin-bottom: 20px;">
        <p><strong>Department:</strong> ${formData.department}</p>
        <p><strong>Responsible Person:</strong> ${formData