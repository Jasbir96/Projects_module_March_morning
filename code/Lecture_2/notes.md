## HTTP Request 

* HTTP header -> Metadata -> (data about the data)
* HTTP body -> content inside that packet
<!-- 
profile page  -> user
 -->
<!-- client -> request (url) -->
1. <!-- /product --> (to whom you want to interact)
* HTTP header
    * Request method
            * POST -> create the resource
            * GET -> get data about that resource
            * PATCH  ->  want to update some property of that resource
            * DELETE  ->  want to delete  that resource
            * PUT -> it is used to replace a resource
    * response code -> is a numeric code that always lies b/w 
    100-599
       * 100-199 -> informational (work in progress)
            * 101 -> switch protocol 
      *  200-299 -> success  (work is done)
            * 200 -> success
            * 201 -> resource is created
      * 300-399 -> redirects
      * 400-499 -> client error
        * 404
        * 403
      * 500-509 -> server error 
            * 502 -> Gateway Timeout 
