---

title: "Next-gen Approach to API Developement: tRPC"
date: "October 27 2023"
excerpt: "Ever wanted type safety and auto-complete between client and server? tRPC does the impossible, lets learn it!!"
cover_image: '/blogs/tRPC.jpeg'

---




# Requirement:

If you wish to code along or follow our example:

- Typescript ( Ensuring type-safety)
- Node And Express ( To have a server)
- Ensure that the client and server are on the same folder.

# Dependencies:

- On the server,
    - trpc server
        
        ```tsx
        npm i @trpc/server
        ```
        
    - zod(input-validation)
        
        ```tsx
        npm i zod
        ```
        
- On the client:
    - trpc client
        
        ```tsx
        npm install @trpc/client
        ```
        

# Getting Started:

## Server-side:

Lets first take a look at an example, to understand various aspects of trpc:

```tsx
import { initTRPC } from 'trpc/server';
import { z } from 'zod';
import cors from "cors"

// Initialize trpc
const t = initTRPC.create();

// Create a router for defining actions
const appRouter = t.router({
  // Define a query called 'sayHi' with no inputs
  sayHi: t.procedure(() => {
    return 'hi';
  }),

  // Define a mutation called 'onValidate' with input validation
  onValidate: t.procedure
    .input(z.object({ userId:z.string() }))
    .query((opts) => {
      // Perform actions with the validated input
      const { input } = opts.input;
      // Log the input to the server or perform other actions
      console.log('Logging:', input);
      return 'Logged successfully';
    }),
});

app = express();

app.use(cors({origin:"http:/localhost:5173"}));

//Implement TRPC middleware based on adapter

// You can now use these actions in your application
const result1 = await appRouter.query.sayHi(); // Call the 'sayHi' query
console.log(result1); // Output: 'hi'

const result2 = await appRouter.mutation.onValidate({ value: 'Log this message' });
console.log(result2); // Output: 'Logged successfully'
```

Let's break down the steps involved in using trpc in a TypeScript application:

1. **Initialize trpc:**
    
    The first step is to initialize trpc using the `initTRPC` function provided by the trpc package. This function sets up the trpc instance, allowing you to define and execute actions.
    
    ```tsx
    import { initTRPC } from 'trpc/server';
    
    // Initialize trpc
    const t = initTRPC.create();
    ```
    
    This code initializes a trpc instance and stores it in the variable `t`. You can then use this instance to define and create actions.
    
2. **Define Actions using a Router:**
    
    To create actions in trpc, you define them within a router. A router is a way to organize and structure your actions, similar to how routes are used in web frameworks like Express.
    
    ```tsx
    // Create a router for defining actions
    const appRouter = t.router({
      // Define a query called 'sayHi' with no inputs
      sayHi: t.procedure(() => {
        return 'hi';
      }),
    
      // Define a mutation called 'onValidate' with input validation
      onValidate: t.procedure
        .input(z.object({ userId:z.string() }))
        .query((opts) => {
          // Perform actions with the validated input
          const { input } = opts.input;
          // Log the input to the server or perform other actions
          console.log('Logging:', input);
          return 'Logged successfully';
        }),
    });
    ```
    
    In this code, a router is created using the `t.router` function. Within the router object, two actions are defined:
    
    - **Query `sayHi`:** This action returns a simple string, 'hi,' when called. It doesn't require any input.
    - **Mutation `onValidate`:** This action accepts input in the form of a string, validates it to ensure it's a string, and then logs the input to the server. It returns a success message.
3. **Use Actions in Your Application:**
    
    Once you've defined your actions, you can use them in your application. You can call these actions to retrieve data (queries) or modify data (mutations).
    
    ```tsx
    // Using the 'sayHi' query
    const result1 = await appRouter.query.sayHi(); // Call the 'sayHi' query
    console.log(result1); // Output: 'hi'
    
    // Using the 'onValidate' mutation
    const result2 = await appRouter.mutation.onValidate({ value: 'Log this message' });
    console.log(result2); // Output: 'Logged successfully'
    
    ```
    
    In this code, we call the `sayHi` query, which returns 'hi,' and the `onValidate` mutation, which logs a message to the server and returns a success message. You can use these actions in your application to interact with your server or data source.
    

### Setting up Middleware:

In our example, we're using Express as our preferred library. To integrate trpc with Express, we need to use the Express adapter. However, trpc supports various adapters, so you can choose the one that suits your project best.

Here's how to set up the Express adapter in your application:

1. First, we need to use the Express-specific code. You can specify a route for your trpc endpoints, such as '/trpc,' but you can also use the root ('/') if you prefer.
    
    ```jsx
    // Express-specific code to set up trpc
    app.use('/trpc', createExpressMiddleware(appRouter));
    ```
    
2. To make this code work, you must import the `createExpressMiddleware` function. This function can be found in the `adapters` folder of the trpc package. You can see that trpc supports various adapters for different frameworks, and in our case, we're using the Express-specific adapter.
    
    ```tsx
    // Import the createExpressMiddleware function
    const { createExpressMiddleware } = require('@trpc/server/adapters/express');
    
    ```
    

Once you've set up the Express middleware, your server will be able to handle trpc requests at the specified route (in this case, '/trpc'). You can then call your 'sayHi' or 'onValidate' procedures through this route. However, it's important to note that you'll also need to implement the corresponding trpc functionality on the client-side to make these requests.

## Client Side:

To set up the client-side library for trpc, follow these steps:

1. **Create the Client:**
    
    In your application, create a client using the `createTRPCProxyClient` function from the client library. 
    
    ```tsx
    import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
    
    // Create a client
    const client = createTRPCProxyClient({
      links: [
        // Configure links for interaction, e.g., HTTP requests
        // In this example, we use the HTTP batch link
        httpBatchLink({
          // Provide the URL of your server
          url: '<http://localhost:3000/trpc>', // Adjust the URL as needed
        }),
      ],
    });
    ```
    
    This code initializes a client that can interact with your trpc server. It uses an HTTP batch link to make requests to the server, which allows you to batch multiple requests into one, reducing network bandwidth usage.
    
2. **Define a Main Function:**
    
    Create a main function to use asynchronous operations with the client. You can use this function to call various trpc procedures.
    
    ```tsx
    async function main() {
      // Example: Call the 'sayHi' query
      const result = await client.sayHi.query();
      console.log(result);
    }
    ```
    
    Within this function, you can use the client to call trpc procedures. In this example, we call the 'sayHi' query.
    
3. **Configure Type Definitions:**
    
    You might notice that you don't get autocomplete or type information for trpc procedures. To enable this, you need to export your types from your server.
    
    In your server (not shown in the provided code), export the type that represents your app router.
    
    ```tsx
    // Export the app router type
    export type AppRouter = typeof appRouter;
    ```
    
    Then, in your client code, import this type and pass it as a generic type parameter when creating the client.
    
    ```tsx
    import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
    import type { AppRouter } from './server/API'; // Adjust the path
    
    // Create a client
    const client = createTRPCProxyClient<AppRouter>({
      links: [
        // Configure links for interaction, e.g., HTTP requests
        // In this example, we use the HTTP batch link
        httpBatchLink({
          // Provide the URL of your server
          url: '<http://localhost:3000/trpc>', // Adjust the URL as needed
        }),
      ],
    });
    ```
    
    By doing this, you enable autocomplete and type checking for your client when calling trpc procedures.
    

By following these steps, you can set up the trpc client library in your application, create a client, and start making requests to your trpc server. Don't forget to configure the type definitions to ensure type safety and autocompletion in your client code.

## Working with Multiple Routers:

### Nesting Routers:

Let’s create a scenario, where we will have multiple routers. In this example, we'll create a `users.ts` file to house the user-specific routing code. Here's a breakdown of the steps:

1. **Create a New File for User Routes:**
    
    Start by creating a new file named `users.ts` in your project. This file will contain the routing code for user-related operations.
    
2. **Define a User Router:**
    
    Inside the `users.ts` file, create a user router using the `t.procedure` function. For example, you can define a "get user" query:
    
    ```tsx
    import { t } from '@trpc/server';
    
    const userRouter = t.router({
      getUser: t.procedure.query(() => {
        // This is a sample implementation - you can replace it with your own logic
        return {
          id: 123,
          name: 'Person',
        };
      }),
    });
    
    export default userRouter;
    ```
    
    In this code, we define a `getUser` query on the user router. It returns a default user object with an ID and a name. Replace this implementation with your own logic as needed.
    
3. **Nest the User Router:**
    
    To include the user router within your app router, you can nest it. Import the `userRouter` and nest it under the desired path, such as 'users' within your app router:
    
    ```tsx
    // Import the user router
    import userRouter from './users';
    
    const appRouter = t.router({
      // ...other app routes
    
      // Nest the user router under the 'users' path
      users: userRouter,
    });
    
    export default appRouter;
    ```
    
    This structure allows you to access the user-related routes under the 'users' namespace within your application.
    
4. **Use the User Routes on the Client:**
    
    On the client side, you can access the user routes by using the `client.users` namespace. For example, calling the `getUser` query:
    
    ```jsx
    const user = await client.users.getUser.query();
    console.log(user);
    ```
    
    The client recognizes the structure, and you can call the specific procedures under the 'users' namespace.
    

By following this approach, you can effectively organize your routes, keep your code modular, and maintain a clear separation of concerns between different parts of your application.

### Merging Routers:

You can actually merge routers at the same level, meaning you can have different routers operate in parallel. To merge them, you can use `t.mergeRouters`, allowing you to combine routes or resources from multiple routers into one. This can be helpful in organizing your API structure.

Here's how you can merge routers:

```tsx
import { mergeRouters } from '@trpc/server';

// Merge the 'appRouter' and 'userRouter' into a single router
export const mergedRouter = mergeRouters(appRouter, userRouter);

```

Now, you have a new `mergedRouter` that includes routes from both `appRouter` and `userRouter`. You can then use this merged router in your application.

On the client-side, when making requests, you can access the user's route like this:

```jsx
// Access the user route, which is no longer nested under 'users'
const user = await client.getuser({ userId: '123' });

```

While merging routers can be useful in some cases, typically, you might want to nest routers inside each other, as you've done before. This allows you to organize your API routes more logically.

To recap, a router is a way to define your API routes, and procedures are what you do at each of those endpoints. You can use `mergeRouters` to combine routers at the same level or nest them within each other to structure your API as needed.

## TRPC Procedures:

With trpc procedures, you have the flexibility to define both specific procedures for tasks like fetching individual users or logging out and generic procedures that can accommodate a range of use cases. These procedures can also inherit properties and input validation rules.

Let's illustrate this by extending our procedures:

1. **Create a Generic User Procedure:**
    
    You can create a generic user procedure that expects a `userId` input, defined as a string:
    
    ```tsx
    import { t } from '@trpc/server';
    import { z } from 'zod';
    
    const userProcedure = t.procedure.input(z.object({userId:z.string()}))
    
    ```
    
    This procedure defines an input property called `userId` and specifies that it should be a string. You can use this input to perform various actions related to users, such as fetching user data, updating user information, or performing other user-specific tasks.
    
2. **Inheriting Input Validation:**
    
    By using the `userProcedure` in other procedures, you inherit its input validation rules. For example:
    
    ```tsx
    const getUserProcedure = userProcedure
      .query((opts) => {
        // Perform the action based on the 'userId' input
        const { userId } = opts.input;
        // Fetch user data by 'userId'
        // Return user information
        return {
          id: userId,
          name: 'User Name',
        };
      });
    
    const logoutProcedure = userProcedure
      .mutation((opts) => {
        // Perform the action based on the 'userId' input
        const { userId } = opts.input;
        // Log out the user with 'userId'
        // Return a success message
        return `Logged out user with ID: ${userId}`;
      });
    
    ```
    
    In this code, the `getUserProcedure` and `logoutProcedure` both use the `userProcedure` as their input validation. This way, you ensure that the 'userId' input is a string in both cases. You can implement specific actions for each procedure, such as fetching user data or logging out a user.
    
3. **Explicit Output Definition:**
    
    To be more explicit about the expected shape of the output, you can define an explicit output type using the `output` property. This is especially useful if you want to enforce a specific output structure and ensure that you're not accidentally exposing sensitive information.
    
    For example, let's say you want to define an output type that includes 'ID' as a string:
    
    ```tsx
    // Define a generic procedure that expects a 'userId' input
    const userProcedure = t.procedure.input((input) => ({
      userId: t.string.validate(input),
    })).output((output) => ({
      id: t.string.validate(output.id), // Explicitly define 'id' as a string
      name: t.string.validate(output.name), // Explicitly define 'name' as a string
    }));
    
    const userQuery = userProcedure.query((opts) => {
      const { userId } = opts.input;
      // Fetch user data based on 'userId'
      // Omit 'password' property to prevent its inclusion in the output
      return {
        id: userId,
        name: 'User Name',
      };
    });
    ```
    
    In this code, the `.output()` method is used to define an explicit output structure, ensuring that 'id' and 'name' are treated as strings. If you attempt to include an undefined property or expose sensitive information (e.g., 'password'), TypeScript will generate an error.
    

Using generic procedures with shared input validation or output validation allows you to streamline your code, maintain consistency, and reduce redundancy when dealing with similar input requirements across different actions related to users. It's a powerful feature of trpc that promotes clean and efficient API design.

## TRPC Context:

In a trpc application, you may need to work with context variables to handle authentication, authorization, and other information that you want to share across your API procedures. 

To ensure type safety when using trpc context, you need to set up a provider that correctly provides the context data to your trpc application. Here's a step-by-step guide:

**Step 1: Create a Context Provider Function**

In your context file (`context.ts`), create a function that returns the context object. You can also set up any default values or logic related to your context data. Make sure the context object has proper TypeScript typings.

```tsx
// context.ts

import { createExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({
	req
  res
}:createExpressContextOptions
) {
  // Your context logic here
}

```

**Step 2: Add Context to Middleware:**

In your server setup or middleware, insert the function to provide the context to your trpc application.

```tsx
// server.ts

// Express-specific code to set up trpc
app.use('/trpc', createExpressMiddleware({
	router:appRouter,
	createContext,
}));
```

**Step 3: Use the Context in trpc Procedures**

With the context provider in place, you can access the context data within your trpc procedures. Here's an example:

```tsx
// trpc.ts
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from "./context"; //adjust the path 

const t = initTRPC
.context<inferAsyncReturnType<typeof createContext>>().create();
```

What we're doing is inferring the return type of our **`createContext`** function. This is a handy function that helps determine the return type.  This function facilitates type safety by automatically deducing the context type based on the returned object. Now, when we revisit the **`users`** file, we can take advantage of this inferred context type.

## TRPC Middleware:

Middleware in trpc allows you to add a layer of logic. In this example, we can modify the context or restrict access to specific procedures. To create middleware, you use **`t.middleware`** in trpc.

```tsx
// trpc.ts
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { createContext } from "./context"; //adjust the path 

const t = initTRPC
.context<inferAsyncReturnType<typeof createContext>>().create();

const checkRole = t.middleware(({ ctx,next }) => {
	if(!ctx.isAdmin) {
	throw new TRPCError({ code: "unauthorized"});
	}
	
	return next({ ctx: { user: { id: 123 }}})
})

export const adminProcedure = t.procedure.use(checkRole)
```

In this example, an `checkRole` middleware is being created to restrict access to only admin users. The middleware checks if the **`CTX.isAdmin`** value is true. If it's not true, it throws a **`trpc`** error with an unauthorized code (401). If the user is an admin, the middleware updates the context with a user object and then calls the **`next`** function.

A procedure that uses this middleware is also defined, named **`adminProcedure`**. This procedure uses the **`use`** method to apply the `checkRole`  middleware. It's important to note that all requests using the  **`adminProcedure`** is only available to admin users.