

const updateOrderPrice = (products) => {
  let orderPrice = 0;
  let updatedList = {};
  for(const [key, value] of Object.entries(products)) {
    debugger;
    const unitPrice = value.priceUnit;
    const unitsSelected = value.unitsSelected;

    let productPrice =  parseFloat((unitPrice * unitsSelected)).toFixed(2);
    value.totalPrice = productPrice;
    orderPrice = orderPrice + parseFloat(productPrice);

    Object.assign(updatedList, {[key]: value});
  }

  return {orderPrice, updatedList};
};

export default updateOrderPrice;