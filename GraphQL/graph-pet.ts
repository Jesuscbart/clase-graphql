// En graphql cuando es obligatorio se pone exclamacion, cuando es optativo no se pone nada
export const typeDefs = `#graphql
    type Pet {
        id: ID!
        name: String!
        breed: String!
    }

    # Funciones que publico para que el clienta pueda pedir datos
    type Query {

        pets(breed: String): [Pet!]!    # Query pets que devuelve un array de tipo Pet
        pet(id: ID!): Pet! # Query pet recibe un id de tipo ID y devuelve un tipo Pet
    }

    # Funciones que publico para que el clienta pueda enviar datos
    type Mutation {

    addPet(id: ID!, name: String!, breed: String!): Pet!

    deletePet(id: ID!): Pet!

    updatePet(id: ID!, name: String!, breed: String!): Pet!
  }`;