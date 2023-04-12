const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

const create = async (req, res) => {
    
    let passageiro = await prisma.passageiro.create({
        data: req.body
    });

    res.status(200).json(passageiro).end();
}

const createCrypt = async (req, res) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err == null) {
              bcrypt.hash(req.body.senha, salt, async function(errCrypto, hash) {
                if(errCrypto == null){
                    req.body.senha = hash
                  
                    const passageiro = await prisma.passageiro.create({
                        data: req.body
                    })
    
                    res.status(200).json(passageiro).end()
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
    let passageiro = await prisma.passageiro.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            nome: true,
            cpf: true,
            passaporte: true,
            data_nascimento: true,
            nacionalidade: true,
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
            passaporte: true,
            data_nascimento: true,
            nacionalidade: true,
            passagens: true,
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

const removeStatus = async (req, res) => {
    const passageiro = await prisma.passageiro.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(passageiro).end()
}

module.exports = {
    createCrypt,
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}