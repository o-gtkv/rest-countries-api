import { useParams, useNavigate } from 'react-router-dom'
import { LoadingIndicator } from '../../components'
import { useFetch } from '../../hooks'
import style from './CountryPage.module.css'

export default function CountryPage() {
    const { name } = useParams()
    const [data, isLoading, isError, error] = useFetch(`https://restcountries.com/v3.1/name/${name}`)
    const navigate = useNavigate()

    if (isLoading)
        return <LoadingIndicator />
    if (isError)
        return <div>error</div>

    const country = data[0]
    console.log(country)

    return (
        <div className="container">
            <div className={style.backButtonWrapper}>
                <button className={style.backButton} onClick={() => navigate(-1)}>🡐 Back</button>
            </div>
            <div className={style.pageContent}>
                <div className={style.flagBlock}>
                    <img className={style.flagImage} src={country.flags.svg} alt={country.flags.alt} />
                </div>
                <div className={style.infoBlock}>
                    <h2>{country.name.common}</h2>
                    <div className={style.infoListWrapper}>
                        <ul className={style.infoList}>
                            <li>
                                <span>Native name: </span> {
                                    Object.values(country.name.nativeName)
                                        .map(name => name.official)
                                        .join(', ')
                                }
                            </li>
                            <li><span>Population: </span> {country.population}</li>
                            <li><span>Region: </span> {country.region}</li>
                            <li><span>Sub Region: </span> {country.subregion}</li>
                            <li><span>Capital: </span> {country.capital[0]}</li>
                        </ul>
                        <ul className={style.infoList}>
                            <li><span>Top Level Domain: </span> {country.tld[0]}</li>
                            <li>
                                <span>Currencies: </span> {
                                    Object.values(country.currencies)
                                        .map(curr => curr.name)
                                        .join(', ')
                                }
                            </li>
                            <li>
                                <span>Languages: </span> {
                                    Object.values(country.languages)
                                        .join(', ')
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
