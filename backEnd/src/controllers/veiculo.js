const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    
    let veiculos = await prisma.veiculo.create({
        data: req.body
    });

    res.status(200).json(veiculos).end();
}



const readOne = async (req, res) => {
    let veiculo = await prisma.veiculo.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            empresa: true,
            cod_Idf:true,
            tipo:true,
            status:true,
            manutencoes:true,
            voos:true
        }
    });

    res.status(200).json(veiculo).end();
}

const read = async (req, res) => {
    let veiculos = await prisma.veiculo.findMany({
        select: {
            id:true,
            empresa: true,
            tipo:true,
            status:true,
            cod_Idf:true,
            manutencoes:true,
            voos:true
        }
    });

    res.status(200).json(veiculos).end();
}


const update = async (req, res) => {
    const veiculo = await prisma.veiculo.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(veiculo).end()
}

const remove = async (req, res) => {
    const veiculo = await prisma.veiculo.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(veiculo).end()
}

const removeStatus = async (req, res) => {
    const veiculo = await prisma.veiculo.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(veiculo).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}