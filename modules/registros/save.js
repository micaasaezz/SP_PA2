const { registros } = require('../db');

module.exports.saveRegistroAPI = (req, res, next) => {
  const registro = new registros({
    ip: req.connection.remoteAddress,
    hora: (new Date()).getHours() + ':' + (new Date()).getMinutes(),
    method: req.method,
    ruta: req.originalUrl
  });
  if (req.decoded) {
    registros.usuario = req.decoded;
  } 

  registro.save((err, data) => {
    if(err) {
      return res.json({ code: 500, data: err });
    }
    req.msg = "acceso a API guardado";
    next();
  });
};