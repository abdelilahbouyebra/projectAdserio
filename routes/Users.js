const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
var  mysql = require('mysql');

var nodemailer = require('nodemailer');

const User = require('../models/User')
const Candidats = require('../models/Candidats')
var bodyParser = require('body-parser');

users.use(bodyParser.urlencoded({ extended: true }))
users.use(bodyParser.json({ type: 'application/*+json' }))
users.use(bodyParser.json())
users.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Database connection
var mysqlConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'adservio'
});
mysqlConn.connect((err)=>{
  if(!err)
      console.log("okkkkkkkkkkkkkkkkkkkkk");
  else
      console.log("errrrrrreur "+JSON.stringify(err,undefined,2));
});

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  console.log("je suis icccccccccccccccccci")
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(decoded.id)
  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
//get All candidats
users.get('/getAllCandidat',function (req,res) {
  Candidats.findAll({}).then(candidats => {
      if (candidats) {
        res.json(candidats)
      } else {
        res.send('candidats does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
});
//get candidat
users.get('/getCandidatById/:id', function(req, res, next) {
    Candidats. User.findOne({
      where: {
        id: req.body.id
      }
    })
    .then(candidats => {
      if (candidats) {
        res.json(candidats)
      } else {
        res.send('candidat does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
});
/* add et update candidat*/
users.post('/addCandidat', (req, res) => {
  var condition = { where :{id: req.body.id} }; 
  options = { multi: true };
  const candidatData = {
     id : req.body.id,
     nom : req.body.nom,
     prenom : req.body.prenom,
     dateEmbouche: req.body.dateEmbouche,
     dateValidCrtSejour : req.body.dateValidCrtSejour,
     postOcupe :req.body.postOcupe,
  }
      if(req.body.id!=null){
          Candidats.update(candidatData,condition,options)
          .then(user => {
            res.json(user)
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      }else{
          Candidats.create(candidatData)
          .then(user => {
            res.json(user)
          })
          .catch(err => {
            res.send('error: ' + err)
        })
      }
      
    })
  /* update etat candidat*/
users.put('/modifEtatCandidat', (req, res) => {
  var condition = { where :{id: req.body.id} }; 
  options = { multi: true };
  const candidatData = {
    dateEntretienInd: req.body.dateEntretienInd,
     visiteMedical : req.body.visiteMedical,
     postOcupe :req.body.postOcupe,
     commentaire:req.body.commentaire,
     entretienIndividuel:req.body.entretienIndividuel,
  }
      if(req.body.id!=null){
          Candidats.update(candidatData,condition,options)
          .then(user => {
            res.json(user)
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } 
    })
    /* update etat candidat*/
users.delete('/deleteCandidat/:id', (req, res) => {
  mysqlConn.query('delete from candidats where id=? ',[req.params.id], function (error, results, fields) {
      if (error) throw error;
      res.send("deleted successeful");
  });
   });
users.get("/verifDateValidEmb",function(req,res){

    mysqlConn.query('select * from candidats where (SELECT TIMESTAMPDIFF(DAY, dateEmbouche,NOW()) as dateEmbouche)>105', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count period d'essai
users.get("/countPerEssai",function(req,res){

    mysqlConn.query('select * ,(SELECT TIMESTAMPDIFF(DAY,dateEmbouche,NOW())) as calcDay,((SELECT TIMESTAMPDIFF(DAY,dateEmbouche,NOW()))) as DffJour from candidats where (SELECT TIMESTAMPDIFF(DAY,dateEmbouche,NOW()) as ss) and isPeriodEsaiValid=0', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count carte sejour
users.get("/countValCarteSej",function(req,res){

    mysqlConn.query('select *,(SELECT TIMESTAMPDIFF(DAY,NOW(),dateValidCrtSejour)) as calcDay,((SELECT TIMESTAMPDIFF(DAY,NOW(),dateValidCrtSejour))) as DffJour from candidats  ', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count dateEntrAnnuel
users.get("/dateEntrAnnuel",function(req,res){

    mysqlConn.query('select * from candidats where (SELECT TIMESTAMPDIFF(MONTH,dateEmbouche,NOW())as dateEmbouche)>=9 and entretienIndividuel=0', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
/* valider periode essai candidat*/
users.put('/validerPeriodeEssai', (req, res) => {
  var condition = { where :{id: req.body.id} }; 
  var nom = req.body.nom; 
  var prenom = req.body.prenom; 
  var dateEm = req.body.dateEmbouche; 
  var postEc = req.body.postOcupe;
  options = { multi: true };
  const candidatData = {
    isPeriodEsaiValid:true,
  }
      if(req.body.id!=null){
          Candidats.update(candidatData,condition,options)
          .then(user => {
            ///////////envoi mail////////////////////
            const output = `<html>
            <head>
              <style>
                .colored {
                  color: blue;
                }
                #body {
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
            <div id='body'>
            <p>Bonjour,</p>
              <p class='colored'>Je vous informe que M.<b>`+nom+` `+prenom+ `</b> est terminé son période d'essai</p>
              <p>Date d'ambouche: `+dateEm+`</p>
              <p>Poste Occupé: `+postEc+`</p>
              <p>Cordialement.</p>
            </div>
          </body>
        </html>
          `;
        
           // create reusable transporter object using the default SMTP transport
           let transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.fr',
            port: 587,
            auth: {
                user: 'ads@adserviolyon.tech', // generated ethereal user
                pass: 'secret01'  // generated ethereal password
            }
          });
        
        
          // setup email data with unicode symbols
          let mailOptions = {
              from: '"Message de test(Gestion des Candidats)" <ads@adserviolyon.tech>', // sender address
              to: 'abdelilah.bouyebra@gmail.com,mounia.abed@adservio.fr,alexandra.blanc@adservio.fr,medali.souissi@adservio.fr', // list of receivers
              subject: 'Candidat validé', // Subject line
              text: 'Hello world?', // plain text body
              html: output // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
              res.render('contact', {msg:'Email has been sent'});
          });
 ///////////fin mail////////////////////
            res.json(user)
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } 
    })

module.exports = users
