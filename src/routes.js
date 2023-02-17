import React from "react"
import {Routes, Route, Navigate} from 'react-router-dom'
import {RegistrationPage} from './pages/RegistrationPage'
import {LoginPage} from './pages/LoginPage'
import {MainPageUser} from './pages/User/mainPageUser'
import { ElementPage}from './pages/User/ElementPage'
import { CreateProductPage } from "./pages/Admin/CreateProductPage"

export const useRoutes = (isAuthenticatedAdmin, isAuthenticatedUser) => {
    if (isAuthenticatedAdmin) {
        return (
            <Routes>
                <Route path="/products" element={<MainPageUser/>}/>
                <Route path="/addProduct" element={<CreateProductPage/>}/>
                <Route path="/element/:car" element={<ElementPage/>}/>
                <Route path="*" element={<Navigate to="/products"/>}/>
            </Routes>
        )
    }



    if (isAuthenticatedUser) {
        return (
            <Routes>
                <Route path="/" element={<MainPageUser/>}/>
                <Route path="/element/:car" element={<ElementPage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        )
    }
     
        return (
            <Routes>
                <Route path="/" element={<MainPageUser/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/element/:car" element={<ElementPage/>}/>
            </Routes>
        )
    
}