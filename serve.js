var express = require('express');
var bodyParser = require('body-parser');

const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';

var app = express();

users.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())
var  mysql = require('mysql');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// POST /login gets urlencoded bodies
app.post('/aaa', urlencodedParser, function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })

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


var server = app.listen(8081, function () {
    console.log("listening at http://%s:%s")
})
var User= [{
      id: null,
      last_name: String,
      email:String,
      password: String
    }]
  
//get All candidats
app.get('/getAllCandidat',function (req,res) {
    mysqlConn.query('SELECT * from candidats  ORDER BY id DESC', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
});



//get candidat
app.get('/getCandidatById/:id', function(req, res, next) {
    mysqlConn.query('SELECT * from candidats where id=?',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//delete candidat
app.delete('/deleteCandidat/:id', function(req, res) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    mysqlConn.query('delete from candidats where id=? ',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.send("deleted successeful");
    });
});

//INSERT new product
app.post('/addCandidat', function (req, res) {

    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var dateEmbouche = req.body.dateEmbouche;
    var dateValidCrtSejour = req.body.dateValidCrtSejour;
    var postOcupe = req.body.postOcupe;
    var data = {
        "error": 1,
        "candidats": ""
    };
	console.log('POST Request :: /insert: ');
    if (!!nom && !!prenom) {
        mysqlConn.query("INSERT INTO candidats SET nom = ?, prenom = ?, dateEmbouche = ?, dateValidCrtSejour = ?,postOcupe=?",[nom,  prenom,dateEmbouche,dateValidCrtSejour,postOcupe], function (err, rows, fields) {
				if (!!err) {
					data["candidats"] = "Error Adding data";
					console.log(err);
					console.log(err);
				} else {
					data["error"] = 0;
					data["candidats"] = "candidat Added Successfully";
					console.log("Added: " + [nom, prenom,dateEmbouche,dateValidCrtSejour]);
				}
				res.json(data);
			});
    } else {
        data["candidats"] = "Please provide all required data (i.e : nom,)";
        res.json(data);
    }
});
//UPDATE Product
app.put('/modifCandidat/:id', function (req, res) {
    var id = req.body.id;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var dateEmbouche = req.body.dateEmbouche;
    var dateValidCrtSejour = req.body.dateValidCrtSejour;
    var postOcupe = req.body.postOcupe;
    var data = {
        "error": 1,
        "product": ""
    };

    mysqlConn.query("UPDATE candidats SET nom= ?, prenom = ?, dateEmbouche = ?, dateValidCrtSejour = ?,postOcupe=? WHERE id=?",[nom, prenom, dateEmbouche, dateValidCrtSejour,postOcupe,id], function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error Updating data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["product"] = "Updated Candidat Successfully";

				}
				res.json(data);
			});
});

//UPDATE Product
app.put('/modifEtatCandidat/:id', function (req, res) {
    var id = req.body.id;
   

    var dateEntretienInd = req.body.dateEntretienInd;
    var visiteMedical = req.body.visiteMedical;
    var entretienIndividuel = req.body.entretienIndividuel;
    var commentaire = req.body.commentaire;
    var data = {
        "error": 1,
        "product": ""
    };
	console.log('PUT Request :: /update: ' + id);
    mysqlConn.query("UPDATE candidats SET dateEntretienInd= ?, visiteMedical = ?, entretienIndividuel = ?, commentaire = ? WHERE id=?",[dateEntretienInd, visiteMedical, entretienIndividuel, commentaire,id], function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error Updating data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["product"] = "Updated Candidat Successfully";
				}
				res.json(data);
			});
});

app.get("/verifDateValidEmb",function(req,res){

    mysqlConn.query('select * from candidats where (SELECT TIMESTAMPDIFF(DAY, dateEmbouche,NOW()) as dateEmbouche)>105', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count period d'essai
app.get("/countPerEssai",function(req,res){

    mysqlConn.query('select *  from candidats where (SELECT TIMESTAMPDIFF(DAY,dateEmbouche,NOW()) as dateEmbouche)>=105', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count carte sejour
app.get("/countValCarteSej",function(req,res){

    mysqlConn.query('select * from candidats where   (SELECT TIMESTAMPDIFF(DAY,NOW(),dateValidCrtSejour))>=60 and (SELECT TIMESTAMPDIFF(DAY,NOW(),dateValidCrtSejour))<=70', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//count dateEntrAnnuel
app.get("/dateEntrAnnuel",function(req,res){

    mysqlConn.query('select * from candidats where (SELECT TIMESTAMPDIFF(MONTH,dateEmbouche,NOW())as dateEmbouche)>=9 and entretienIndividuel=0', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})

app.post('/login', (req, res) => {User.findOne({
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
