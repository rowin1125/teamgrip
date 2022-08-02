export const schema = gql`
  type User {
    id: String!
    email: String!
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    verified: Boolean!
    verifiedToken: String
    roles: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Role {
    ADMIN
    USER
  }

  input ActivateUserInput {
    token: String!
    password: String!
  }

  input ResendActivateUserInput {
    email: String!
  }

  type Mutation {
    activateUser(input: ActivateUserInput!): User! @skipAuth
    resendActivateUser(input: ResendActivateUserInput!): User! @skipAuth
  }
`
