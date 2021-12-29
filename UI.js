var http = require('http');
var formidable = require('formidable');
const nodemailer = require('nodemailer');
var fs = require('fs');
var mysql = require('mysql');
//db connection part
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "form1"
});

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhaveshgarg2004@gmail.com',
        pass: 'NODEJSNODEJS'
    }
});

let mailDetails = {
    from: 'bhaveshgarg2004@gmail.com',
    to: 'deepanshi@mru.edu.in',
    subject: 'Test mail',
    text: 'Node.js testing mail'
};


http.createServer(function (req, res) {

    fs.readFile('index.html', function (err, data) {

        if (err) {
            return console.error(err);
        }
        if (req.url == '/fileupload') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var oldpath = files.UpFile.path;
                var newpath = 'C:/Users/yukti/Nodejs/' + files.UpFile.name;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                   console.log('File Uploaded');
                });
                console.log('fields = ', fields);
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                    } else {
                        console.log('Email sent successfully');
                        // return res.end();
                    }
                });
                con.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    // mysql connection query
                    var sql = "INSERT INTO form VALUES ('" + fields.Name + "','" + fields.Contact + "','" + fields.Email + "','" + fields.Message  + "')";
                    con.query(sql, function (err, result) {
                        if (err){

                            throw err;
                        }
                        console.log("1 record inserted");
                    });
                });
                fs.readFile('Contact.html', function (err1, data1) {
                    if (err) {
                        return console.error(err1);
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        res.write(data1);
                        return res.end();
                    }
                });


            });
        } else {
            if (req.url == '/form.html') {
                fs.readFile('form.html', function (err2, data2) {
                    if (err) {
                        return console.error(err2);
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        res.write(data2);
                        return res.end();
                    }

                });
            } else {
                if (req.url == '/casestudy.html') {
                    fs.readFile('casestudy.html', function (err1, data1) {
                        if (err) {
                            return console.error(err1);
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'text/html'
                            });
                            res.write(data1);
                            return res.end();
                        }

                    });
                } else {
                    if (req.url == '/Contact.html') {
                        // mailTransporter.sendMail(mailDetails, function (err, data) {
                        //     if (err) {
                        //         console.log('Error Occurs', err);
                        //     } else {
                        //         console.log('Email sent successfully');
                        //         return res.end();
                        //     }
                        // });
                        // fs.readFile('Contact.html', function (err1, data1) {
                        //     if (err) {
                        //         return console.error(err1);
                        //     } else {
                        //         res.writeHead(200, {
                        //             'Content-Type': 'text/html'
                        //         });
                        //         res.write(data1);
                        //         return res.end();
                        //     }

                        // });

                    } else {
                        if (req.url == '/Cal.html') {
                            fs.readFile('Cal.html', function (err1, data1) {
                                if (err) {
                                    return console.error(err1);
                                } else {
                                    res.writeHead(200, {
                                        'Content-Type': 'text/html'
                                    });
                                    res.write(data1);
                                    return res.end();
                                }

                            });
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'text/html'
                            });
                            res.write(data);
                            return res.end();
                        }
                    }


                }
            }
        }






    });

}).listen(8080);