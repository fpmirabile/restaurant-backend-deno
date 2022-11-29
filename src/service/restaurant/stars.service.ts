import { AppDataSource } from "../../config/database";
import { CommentDTO } from "../../dto/restaurant/comment.dto";
import { StarsBuilder } from "../../model/builder/stars.builder";
import { Stars, User } from "../../model/models";
import { getRestaurantById } from "./restaurant.service";

export const addStars = async (
    stars: number,
    userId: number,
    restaurantId:number,
    comment:string
  ) => {
    let userRepository = AppDataSource.getRepository(User);
    const userBD = await userRepository.findOne({ where: { userId: userId } });
    const restaurant = await getRestaurantById(restaurantId);

    let starsRepository = AppDataSource.getRepository(Stars);
    const starsBD = new StarsBuilder()
      .withStars(stars)
      .withRestaurant(restaurant)
      .withUser(userBD)
      .withComment(comment)
      .build();

      starsRepository.save(starsBD);

  };

  export const getStars = async (
    restaurantId:number
  ) => {
    let starsRepository = AppDataSource.getRepository(Stars);

    const stars = await starsRepository.find({where:{restaurant: {restaurantId : restaurantId}}});

    if(!stars || stars.length ==0){
      return 0;
    }

    let sumatoria = 0;

    for(let i=0; i<stars.length; i++){
      sumatoria = sumatoria+stars[i].stars;
    }

    return parseInt((sumatoria/stars.length).toString())

  };

  export const getComments = async (
    restaurantId:number
  ) => {

    let starsRepository = AppDataSource.getRepository(Stars);

    const result = [] 

    let comments =  await starsRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.restaurant", "r")
      .innerJoinAndSelect("c.user", "u")
      .where("r.restaurantId = :restaurantId", {restaurantId: restaurantId})
      .getMany();

    for(let i=0; i<comments.length; i++){
      result.push(new CommentDTO(comments[i]))
    }

    return result

  };