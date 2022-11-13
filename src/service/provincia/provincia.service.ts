import { AppDataSource } from "../../config/database";
import { Localidad, Provincia } from "../../model/models";


export const getProvincias = async () => {
    let provRepository = AppDataSource.getRepository(Provincia);

    return await provRepository.find();
}

export const getLocalidades = async (provincia:number) => {
    let localidadRepository = AppDataSource.getRepository(Localidad);

    return await localidadRepository.createQueryBuilder("l")
        .innerJoin("l.provincia", "p")
        .where("p.id = :provincia", {provincia:provincia})
        .getMany();
}