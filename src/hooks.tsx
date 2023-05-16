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

export function useShortCountryInfo(): [TShortCountryInfo[], boolean, boolean, string] {
    const [countryInfoList, setCountryInfoList] = useState<TShortCountryInfo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital')
                const countryInfoListTmp = res.data.map((countryItem: any) => {
                    return {
                        name: countryItem.name.common,
                        flag: { img: countryItem.flags.svg, alt: countryItem.flags.alt },
                        population: countryItem.population,
                        region: countryItem.region,
                        capital: countryItem.capital.join(', ')
                    }
                })
                setCountryInfoList(countryInfoListTmp)
                setIsLoading(false)
            }
            catch (e: any) {
                setIsError(true)
                setError(e.message)
                setIsLoading(false)
            }
        })()
    }, [])

    return [countryInfoList, isLoading, isError, error]
}

export function useDetailedCountryInfo(name: string | undefined): [TDetailedCountryInfo | null, boolean, boolean, string] {
    const [countryInfo, setCountryInfo] = useState<TDetailedCountryInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
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
                    const promises = country.borders.map((borderCountry: string) => axios.get(`https://restcountries.com/v3.1/alpha/${borderCountry}`))
                    const res = await Promise.all(promises)
                    setCountryInfo({
                        ...data,
                        borders: res.map(item => item.data[0].name.common)
                    })
                }
                else {
                    setCountryInfo({
                        ...data,
                        borders: []
                    })
                }
                setIsLoading(false)
            }
            catch (e: any) {
                setIsError(true)
                setError(e.message)
            }
        })()
    }, [name])

    return [countryInfo, isLoading, isError, error]
}