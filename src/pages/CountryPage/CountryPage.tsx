import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { LoadingIndicator } from '../../components'
// import { useFetch } from '../../hooks'
import style from './CountryPage.module.css'

type flagType = {
    img: string,
    alt: string
}

type pageDataType = {
    name: string,
    flag: flagType,
    nativeName: string,
    population: string,
    region: string,
    subregion: string,
    capital: string,
    topLevelDomain: string,
    currencies: string,
    languages: string,
    borders: Array<string>
}

export default function CountryPage() {
    const { name } = useParams()
    const [pageData, setPageData] = useState<pageDataType | null>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then((res) => {
                const country = res.data[0]
                if (country.borders) {
                    const promises = []
                    for (let borderCountry of country.borders) {
                        promises.push(axios.get(`https://restcountries.com/v3.1/alpha/${borderCountry}`))
                    }
                    Promise.all(promises)
                        .then((res) => {
                            // for (let item of res) {
                            //     const borderCountryName = item.data[0].name.common
                            //     // console.log(borderCountryName);
                            // }
                            setPageData({
                                name: country.name.common,
                                flag: { img: country.flags.svg, alt: country.flags.alt },
                                nativeName: Object.values(country.name.nativeName).map((name: any) => name.official).join(', '),
                                population: country.population,
                                region: country.region,
                                subregion: country.subregion,
                                capital: Object.values(country.capital).join(', '),
                                topLevelDomain: Object.values(country.tld).join(', '),
                                currencies: Object.values(country.currencies).map((curr: any) => curr.name).join(', '),
                                languages: Object.values(country.languages).join(', '),
                                borders: res.map(item => item.data[0].name.common)
                            })
                            setIsLoading(false)
                        })
                        .catch((e) => {
                            setIsError(true)
                            setError(e.message)
                        })
                }
            })
            .catch((e) => {
                setIsError(true)
                setError(e.message)
            })
    }, [])
    // const [data, isLoading, isError, error] = useFetch(`https://restcountries.com/v3.1/name/${name}`)
    // const navigate = useNavigate()

    if (isError)
        return <div>{error}</div>
    if (isLoading)
        return <LoadingIndicator />

    // console.log(
    //     pageData?.nativeName,
    //     pageData?.population,
    //     pageData?.region,
    //     pageData?.subregion,
    //     pageData?.capital,
    //     pageData?.topLevelDomain,
    //     pageData?.currencies,
    //     pageData?.languages,
    //     pageData?.borders
    // )

    // const country = data[0]
    // const nativeName = Object.values(country.name.nativeName).map((name: any) => name.official).join(', ')
    // const currencies = Object.values(country.currencies).map((curr: any) => curr.name).join(', ')
    // const languages = Object.values(country.languages).join(', ')


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
                    <img className={style.flagImage} src={pageData?.flag.img} alt={pageData?.flag.alt} />
                </div>
                <div className={style.infoBlock}>
                    <h2>{pageData?.name}</h2>
                    <div className={style.flexContainer}>
                        <dl>
                            <dt>Native name:</dt>
                            <dd>{pageData?.nativeName}</dd>
                            <dt>Population:</dt>
                            <dd>{pageData?.population}</dd>
                            <dt>Region:</dt>
                            <dd>{pageData?.region}</dd>
                            <dt>Sub Region:</dt>
                            <dd>{pageData?.subregion}</dd>
                            <dt>Capital:</dt>
                            <dd>{pageData?.capital}</dd>
                        </dl>
                        <dl>
                            <dt>Top Level Domain:</dt>
                            <dd>{pageData?.topLevelDomain}</dd>
                            <dt>Currencies:</dt>
                            <dd>{pageData?.currencies}</dd>
                            <dt>Languages:</dt>
                            <dd>{pageData?.languages}</dd>
                        </dl>
                    </div>
                    <dl>
                        <dt>Border Countries: </dt>
                        <dd>
                            <ul className={style.borderCountriesList}>
                                {
                                    pageData?.borders.map((borderCountry: string, idx: number) => {
                                        return <li key={idx}>{borderCountry}</li>
                                    })
                                }
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}
