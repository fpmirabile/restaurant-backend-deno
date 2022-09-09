CREATE DATABASE `morfandoinc` ;


CREATE TABLE `morfandoinc`.`USUARIOS` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NOT NULL,
  `identificador` VARCHAR(45) NOT NULL,
  `plataforma` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`));
