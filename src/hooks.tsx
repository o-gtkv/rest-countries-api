import axios from 'axios'
import { useState, useEffect } from "react"

export type TShortCountryInfo = {
    name: string,
    flag: { img: string, alt: string },
    population: number,
    region: string,
    capital: string
}

type TDetailedCountryInfo = {
    name: string,
    flag: { img: string, alt: string },
    nativeName: string,
    population: string,
    region: string,
    subregion: string,
    capital: string,
    topLevelDomain: string,
    currencies: string,
    languages: string,
    borders: string[]
}

export function useShortCountryInfo()
    : [TShortCountryInfo[], boolean, boolean, string] {
    const [countryInfo, setCountryInfo] = useState<TShortCountryInfo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital')
            .then(res => {
                const countryInfoTmp = res.data.map((item: any) => {
                    return {
                        name: item.name.common,
                        flag: { img: item.flags.svg, alt: item.flags.alt },
                        population: item.population,
                        region: item.region,
                        capital: item.capital.join(', ')
                    }
                })
                setCountryInfo(countryInfoTmp)
                setIsLoading(false)
            })
            .catch((e) => {
                setIsError(true)
                setError(e.message)
                setIsLoading(false)
            })
    }, [])

    return [countryInfo, isLoading, isError, error]
}

export function useDetailedCountryInfo(name: string | undefined)
    : [TDetailedCountryInfo | null, boolean, boolean, string] {
    const [countryInfo, setCountryInfo] = useState<TDetailedCountryInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                const country = res.data[0]
                const data = {
                    name: country.name.common,
                    flag: {
                        img: country.flags.svg,
                        alt: country.flags.alt
                    },
                    nativeName: Object.values(country.name.nativeName).map((name: any) => name.official).join(', '),
                    population: country.population,
                    region: country.region,
                    subregion: country.subregion,
                    capital: Object.values(country.capital).join(', '),
                    topLevelDomain: Object.values(country.tld).join(', '),
                    currencies: Object.values(country.currencies).map((curr: any) => curr.name).join(', '),
                    languages: Object.values(country.languages).join(', '),
                }
                if (country.borders) {
                    const promises = country.borders.map((borderCountry: string) =>
                        axios.get(`https://restcountries.com/v3.1/alpha/${borderCountry}`))
                    Promise.all(promises)
                        .then((res) => {
                            setCountryInfo({
                                ...data,
                                borders: res.map(item => item.data[0].name.common)
                            })
                            setIsLoading(false)
                        })
                        .catch((e) => {
                            setIsError(true)
                            setError(e.message)
                        })
                }
                else {
                    setCountryInfo({
                        ...data,
                        borders: []
                    })
                    setIsLoading(false)
                }
            })
            .catch((e) => {
                setIsError(true)
                setError(e.message)
            })
    }, [name])

    return [countryInfo, isLoading, isError, error]
}