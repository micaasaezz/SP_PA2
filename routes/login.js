const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { users } = require('../modules/db');
const { secretKey } = require('../modules/registros/verify');

router.post('/', (req, res) => {
  if (req.body.email || req.body.nombre) {
    const query = {
      clave: new RegExp('\\b' + req.body.clave + '\\b', 'i' )
    };
    if (req.body.email) {
      query.email = new RegExp('\\b' + req.body.email + '\\b', 'i' );
    } else if (req.body.nombre) {
      query.nombre = new RegExp('\\b' + req.body.nombre + '\\b', 'i' );
    }
    const user = users.findOne(query,
      (err, data) => {
      if (err || !data) {
        return res.json({ code: 400, data: err? err : 'user not found' });
      }
      jwt.sign({ data: data }, secretKey, function(err, token) {
        if (err) {
          return res.json({ code: 500, data: err });
        }
        return res.json({ code: 201, data: token });
      });
    });
  } else {
    return res.json({ code: 500, data: "ingrese nombre o mail de usuario" });
  }
});


module.exports = router;