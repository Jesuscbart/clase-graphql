import mongoose from "npm:mongoose@7.6.3";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;   // Se crea un esquema de mongoose

const petSchema = new Schema(   // Se crea el esquema de mongoose
  {
    name: { type: String },                   // Se define el campo name de tipo String
    breed: { type: String },                   // Se define el campo breed de tipo String
  },
  { timestamps: true }  
);  

export type PetModelType = mongoose.Document & Omit<Pet, "id">; // Se crea el tipo CocheModelType que es un Document de mongoose y que tiene todos los campos menos el id

const PetModel = mongoose.model<PetModelType>("Pets", petSchema); //"Coches" es el nombre de la colección en la base de datos

export default PetModel;  // Se exporta el modelo de coche