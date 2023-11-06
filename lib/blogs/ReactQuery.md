---
title: "Your Server-state Management Solution: React Query"
date: "October 20 2023"
excerpt: "Ever tried using fetch and useEffect to fetch queries?? Yeah its painfull. If that's the case React-Query is your next destination, let look into it!!"
cover_image: '/blogs/react-query.jpeg'

---



## Requirements:

- React (I am using React, you can use any framework you like)

## Dependencies:

- react-query
    
    ```jsx
    npm i @tanstack/react-query
    ```
    

## Getting Started:

To get started with TanStack Query, the first essential step is to create a provider that wraps around your entire application or, at the very least, any parts of your application where you intend to use React Query (which, let's face it, is likely to be most of your application). You can do this by following these steps:

1. Import the necessary modules from the `@tan-stack/react-query` library, which you have previously installed. These modules include the `queryClient` and the `QueryClientProvider`. You can do this with the following code:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
```

1. Next, you'll want to place the `QueryClientProvider` component around your entire application. A common approach is to include it within your top-level `index.tsx` component. Here's an example of how you can structure this

```jsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

1. In the code snippet above, we create an instance of the `QueryClient` and wrap our entire application with the `QueryClientProvider`. The `QueryClientProvider` is responsible for managing the client's state and provides React Query's functionality throughout your app.
2. While initializing the `queryClient`, you can also pass default configuration options and settings according to your needs, but for simplicity, you can leave it with the defaults for now.

In React Query, the primary operations you can perform are queries and mutations. Let's delve into these two key concepts:

### Query

- A query is an operation used to retrieve data from a data source, such as an API, a database, or any other external service.
- It's typically used for fetching and displaying information to the user.
- For example, if you want to retrieve a list of posts from a server and display them in your application, you would use a query to fetch that data.
- Queries in React Query provide features like caching, automatic data refetching, and more, making it easy to manage and display data in your application.

Let's take a closer look at how to use a query with React Query. To use a query, you typically call the **`useQuery`** hook. 

```jsx
import { useQuery } from '@tanstack/react-query'
```

This hook takes an object as an argument, which contains several options. However, there are two crucial properties you need to focus on:

1. **`queryKey`**:
    - The **`queryKey`** is a unique identifier for your query. It helps React Query keep track of different queries.Lets have an example where we are trying to query posts, here we can specify the **`queryKey`** as an array with a single string element, which is 'post'. This serves as a unique label for your query.
2. **`queryFn`** (or **`queryFunction`**):
    - The **`queryFn`** is a function that runs to fetch your data. It's asynchronous and should return a Promise. In this case, we want to simulate a delay of one second (using **`setTimeout` , cause I am not using a backend**) and then return an array of all your posts. If the query, results in an error. The error will be present in the `isError` attribute of the query(explained later):

```jsx
function delay(duration: number) {
	// Simulate a 1-second delay
  return new Promise((resolve) => setTimeout(resolve, duration));
}

//Your supposed-to-be server data
const posts = [
  { id: 123, title: "You are learning react-query" },
  { id: 456, title: "thank you for reading" },
];

//inside some component
// Fetch and return your posts data
const postsQuery = useQuery({
    queryKey: ["post"],
		// if you want information from the query key inside the query fn,
		// you can pass it as a parameter in the query fn eg ({ queryKey }) => ...
    queryFn: () => delay(1000).then(() => [...posts]), 
  });
```

Let's proceed to implement the post query. We'll handle the loading state and error state using conditional statements:

**Loading State:**

If the `postsQuery.isLoading` property is `true`, it means that the query is in a loading state. In this case, we want to display a message that indicates loading.

```jsx
if (postsQuery.isLoading) {
  return <h1>Loading</h1>;
}
```

**Error State:**

If the `postsQuery.isError` property is `true`, it means an error has occurred.

```jsx
if (postsQuery.isError) {
  return (
    <pre>{JSON.stringify(postQuery.error)}</pre>
  );
}
```

Note, if the query returns an error, it will be displayed in a JSON format. In this example, it's simulating errors by rejecting a promise, and React Query will retry the query function by default until it succeeds or until it fails multiple times in a row. You might notice longer loading times because of the automatic retry behavior.

**********Data:**********

If we are not in the loading state and we have not encountered an error, it means our query has been successful, and our data is available. In this case, we can iterate over the data and render elements for each of our posts.

```jsx
return <div>
  {postsQuery.data?.map((post) => (
    <div key={post.id}>{post.title}</div>
  ))}
</div>
```

### **Mutation:**

- A mutation is an operation used to modify or change data on the server or an external data source.
- It's commonly used for actions like creating, updating, or deleting data.
- For example, if you want to create a new post on a server, update a user's profile, or delete a comment, you would use a mutation to make these changes.
- Mutations in React Query offer features like automatic optimistic updates and rollback, making it safer and more efficient to manage data modifications.

Let's discuss how to perform a mutation in React Query. Similar to **`useQuery`**, you can use **`useMutation`** for performing mutations. In this example, we want to create a new post. Here's how to set up a mutation:

1. Define the Mutation Function:
    - You define a mutation function that returns a Promise. This function represents the action you want to perform, such as creating a new post.
        
        ```jsx
        const createPostMutation = useMutation({
            mutationFn: (title: string) => {
              return delay(1000).then(() =>
        				// Create a new post with a randomly generated ID
                posts.push({ id: crypto.randomUUID(), title })
              );
            },
          });
        ```
        
2. Trigger the Mutation:
    - You can use the **`newPostMutation.mutate()`** function to trigger the mutation when you want to create a new post. For example, you might call this function in response to a user action, like submitting a form.
    
    ```jsx
    newPostMutation.mutate('New Post Title');
    ```
    
3. Handle the Result:
    - The **`useMutation`** hook provides properties and methods for handling the mutation's result, such as **`isLoading`**, **`isError`**, and **`data`**
        
        ```jsx
        if (newPostMutation.isLoading) {
          // Display a loading indicator
        } else if (newPostMutation.isError) {
          // Handle the error
        } else if (newPostMutation.isSuccess) {
          // Handle the success, newPostMutation.data will contain the created post
        }
        ```
        

### Invalidate Queries

When performing a mutation that changes the underlying data for a specific query key, you may want to set up an `onSuccess` callback to handle the successful data update. To do this, you can use the `useQueryClient` hook to access the query client and then use it to invalidate the affected query. Here's how to set up the `onSuccess` callback:

1. Define the `onSuccess` Callback:
In your mutation configuration, you can specify an `onSuccess` callback. This callback will be executed when the mutation is successful. Within this callback, you can use the `useQueryClient` hook to access the query client and invalidate the relevant query. In your example, you want to invalidate the `posts` query to trigger a refetch.
    
    ```jsx
    const queryClient = useQueryClient();
    
      const newPostMutation = useMutation({
        mutationFn: (title: string) => {
          return delay(1000).then(() =>
            posts.push({ id: crypto.randomUUID(), title })
          );
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] }); // Invalidate all queries starting with the query key  'posts'
        },
      });
    ```
    
2. Perform the Mutation:
You can trigger the mutation using `newPostMutation.mutate()` as previously shown.
    
    ```jsx
    newPostMutation.mutate('New Post Title');
    ```
    
3. Handle the Refetch:
When the mutation is successful and the `onSuccess` callback is executed, the `queryClient.invalidateQueries('posts')` line will invalidate the 'posts' query, prompting it to refetch its data.

## Refetching Mechanism:

React Query provides smart and efficient background data fetching, making it easy to keep your data up to date without manual intervention. Here's how it works:

1. **Automatic Data Refetching:**
React Query automatically checks if your data is stale. When you switch between different pages or remount a component using the `useQuery` hook, React Query checks if the data is stale (outdated) and needs to be refetched. If it determines that the data is stale, it triggers a refetch in the background.
2. **Background Refetch:**
The background refetching process is seamless. It allows you to see the cached version of the data while the new data is being fetched in the background. This ensures that your application remains responsive and the user doesn't experience a jarring delay.
3. **Fetch Status:**
The `fetchStatus` property in the query object helps you understand the current state of the data fetching process. It can have one of the following values:
    - `idle`: The query is not actively fetching data and is using the cached data.
    - `fetching`: The query is currently in the process of fetching data.
    - `paused`: If the query was actively fetching data but encounters a pause due to connectivity issues or other reasons.

This automatic background refetching and status management are powerful features of React Query. It ensures that your application always presents up-to-date data to users without manual intervention. The framework takes care of managing the entire data lifecycle, from caching to fetching to background updates, making your application more responsive and user-friendly.

### Various Methods for Managing Data Staleness:

React Query provides a default behavior where data fetched via queries immediately transitions to the "stale" state once retrieved. If you want to change this default behavior and control when data becomes stale, you can adjust the "stale time” under “defaultOptions” in `QueryClient`

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Set the stale time to 5 minutes (in milliseconds)
    },
  },
});
```

However this method can also be implement for a specfic query rather than all queries:

```jsx
const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => delay(1000).then(() => [...posts]),
    staleTime: 1000, // Set the stale time to 1 second (in milliseconds) for this query
  });
```

Similarly, we can adjust the `refetch interval` which can have the same effect:

```jsx
const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => delay(1000).then(() => [...posts]),
    refetchInterval: 1000, // Refetch the data every 1 second (in milliseconds) for this query
  });
```

## Conditional Execution of Queries:

To understand conditional execution, let's expand on the example mentioned earlier, now clicking on a post retrieves details about the author of that post. In this scenario, we need two queries: one to fetch the post and another to fetch the details of the author.

```jsx
const postQuery = useQuery({
  queryKey: ["posts", id],
  queryFn: () => getPost(id),
});

const userQuery = useQuery({
  queryKey: ["users", postQuery?.data?.userId],
  queryFn: () => getUser(postQuery.data.userId),
});
```

The challenge here is that `userQuery` should only be executed after `postQuery` has completed in order to retrieve the `userId` associated with the post. To address this, the `enabled` option in React Query is utilized, ensuring that `userQuery` is only triggered when the `userId` is received from the `postQuery`. This way, the queries are executed in the correct order, respecting dependencies between them.

```jsx
const userQuery = useQuery({
  queryKey: ["users", postQuery?.data?.userId],
  queryFn: () => getUser(postQuery.data.userId),
	enabled: postQuery?.data?.userId != null,
});
```

## Configuring your Mutations:

In React Query, when you're configuring a mutation, you have various options to handle different aspects of the mutation process. These options include:

1. **onSuccess:**
    - The **`onSuccess`** option allows you to define a function that will be executed when the mutation is successful. This function receives the data returned from the mutation, the variables you passed to **`mutate`**, and a context object. It's useful for performing actions or updates upon a successful mutation.
2. **onError:**
    - The **`onError`** option is similar to **`onSuccess`**, but it is executed when an error occurs during the mutation. It receives the error, along with the variables and context.
3. **onSettled:**
    - The **`onSettled`** option is called in both success and error cases after the mutation is completed. It's suitable for tasks you want to perform regardless of whether the mutation was successful or not. Like the other callbacks, it also receives the data, error, variables, and context.
4. **onMutate:**
    - The **`onMutate`** option is unique because it is called before the mutation function itself. It receives only the variables. It's useful when you need to set context data or perform tasks before executing the mutation. Any value returned from **`onMutate`** is accessible in the **`context`** in other callbacks.
    
    A key point to note about **`useMutation`** in React Query is that it doesn't automatically retry failed mutations, unlike queries that offer automatic retries. This behavior is designed to prevent unintended actions, such as creating multiple posts if the mutation is retried several times even after encountering an error.
    
    By default, React Query doesn't perform automatic retries for mutations to ensure data integrity on the backend. However, if you still want to specify the number of retry attempts for a mutation, you can use the **`retry`** option. For example, you can set **`retry: 3`** to allow the mutation to retry up to three times before marking it as an error.
    
    It's worth noting that, in most cases, automatic retries for mutations are not recommended, as they may lead to unintended consequences. You should handle mutation errors and retries explicitly based on your application's requirements to maintain data integrity.
    
    ### Mutate Object:
    
    It's important to understand the key properties available on a **`useMutation`** object in React Query. These properties provide valuable information about the status and results of the mutation. Here's an overview:
    
    1. **data:**
        - This property holds the data returned by the mutation when it's successful. It's the result of a successful mutation.
    2. **error:**
        - The **`error`** property contains any error information if the mutation encounters an error.
    3. **status:**
        - The **`status`** property reflects the current state of the mutation. It can have values like **`idle`**, **`loading`**, **`success`**, **`error`**, and **`isFetching`**. **`idle`** signifies that the mutation is waiting to be triggered, while **`isFetching`** indicates that the mutation is actively fetching.
    4. **Boolean Versions:**
        - In addition to the regular status properties, there are Boolean versions for convenience, such as **`isIdle`**, **`isError`**, **`isSuccess`**, and so on.
    5. **mutate and mutateAsync:**
        - The **`mutate`** function is used to trigger the mutation, while the **`mutateAsync`** function is an async version of **`mutate`**. The **`mutate`** function is commonly used to initiate a mutation. If you need more control and want to use promises, you can use **`mutateAsync`**, which allows you to chain **`then`** and **`catch`** for specific handling when the mutation is triggered.
    6. **Individual Configuration:**
        - The **`mutate`** function also accepts a second argument for inline configuration. You can set options like **`onSuccess`** or **`onError`** directly at the moment you call **`mutate`**, but this is typically not necessary unless you have specific needs for individual mutations.
    
    ## Data Caching:
    
    There are scenarios where the performance or data connection might be slow, where the page load is slow because the data is not yet cached, this can be addressed by manually updating the cache in React Query. Here's how to manually update the cache:
    
    You can use the `queryClient.setQueryData` method to manually set or update the data for a specific query key. In your case, you want to set the data for the "post" query key to include the newly created post.
    
    ```jsx
    const queryClient = useQueryClient();
    queryClient.setQueryData(['posts', newPost.data.id], newPost.data);
    ```
    
    By executing this code, you create a new entry in the cache that associates the query key with the data, allowing you to instantly display the data on your page without waiting for a new network request.This manual cache update helps improve the loading speed of the page, especially when dealing with newly created data.
    
    When using `queryClient.setQueryData` in React Query, you have the option to pass a function as the second argument. This function receives the old data as a parameter. This feature is particularly useful when you want to make changes to the existing data while incorporating new data.
    
    Here's how it works:
    
    ```jsx
    queryClient.setQueryData(['posts', newPost.data.id], (oldData) => {
      // Perform operations on the old data and merge it with new data
      return updatedData;
    });
    ```
    
    Key points to keep in mind:
    
    - Ensure that you do not directly mutate the old data; it should remain immutable. Immutable data is essential for React Query, much like working with React state.
    
    While you can pass a function to manipulate the old data, in many cases, you might simply pass in the new data directly. However, the ability to use a function provides flexibility when more complex operations or merging of data are required.