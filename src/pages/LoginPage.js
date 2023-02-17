import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

export const LoginPage = () => {

    const {loginHandler} = useContext(AuthContext)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handlerLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlerPassword = (event) => {
        setPassword(event.target.value)
    }

    const btnLogin = () => {
        loginHandler(login, password)
    }

    return (
        <div className="inputForm">
            <p>Вход</p>

                <label htmlFor="login">Логин:</label>
                <input
                    value={login} 
                    onChange={handlerLogin}  
                    name="login" 
                    id="login" 
                    type="text" 
                    placeholder="Введите логин"
                />



                <label htmlFor="password">Пароль:</label>
                <input
                    value={password} 
                    onChange={handlerPassword}  
                    name="password" 
                    id="password" 
                    type="password" 
                    placeholder="Введите пароль"
                />

            <button
                onClick={btnLogin}
            >
                Войти!
            </button>
            <button><Link to="/">Назад</Link></button>

            
        </div>
    )
}