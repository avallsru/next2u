import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import PropTypes from 'prop-types';

import {updateOrder, updateTotalPrice} from "../../redux/actions/orderActions";

import { getNames, updateOrderPrice, updateProdsById } from "../../logic";

import "./ProductCards.scss";
import ProductQuantity from "../ProductQuantity/ProductQuantity";

const ProductCards = () => {
  const dispatch = useDispatch();
  const { productsToPrint, storeToDetail } = useSelector((store) => store.storesReducer);
  const orderProductsRedux = useSelector(store => store.orderReducer.products);


  const [quantity, setQuantity] = useState(0);
  const [productToOrder, setProductToOrder] = useState({});

  

  const updateOrderReducer = (e, id, name, unitsSelected, priceUnit) => {
    e.preventDefault();
    
    const productToAdd = {[id]: {
      name,
      unitsSelected,
      priceUnit,
      totalPrice: priceUnit
    }}

    const productsToDispatch = updateProdsById(productToAdd, orderProductsRedux);

    const {orderPrice, updatedList} = updateOrderPrice(productsToDispatch);
    dispatch(updateTotalPrice(orderPrice));
    dispatch(updateOrder(updatedList));
  }

  const arrToPrint = productsToPrint.map((group) => {
    //GET CATEGORY AND PRODUCTS ARR TO PRINT FOR EACH GROUP
    const category = Object.keys(group);
    const productsArr = Object.values(group);

    //TRANSFORM THE PRODUCTS ARR INTO SOMETHING PRINTABLE
    const valuesArr = productsArr[0].map((product) => {
      const {
        ID,
        name,
        description,
        url,
        price_unit,
        kind_of_unit,
        units_available,
        units_selected,
      } = product;
      return (
        <div
          className="product-detail container"
          key={Math.random() * Date.now()}
        >
          <div className="product-img-container">
            <img alt="algo"></img>
          </div>
          <div className="basic-info container">
            <div className="basic-info first-row">{name}</div>
            <div className="basic-info second-row">{description}</div>
          </div>
          <div className="buy container">
            <div className="paying-container buy first-row">
              <ProductQuantity unitsAvailable={units_available} unitsSelected={units_selected} idValue={ID} />
              <div>
                {price_unit}€/{kind_of_unit}
              </div>
            </div>

            <button 
            className="update-order button buy second-row" 
            onClick={(e) => updateOrderReducer(e, ID, name, units_selected, price_unit)}
            >
              <AiOutlineShoppingCart />
            </button>
          </div>
        </div>
      );
    });

    //RETURN THE COMPLETE GROUP
    return (
      <div className="detail-basic-data container" key={Math.random() * Date.now()}>
        <p className="detail-name">{category}</p>

        <div className="category-names">{valuesArr}</div>
      </div>
    );
  });

  return <div>{arrToPrint}</div>;
};

// ProductCard.propTypes = {

// };

export default ProductCards;