const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    
    let passageiro = await prisma.passageiro.create({
        data: req.body
    });

    res.status(200).json(passageiro).end();
}

const readOne = async (req, res) => {
    let passageiro = await prisma.passageiro.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id:true,
            id_piloto: true,
            id_veiculo:true,
            data_saida:true,
            destino:true,
            hora:true,
            descricao:true
        }
    });

    res.status(200).json(passageiro).end();
}

const read = async (req, res) => {
    let passageiros = await prisma.passageiro.findMany({
        select: {
            id:true,
            id_piloto: true,
            id_veiculo:true,
            data_saida:true,
            destino:true,
            hora:true,
            descricao:true
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

    res.status(200).json(passageiro).end()
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
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}