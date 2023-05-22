const { PrismaClient } = require('@prisma/client');

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
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

const create = async (req, res) => {
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

              const funcionario = await prisma.funcionario.create({
                data: {
                  nome: req.body.nome,
                  email: req.body.email,
                  senha: req.body.senha,
                  cargo: req.body.cargo,
                  nivel: req.body.nivel,
                  imagem: req.files.imagem[0].filename,
                  status: req.body.status,
                },
              });

              res.status(200).json(funcionario).end();
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

const login = async(req, res) => {
    const funcionario = await prisma.funcionario.findFirstOrThrow({
      where: {
        email: req.body.email
      }
    }).then((value) => {return(value)})
    .catch((err) => {return {"erro": "Funcionário não encontrado", "validation": false}})

    if (funcionario.erro == null) {
      bcrypt.compare(req.body.senha, funcionario.senha).then((value) => {
        if (value) {
          let data = {"uid": funcionario.id, "role": funcionario.nivel}
          jwt.sign(data, process.env.KEY, {expiresIn: '1  h'}, function(err2, token) {
            if(err2 == null){
  
                res.status(200).json({"token": token, "uid": funcionario.id, "uname": funcionario.nome, "nivel": funcionario.nivel, "ufoto": funcionario.imagem, "ucargo": funcionario.cargo, "ustatus": funcionario.status, "validation": true}).end()
            } else {
                res.status(500).json(err2).end()
            }
            
          })  
        } else {
          res.status(201).json({"erro": "Senha inválida", "validation": false}).end()
        }
      })
    } else {
      res.status(404).json(funcionario).end()
    }

    
}

const readOne = async (req, res) => {
    let funcionario = await prisma.funcionario.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            nome: true,
            cargo:true,
            nivel:true,
            email:true,
            imagem:true,
            status: true
        }
    });

    res.status(200).json(funcionario).end();
}

const read = async (req, res) => {
    let funcionarios = await prisma.funcionario.findMany({
        select: {
            id:true,
            nome: true,
            cargo:true,
            nivel:true,
            email:true,
            imagem:true,
            status: true,
        }
    });

    res.status(200).json(funcionarios).end();
}


const update = async (req, res) => {
    const funcionario = await prisma.funcionario.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json({msg:"Deu bom"}).end()
}

const remove = async (req, res) => {
    const funcionario = await prisma.funcionario.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(funcionario).end()
}

const removeStatus = async (req, res) => {
    const funcionario = await prisma.funcionario.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(funcionario).end()
}

module.exports = {
    create,
    login,
    update,
    remove,
    removeStatus,
    read,
    readOne
}

