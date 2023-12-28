"use client"
import React, { createContext, useContext, useReducer } from 'react';

const DataContext = createContext();

const MAX_ITEMS = 50; // Set a maximum number of items to store

function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedData = [...state.data, action.payload];
      // Implement circular buffer logic
      if (updatedData.length > MAX_ITEMS) {
        updatedData.shift(); // Remove the oldest item
      }
      return { data: updatedData };
    default:
      return state;
  }
}

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, { data: [] });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export { DataProvider, useData };
