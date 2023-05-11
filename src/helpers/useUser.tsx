import useSWR from 'swr'
import axios from 'axios'

export const endpoint = 'https://th0mascat.pythonanywhere.com'

export default function useUser(id: any) {

    const fetcher = (url: any) => axios.get(endpoint+url).then(res => res.data)

    const { data, mutate, isLoading } = useSWR(id, fetcher)

    return {
        comments: data,
        mutate: mutate,
        isLoading: isLoading,
    }
}