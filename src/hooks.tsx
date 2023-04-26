import axios from 'axios'
import { useState, useEffect } from "react"

export function useFetch(url: string) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch((e) => {
                setIsError(true)
                setError(e.message)
                setIsLoading(false)
            })
    }, [])

    return [data, isLoading, isError, error]
}