import axios from 'axios'
import  useSWR  from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const useGetData = url => { 
    const { data, error,isLoading } = useSWR(url, fetcher)
    return { data, error,isLoading }
}

export default useGetData