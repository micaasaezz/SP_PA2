const express = require('express');
const router = express.Router();
const { users } = require('../modules/db');

router.get('/', (req, res) => {
  const list = users.find(
    (err, data) => {
    if(err) {
      return res.json({ code: 500, data: err });
    }
    return res.json({ code: 200, data });
  });
});

router.post('/', (req, res) => {
  const newUser = new users({
    email: req.body.email,
    nombre: req.body.nombre,
    clave: req.body.clave,
    tipo: req.body.tipo
  });
  newUser.save((err, data) => {
    if(err) {
      return res.json({ code: 500, data: err });
    }
    return res.json({ code: 201, data });
  });
});

module.exports = router;