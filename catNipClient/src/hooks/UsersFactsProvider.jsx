// src/DataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { usersCatApiInstance } from '../helper/axiosInstances';

const UsersFactsContext = createContext();


const UsersFactsProvider = ({ children }) => {
  const [usersCatFacts, setUsersCatFacts] = useState([]);

  const [isLoadingUsersFacts, setIsLoadingUsersFacts] = useState(false);
  const [isErrorFetchingUsersCatFacts, setIsErrorFetchingUsersCatFacts] =
    useState(false);
    

    const fetchUsersCatFacts = async (signal) => {
      setIsErrorFetchingUsersCatFacts(false);
      setIsLoadingUsersFacts(true);
      console.log("signal", signal)
    
      try {
        const response = await usersCatApiInstance.get('/facts', {
          signal,
        });

    
        if (signal.aborted) return;
    
        setUsersCatFacts(response.data);
        setIsLoadingUsersFacts(false);
      } catch (error) {
        if (!signal.aborted) {
          setIsErrorFetchingUsersCatFacts(true);
          console.error('Error fetching data:', error);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoadingUsersFacts(false);
        }
      }
    };
    
    useEffect(() => {
      const controller = new AbortController();
    
      console.log("controller")
      fetchUsersCatFacts(controller.signal);
    
      return () => {
        controller.abort();
      };
      
    }, []);

  return (
    <UsersFactsContext.Provider
      value={{
        setUsersCatFacts,
        usersCatFacts,
        isLoadingUsersFacts,
        isErrorFetchingUsersCatFacts,
      }}
    >
      {children}
    </UsersFactsContext.Provider>
  );
};

export default UsersFactsProvider;

export const useUsersFacts = () => {
  return useContext(UsersFactsContext);
};
