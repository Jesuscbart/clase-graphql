import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { Pet } from "./types.ts";
import { Query } from "./resolvers/query.ts";
import mongoose from "npm:mongoose@7.6.3";                          //Importo mongoose
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";   //Importo librería para acceder a mi .env


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

try{

  await mongoose.connect(MONGO_URL);   //Conecto a mongo
  console.info("Successfully connected to MongoDB");


  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  const {url} = await startStandaloneServer(server);
  console.log(`🚀 Server ready at ${url}`);

}

catch(e){
  console.error(e);
}   

 
  
