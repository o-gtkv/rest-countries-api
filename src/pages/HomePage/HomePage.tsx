import { useMemo, useState } from 'react'
import { Card, LoadingIndicator } from '../../components'
import { useFetch } from '../../hooks'
import iconSearch from '../../assets/images/magnifying-glass.svg'
import style from './HomePage.module.css'

export default function HomePage(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('')
    const [regionFilterValue, setRegionFilterValue] = useState('All')
    const [data, isLoading, isError, error] = useFetch(
        'https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital'
    )

    const fileteredData = useMemo(() => {
        // filters
        let filtered = data
        if (regionFilterValue !== 'All')
            filtered = filtered.filter((country: any) => country.region === regionFilterValue)
        // search
        if (!searchQuery)
            return filtered
        return filtered.filter((country: any) =>
            country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
    }, [searchQuery, isLoading, regionFilterValue])

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
                <select className={style.selectRegionFilter} defaultValue="All" onChange={(e) => setRegionFilterValue(e.target.value)}>
                    <option value="All" disabled={true}>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className={style.cardList}>
                {
                    fileteredData.map((country: any) => (
                        <Card
                            key={country.name.common}
                            flagImage={country.flags.svg}
                            flagDesc={country.flags.alt}
                            name={country.name.common}
                            population={country.population}
                            region={country.region}
                            capital={country.capital} />
                    ))
                }
            </div>
        </div>
    )
}
