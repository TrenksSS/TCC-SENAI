const { PrismaClient } = require('@prisma/client');

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.originalname.split('.')[0] +
        '-' +
        datetimestamp +
        '.' +
        file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  },
});

const upload = multer({ storage });

const createCrypt = async (req, res) => {
  upload.fields([
    { name: 'imagem', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      res.status(500).json({ error: 1, payload: err }).end();
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err == null) {
          bcrypt.hash(req.body.senha, salt, async function (errCrypto, hash) {
            if (errCrypto == null) {
              req.body.senha = hash;

              const passageiro = await prisma.passageiro.create({
                data: {
                  nome: req.body.nome,
                  cpf: req.body.cpf,
                  passaporte: req.body.passaporte,
                  data_nascimento: req.body.data_nascimento,
                  nacionalidade: req.body.nacionalidade,
                  email: req.body.email,
                  senha: req.body.senha,
                  imagem: req.files.imagem[0].filename,
                },
              });

              res.status(200).json(passageiro).end();
            } else {
              res.status(500).json(errCrypto).end();
            }
          });
        } else {
          res.status(500).json(err).end();
        }
      });
    }
  });
};

const create = async (req, res) => {
    
  let passageiro = await prisma.passageiro.create({
      data: req.body
  });

  res.status(200).json(passageiro).end();
}
    
const login = async(req, res) => {
  const passageiro = await prisma.passageiro.findFirstOrThrow({
          where: {
            email: req.body.email
          }
        }).then((value) => {return(value)})
        .catch((err) => {return {"erro": "Passageiro não encontrado", "validation": false}})
    
        if (passageiro.erro == null) {
          bcrypt.compare(req.body.senha, passageiro.senha).then((value) => {
            if (value) {
              let data = {"uid": passageiro.id, "role": passageiro.role}
              jwt.sign(data, process.env.KEY, {expiresIn: '1  h'}, function(err2, token) {
                if(err2 == null){
      
                    res.status(200).json({"token": token, "uid": passageiro.id, "uname": passageiro.nome, "role": passageiro.role, "validation": true}).end()
                } else {
                    res.status(500).json(err2).end()
                }
                
              })  
            } else {
              res.status(201).json({"erro": "Senha inválida", "validation": false}).end()
            }
          })
        } else {
          res.status(404).json(passageiro).end()
        }
    
        
    }


const readOne = async (req, res) => {
    let passageiro = await prisma.passageiro.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            nome: true,
            cpf: true,
            imagem: true,
            passaporte: true,
            data_nascimento: true,
            nacionalidade: true,
            email: true,
            passagens: true,
            contatos: true
        }
    });

    res.status(200).json(passageiro).end();
}

const read = async (req, res) => {
    let passageiros = await prisma.passageiro.findMany({
        select: {
            id:true,
            nome: true,
            cpf: true,
            imagem: true,

            passaporte: true,
            data_nascimento: true,
            nacionalidade: true,
            passagens: true,
            email: true,
            contatos: true
        }
    });

    res.status(200).json(passageiros).end();
}


const update = async (req, res) => {
    const passageiro = await prisma.passageiro.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json({msg:"Deu bom"}).end()
}

const remove = async (req, res) => {
    const passageiro = await prisma.passageiro.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(passageiro).end()
}



module.exports = {
    createCrypt,
    create,
    login,
    update,
    remove,
    read,
    readOne
}