import { QueryClient } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 24 * 60 * 60 * 1000, // 24 hours
            onError: (error) => console.log(error),
            onSettled: async (data, error, query) => {
                if (error) {
                    return
                }

                // Save data to AsyncStorage
                await storeAsync(query.queryKey, data)
            }
        }
    }
})

export const fetchAsync = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
}

export const storeAsync = async (key, value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
}

export const hydrateCache = async () => {
    const cacheData = await AsyncStorage.getItem('queryClientCache')
    console.log('cachceDataaaaaa: ', cacheData)
    if (cacheData) {
        const parsedCacheData = JSON.parse(cacheData)
        console.log('==========++++++++++++')
        console.log(parsedCacheData)
        queryClient.setQueryData(parsedCacheData)
    }

    // const cacheData = await AsyncStorage.getItem('queryClientCache')
    // if (cacheData) {
    //     const parsedCacheData = JSON.parse(cacheData)
    //     console.log('00000000000')
    //     console.log(parsedCacheData)
    //     // queryClient.setQueryData(parsedCacheData)
    //     queryClient.setQueryData(parsedCacheData)
    // }
    // const cacheData = await AsyncStorage.getItem('queryClientCache')
    // if (cacheData) {r
    //     queryClient.set(JSON.parse(cacheData))
    // }
}

export const persistCache = async () => {
    try {
        console.log('iiiiiiiiiiiii')
        // // console.log(queryClient.getQueriesData())
        // // console.log(JSON.stringify(queryClient.getQueryData()))
        console.log(JSON.stringify(queryClient.getQueriesData()))
        console.log('iiiiiiiiiiiii')

        console.log(JSON.stringify(queryClient.getQueryData()))
        // console.log('iiiiiiiiiiiii')

        // console.log(JSON.stringify(queryClient.getQueryState()))

        await AsyncStorage.setItem('queryClientCache', JSON.stringify(queryClient.getQueryData()))
        console.log('Saveeeeeeeeeee')
    } catch (error) {
        console.log('errrorrrrrr')
        console.log(error)
    }
}

export default queryClient
