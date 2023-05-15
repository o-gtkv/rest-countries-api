import { Link, useParams, useNavigate } from 'react-router-dom'
import { LoadingIndicator } from '../../components'
import { useDetailedCountryInfo } from '../../hooks'

import style from './CountryPage.module.css'

export default function CountryPage() {
    const navigate = useNavigate()
    const { name } = useParams()
    const [countryInfo, isLoading, isError, error] = useDetailedCountryInfo(name)

    if (isError)
        return <div>{error}</div>
    if (isLoading)
        return <LoadingIndicator />

    return (
        <div className="container">
            <div className={style.backButtonWrapper}>
                <button className={style.backButton} onClick={() => navigate(-1)}>🡐 Back</button>
            </div>
            <div className={style.pageContent}>
                <div className={style.flagBlock}>
                    <img className={style.flagImage} src={countryInfo?.flag.img} alt={countryInfo?.flag.alt} />
                </div>
                <div className={style.infoBlock}>
                    <h2>{countryInfo?.name}</h2>
                    <div className={style.flexContainer}>
                        <dl>
                            <dt>Native name:</dt>
                            <dd>{countryInfo?.nativeName}</dd>
                            <dt>Population:</dt>
                            <dd>{countryInfo?.population}</dd>
                            <dt>Region:</dt>
                            <dd>{countryInfo?.region}</dd>
                            <dt>Sub Region:</dt>
                            <dd>{countryInfo?.subregion}</dd>
                            <dt>Capital:</dt>
                            <dd>{countryInfo?.capital}</dd>
                        </dl>
                        <dl>
                            <dt>Top Level Domain:</dt>
                            <dd>{countryInfo?.topLevelDomain}</dd>
                            <dt>Currencies:</dt>
                            <dd>{countryInfo?.currencies}</dd>
                            <dt>Languages:</dt>
                            <dd>{countryInfo?.languages}</dd>
                        </dl>
                    </div>
                    {
                        countryInfo?.borders && countryInfo.borders.length > 0 &&
                        <dl>
                            <dt>Border Countries: </dt>
                            <dd>
                                <ul className={style.borderCountriesList}>
                                    {
                                        countryInfo?.borders.map((borderCountry: string, idx: number) => (
                                            <li key={idx}>
                                                <Link to={`/country/${borderCountry.toLowerCase()}`}>{borderCountry}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </dd>
                        </dl>
                    }
                </div>
            </div>
        </div>
    )
}
