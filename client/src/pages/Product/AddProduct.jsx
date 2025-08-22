import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setcalorie] = useState('')
  const [protien, setprotien] = useState('')
  const [fat, setfat] = useState('')
  const [carbs, setcarbs] = useState('')

  const [micro, setmicro] = useState('')

  const [image, setImage] = useState([]); // Updated to allow multiple images
  const [shippingCharges, setShippingCharges] = useState(''); // Field for shipping charges
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(''); // Field for delivery time
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('calorie', calorie);
    formData.append('protien', protien);
    formData.append('fat', fat);
    formData.append('carbs', carbs);
    formData.append('micro', micro);
    image.forEach((img) => formData.append('image', img)); // Add multiple images
    formData.append('shippingCharges', shippingCharges);
    formData.append('estimatedDeliveryTime', estimatedDeliveryTime);

    try {
      await axios.post('/suppliers/products', formData,config);
      navigate('/supplier/products');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/mentor/dashboard/mealfoods')}
      >
        Back to Dashboard
      </button>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Meal Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Calories (kcal)</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={calorie}
            onChange={(e) => setcalorie(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Proteins (in grams)</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={protien}
            onChange={(e) => setprotien(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Carbohydrates (in grams)</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={carbs}
            onChange={(e) => setcarbs(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Fats (in grams)</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={fat}
            onChange={(e) => setfat(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Micronutrients(Vitamin ,Calcium ,Iron)</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={micro}
            onChange={(e) => setmicro(e.target.value)}
          />
        </div>
       
        
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            id="image"
            multiple
            onChange={handleImageChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="shippingCharges" className="form-label">Shipping Charges</label>
          <input
            type="number"
            className="form-control"
            id="shippingCharges"
            value={shippingCharges}
            onChange={(e) => setShippingCharges(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estimatedDeliveryTime" className="form-label">Estimated Delivery Time</label>
          <input
            type="text"
            className="form-control"
            id="estimatedDeliveryTime"
            value={estimatedDeliveryTime}
            onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
          />
        </div>
       
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

        
