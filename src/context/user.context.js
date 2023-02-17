import { createContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const UserContext=createContext({
    busket:null,
    catalog:null,
    categories:null,
    transact:null,
    marks:null,
    cars:null,
    getMarksFromDb:()=>{},
    updateTransact:()=>{},
    getTransactFromDb:()=>{},
    deleteFromTransact:()=>{},
    updateTransactInDB:()=>{},
    updateBusket:()=>{},
    updateCatalog:()=>{},
    getCatalogFromDb:()=>{},
    getCarsFromDbbyFilter:()=>{},
    getCategoriesFromDb:()=>{},
    getCarsFromDbbyName:()=>{},
    getCarsFromDb:()=>{},
    deleteFromCatalog:()=>{},
})
export const UserState=({children})=>{
    const {request}= useHttp()
    const [busket, setBusket]=useState([])
    const [transact, setTransact]=useState([])
    const [categories, setCategories]=useState([])
    const [catalog, setCatalog]=useState([])
    const [marks, setMarks]=useState([])
    const [cars, setCars]=useState([])
    const getMarksFromDb=async()=>{
        try{
            const res= await request('/cars/marks', 'GET')
            setMarks([...res])
         }
         catch(e)
         {
             
         }
    }
    const getCarsFromDb=async()=>{
        try{
            const res= await request('/cars', 'GET')
            setCars([...res])
         }
         catch(e)
         {
             
         }
    }
    const getCarsFromDbbyName=async(searchname)=>{
        try{
            
            const res= await request('/cars/searchname', 'GET',null,{searchname})
           
            setCars([...res])
         }
         catch(e)
         {
             
         }
    }
    const getCarsFromDbbyFilter=async(data)=>{
        try{
            
            const res= await request('/cars/searcfilter', 'GET',null,data)
           
            setCars([...res])
         }
         catch(e)
         {
             
         }
    }
    const updateBusket=(newBusket)=>{
        setBusket(newBusket);
    }
    const updateCatalog=async(newItem) =>{
        try{
            const res= await request('/cars/create', 'POST', {newItem})
            alert(res.message)
         }
         catch(e)
         {
             
         }
    }
    const deleteFromCatalog=async(itemId) =>{
        try{
            const res= await request('/cars/delete', 'DELETE', {itemId})
            alert(res.message)
         }
         catch(e)
         {
             
         }
    }
    const updateTransactInDB= async(id)=>{
        const res= await request('/api/products/updateOrderInDb', 'POST', {id:id})
        setTransact([...res.orders])
         alert(res.message)
    }
    const updateTransact=async (newTransact)=>{
        const res= await request('/api/products/addOrderToDb', 'POST', {newItem:newTransact})
        alert(res.message)
    }
    const deleteFromTransact=async(itemId) =>{
        try{
            const res= await request('/api/products/deleteOrderFromDb', 'DELETE', {itemId})
            setTransact([...res.orders])
         }
         catch(e)
         {
             
         }
    }
    const getTransactFromDb= async()=>{
        try{
           const res= await request('/api/products/ordersFromDb')
           setTransact([...res.orders])
        }
        catch(e)
        {
            
        }
    }
    const getCatalogFromDb= async()=>{
        try{
           const res= await request('/api/products/productsFromDb')
           setCatalog([...res.products])
        }
        catch(e)
        {
            
        }
    }
    const getCategoriesFromDb= async()=>{
        try{
           const res= await request('/api/products/categoriesFromDb')
           setCategories([...res.categories])
        }
        catch(e)
        {
            
        }
    }
    return (
        <UserContext.Provider value={{ marks, cars,busket, catalog, categories, transact,getCarsFromDbbyFilter,getCarsFromDbbyName,updateTransactInDB,deleteFromTransact, getCarsFromDb,getTransactFromDb,deleteFromCatalog, updateTransact, getCategoriesFromDb, updateCatalog, updateBusket, getMarksFromDb,getCatalogFromDb }}>
            {children}
        </UserContext.Provider>
    )
}
