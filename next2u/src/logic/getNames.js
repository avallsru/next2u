import { listFromDb } from '../services';

const getNames = async(categoriesArr, kind) => {
  const categories = kind === 'stores' ? await listFromDb('stores_categories') : await listFromDb('product_categories');
  
  const categoriesName = [];
  
  categoriesArr.forEach((idToFind) => {
    const numId = typeof idToFind === 'string' ? parseInt(idToFind) : idToFind;
    
    const filteredByCat = categories.filter(
      (category) => {
        return ((parseInt(category.id) + 1) === numId)    
      }  
    );
    // console.log(filteredByCat);
    filteredByCat.forEach((categoryObj) => {
      categoriesName.push(categoryObj.name);
    });
  });
  return kind === 'stores' ?  categoriesName.join(" ") : categoriesName;
}

export default getNames;