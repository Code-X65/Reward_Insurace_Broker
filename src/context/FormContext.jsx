import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <FormContext.Provider value={{ showForm, openForm, closeForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};