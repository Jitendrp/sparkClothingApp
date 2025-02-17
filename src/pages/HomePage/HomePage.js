// importing all the necassary components
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import itemReducer from '../../reducers/itemReducer';
import LatestProductsList from './LatestProductsList/LatestProductsList';
import { Helmet } from 'react-helmet-async';

// HomePage
const HomePage = () => {
  // intialize the items using useReducer Hook
  const [items, itemsDispatch] = useReducer(itemReducer, []);
  const apiKey = '$2a$10$h3/JXpfIVLOC7GB8AD6Q0ODcusMSM8oVcIHS8Ohj3pbFX6ehSQsJ.';
  // useEffect Hook is used to render the data once the component gets loaded
  useEffect(() => {
    // fetching the Latest Products from API with Limit of three items becaouse of carousel
    axios
      .get('https://api.jsonbin.io/v3/b/66a5e040e41b4d34e41819b1?meta=false', {
        headers: {
          'X-MASTER-KEY': apiKey
        }
      })
      .then((res) => {
        // console.log(res.data);
        // disptach the items to reducer
        itemsDispatch({
          type: 'LIST_ITEMS',
          payload: res.data.products.slice(0, 3)
        });
      });
  }, []);
  // function to handle view All button click
  const handleClickViewAll = () => {
    // Fetching All the Products from API
    axios
      .get('https://api.jsonbin.io/v3/b/66a5e040e41b4d34e41819b1?meta=false', {
        headers: {
          'X-MASTER-KEY': apiKey
        }
      })
      .then((res) => {
        // disptach the products to the reducer
        itemsDispatch({
          type: 'LIST_ITEMS',
          payload: res.data.products
        });
      });
  };
  return (
    <>
      {/* page title using Helmet */}
      <Helmet>
        <title>HomePage</title>
      </Helmet>
      <div className="carousel-width">
        {/* carousel component */}
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-inner">
            {/* Looping throught the items and displaying it in carousel */}
            {items.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={item.id}
              >
                <div className="carousel-wrap-items">
                  <img
                    src={item.imageUrl}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    {/* displaying the item name and description */}
                    <h4 data-testid="productName" className="text-dark">
                      {item.name}
                    </h4>
                    <p data-testid="productDesc" className="text-dark">
                      {item.description}
                    </p>
                    <button
                      data-testid="browse-products"
                      className="btn btn-danger"
                    >
                      Browse 1000 Products
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* carousel control buttons */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Latest Products Section */}
      <h3
        data-testid="latestproductsheading"
        className="latest-products text-start"
      >
        All Latest Products
      </h3>
      <div className="latest-products-section">
        <div className="row">
          {/* Looping through the fetched item)s to display the latest products */}
          {items.map((item) => {
            return (
              <LatestProductsList
                key={item.id}
                name={item.name}
                thumbnailUrl={item.thumbnailUrl}
                maxRetailPrice={item.maxRetailPrice}
              />
            );
          })}
        </div>
        {/* View All button */}
        <div className="view-all-section pt-4 pb-4">
          <button
            data-testid="viewBtn"
            className="btn btn-success text-center"
            onClick={handleClickViewAll}
          >
            view all
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
