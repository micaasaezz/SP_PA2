const express = require('express');
const router = express.Router();
const { materias, inscripciones } = require('../modules/db');
const { authenticateToken } = require('../modules/registros/verify');

router.use(authenticateToken);

router.get('/', (req, res) => {  
  const user = req.decoded;
  if (user.data.tipo === "alumno") {
    const list = inscripciones.find({ idalumno: user.data._id }, 
      { idmateria: 1 }, (err, data) => {
      if (err) {
        return res.json({ code: 500, data: err });
      }
      return res.json({code: 200, data});
    });  
  } else {
    return res.json({ code: 500, data: "only alumno profiles can access to this path" });
  }
});

router.post('/', (req, res) => {
  const user = req.decoded;
  if (user.data.tipo === "admin") {
    const materia = new materias({
      nombre: req.body.nombre,
      cuatrimestre: req.body.cuatrimestre,
      cupos: req.body.cupos
    });
    materia.save((err, data) => {
      if(err) {
        return res.json({ code: 500, data: err });
      }
      return res.json({ code: 201, data: { msg: "materia registrada", data }});
    });
  } else {
    return res.json({ code: 500, data: "only admin profiles can access to this path" });
  }
});

module.exports = router;