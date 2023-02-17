import React from "react"
import { useContext, useState } from "react"
import {AuthContext} from '../context/auth.context'
import {Link} from 'react-router-dom'

export const RegistrationPage = () => {
    const {registerHandler} = useContext(AuthContext)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handlerLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlerPassword = (event) => {
        setPassword(event.target.value)
    }
    const btnRegister = () => {
        registerHandler(login, password)
    }



    return (
        <div className="inputForm">
            <p>Регистрация</p>

            <label htmlFor="login">Логин</label>
            <input
                value={login} 
                onChange={handlerLogin}  
                name="login" 
                id="login" 
                type="login" 
                placeholder="Введите логин"
            />
            <label htmlFor="password">Пароль</label>
            <input
                value={password} 
                onChange={handlerPassword}  
                name="password" 
                id="password" 
                type="password" 
                placeholder="Введите пароль"
            />

            <button
                onClick={btnRegister}
            >
                Зарегистрироваться!
            </button>
            <button><Link to="/">Назад</Link></button>
        </div>
    )
}