const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    req.body.valor_Max = Number(req.body.valor_Max)
    req.body.valor_Min = Number(req.body.valor_Min)


    let voo = await prisma.voo.create({
        data: req.body
    })

    res.status(200).json(voo).end()
}

const readOne = async (req, res) => {
    let voo = await prisma.voo.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id: true,
            data_saida: true,
            destino: true,
            hora: true,
            empresa: true,
            valor_Max: true,
            valor_Min: true,
            descricao: true,
            passagens: true,

        }
    })

    res.status(200).json(voo).end()
}

const read = async (req, res) => {
    let manutencoes = await prisma.voo.findMany({
        select: {
            id: true,
            data_saida: true,
            destino: true,
            hora: true,
            empresa: true,
            valor_Max: true,
            valor_Min: true,
            descricao: true,
            passagens: true,
        }
    })

    res.status(200).json(manutencoes).end()
}


const update = async (req, res) => {
    const voo = await prisma.voo.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(voo).end()
}

const remove = async (req, res) => {
    const voo = await prisma.voo.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(voo).end()
}

const removeStatus = async (req, res) => {
    const voo = await prisma.voo.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(voo).end()
}

module.exports = {
    create,
    update,
    remove,
    removeStatus,
    read,
    readOne
}