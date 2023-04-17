const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
   
    req.body.id_voo = Number(req.body.id_voo)
    req.body.id_passageiro = Number(req.body.id_passageiro)
    req.body.valor = Number(req.body.valor)

    
    let passagem = await prisma.passagem.create({
        data: req.body
    });

    res.status(200).json(passagem).end();
}

const readOne = async (req, res) => {
    let passagem = await prisma.passagem.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            valor:true,
            tipo:true,
            id_voo: true,
            id_passageiro:true,
            poltrona:true,
            descricao:true
        }
    });

    res.status(200).json(passagem).end();
}

const read = async (req, res) => {
    let passagens = await prisma.passagem.findMany({
        select: {
            id:true,
            valor:true,
            tipo:true,
            id_voo: true,
            id_passageiro:true,
            poltrona:true,
            descricao:true
        }
    });

    res.status(200).json(passagens).end();
}


const update = async (req, res) => {
    const passagem = await prisma.passagem.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(passagem).end()
}

const remove = async (req, res) => {
    const passagem = await prisma.passagem.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(passagem).end()
}

const removeStatus = async (req, res) => {
    const passagem = await prisma.passagem.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(passagem).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}