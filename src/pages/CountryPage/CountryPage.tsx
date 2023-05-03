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
        return <div>{error}</div>

    const country = data[0]
    const nativeName = Object.values(country.name.nativeName).map((name: any) => name.official).join(', ')
    const currencies = Object.values(country.currencies).map((curr: any) => curr.name).join(', ')
    const languages = Object.values(country.languages).join(', ')
    // const borderCountries = country.borders.map((borderCountry: string) => {
    //     const [data] = useFetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
    //     console.log(data)
    //     return 'data'
    // })

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
                    <div className={style.flexContainer}>
                        <dl>
                            <dt>Native name:</dt>
                            <dd>{nativeName}</dd>
                            <dt>Population:</dt>
                            <dd>{country.population}</dd>
                            <dt>Region:</dt>
                            <dd>{country.region}</dd>
                            <dt>Sub Region:</dt>
                            <dd>{country.subregion}</dd>
                            <dt>Capital:</dt>
                            <dd>{country.capital[0]}</dd>
                        </dl>
                        <dl>
                            <dt>Top Level Domain:</dt>
                            <dd>{country.tld[0]}</dd>
                            <dt>Currencies:</dt>
                            <dd>{currencies}</dd>
                            <dt>Languages:</dt>
                            <dd>{languages}</dd>
                        </dl>
                    </div>
                    <dl>
                        <dt>Border Countries: </dt>
                        <dd>
                            <ul className={style.borderCountriesList}>
                                <li>France</li>
                                <li>Germany</li>
                                <li>Lorem ipsum dolor</li>
                                <li>Lorem ipsum dolor</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}
