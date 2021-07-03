import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async() => {
    dispatch({type:"LOADING"});
    const response = await fetch(url/*, {mode:'no-cors'}*/);
    const data = await response.json();
    dispatch({type:'DISPLAY_ITEMS', payload:data});
  };
  const clearCart = () => {
    dispatch({type:"CLEAR_CART"});
  };
  const remove = (id) => {
    dispatch({type:"REMOVE", payload:id})
  };
  const increaseAmount = (id) => {
    dispatch({type:"INCREASE_AMOUNT", payload:id});
  };
  const decreaseAmount = (id) => {
    dispatch({type:"DECREASE_AMOUNT", payload:id});
  };

  useEffect(()=>{
    fetchData();
  },[]);
  useEffect(()=>{
    dispatch({type:"GET_TOTAL"});
  },[state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state, clearCart, remove, increaseAmount, decreaseAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
