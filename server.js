const express = require('express');
require('dotenv').config({ path: './config.env' });
const sendCertificate = require('./certificate.js');   //module for sending certificates 
const savelocal=require('./savelocal.js');
const app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.json());
const connectDB = require('./config/db');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
//Connect DB
// connectDB();

app.use('/api/auth', require("./routes/auth"));
app.use('/api/private', require("./routes/private"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.route('/upload')
    .post(function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "file") is used to retrieve the uploaded file 
        let FileBuffer = req.files.file.data;
        console.log(FileBuffer);
    sendCertificate(FileBuffer);
        res.sendStatus(200);
    });
process.on('unhandledRejection', (err) => {
    console.log('Unhandled promise rejection', err);
    server.close(() => process.exit(1));
});