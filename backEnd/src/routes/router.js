const express =  require('express')
const router = express.Router()

const Func = require('../controllers/funcionario')
const Voo =  require('../controllers/voo')
const Passageiro =  require('../controllers/passageiro')
const Contato =  require('../controllers/contato')
const Passagem =  require('../controllers/passagem')
const Middleware = require('../middleware/validation')


 
router.post('/funcionarios', Func.create)
router.post('/funcionarios/login', Func.login)
router.put('/funcionarios/:id', Func.update)
router.put('/funcionarios/status/:id', Func.removeStatus)
router.delete('/funcionarios/:id', Func.remove)
router.get('/funcionarios', Func.read)
router.get('/funcionarios/:id', Func.readOne)
router.post('/funcionarios/validate', Middleware.permitir)



router.post('/voos', Voo.create)
router.get('/voos', Voo.read)
router.get('/voos/:id', Voo.readOne)
router.put('/voos/:id', Voo.update)
router.delete('/voos/:id', Voo.remove)
router.put('/voos/:id/status', Voo.removeStatus)

router.post('/passageiros', Passageiro.create)
router.post('/passageiros/crypt', Passageiro.createCrypt)
router.post('/passageiros/login', Passageiro.login)
router.get('/passageiros', Passageiro.read)
router.get('/passageiros/:id', Passageiro.readOne)
router.put('/passageiros/:id', Passageiro.update)
router.delete('/passageiros/:id', Passageiro.remove)

router.post('/contatos', Contato.create)
router.get('/contatos', Contato.read)
router.get('/contatos/:id', Contato.readOne)
router.put('/contatos/:id', Contato.update)
router.delete('/contatos/:id', Contato.remove)



router.post('/passagens', Passagem.create)
router.get('/passagens', Passagem.read)
router.get('/passagens/:id', Passagem.readOne)
router.put('/passagens/:id', Passagem.update)
router.delete('/passagens/:id', Passagem.remove)

module.exports = router