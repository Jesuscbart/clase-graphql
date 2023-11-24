import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";

export const Query = {
// Tiene parent y args

    pets: (_parent: unknown, args: { breed?: string }): Pet[] => {
        if (args.breed) {
          return pets.filter(p => p.breed === args.breed);
        }
        return pets;
    },

    pet: (_parent: unknown, args: { id: string }): Pet => {
        const {id} = args;
        const p = pets.find(pet => pet.id === id);
        if (!p) throw new GraphQLError("Pet not found");
          return p;
    },

}