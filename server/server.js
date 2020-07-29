require('dotenv').config();
import express from 'express';
import { json } from 'body-parser';
import fetch from 'isomorphic-fetch';
import { list, allow } from 'iptables';

const app = express();
const port = 3001;
let addTcp, addUdp = true;

app.use(json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Max-Age", 3600);

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.status(200).end();
    }
    else {
        //move on
        next();
    }
});

const handleSend = (req, res) => {
    const secret_key = process.env.SECRET_KEY;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response => {
            if(google_response.success) {
                list('INPUT', function(rules) {
                    for(rule in rules) {
                        if(rule.src == req.body.ip) {
                            if(rule.protocol == 'tcp') {
                                addTcp = false;
                            }

                            if(rule.protocol == 'udp') {
                                addUdp = false;
                            }
                        }
                    }

                    if(addTcp) {
                        allow({
                            protocol : tcp,
                            src : req.body.ip,
                            dport : 59867,
                            sudo : true
                        });
                    }

                    if(addUdp) {
                        allow({
                            protocol : udp,
                            src : req.body.ip,
                            dport : 59867,
                            sudo : true
                        });  
                    }
                });
            }
        })
        .then(response => {
            addTcp = true;
            addUdp = true;
            res.json({ response })
        })
        .catch(error => res.json({ error }));
};

app.post('/send', handleSend);
app.listen(port, () => console.log(`Listening on port ${port}!`));