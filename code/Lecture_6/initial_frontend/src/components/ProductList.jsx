import React from 'react';

function ProductList(props) {
    const { productList } = props;
   
    return (
        <>
            {productList == null  ? <h3 > Loading...</h3> :
                productList.map((product) => {
                    return (<div className="product" key={product.id}>
                        <img src={product.images[0]}
                            className='product_image' />
                        <div className="product_meta">
                            <p className="product_title">{product.title}</p>
                            <p className='Price'>$ {product.price}</p>
                        </div>
                    </div>
                    )
                })}
        </>
    )
}

export default ProductList;


