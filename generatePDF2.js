const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const generatePDF2 = async (name, pos, hall,event,session, date) => {
  const existingPdfBytes = fs.readFileSync('./template-2.pdf');
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
    x: 390,
    y: 360,
    size: 24,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(pos, {
    x: 386,
    y: 318,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(hall, {
    x: 110,
    y: 275,
    size: 18,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(event, {
    x: 545,
    y: 275,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(session, {
    x: 500,
    y: 230,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });

  firstPage.drawText(date, {
    x: 448,
    y: 60,
    size: 20,
    font:font,
    color: rgb(0.13, 0.19, 0.42),
  });



  const pdfBytes = await pdfDoc.save(); 
  return pdfBytes;
};
module.exports = generatePDF2;