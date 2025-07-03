import React, { createContext, useContext, useReducer } from 'react';

// Create the context - this will be used to provide cart state to all components
const CartContext = createContext(undefined);

// Define action types for the cart reducer
// These are the different actions we can perform on the cart
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Initial state for the cart - starts empty
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Helper function to calculate totals - this keeps our state consistent
const calculateTotals = (items) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

// Cart reducer function - this handles all cart state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems;
      
      if (existingItem) {
        // If item exists, increase quantity by 1
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }
    
    case CART_ACTIONS.REMOVE_FROM_CART: {
      // Remove item completely from cart
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return initialState;
    
    default:
      return state;
  }
};

// CartProvider component - this wraps our app and provides cart context to all children
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Action creators - these functions dispatch actions to update cart state
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };
  
  // Context value - this is what gets passed to all consuming components
  const contextValue = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context - this provides better error handling
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};