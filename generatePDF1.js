const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const generatePDF1 = async (name, pos, event, date) => {
  const existingPdfBytes = fs.readFileSync('./template-1.pdf');
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];


  pdfDoc.registerFontkit(fontkit);
  //load font and embed it to pdf document
  const fontData = fs.readFileSync('./roboto.medium.ttf');
  const font = await pdfDoc.embedFont(fontData);
  firstPage.drawText(name, {
    x: 320,
    y: 280,
    size: 24,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(pos, {
    x: 230,
    y: 270,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(event, {
    x: 490,
    y: 270,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(date, {
    x: 225,
    y: 210,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });


  const pdfBytes = await pdfDoc.save(); 
  return pdfBytes;
};
module.exports = generatePDF1;