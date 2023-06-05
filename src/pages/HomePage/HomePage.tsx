import { useMemo, useState, useDeferredValue } from 'react'
import { Card, LoadingIndicator } from '../../components'
import { useShortCountryInfo, TShortCountryInfo } from '../../hooks'
import style from './HomePage.module.scss'

const DEFAULT_FILTER_VALUE = 'All'

export default function HomePage(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('')
    const [regionFilterVal, setRegionFilterVal] = useState(DEFAULT_FILTER_VALUE)
    const [countryInfoList, isLoading, isError, error] = useShortCountryInfo()
    const deferredQuery = useDeferredValue(searchQuery)

    // const fileteredCountryInfoList = useMemo(() => {
    //     // filters
    //     let filtered = countryInfoList
    //     if (regionFilterValue !== DEFAULT_FILTER_VALUE)
    //         filtered = filtered.filter((countryInfo: TShortCountryInfo) =>
    //             countryInfo.region === regionFilterValue)
    //     // search
    //     if (!searchQuery)
    //         return filtered
    //     return filtered.filter((countryInfo: TShortCountryInfo) =>
    //         countryInfo.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    //     )
    // }, [deferredQuery, isLoading, regionFilterValue])

    let fileteredList = useMemo(() => {
        let filtered = countryInfoList
        if (regionFilterVal !== DEFAULT_FILTER_VALUE)
            filtered = filtered.filter((ci: TShortCountryInfo) =>
                ci.region === regionFilterVal)
        return filtered
    }, [isLoading, regionFilterVal])

    fileteredList = useMemo(() => {
        if (!searchQuery)
            return fileteredList
        return fileteredList.filter((ci: TShortCountryInfo) =>
            ci.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
    }, [deferredQuery, isLoading, regionFilterVal])

    if (isLoading)
        return <LoadingIndicator />
    if (isError)
        return <div>{error}</div>

    return (
        <div className={style.container}>
            <div className={style.tools}>
                <div className={style.searchInputWrapper}>
                    <input
                        className={style.searchInput}
                        type="text"
                        placeholder="Search for a country..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className={style.searchInputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </div>
                <select className={style.selectRegionFilter} defaultValue="" onChange={(e) => setRegionFilterVal(e.target.value)}>
                    <option value="" disabled={true}>Filter by Region</option>
                    <option value={DEFAULT_FILTER_VALUE}>All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className={style.cardList}>
                {
                    fileteredList.map((countryInfo: TShortCountryInfo) => (
                        <Card
                            key={countryInfo.name}
                            flagImage={countryInfo.flag.img}
                            flagDesc={countryInfo.flag.alt}
                            name={countryInfo.name}
                            population={countryInfo.population}
                            region={countryInfo.region}
                            capital={countryInfo.capital} />
                    ))
                }
            </div>
        </div>
    )
}
