import { taskMutation } from './task/taskMutation';
import { taskQuery } from './task/taskQuery';


export const resolvers = {
  Query: {...taskQuery},
  Mutation: {...taskMutation}
};