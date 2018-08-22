const marinetraffic = require("./marinetraffic");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/lookup", function (req, res) {
    marinetraffic.lookup.v1(req.query.term).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    });
});

app.get("/search", function (req, res) {
    marinetraffic.search(req.query.term, (req.query.page) ? req.query.page : 1).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });
});

app.get("/ship/:mmsi/v1", function (req, res) {
    marinetraffic.ship.info.v1(req.params.mmsi).then((response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });
});

app.get("/ship/:mmsi/v2", function (req, res) {
    marinetraffic.ship.info.v1(req.params.mmsi).then((response) => {
        marinetraffic.ship.info.v2(response.SHIP_ID).then((_response) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(_response);
        }).catch((error) => {
            res.send(error);
        });
    });
});

app.listen(3000, () => console.log("app listening on port 3000."))