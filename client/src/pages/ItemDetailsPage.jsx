import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'; // Ensure you have installed react-bootstrap and bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../axios';
import config, { base } from '../config';


const ItemDetailsPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/customers/products/${itemId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  const handleBuyNow = () => {
    navigate(`/payment/${itemId}/${product.discountPrice || product.price}/product`);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await axios.post(`/cart/add`, {
        productId: itemId,
        quantity: 1, // Default quantity
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add product to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!product) return <div className="text-center">Product not found.</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Image Carousel */}
        <div className="col-md-6">
          <Carousel fade>
            {product.image.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={base + img}
                  alt={`Product image ${index + 1}`}
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card shadow-lg border-light p-4">
            <h2 className="text-primary mb-3">{product.name}</h2>
            <p>{product.description}</p>
            <h4 className="text-success">
              RS{product.discountPrice || product.price}
            </h4>

            {/* calories */}

            <div className="mb-3">
              <p><strong>Calories:</strong> {product.calorie}</p>
              <p><strong>Protein:</strong> {product.protien}</p>
              <p><strong>Fat:</strong> {product.fat}</p>
              <p><strong>Carbs:</strong> {product.carbs}</p>
              <p><strong>Micro:</strong> {product.micro}</p>
            </div>

            <div className="mb-3">
              <p><strong>Shipping:</strong> RS{product.shippingCharges}</p>
              <p><strong>Estimated Delivery:</strong> {product.estimatedDeliveryTime || 'N/A'}</p>
            </div>



            {/* Buy Button */}
            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleBuyNow}
              >
                  Order Now
              </button>
              {/* <button
                className="btn btn-secondary btn-lg"
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock === 0}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
