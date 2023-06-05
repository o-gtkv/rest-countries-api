import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import style from './Header.module.scss'

export default function Header(): JSX.Element {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <h1 className={style.heading}>Where in the world?</h1>
                <ThemeSwitcher />
            </div>
        </header>
    )
}
