const express = require('express');
const router = express.Router();
const { materias, inscripciones, users } = require('../modules/db');
const { authenticateToken } = require('../modules/registros/verify');

router.use(authenticateToken);

router.get('/', (req, res) => {  
  const list = inscripciones.find({ }, (err, data) => {
    if (err) {
      return res.json({ code: 500, data: err });
    }
    return res.json({code: 200, data});
  });
});

router.get('/:idMateria', (req, res) => { 
  const user = req.decoded;
  if (user.data.tipo !== "alumno") { 
    const list = inscripciones.find({ idmateria: req.params.idMateria }, 
      { idalumno: 1 }, async (err, data) => {
      if (err) {
        return res.json({ code: 500, data: err });
      }
      if (data.length > 0) {
        return res.json({code: 200, data});
      } else {
        return res.json({ code: 400, data: "no hay alumnos en esta materia" });    
      }
    });  
  } else {
    return res.json({ code: 500, data: "alumno profiles can not access to this path" });    
  }
});

router.post('/:idMateria', (req, res) => {
  const user = req.decoded;
  if (user.data.tipo === "alumno") {
    const materia = materias.findById(req.params.idMateria, (err, data) => {
      if (err) {
        return res.json({ code: 500, data: err });
      }
      if (data.cupos > 0) {
        const inscripc = new inscripciones({
          idalumno: user.data._id,
          idmateria: req.params.idMateria
        });
        inscripc.save((err, data) => {
          if(err) {
            return res.json({ code: 500, data: err });
          }
          return res.json({ code: 201, data: { msg: "alumno inscripto correctamente", data }});
        });
      } else {
        return res.json({ code: 201, data: { msg: "no hay cupo en esa materia" }});
      }
    });
  } else {
    return res.json({ code: 500, data: "only alumno profiles can access to this path" });
  }
});

module.exports = router;