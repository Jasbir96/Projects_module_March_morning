# Problem Description
**User Registration API Endpoint**
Your task is to implement a user registration API endpoint using Express. The provided Mongoose schema (`userSchema`) defines the structure of a user object. You need to create an Express route at "/api/users" to handle POST requests for user registration.
```js
const schemaObject = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
```
### Requirements:

1. **Express Route:**
    
    - Create an Express route at "/api/users" that handles POST requests for user registration.
    - The route should expect a JSON payload in the request body with the following fields:
        - `name` (String, required)
        - `email` (String, required, unique)
        - `password` (String, required, minimum length of 8)
        - `confirmPassword` (String, required, minimum length of 8, must match `password`)
2. **User Registration Logic:**
    - Implement the `createUser` function to handle user registration.
    - Use the provided `UserModel` to interact with the MongoDB database and create a new user based on the request body.
3. **Validation:**
    - Ensure that the registration request follows the validation rules specified in the `userSchema`.
    - Respond with an appropriate error message and a 500 status code if there are validation errors.
4. **Response Handling:**
    - If user creation is successful, respond with a JSON object containing the newly created user.
    - If there are validation errors or any other errors during the process, respond with an appropriate error message and a 500 status code.
### Example Usage:

1. **Valid Request:**
    
    - Send a POST request to "/api/users" with a JSON body containing valid user data.
    - Example:
        
            
``` json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "strongpass",
  "confirmPassword": "strongpass"
}
```
   
- The server should respond with a JSON object containing the newly created user, status 200
        ```curl
            response code : 200
            body.status : successful
            body.message :{
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "strongpass",
        "confirmPassword": "strongpass"
        }
        ```

2. **Invalid Request:**
    
    - Send a POST request to "/api/users" with invalid user data (e.g., missing required fields, mismatched passwords).
    - The server should respond with an appropriate error message and a 500 status code.

    ```curl
     response code : 500
     body.status : failure
     body.message : "Internal server error"
     ```