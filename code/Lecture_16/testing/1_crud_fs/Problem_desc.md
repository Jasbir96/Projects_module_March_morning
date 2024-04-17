# Problem Description:

Your task is to create a simple Express server that exposes a GET route to retrieve user data from a JSON file. The provided data is structured as an array of user objects, each following a specific format:

## json data

```json
{
  "id": 1,
  "name": "Steve Harvey",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```


### Instructions:

1. **GET Route handler implementation:**

   - create a GET route "/api/user"
     you are given a GET route at "/api/user" that reads the content of the provided `data.json` file.
   - Parse the JSON data and respond with the array of user objects.
   - It should handle all the cases when:
     - `file is not present`
     ```curl
     response code : 500
     body.status : error
     body.message : Internal server error
     ```
     - `empty content`
     ```curl
      response code : 404
      body.status : successful
      body.message : no users found
     ```
     - `content found`
     ```curl
     response code : 200
     body.status : successful
     body.message : [{id:1,name:"user",...}]
     ```

### Constraints:

- You can assume that the structure of the `data.json` file adheres to the provided user object format.
