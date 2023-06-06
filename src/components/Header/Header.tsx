import { Link } from 'react-router-dom'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import style from './Header.module.scss'

export default function Header(): JSX.Element {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <h1 className={style.heading}>
                    <Link to="/">Where in the world?</Link>
                </h1>
                <ThemeSwitcher />
            </div>
        </header>
    )
}
