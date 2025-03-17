// src/context/AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUsers, getProducts } from '../api/fakeStoreApi';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, productsData] = await Promise.all([
          getUsers(),
          getProducts()
        ]);
        setUsers(usersData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateUsersList = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const updateProductsList = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <AppContext.Provider
      value={{
        users,
        products,
        loading,
        error,
        updateUsersList,
        updateProductsList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};