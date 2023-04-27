Technical Challenge


- GET `/threads` - List all threads
- 
![getAllThreads](https://user-images.githubusercontent.com/113346489/234734436-b96a07a3-d9ca-492b-8d80-70e5d6ca61f7.png)

- GET `/threads/:threadId` - Get a thread by ID

![getThreadById](https://user-images.githubusercontent.com/113346489/234734618-26eb54e5-d1ed-4bc6-96b1-7bd3e1777cc6.png)

- POST `/threads` - Create a new thread

![post](https://user-images.githubusercontent.com/113346489/234734824-e421bd2c-7be2-4c92-a970-1868d367b6eb.png)

- PUT `/threads/:threadId` - Update a thread by ID

![putThread](https://user-images.githubusercontent.com/113346489/234735050-c0cc3d75-f29b-4901-81a5-3358c59a72fc.png)

- DELETE `/threads/:threadId` - Delete a thread

![delete](https://user-images.githubusercontent.com/113346489/234734849-f0834eaf-9764-44b3-a967-851e5a29ce6f.png)


- GET `/threads/:threadId/comments` - List comments of a given thread
- GET `/threads/:threadId/comments/:commentId` - Get a comment by ID for a given thread
- POST `/threads/:threadId/comments` - Create a new comment for a given thread
- PUT `/threads/:threadId/comments/:commentId` - Update a comment for a given thread
- DELETE `/threads/:threadId/comments/:commentId` - Delete a comment for a given thread
