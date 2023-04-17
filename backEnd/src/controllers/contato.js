const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    req.body.id_passageiro = Number(req.body.id_passageiro)
    let contato = await prisma.contato.create({
        data: req.body
    });

    res.status(200).json(contato).end();
}

const readOne = async (req, res) => {
    let contato = await prisma.contato.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            numero_tel:true,
            id_passageiro:true,
            tipo:true
        }
    });

    res.status(200).json(contato).end();
}

const read = async (req, res) => {
    let contatos = await prisma.contato.findMany({
        select: {
            id:true,
            numero_tel:true,
            id_passageiro:true,
            tipo:true
        }
    });

    res.status(200).json(contatos).end();
}


const update = async (req, res) => {
    const contato = await prisma.contato.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(contato).end()
}

const remove = async (req, res) => {
    const contato = await prisma.contato.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(contato).end()
}

const removeStatus = async (req, res) => {
    const contato = await prisma.contato.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(contato).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}