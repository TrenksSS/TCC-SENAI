const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    
    let piloto = await prisma.piloto.create({
        data: req.body
    });

    res.status(200).json(piloto).end();
}

const readOne = async (req, res) => {
    let piloto = await prisma.piloto.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            nome: true,
            cpf:true,
            status:true,
            tripulacoes: true,
            voos:true
        }
    });

    res.status(200).json(piloto).end();
}

const read = async (req, res) => {
    let pilotos = await prisma.piloto.findMany({
        select: {
            id:true,
            nome: true,
            cpf:true,
            status:true,
            tripulacoes: true,
            voos:true
        }
    });

    res.status(200).json(pilotos).end();
}


const update = async (req, res) => {
    const piloto = await prisma.piloto.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(piloto).end()
}

const remove = async (req, res) => {
    const piloto = await prisma.piloto.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(piloto).end()
}



module.exports = {
    create,
    update,
    remove,
    read,
    readOne
}