var express = require("express");
var bodyParser = require("body-parser");
var mongoDB = require("mongodb");
var objectId = require("mongodb").ObjectId;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = new mongoDB.Db(
  "instagram",
  new mongoDB.Server("localhost", 27017, {}),
  {}
);

app.get("/", (req, res) => {
  res.send({ msg: "ok" });
});

app.post("/api", (req, res) => {
  let dados = req.body;
  db.open((err, mongoClient) => {
    mongoClient.collection("postagens", (err, colletion) => {
      colletion.insert(dados, (err, records) => {
        if (err) {
          res.json(err);
        } else {
          res.json(records);
        }
        mongoClient.close();
      });
    });
  });
});

app.get("/api", (req, res) => {
  db.open((err, mongoClient) => {
    mongoClient.collection("postagens", (err, colletion) => {
      colletion.find().toArray((err, records) => {
        if (err) {
          res.json(err);
        } else {
          res.json(records);
        }
        mongoClient.close();
      });
    });
  });
});

app.get("/api/:id", (req, res) => {
  db.open((err, mongoClient) => {
    mongoClient.collection("postagens", (err, colletion) => {
      colletion.find(objectId(req.params.id)).toArray((err, records) => {
        if (err) {
          res.json(err);
        } else {
          res.json(records);
        }
        mongoClient.close();
      });
    });
  });
});

app.put("/api/:id", (req, res) => {
  db.open((err, mongoClient) => {
    mongoClient.collection("postagens", (err, colletion) => {
      colletion.update(
        {
          _id: objectId(req.params.id)
        },
        {
          $set: { titulo: req.body.titulo }
        },
        {},
        (err, records) => {
          err ? res.json(err) : res.json(records);
          mongoClient.close();
        }
      );
    });
  });
});

app.delete("/api/:id", (req, res) => {
    db.open((err, mongoClient) => {
      mongoClient.collection("postagens", (err, colletion) => {
        colletion.remove(
          {
            _id: objectId(req.params.id)
          },
          (err, records) => {
            err ? res.json(err) : res.json(records);
            mongoClient.close();
          }
        );
      });
    });
  });

var port = 8080;
app.listen(port);
console.log("Server On");
