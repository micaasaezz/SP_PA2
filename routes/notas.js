const express = require('express');
const router = express.Router();
const { notas } = require('../modules/db');
const { authenticateToken } = require('../modules/registros/verify');

router.use(authenticateToken);

router.get('/', (req, res) => {  
  const list = notas.find({ }, (err, data) => {
    if (err) {
      return res.json({ code: 500, data: err });
    }
    return res.json({code: 200, data});
  });
});

router.put('/:idMateria', (req, res) => {
  const user = req.decoded;
  if (user.data.tipo === "profesor") {
    if (!req.body.idalumno && !req.body.nota) {
      return res.json({ code: 500, data: "idalumno and nota params not sended" });    
    }
    const nota = new notas({
      idalumno: req.body.idalumno,
      idmateria: req.params.idMateria,
      nota: req.body.nota
    });
    nota.save((err, data) => {
      if(err) {
        return res.json({ code: 500, data: err });
      }
      return res.json({ code: 201, data: { msg: "nota guardada", data }});
    });
  } else {
    return res.json({ code: 500, data: "only profesor profiles can access to this path" });    
  }
});

module.exports = router;