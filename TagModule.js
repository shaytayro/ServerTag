const express = require("express");
const app = express();
var DButilsAzure = require('./DButilsSqlLite');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
app.use(express.json());
secret = "b9o0OWFImQ9iqsyQATsdoejGd4YNYU8JUDTDd39LixbbvxkXcUrOLStTrih9kXUz";
const router=express.Router();

module.exports = router;

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var CVEs=[]
var Descriptions=[]


var authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://tagginapp.auth0.com/.well-known/jwks.json"
    }),
    audience: 'TaggingAppAngular',
    issuer: "https://tagginapp.auth0.com/",
    algorithms: ['RS256']
});

fs.readFile('CVEs-2019.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        for (i=0;i<result.cvrfdoc.Vulnerability.length;i++){
            CVEs[i]=result.cvrfdoc.Vulnerability[i].Title[0]
            Descriptions[i]=result.cvrfdoc.Vulnerability[i].Notes[0].Note[0]._
        }
    });

});

router.post("/GetTagFromTheAlgorithm", authCheck,function(req, res,next) {


    var username = req.user['https://api.exampleco.com/email'];

    DButilsAzure.execSelectQuery(`SELECT NumberOfTags FROM users Where username= '` + username + `'`)
        .then(function (result) {
            if(result==""){
                res.status(400).send({err:"The username not exists"});
                return;
            }
            if(result[0].NumberOfTags==0){
                res.status(400).send({err:"You need to tag for us in order to use this service"});
                return;
            }
            else{
                next();
            }

        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send({err:"The username not exists"});
        });


});
router.post("/GetTagFromTheAlgorithm", authCheck,function(req, res,next) {
    console.log("Call to the algorithm")
    Tokens = req.body.tokens
    CVEID=req.body.CVEID
    for(var m=0;m<Tokens.length;m++){
       Tokens[m]=Tokens[m].replace(",","")
        Tokens[m]=Tokens[m].toLowerCase();
        
    }
    var input =CVEID+" "
        for(x=0;x<Tokens.length;x++){
            input=input+Tokens[x]+" ";
        }

    var net = require('net');
    const utf8 = require('utf8');
    var client = new net.Socket();
    client.connect(2004, '0.0.0.0', function() {
        console.log('Connected');
        client.write(utf8.encode(input));
    });

    client.on('data', function(data) {
        client.destroy();
        var Labels=data.toString().split("\n")
        res.status(200).send(Labels)
        next();



    });

    client.on('close', function() {
        console.log('Connection closed');
    });





        //var Labels = contents.split("\r\n")
        //res.status(200).send(Labels)
       // next();



});
router.post("/GetTagFromTheAlgorithm",authCheck, function(req, res,next) {



var username =  req.user['https://api.exampleco.com/email'];

DButilsAzure.execSelectQuery(`update users set NumberOfTags=NumberOfTags-1 Where username= '` + username + `'`)
    .then(function (result) {

    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send({err:"The username not exists"});
    });


});

router.get("/GetUnTaggedCve",authCheck, function(req, res,next) {
    DButilsAzure.execSelectQuery(`select * FROM AlreadyTaggedCVEs`)
        .then(function (result) {
            ID=[]
            CVEsForPop=[]
            DescriptionForPop=[]
            for(j=0;j<result.length;j++){
                ID[j]=result[j].ID
            }
            var m=0;
            for(var k=0;k<CVEs.length;k++){
                if(!ID.includes(CVEs[k])) {
                    CVEsForPop[m] = CVEs[k];
                    DescriptionForPop[m]=Descriptions[k];
                    m++;
                }
            }

            var i;
            i=Math.floor(Math.random() * CVEsForPop.length);
                    const cve={
                        CveId:CVEsForPop[i],
                        CVEDescription:DescriptionForPop[i]
                    };
                    res.status(200).send(cve)
        })
        .catch(function (err) {
            console.log(err);
        })


});

router.post("/SubmitTag", authCheck,function(req, res,next) {
    DButilsAzure.execQuery("insert into AlreadyTaggedCVEs(ID) values('" + req.body.ID + "')")
        .then(function (result) {
            next();
        })

        .catch(function (err) {
            console.log(err);
        })

});

router.post("/SubmitTag", authCheck,function(req, res,next) {
        words=req.body.WordsList
        Labels=req.body.LabelList
        Promises=[]
        for(i=0;i<words.length;i++) {
                Promises.push(DButilsAzure.execQuery("insert into Tags(CVEID,Position,Word,Tag) values('" + req.body.ID + "','" +i+ "','" + words[i] + "','" + Labels[i] + "')"))
        }
                Promise.all(Promises)
                .then(function (result) {
                    next()
                })

                .catch(function (err) {
                    console.log(err);
                    res.status(400).send("Opps..something worng, please try again")

                })



});

router.post("/SubmitTag", authCheck,function(req, res,next) {
    var userId = req.user['https://api.exampleco.com/email'];

    DButilsAzure.execSelectQuery(`SELECT username FROM users Where username= '` + userId + `'`)
        .then(function (result) {
            if(result == ""){
                next()
            }

            else{
                var query="update users set NumberOfTags=NumberOfTags+10 Where username=" +"\'" + userId+"\'"
                console.log(query)
                DButilsAzure.execSelectQuery(query)
                    .then(function (result) {
                        res.status(200).send("submitted success")
                    })
                    .catch(function (err) {
                        console.log(err)

                    })

            }

        })

        .catch(function (err) {

        })




});

router.post("/SubmitTag", authCheck,function(req, res,next) {
    var userId = req.user['https://api.exampleco.com/email'];
    var query="insert into users(username,NumberOfTags) values(\'" + userId+"\'" +"," + 0 + ")";
    console.log(query)
    DButilsAzure.execSelectQuery(query)
        .then(function (result) {
            res.status(200).send("submitted success")

        })
        .catch(function (err) {
            console.log(err)
        })

})



router.get('/getNumberOfTags',authCheck,(req, res )=> {
  try{
    var username = req.user['https://api.exampleco.com/email'];
}
catch(err){
  res.status(400).send({err:"The username not exists"});
	return;
}

    DButilsAzure.execSelectQuery(`SELECT NumberOfTags FROM users Where username= '` + username + `'`)
        .then(function (result) {
            if(result==""){
                res.status(400).send({err:"The username not exists"});
                return;
            }

            res.status(201).send(result[0])

        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send({err:"The username not exists"});
        });

});

