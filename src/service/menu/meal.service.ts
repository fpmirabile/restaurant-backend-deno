import { newMeal } from "../../interfaces/restaurant/meal.interface";
import { getRepository } from "typeorm";
import { Meal, Category, PhotoMeal, Ingredient } from "../../model/Models";
import { MealBuilder } from "../../model/builder/meal.builder";
import { CategoryNotExistsError } from "../../error/restaurant/CategoryNotExistsError";
import { MealExistsError } from "../../error/restaurant/MealExistsError";
import cloudinaryService from "../cloudinary/CloudinaryService";
import { MealNotExistsError } from "../../error/restaurant/MealNotExistsError";
import { MealDTO } from "../../dto/menu/meal.dto";

export const addMeal = async (categoryId:number, newMeal:newMeal, userId:number) => {

    const categoryRepository = getRepository(Category)
    
    const category = await categoryRepository.createQueryBuilder('c')
        .innerJoinAndSelect('c.restaurant', 'r')
        .innerJoinAndSelect('r.user', 'u')
        .where("u.userId = :userId", {userId : userId})
        .andWhere("c.categoryId = :categoryId", {categoryId : categoryId})
        .getOne()

    if(!category){
        throw new CategoryNotExistsError()
    }

    const mealRepository = getRepository(Meal)
    let mealBD = await mealRepository.findOne({name : newMeal.name, category: {categoryId : categoryId}})

    if(mealBD){
        throw new MealExistsError()
    }

    let meal = new MealBuilder()
        .withNewMeal(newMeal)
        .withStatus("OPERATIVO")
        .withCategory(category)
        .build()

    meal = await mealRepository.save(meal)
    savePhotosUrls(newMeal.images, meal)
    saveIngredients(newMeal.ingredients, meal)
 
};

const savePhotosUrls = async (photos : string[], meal: Meal) => {
    
    if(photos){
        let photoRepository = getRepository(PhotoMeal);

        for(let i=0; i < photos.length; i++){
            let url = await cloudinaryService.uploadImage(photos[i])
            photoRepository.save(new PhotoMeal(url, meal))
        }
    }
 }

 const saveIngredients = async (ingredients : string[], meal: Meal) => {
    
    if(ingredients){
        let ingredientRepository = getRepository(Ingredient);

        for(let i=0; i < ingredients.length; i++){
            ingredientRepository.save(new Ingredient(ingredients[i], meal))
        }
    }
 }

 export const editMeal = async (mealId:number, newMeal:newMeal, userId:number) => {

    const mealRepository = getRepository(Meal)
    //let mealBD = await mealRepository.findOne({mealId : mealId, status:"OPERATIVO", category:{restaurant:{user:{userId:userId}}}})
    const mealBD = await mealRepository.createQueryBuilder('m')
        .innerJoinAndSelect('m.category', 'c')
        .innerJoinAndSelect('c.restaurant', 'r')
        .innerJoinAndSelect('r.user', 'u')
        .where("u.userId = :userId", {userId : userId})
        .andWhere("m.status = :status", {status : "OPERATIVO"})
        .andWhere("m.mealId = :mealId", {mealId : mealId})
        .getOne()


    if(!mealBD){
        throw new MealNotExistsError()
    }

    const meal = new MealBuilder()
        .withMeal(mealBD)
        .withNewMeal(newMeal)
        .build()
 
    await mealRepository.save(meal)

    if(newMeal.images){
        let photoRepository = getRepository(PhotoMeal);
        photoRepository.delete({meal : {mealId : mealId} })
        savePhotosUrls(newMeal.images, meal)
    }

    if(newMeal.ingredients){
        let ingredientsRepository = getRepository(Ingredient);
        ingredientsRepository.delete({meal : {mealId : mealId} })
        saveIngredients(newMeal.ingredients, meal)
    }
 
 };


 export const getMeal = async (mealId:number) => {

    const mealRepository = getRepository(Meal)
    let mealBD = await mealRepository.findOne({mealId : mealId, status:"OPERATIVO"})
 
    if(!mealBD){
        throw new MealNotExistsError()
    }

    return new MealDTO(mealBD)
 
 };

 export const getAllMeals = async (categoryId:number) => {

    const mealRepository = getRepository(Meal)
    let mealsBD = await mealRepository.find({category:{categoryId:categoryId}, status:"OPERATIVO"})
 
    if(!mealsBD){
        throw new MealNotExistsError()
    }

    const meals = [] 

    for(let i = 0; i<mealsBD.length; i++){
        meals[i] = new MealDTO(mealsBD[i])
    }

    return meals
 
 };

 export const deleteMeal = async (mealId:number, userId:number) => {

    const mealRepository = getRepository(Meal)
    let mealBD = await mealRepository.findOne({mealId : mealId, status:"OPERATIVO", category:{restaurant:{user:{userId:userId}}}})
 
    if(!mealBD){
        throw new MealNotExistsError()
    }

    const newMeal = new MealBuilder()
        .withMeal(mealBD)
        .withStatus("ELIMINADO")
        .build()
 
    await mealRepository.save(newMeal)

 };