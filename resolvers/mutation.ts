import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import { Query } from "../resolvers/query.ts";
import PetModel from "../db/pet.ts";

export const Mutation = {
    Mutation: {
        addPet : async (_parent : unknown, args: { id: string, name: string, breed: string }): Promise <Pet> => {
            const existingPet = await PetModel.findOne({ id: args.id });
            if (existingPet) {
                throw new GraphQLError("Existing id");
            }
            const pet = new PetModel({ id: args.id, name: args.name, breed: args.breed });
            await pet.save();
            return pet;
        },
    },
};