let users: { id: number; name: string; age: number }[] = [];

export const resolvers = {
  Query: {
    hello: () => "hello world from GraphQl",
    greet: (_: unknown, args: { name: string }) => `Hello, ${args.name}`,
    users: () => users,
  },
  Mutation: {
    addUser: (_: unknown, args: { name: string; age: number }) => {
      const newUser = {
        id: users.length + 1,
        name: args.name,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },
  },
};
