const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

const create = async (req, res) => {
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err == null) {
          bcrypt.hash(req.body.senha, salt, async function(errCrypto, hash) {
            if(errCrypto == null){
                req.body.senha = hash
              
                const funcionario = await prisma.funcionario.create({
                    data: req.body
                })

                res.status(200).json(funcionario).end()
            } else {
              res.status(500).json(errCrypto).end()
            }
          });
        } else {
          res.status(500).json(err).end()
        }
      })
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
            status: true,
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
    update,
    remove,
    removeStatus,
    read,
    readOne
}