import { Link } from 'react-router-dom'
import style from './Card.module.scss'

type PropTypes = {
    flagImage: string,
    flagDesc: string,
    name: string,
    population: number,
    region: string,
    capital: string,
}

export default function Card(props: PropTypes): JSX.Element {
    return (
        <Link className={style.link} to={`/country/${props.name.toLowerCase()}`}>
            <div className={style.card}>
                <div className={style.imageWrapper}>
                    <img className={style.image} src={props.flagImage} alt={props.flagDesc} />
                </div>
                <div className={style.infoBlock}>
                    <h2 className={style.heading} >{props.name}</h2>
                    <ul className={style.infoList}>
                        <li><span>Population: </span> {props.population}</li>
                        <li><span>Region: </span> {props.region}</li>
                        <li><span>Capital: </span> {props.capital}</li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}
