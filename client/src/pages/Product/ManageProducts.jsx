import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import config from '../../config';

const ManageProductsSupplier = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for modal data
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [stockUpdates, setStockUpdates] = useState({}); // State for individual stock updates

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/suppliers/products',config);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    await axios.delete(`/suppliers/products/${productId}`,config);
    // Refresh product list
    const response = await axios.get('/suppliers/products',config);
    setProducts(response.data);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

 

 

  return (
    <div className="manage-products">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/mentor/dashboard/mealfoods')}
      >
        Back to Dashboard
      </button>
      <h2>Manage Products</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Verified Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              
              <td>
                {product.isVerified ? (
                  <span className="badge bg-success">Verified</span>
                ) : (
                  <span className="badge bg-danger">Not Verified</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleShowDetails(product)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> RS {selectedProduct.price}</p>
            {/* calories */}
            <p><strong>Calories:</strong> {selectedProduct.calories}</p>
            {/* protien */}
            <p><strong>Protein:</strong> {selectedProduct.protein}</p>
            {/* carbs */}
            <p><strong>Carbs:</strong> {selectedProduct.carbs}</p>
            {/* fat */}
            <p><strong>Fat:</strong> {selectedProduct.fat}</p>
            {/* micro */}
            <p><strong>Micro:</strong> {selectedProduct.micro}</p>
           
           



            <p><strong>Verified:</strong> {selectedProduct.isVerified ? 'Yes' : 'No'}</p>
            {selectedProduct.image && selectedProduct.image.length > 0 && (
              <div>
                <strong>Images:</strong>
                <div>
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${img}`}
                      alt={`${selectedProduct.name}-${index}`}
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManageProductsSupplier;
