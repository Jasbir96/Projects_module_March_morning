**Que**:  What is testing ?
 whether you code matches the specification

 **Types of Testing** 
`Way to you test`
* Manual testing  -> user manually  test the applications
* Automated testing

**`Areas of Testing`**
* `Unit Test`:  Verifying the smallest units (components) of the app in isolation to ensure individual functionality.
  * Tools : jest , supertest 
* `Functional test/integration test`: Verifying the a module /functionality of the app works and interact with different modules
  * Tools:  jest, supertest, postman 
*  `End to end Testing`: How much closer your application is to the specification 
   *  Tools : `cypress`
*   `Regression testing` : Testing whether a new features/module/ components have negatively impact the existing application
*   `Performance Testing` : how our responsive our app is to the end client 
*   `Stress testing` : how your application works in  exterm condition 
*   `Security Testing` :   if there are any vulnerabilities
*   

**Backend -> unit testing -> end point testing**

**end point testing** -> testing whether your enpoints works perfectly in all the cases or not

**Prerequisites / Features of testing framework**
* it should be able to make an ->http request  -> `supertest`
* mocking different functionalities -> Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values. -> `jest`
```js
UserModel.create(userDetails);  // success / failure
```
* test runner -> `jest`


