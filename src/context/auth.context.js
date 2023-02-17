import { createContext, useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
const storageName='userData';

export const AuthContext = createContext({
    users: [],
    login: null,
    password: null,
    registerHandler: () => {},
    loginHandler: () => {},
    logoutHandler: () => {},
    registeredHandler: () => {},
    isAuthenticatedAdmin: false,
    isAuthenticatedUser: false, 
    isRegistered: false
})

export const AuthState = ({children}) => {
    const [users, setUsers] = useState([])
    const {request}= useHttp()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState(null)
    const [isRegistered, setIsRegistered] = useState(false)
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false)
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false)
    
    const registerHandler  =async (login, password) => {
        try{
            if (!(!!login)) {
                alert('Неверный логин')
                return
            }
            
            if (!(!!password)) {
                alert('Неверный password')
                return
            }
            const res= await request('/users',"POST",{login, password})
            if(res.message)
            {
                alert(res.message)
            }
            console.log(res)
        }
        catch{
            alert('Error!')
        }
       
    }

    const loginHandler =async  (login, password) => {
        if (!(!!login)) {
            alert('Неверный логин при входе')
            return
        }
        if (!(!!password)) {
            alert('Неверный password при входе')
            return
        }
        const res= await request('/users/login',"GET",null,{login, password})
        console.log(res);
        if(res.id_user!=null)
        {
            if(res.id_user==4)
            {
                setIsAuthenticatedAdmin(true);
                localStorage.setItem(storageName,JSON.stringify({id:res.id_user, login:login,password:password}))
                setId(res.id_user);
            }
            else
            {
                setIsAuthenticatedUser(true);
                localStorage.setItem(storageName,JSON.stringify({id:res.id_user, login:login,password:password}))
                setId(res.id_user);
            }

        }
        else{
            alert('Ошибка! Повторите ввод!')
        }
    }

    const logoutHandler = () => {
        setLogin(() => '')
        setPassword(() => '')
        setId(()=>null)
        setIsAuthenticatedAdmin(() => false)
        setIsAuthenticatedUser(() => false)
        localStorage.removeItem(storageName)
    }

    const RegisteredHandler = () => {
        useEffect(() => {
            setIsRegistered(false)
        })
    }

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem(storageName));
        if (data&& data.login && data.password)
        {
            loginHandler(data.login,data.password);
        }
    },[loginHandler])
    return (
        <AuthContext.Provider value={{isRegistered, users, login,  password, RegisteredHandler, registerHandler, loginHandler, logoutHandler ,isAuthenticatedAdmin, isAuthenticatedUser}}>
            {children}
        </AuthContext.Provider>
    )
}