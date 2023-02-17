import { useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'

export const Footer = () => {
    const {isAuthenticatedAdmin, isAuthenticatedUser, login, fio, adress, password} = useContext(AuthContext)
    if (isAuthenticatedUser) {
        return (
            <footer>
                <nav>
                    <button><Link to="/">Главная</Link></button>
                    <button><Link to="/about">Справочная информация</Link></button>
                    <button><Link to="/recomendation">Рекомендация</Link></button>
                    <button><Link to="/direction">Направление</Link></button>
                </nav>
            </footer>
        )
    }
    return (
        <footer>
            <nav>
                <button><Link to="/">Главная</Link></button>
                <button><Link to="/about">Справочная информация</Link></button>
            </nav>
        </footer>
    )
}
