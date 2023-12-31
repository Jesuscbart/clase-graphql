import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./GraphQL/graph-pet.ts";

try{

  const MONGO_URL = Deno.env.get("MONGO_URL");

  if (!MONGO_URL) {
    console.log("No mongo URL found");
  }

  await mongoose.connect(MONGO_URL);
  console.info("Successfully connected to MongoDB");


  const resolvers = { Mutation, Query };

  const server = new ApolloServer({

    typeDefs,
    resolvers: resolvers,
  });

  const {url} = await startStandaloneServer(server, {listen: { port: 3000 }});
  console.log(`🚀 Server ready at ${url}`);

}
catch(e){
  console.error(e);
}   

 
  
