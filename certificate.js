// Requiring the module
const reader = require('xlsx')
const generatePDF2 = require('./generatePDF2.js')
const sendEmail = require('./sendEmail.js')
const express = require('express')
//cc all emails to the following address
const mailcc = 'kunalvrm.iitkgp@gmail.com'
//function to send certificate by email
const sendmail = async (name, email, subject, certif_str) => {
    const mailBody = `
    <div>
    <p> Dear <strong> ${name} </strong> </p>
    <p> Please find your certificate attached.</p>
    </div>
    `

    try {
        console.log('Mail sent to tech coordi');
        await sendEmail({
            to: email,
            cc: mailcc,
            subject: subject,
            html: mailBody,
            attachments: [{
                filename: 'certificate.pdf',
                content: await certif_str,
                encoding: 'uint8'
            }]
        });
    }
    catch (error) {
        console.log(error);
    }
}
const sendCertificate = async (FileBuffer) => {
    // Reading the excel file
    // const file = reader.readFile('./test.xlsx')

    let data = []
    const file = reader.read(FileBuffer, { type: 'buffer' })
    const sheets = file.SheetNames

    //collecting all data from the excel file
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    //loop for each object in the array
    data.forEach((element) => {
        //generate pdf for each object
        const PDFstr = generatePDF2(element.Name, element.Position, element.Hall,element.Event, element.Session, element.Date);
        //send each certificate by email using sendmail function
        sendmail(element.Name, element.Email, 'Your Certificate for ' + element.Event, PDFstr);
    });
}
module.exports = sendCertificate;