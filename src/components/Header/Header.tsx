import style from './Header.module.scss'

// import iconMoon from '../../assets/images/moon.svg'

export default function Header(): JSX.Element {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.heading}>Where in the world?</h1>
        {/* <button className={style.themeSwitcher}>
          <img src={iconMoon} alt="moon" />
          <span>Dark Mode</span>
        </button> */}
      </div>
    </header>
  )
}
