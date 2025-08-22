// src/pages/ShopPage.jsx
import React from 'react';
import ItemGrid from '../Components/ItemGrid';

const ShopPage = () => {
  return (
    <div className="container-fluid p-3">
      <h2 className="fw-bold">Purchase Your Meals</h2>
      <p className="text-muted">Explore our range of meals available for purchase.</p>
      
      {/* <SearchBar /> */}

      <div className="row mt-3">
        <div className="col-md-9">
          <ItemGrid />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
