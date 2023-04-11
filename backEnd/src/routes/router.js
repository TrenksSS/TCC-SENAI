const express =  require('express')
const router = express.Router()

const Piloto = require('../controllers/piloto')
const Func = require('../controllers/funcionario')
const Veiculo = require('../controllers/veiculo')






router.post('/pilotos', Piloto.create)
router.get('/pilotos', Piloto.read)
router.get('/pilotos/:id', Piloto.readOne)
router.put('/pilotos/:id', Piloto.update)
router.put('/pilotos/status/:id', Piloto.removeStatus)
router.delete('/pilotos/:id', Piloto.remove)
 
router.post('/funcionario', Func.create)
router.put('/funcionario/:id', Func.update)
router.put('/funcionario/status/:id', Func.removeStatus)
router.delete('/funcionario/:id', Func.remove)
router.get('/funcionario', Func.read)
router.get('/funcionario/:id', Func.readOne)

router.post('/veiculo', Veiculo.create)
router.put('/veiculo/:id', Veiculo.update)
router.delete('/veiculo/:id', Veiculo.remove)
router.get('/veiculo', Veiculo.read)
router.get('/veiculo/:id', Veiculo.readOne)

module.exports = router;