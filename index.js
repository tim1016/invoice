const express = require('express');
const bodyParser  = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const path = require('path');


const pdfTemplate = require('./documents/createPDF');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// POST ROUTE - PDF generation and fetching the data
app.post('/create-pdf', (req, res) =>{
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/result.pdf`, (err)=>{
        if(err){
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

// GET ROUTE - PDF Download
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
});


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client','build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});


app.listen(port, ()=>{console.log(`listening on ${port}`)});

