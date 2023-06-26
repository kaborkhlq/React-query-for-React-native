/**
 * @format
 */

import { AppRegistry, View } from 'react-native'
import { name as appName } from './app.json'
import CallKeepDemo from './app/CallKeepDemo'
import Home from './app/Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient, { hydrateCache, persistCache } from './app/QueryClient'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const queryClient = new QueryClient()

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             cacheTime: 1000 * 60 * 60 * 24 // Thời gian lưu cache là 5 phút (tuỳ chỉnh theo nhu cầu)
//         }
//     }
// })

const App = () => {
    const [isRestore, setIsRestore] = useState(true)

    const initializeData = async () => {
        try {
            let page = 1
            let data = await AsyncStorage.getItem(`page-${page}`)
            console.log('0000000000000000011111')

            while (data != undefined) {
                // Thêm dữ liệu vào cache của React Query
                console.log('00000000000000000')
                console.log(data)
                queryClient.setQueryData('posts', (old) => [...old, JSON.parse(data)])

                page += 1
                data = await AsyncStorage.getItem(`page-${page}`)
            }
        } catch (error) {
            console.log('66666666')
            console.log(error)
        }
    }

    const restore = async () => {
        // await hydrateCache()
        await initializeData()
        setIsRestore(false)
    }

    useEffect(() => {
        // Khôi phục dữ liệu cache khi ứng dụng khởi chạy
        restore()
        return () => {
            persistCache() // Lưu trữ dữ liệu cache khi ứng dụng bị đóng
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            {isRestore ? <View /> : <Home />}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

AppRegistry.registerComponent(appName, () => App)
