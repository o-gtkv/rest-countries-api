import { Link } from 'react-router-dom'
import style from './Card.module.scss'

type TProps = {
    flagImage: string
    flagDesc: string
    name: string
    population: number
    region: string
    capital: string
}

export default function Card(props: TProps): JSX.Element {
    return (
        <Link className={style.link} to={`/country/${props.name.toLowerCase()}`}>
            <div className={style.card}>
                <img className={style.image} src={props.flagImage} alt={props.flagDesc} />
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
