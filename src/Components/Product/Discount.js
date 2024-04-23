import React from 'react';
import { useLocation } from 'react-router-dom';

const Discount = () => {
    const location = useLocation();
  const { products } = location.state || {};
    return (
        <div>
         <h2>Discounted Products</h2>
      {products ? (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              <p>Discount Percentage: {product.discount.percentage}%</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No discounted products available.</p>
      )}
      
        </div>
    );
};
export default Discount;