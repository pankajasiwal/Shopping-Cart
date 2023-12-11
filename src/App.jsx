import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import cartContext from './store/context.js';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevCartItems) => {
      const products = [...prevCartItems.items];

      const existingItemIndex = products.findIndex((product) => product.id === id);
      const existingItem = products[existingItemIndex];

      if (existingItem) {
        const updateExistingItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        products[existingItemIndex] = updateExistingItem;
      } else {
        const newProduct = DUMMY_PRODUCTS.find((product) => product.id === id);
        products.push({
          id: newProduct.id,
          name: newProduct.title,
          price: newProduct.price,
          quantity: 1,
        });
      }

      return {
        items: products,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevCartItems) => {
      const items = [...prevCartItems.items];

      const existingItemIndex = items.findIndex((item) => item.id === productId);
      const existingItem = items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + amount,
      };

      if (updatedItem.quantity <= 0) {
        items.splice(existingItemIndex, 1);
      } else {
        items[existingItemIndex] = updatedItem;
      }
      return {
        items: items,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    onAddToCart: handleAddItemToCart,
    onUpdateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <cartContext.Provider value={ctxValue}>
      <Header />
      <Shop />
    </cartContext.Provider>
  );
}

export default App;

// function handleAddItemToCart(id) {
//   setShoppingCart((prevShoppingCart) => {
//     const updatedItems = [...prevShoppingCart.items];

//     const existingCartItemIndex = updatedItems.findIndex(
//       (cartItem) => cartItem.id === id
//     );
//     const existingCartItem = updatedItems[existingCartItemIndex];

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         quantity: existingCartItem.quantity + 1,
//       };
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       const product = DUMMY_PRODUCTS.find((product) => product.id === id);
//       updatedItems.push({
//         id: id,
//         name: product.title,
//         price: product.price,
//         quantity: 1,
//       });
//     }

//     return {
//       items: updatedItems,
//     };
//   });
// }

// function handleUpdateCartItemQuantity(productId, amount) {
//   setShoppingCart((prevShoppingCart) => {
//     const updatedItems = [...prevShoppingCart.items];
//     const updatedItemIndex = updatedItems.findIndex(
//       (item) => item.id === productId
//     );

//     const updatedItem = {
//       ...updatedItems[updatedItemIndex],
//     };

//     updatedItem.quantity += amount;

//     if (updatedItem.quantity <= 0) {
//       updatedItems.splice(updatedItemIndex, 1);
//     } else {
//       updatedItems[updatedItemIndex] = updatedItem;
//     }

//     return {
//       items: updatedItems,
//     };
//   });
// }
