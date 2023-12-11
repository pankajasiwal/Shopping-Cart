import { createContext } from 'react';

const context = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateItemQuantity: () => {},
});

export default context;
