import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import queryClient, { persistCache } from './QueryClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useFetchProducts } from './api/products'

const Home = () => {
    const [isShow, setIsShow] = useState(false)

    const fetchData = async ({ pageParam = 1 }) => {
        // console.log(
        //     `https://nft-dev.test-development.work/api/v2/user/medias-following-kol?page=${page}`
        // )
        setIsShow(true)
        const response = await fetch(
            `https://sns-dev-jp.test-development.work/api/news-feed/index?page=${pageParam}`,
            {
                headers: {
                    Authorization: 'Bearer 5151|wrYw8hkOr5tzweYFJrBIne7pCuM3xgp8aMBp0AX7'
                }
            }
        )
        const data = await response.json()

        const asyncKey = `page-${pageParam}`
        await AsyncStorage.setItem(asyncKey, JSON.stringify(data))

        setIsShow(false)
        return data
    }

    // const [page, setPage] = useState(1)
    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery('posts', fetchData, {
        // initialData: queryClient.getQueriesData('posts'),
        getNextPageParam: (lastPage) => {
            const arr = lastPage?.links?.next?.split('page=') ?? []
            // console.log(arr)
            return arr[1] ?? undefined
        }
    })

    const handleLoadMore = () => {
        fetchNextPage()
    }

    useEffect(() => {
        console.log('==================')
        console.log(data)
    }, [data])

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator animating={isShow} />
            <FlatList
                data={Object.values(data?.pages ?? []).flatMap((page) => page?.data ?? [])}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                height: 100,
                                backgroundColor: index % 2 == 0 ? 'gray' : 'green',
                                flexDirection: 'row'
                            }}
                        >
                            <Text style={{ flex: 1 }}> {index}</Text>
                            <Text style={{ flex: 1 }}>{item?.content ?? item?.id}</Text>
                        </View>
                    )
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
            />
            <TouchableOpacity onPress={() => persistCache()}>
                <Text>Reload</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})

const a = {
    pageParams: [undefined],
    pages: [
        [
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object]
        ]
    ]
}
