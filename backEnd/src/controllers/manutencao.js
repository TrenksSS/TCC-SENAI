const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
   
    req.body.valor = Number(req.body.valor)
    req.body.id_veiculo = Number(req.body.id_veiculo)
    
    let manutencao = await prisma.manutencao.create({
        data: req.body
    });

    res.status(200).json(manutencao).end();
}

const readOne = async (req, res) => {
    let manutencao = await prisma.manutencao.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            id_veiculo: true,
            data_inicio:true,
            data_fim:true,
            descricao:true,
            valor:true
        }
    });

    res.status(200).json(manutencao).end();
}

const read = async (req, res) => {
    let manutencoes = await prisma.manutencao.findMany({
        select: {
            id:true,
            id_veiculo: true,
            data_inicio:true,
            data_fim:true,
            descricao:true,
            valor:true
        }
    });

    res.status(200).json(manutencoes).end();
}


const update = async (req, res) => {
    const manutencao = await prisma.manutencao.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(manutencao).end()
}

const remove = async (req, res) => {
    const manutencao = await prisma.manutencao.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(manutencao).end()
}

const removeStatus = async (req, res) => {
    const manutencao = await prisma.manutencao.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(manutencao).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}