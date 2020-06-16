const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const fs = require("fs")
var mongoose = require('mongoose');
const bodyparser=require("body-parser");




mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true});

//define mongoose schema
var contactschema=mongoose.Schema({
    name:String,
    phone:String,
    mail:String,
    address:String,
    desc:String
  });


var contact=mongoose.model('contact',contactschema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('Home.pug', params);
});

app.get('/Contact', (req, res) => {
    const params = {}
    res.status(200).render('Contact.pug', params);
});
app.post("/Contact", (req, res) => {
    // name = req.body.name;
    // phone = req.body.phone;
    // email = req.body.email;
    // address = req.body.address;
    // desc = req.body.desc;

    // message_to_write = `Client's name ; ${name}\nMobile no. : ${phone}\nEmail : ${email}\nAddress : ${address}\nConcern is : ${desc}`;

    // fs.writeFileSync("form_output.txt", message_to_write);

    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to database successfully");
    }).catch(()=>{
        res.status(400).send("this item was not saved");
    })


    //  const params = { 'message': 'Form has been submitted successfully' };
    // res.status(200).render('Contact.pug', params)
})


//listening on server
app.listen(port, () => {
    console.log(`The output is shown on port number ${port}`);
});
