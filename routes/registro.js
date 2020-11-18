const express = require('express');
const router = express.Router();
const { registros } = require('../modules/db');

router.get('/', (req, res) => {
  const regs = registros.find((err, data) => {
    if (err) {
      return res.json({ code: 400, data: err });
    }
    return res.json({ code: 201, data: data });
  });
});


module.exports = router;