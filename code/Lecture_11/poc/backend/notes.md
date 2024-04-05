**Problem** : upper limit of any document -> 16mb
## Purchase
* bookedAt
* priceAtThatTime
* order_id
* useDetails[ids]
* productDetails[ids]
* status: ["success","failure","pending"]
### Benefit of refs
* You only make the query using ref -> to product and user when required

## Reviews
* rating
* review_title
* review_description
* user_details[ids][ref]
* product_details[ids][ref]
* avgRating

**How do youe access reviews** ??
* Reviews -> from a given product Product-> reviews
* User -> orders -> bookings





