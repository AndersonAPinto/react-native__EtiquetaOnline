import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageManager = ({ onDataRetrieved }) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('myKey');
        if (value !== null) {
          onDataRetrieved(value);
        }
      } catch (error) {
        //console.error('Erro ao recuperar o dado', error);
      }
    };

    loadData();
  }, []);
};


export default StorageManager;
