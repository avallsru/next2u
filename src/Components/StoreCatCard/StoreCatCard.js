import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types';

import { listToPrint } from '../../redux/actions/storesActions';

import { listStoresToPrint } from "../../logic";

import "./StoreCatCard.scss";
import StoreList from "../StoreList";
import { updateCategoriesActivation } from "../../redux/actions/hocsActions";

const StoreCatCard = ({ cat }) => {
  const dispatch = useDispatch();

  const [storesList, setStoresList] = useState([]);

  const { name, img, id } = cat;
  const imgRoute = `assets/img/${img}`;
  const { storesNearAddress } = useSelector((store) => store.storesReducer);

  const handleClick = (e) => {
    const definedList = listStoresToPrint(storesNearAddress, id);
    dispatch(listToPrint(definedList));
    dispatch(updateCategoriesActivation(false));
    return(
      <StoreList />
    )
  };

  const handleHover = (e) => {
    e.target.style = "cursor: pointer";
  };

  const altText = `${name} icon`;
  const photoId = parseInt(id) + 1;
  return (
    <div className="store-cat principal-container">
      <div
        className="container card-store-cat"
        name={name}
        onClick={handleClick}
        onMouseOver={handleHover}
      >
        <img src={`./assets/img/stores_categories/${photoId}.jpg`} alt={altText} className="img card-store-cat" />
        <div className="name card-store-cat">{name}</div>
      </div>
    </div>
   
  );
};

// StoreCatCard.propTypes = {

// };

export default StoreCatCard;
