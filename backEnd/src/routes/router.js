const express =  require('express')
const router = express.Router()

const Piloto = require('../controllers/piloto')




router.post('/pilotos', Piloto.create)
router.get('/pilotos', Piloto.read)
router.get('/pilotos/:id', Piloto.readOne)
router.put('/pilotos/:id', Piloto.update)
router.delete('/pilotos/status/:id', Piloto.remove)
router.delete('/pilotos/:id', Piloto.remove)

module.exports = router;