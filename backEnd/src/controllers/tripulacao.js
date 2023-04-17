const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
   
    req.body.id_voo = Number(req.body.id_voo)
    req.body.id_piloto = Number(req.body.id_piloto)
    
    let tripulacao = await prisma.tripulacao.create({
        data: req.body
    });

    res.status(200).json(tripulacao).end();
}

const readOne = async (req, res) => {
    let tripulacao = await prisma.tripulacao.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            id_voo: true,
            id_piloto:true,
            copiloto:true,
            comissarios:true,
            engenheiro_voo:true,
            navigator:true,
            tecnico_manutencao:true
        }
    });

    res.status(200).json(tripulacao).end();
}

const read = async (req, res) => {
    let tripulacoes = await prisma.tripulacao.findMany({
        select: {
            id:true,
            id_voo: true,
            id_piloto:true,
            copiloto:true,
            comissarios:true,
            engenheiro_voo:true,
            navigator:true,
            tecnico_manutencao:true
        }
    });

    res.status(200).json(tripulacoes).end();
}


const update = async (req, res) => {
    const tripulacao = await prisma.tripulacao.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(tripulacao).end()
}

const remove = async (req, res) => {
    const tripulacao = await prisma.tripulacao.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(tripulacao).end()
}

const removeStatus = async (req, res) => {
    const tripulacao = await prisma.tripulacao.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(tripulacao).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}