import { useQuery } from 'react-query'

const useFetchProducts = () => {
    return useQuery(
        // định danh
        'products',
        () => {
            fetch('/api/products')
        }
    )
}

export { useFetchProducts }
