import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import PetModel from "../db/pet.ts";

export const Mutation = {

    addPet : async (_parent : unknown, args: { id: string, name: string, breed: string }) => {

        try {
            if (!args.name || !args.breed) {
                throw new GraphQLError("Name and breed missing", {
                    extensions: { code: "missing_data" },
                });
            }

            const newPet = new PetModel({ id: args.id, name: args.name, breed: args.breed });
            await newPet.save();
            return newPet;
        }
        catch (error) {
            console.error(error);
            throw new GraphQLError(`Error saving pet with name: ${args.name}`, {
                extensions: { code: "server_error" },
            });
        }
    },

    deletePet: async (_: unknown, args: { id: string }) => {

        try {
            const pet = await PetModel.findByIdAndDelete(args.id).exec();
            return pet;
        }
        catch (error) {
            console.error(error);
            throw new GraphQLError(`Error deleting pet with id: ${args.id}`, {
                extensions: { code: "server_error" },
            });
        }
    },


    updatePet: async (_: unknown, args: { id: string; name: string; breed: string } ) => {

        try{
            if(!args.id || !args.name || !args.breed){
                throw new GraphQLError("Name and breed missing", {
                    extensions: { code: "missing_data" },
                });
            }

            const updatedPet = await PetModel.findByIdAndUpdate(
                args.id,
                { name: args.name, breed: args.breed },
                { new: true }
            )
            .exec();

            return updatedPet;
        }
        catch(error){
            console.error(error);
            throw new GraphQLError(`Error updating pet with id: ${args.id}`, {
                extensions: { code: "server_error" },
            });
        }
    },

};