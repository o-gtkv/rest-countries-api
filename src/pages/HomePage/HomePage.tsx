import { useMemo, useState, useDeferredValue } from 'react'
import { Card, LoadingIndicator } from '../../components'
import { useShortCountryInfo, TShortCountryInfo } from '../../hooks'
import iconSearch from '../../assets/images/magnifying-glass.svg'
import style from './HomePage.module.scss'

const DEFAULT_FILTER_VALUE = 'All'

export default function HomePage(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('')
    const [regionFilterValue, setRegionFilterValue] = useState(DEFAULT_FILTER_VALUE)
    const [countryInfoList, isLoading, isError, error] = useShortCountryInfo()
    const deferredQuery = useDeferredValue(searchQuery)

    const fileteredCountryInfoList = useMemo(() => {
        // filters
        let filtered = countryInfoList
        if (regionFilterValue !== DEFAULT_FILTER_VALUE)
            filtered = filtered.filter((countryInfo: TShortCountryInfo) =>
                countryInfo.region === regionFilterValue)
        // search
        if (!searchQuery)
            return filtered
        return filtered.filter((countryInfo: TShortCountryInfo) =>
            countryInfo.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
    }, [deferredQuery, isLoading, regionFilterValue])

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
                    <img className={style.searchInputIcon} src={iconSearch} alt="" />
                </div>
                <select className={style.selectRegionFilter} defaultValue="" onChange={(e) => setRegionFilterValue(e.target.value)}>
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
                    fileteredCountryInfoList.map((countryInfo: TShortCountryInfo) => (
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
