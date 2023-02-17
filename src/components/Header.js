import { useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import { UserContext } from '../context/user.context'

export const Header = () => {
    const {isAuthenticatedAdmin, isAuthenticatedUser, login, adress, fio, password, logoutHandler} = useContext(AuthContext)
    const{updateBusket}=useContext(UserContext)

    const funClick=()=>{
        logoutHandler()
        updateBusket([])
    }
    if (isAuthenticatedUser) {
        return (
            <header>
                <div className='header-p'>
                    
                </div>
                <nav>
                    <button onClick={ logoutHandler }><Link to="/">Выйти</Link></button>
                    <button><Link to="/">Главная</Link></button>
                </nav>
            </header>
        )
    }
    if(isAuthenticatedAdmin)
    {
        return(
            <header>
                <div className='header-p'>
                    
                </div>
                <nav>
                    <button onClick={ funClick }><Link to="/">Выйти</Link></button>
                    <button><Link to="/products">Главная</Link></button>
                    <button><Link to="/addProduct">Добавить машину</Link></button>
                </nav>
            </header>
        )
    }
    return (
        <header>
            <nav>
                <button><Link to="/">Главная</Link></button>
                <button><Link to="/login">Войти</Link></button>
                <button><Link to="/registration">Зарегистрироваться</Link></button>
            </nav>
        </header>
    )
}
