import useSWR from 'swr'
import axios from 'axios'

export const endpoint = 'http://127.0.0.1:8000'

export default function useUser(id: any) {
    const fetcher = (url: any) => axios.get(url).then(res => res.data)
    const { data, mutate, isLoading } = useSWR(id, fetcher)

    return {
        comments: data,
        mutate: mutate,
        isLoading: isLoading
    }
}