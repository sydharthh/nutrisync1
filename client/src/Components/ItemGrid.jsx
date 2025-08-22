import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { base } from '../config';

const ItemGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/customers/products'); // Replace with your endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render product grid
  console.log(products);

  return (
    <div className="row justify-content-center">
      {products.map((product) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
          <Link to={`/item/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card h-100">
              <img
                src={product.image?.length > 0 ? base + product.image[0] : 'https://via.placeholder.com/150'}
                className="card-img-top img-fluid"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text text-primary">{`RS${product.price}`}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
