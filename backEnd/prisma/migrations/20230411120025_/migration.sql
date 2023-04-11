/*
  Warnings:

  - You are about to drop the column `cod_Identificacion` on the `veiculo` table. All the data in the column will be lost.
  - Added the required column `status` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_passageiro` to the `Passagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_voo` to the `Passagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_Idf` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `passagem` DROP FOREIGN KEY `Passagem_id_fkey`;

-- AlterTable
ALTER TABLE `funcionario` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `passagem` ADD COLUMN `id_passageiro` INTEGER NOT NULL,
    ADD COLUMN `id_voo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `cod_Identificacion`,
    ADD COLUMN `cod_Idf` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Passageiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `passaporte` VARCHAR(191) NOT NULL,
    `data_nascimento` VARCHAR(191) NOT NULL,
    `nacionalidade` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_passageiro` INTEGER NOT NULL,
    `numero_tel` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contato` ADD CONSTRAINT `Contato_id_passageiro_fkey` FOREIGN KEY (`id_passageiro`) REFERENCES `Passageiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passagem` ADD CONSTRAINT `Passagem_id_voo_fkey` FOREIGN KEY (`id_voo`) REFERENCES `Voo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passagem` ADD CONSTRAINT `Passagem_id_passageiro_fkey` FOREIGN KEY (`id_passageiro`) REFERENCES `Passageiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
