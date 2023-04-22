import useSWR from 'swr'
import axios from 'axios'

const endpoint = 'https://th0mascat.pythonanywhere.com/'

export default function useUser(id: any) {
    const fetcher = (url: any) => axios.get(url).then(res => res.data)
    const { data, mutate } = useSWR(id, fetcher)

    return {
        comments: data,
        mutate: mutate
    }
}