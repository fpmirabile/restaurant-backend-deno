import { OpenDay } from "../../model/models";

export class OpenDayDTO {
    day: string;
    open: boolean;
    openTime: string;
    closeTime: string;
  
    constructor(
        openDay:OpenDay
    ) {
      this.day = openDay.day;
      this.open = openDay.open;
      this.openTime = openDay.openTime;
      this.closeTime = openDay.closeTime;
    }
  }
  