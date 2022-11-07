import { AppDataSource } from "../../config/database";
import { CommentBuilder } from "../../model/builder/comment.builder";
import { StarsBuilder } from "../../model/builder/stars.builder";
import { Comment, Stars, User } from "../../model/models";
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
    let commentRepository = AppDataSource.getRepository(Comment);
    const starsBD = new StarsBuilder()
      .withStars(stars)
      .withRestaurant(restaurant)
      .withUser(userBD)
      .build();

      const commentBD = new CommentBuilder()
      .withComment(comment)
      .withRestaurant(restaurant)
      .withUser(userBD)
      .build();

      commentRepository.save(commentBD);
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

    return sumatoria/stars.length

  };

  export const getComments = async (
    restaurantId:number
  ) => {
    let commentRepository = AppDataSource.getRepository(Comment);

    const result = [] 

    let comments =  await commentRepository.createQueryBuilder("c")
      .innerJoinAndSelect("c.restaurant", "r")
      .where("r.restaurantId = :restaurantId", {restaurantId: restaurantId})
      .getMany();

     for(let i=0; i<comments.length; i++){
      result.push(comments[i].comment)
     }

      return result

  };