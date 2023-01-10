var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10
var jwt = require('jsonwebtoken');
const secret = 'LoginWeb'


app.use(cors())

var mysql = require("mysql");
var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
   host: "localhost",
   port: "3306",
   database: "mymariaDB",
   user: "devchon",
   password: "devchon101",
   charset: "utf8mb4",
});

app.listen(3030, function () {
  console.log('CORS-enabled web server listening on port 3030')
})


app.post('/loginADMIN', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
        console.log(err);
        }else {
            connection.query("SELECT * FROM Admin WHERE email = ?", 
            [req.body.email], function (err, Admin, fields) {
                if (err) {
                    res.json({err})
                } else {
                    if (Admin.length == 0) {
                    res.json({data: "Not found"})
                    connection.release();
                    }
                    bcrypt.compare(req.body.password, Admin[0].password, function(err,isLogin) {
                        if(isLogin){
                            var token = jwt.sign({ email: Admin[0].email}, secret, { expiresIn: '1h' });
                            res.json({status:'ok',message: 'login success', token})
                        } else {
                            res.json({status:'error',message: 'login fail'})
                        }
                    });
                }
            });
        }
    });
})


app.post('/loginRESEARCH', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
        console.log(err);
        }else {
            connection.query("SELECT * FROM Researcher WHERE email = ?", 
            [req.body.email, req.body.password], function (err, Admin) {
                if (err) {
                    res.json({err})
                } else {
                    if (Admin.length == 0) {
                    res.json({data: "Not found"})
                    connection.release();
                    }
                    bcrypt.compare(req.body.password, Admin[0].password, function(err,isLogin) {
                        if(isLogin){
                            var token = jwt.sign({email: Admin[0].email}, secret, { expiresIn: '1h' });
                            res.json({status:'ok',message: 'login success', token})
                        } else {
                            res.json({status:'error',message: 'login fail'})
                        }
                    });
                }
            });
        }
    });
})


app.post('/authen', jsonParser,  function (req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1]
        console.log('token',token)
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded})
    }catch(err){
        res.json({status: 'error', maessage: err.message})
    }
})

// app.post('/login', jsonParser,  function (req, res, next) {
//   poolCluster.getConnection(function (err, connection) {
//     if (err) {
//         console.log(err);
//         }else {
//             connection.query("SELECT * FROM Admin WHERE email = ? AND password = ?;",
//             [req.body.email, req.body.password], function (err, rows) {
//                 if (err) {
//                     res.json({err})
//                 } else {
//                     //  console.log(req.body.userName);
//                     //  console.log(req.body.passWord);
//                     if (rows.length == 0) {
//                         res.json({data: "Not found"})
//                         connection.release();
//                     } else {
//                         res.json({rows})
//                         console.log(rows);
//                         console.log(rows.length);
//                         console.log(res.statusCode);
//                         connection.release();
//                     }
//                 }
//             });
//         }
//     });
// })

// app.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     poolCluster.query(
//         "SELECT * FROM Admin WHERE email = ? AND password = ?",
//         [email, password],
//         (err, result) =>{
//             if(err){
//                 res.send({err: err})
//             }

//             if (result){
//                     res.send(result);
//             }else{
//                     res.send({message: "Wrong email/password"});
//             }
//         }
//     );
// });

// app.post('/insertAdmin',  jsonParser, function (req, res, next) {
//     bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//         poolCluster.getConnection(function (err, connection) {
//             if (err) {
//               console.log(err);
//             } else {
//               connection.query("INSERT INTO Admin (name, email, password) VALUES (?,?,?);", 
//             [req.body.name, req.body.email, hash], function (err, rows) {
//                 if (err) {
//               res.json({err})
//                 } else {
//                   connection.release();
//               res.json({rows})
//                 }
//               });
//             }
//           });
//     });
// })

// app.post('/insertResearcher',  jsonParser, function (req, res, next) {
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//       poolCluster.getConnection(function (err, connection) {
//           if (err) {
//             console.log(err);
//           } else {
//             connection.query("INSERT INTO Researcher (name, email, password, phonenumber) VALUES (?,?,?,?);", 
//           [req.body.name, req.body.email, hash, req.body.phonenumber], function (err, rows) {
//               if (err) {
//             res.json({err})
//               } else {
//                 connection.release();
//             res.json({rows})
//               }
//             });
//           }
//         });
//   });
// })