const express =  require('express')
const router = express.Router()

const Piloto = require('../controllers/piloto')
const Func = require('../controllers/funcionario')
const Veiculo = require('../controllers/veiculo')
const Voo =  require('../controllers/voo')
const Passageiro =  require('../controllers/passageiro')
const Contato =  require('../controllers/contato')




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

router.post('/voos', Voo.create);
router.get('/voos', Voo.read);
router.get('/voos/:id', Voo.readOne);
router.put('/voos/:id', Voo.update);
router.delete('/voos/:id', Voo.remove);
router.put('/voos/:id/status', Voo.removeStatus);

router.post('/passageiros', Passageiro.create);
router.post('/passageiros/crypt', Passageiro.createCrypt);

router.get('/passageiros', Passageiro.read);
router.get('/passageiros/:id', Passageiro.readOne);
router.put('/passageiros/:id', Passageiro.update);
router.delete('/passageiros/:id', Passageiro.remove);
router.put('/passageiros/:id/status', Passageiro.removeStatus);

router.post('/contatos', Contato.create)
router.get('/contatos', Contato.read)
router.get('/contatos/:id', Contato.readOne)
router.put('/contatos/:id', Contato.update)
router.delete('/contatos/:id', Contato.remove)

module.exports = router;