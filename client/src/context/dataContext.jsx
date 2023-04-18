import React, { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import {  GET_ALL_RECIPES } from '../constant/constant';
import { apiGet } from '../services/services';

const dataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const doApi = async () => {
        try {
            const { data } = await apiGet(GET_ALL_RECIPES)
            console.log(data);
            setData(data);

        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        doApi()
    }, [])

    const value = { data, setData,doApi };
    return <dataContext.Provider value={value}>{children}</dataContext.Provider>
}

export const MyData = () => {

    return useContext(dataContext);
}

export default dataContext