CREATE DATABASE `morfando` ;


CREATE TABLE `morfando`.`USUARIOS` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NOT NULL,
  `identificador` VARCHAR(45) NOT NULL,
  `plataforma` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`));


INSERT INTO `morfando`.`USUARIOS`
(
`nombre`,
`apellido`,
`foto`,
`estado`,
`identificador`,
`plataforma`)
VALUES
(
'Miguel',
'Apellido',
'urlfoto',
'HABILITADO',
'LASLDASHFASDPMGSDA',
'ANDROID');