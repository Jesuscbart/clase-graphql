import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import PetModel from "../db/pet.ts";

export const Query = {
// Tiene parent y args

    pets: async (_parent: unknown, args: { breed?: string }): Promise <Pet[]> => {

        if (args.breed) {
          const pets = await PetModel.find({ breed: args.breed }).exec();

          const p = pets.map((pet) => {
            return {
              id: pet.id,
              name: pet.name,
              breed: pet.breed,
            };
          })
          return p;
        }

        const pets = await PetModel.find().exec();

        const p = pets.map((pet) => {
          return {
            id: pet.id,
            name: pet.name,
            breed: pet.breed,
          };
        })
        return p;
    },


    pet: async (_parent: unknown, args: { id: string }) => {

        const petID = await PetModel.findOne({ _id: args.id }).exec();

        if (!petID) {
          throw new GraphQLError(`No pet found with id: ${args.id}`, {
            extensions: { code: "not_found" },
          });
        }
        return petID;
    },
}