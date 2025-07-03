import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService.js";
import { fetchItems } from "../service/ItrmService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [itemsData, setItemsData] = useState([]);
  const setAuthData = (token, role) => {
    setAuth({ token, role });

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId != itemId));
  };

  const updateFromCart = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  }
  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );
      }
      try {
        const response = await fetchCategories();
        const itemsResponse = await fetchItems();
        setCategories(response.data);
        setItemsData(itemsResponse.data);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError(err);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
    error,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    addToCart,
    cartItems,
    removeFromCart,
    updateFromCart,
    clearCart
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
