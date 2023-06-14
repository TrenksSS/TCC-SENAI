-- CreateTable
CREATE TABLE `Funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_piloto` INTEGER NOT NULL,
    `id_veiculo` INTEGER NOT NULL,
    `data_saida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `destino` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `valor_Min` DOUBLE NOT NULL,
    `valor_Max` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passageiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `passaporte` VARCHAR(191) NOT NULL,
    `data_nascimento` VARCHAR(191) NOT NULL,
    `nacionalidade` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'Passageiro',
    `email` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `imagem` VARCHAR(191) NULL,

    UNIQUE INDEX `Passageiro_cpf_key`(`cpf`),
    UNIQUE INDEX `Passageiro_passaporte_key`(`passaporte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_passageiro` INTEGER NOT NULL,
    `numero_tel` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Contato_numero_tel_key`(`numero_tel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `id_voo` INTEGER NOT NULL,
    `id_passageiro` INTEGER NOT NULL,
    `poltrona` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_id_passageiro_fkey` FOREIGN KEY (`id_passageiro`) REFERENCES `Passageiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passagem` ADD CONSTRAINT `Passagem_id_voo_fkey` FOREIGN KEY (`id_voo`) REFERENCES `Voo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passagem` ADD CONSTRAINT `Passagem_id_passageiro_fkey` FOREIGN KEY (`id_passageiro`) REFERENCES `Passageiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
