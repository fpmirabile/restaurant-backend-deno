import { Stars } from "../../model/models";

export class CommentDTO {
    date: Date;
    name: string;
    comment: string;
    photo: string;
    stars:number
  
    constructor(
        comment:Stars
    ) {
      this.date = comment.date;
      this.name = comment.user.name;
      this.comment = comment.comment;
      this.photo = comment.user.photo;
      this.stars = comment.stars;
    }
  }
  