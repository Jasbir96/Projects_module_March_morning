## Security

**How should you store password on backend**
 * Que : WHat is the usecase of password -> 
   * authencticate the user
   * User -> enters the password , server -> db -> get password -> compares -> you are loggedIn
   * You do not need to have knwoledge of actual password in order to verify if the input password is equal to password stored in db 
 * Que : Which is the best place to save the original password -> in the user's mind
### challenges in storing password
* Original Password should not be stored anywhere 
* Users's are usually lazy -> they usually keep common password -> Attacker create a mapping of common password-> reverse enginner your password
  ```
  password ->lakjdhgkjdhghjkdkfhskj
  abcd->aaksdjhgkjhgbgkjdsbfk
  qwerty-> asdkjgfjdsfdsbk
  ```
### solution 
* Original Password should not be stored anywhere -> we solved it with random salt 
  * you have a concept of rounds-> so the comparison takes a bit of time 
* Algorithm 
  * Encryption algorithm  -> MD5,SHA256
     1. Encyryption : algo->[key](password) -> result(hash)[always the same]
     2. Decrypt : algo -> [key][result]-> password
 * Algorithm ->  these known as hashing algorithm 
     * 1. Encrypt ; algo->[different key](password)-> ecyrpted (hash)





### Bcrypt algorithm 
```
$\[algorithm]$[cost]$[salt\][hash]
// $2b$10$b63K/D03WFBktWy552L5XuibmiD5SxCrKg9kHCqOYaZwxRjIg14u2
```

The bifurcation of hash is like this:
- `Algorithm`: Will be `"$2a" or "$2b"` which means `Bcrypt`
- `Cost`: `$10` Represents the exponent used to determine how many iterations `2^n`
- `Salt`: (16-byte (128-bit)), base64 encoded to 22 characters
- `Hash`: (24-byte (192-bit)), base64 encoded to 31 characters

