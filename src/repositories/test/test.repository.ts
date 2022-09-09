import { TestModel } from "../../models/index.ts";

export const getTest = async () => {
  return await TestModel.select().all();
};
