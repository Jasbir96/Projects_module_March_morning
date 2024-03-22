import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import URL_CONSTANTS from '../Constants/urlConstants';
// product page with it's details 
/****
 * 0. identify the Route that will server the data [/api/v1/product/:id]
 * 1. identify which user interaction will open the part of the UI
 * 2. if there is some specific data -> how you are going to get it  -> useParams
 * 3. Make request to the backed 
 * 4. render the UI
 * 
 * ***/
function ProductDetails() {
  let [product, setProduct] = useState(null)
  let { id } = useParams();
  useEffect(() => {
    (async function () {
      /***
       * fetch data from our API server
       * 
       * ****/
      /***
       * route -> the whole url
       * **/
      const response = await axios.get(URL_CONSTANTS.GET_PRODUCT_BY_ID + `/${id}`);
      
      const product = response.data.message;
      const mappedProduct = {   id: product["_id"], ...product }
      
      // console.log(mappedProduct);
      setProduct(mappedProduct);

    })()
  }, [])

  if (product == null) {
    return <h2>Loading... for ${id}</h2>
  }

  return (
    // loading and showing the data
    <div className="product" key={product.id}>
      <img src={product.image}
        className='product_image' />
      <div className="product_meta">
        <p className="product_title">{product.title}</p>
        <p className='Price'>$ {product.price}</p>
        <p className='category'>$ {product.category}</p>
      </div>
    </div>
  )
}

export default ProductDetails