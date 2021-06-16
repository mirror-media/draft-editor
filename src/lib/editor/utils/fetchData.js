import { createApolloFetch } from 'apollo-fetch'
import gql from 'graphql-tag'
// this will fix webpack bundling ES7 async/await cause error
import 'regenerator-runtime/runtime.js'

const fetch = createApolloFetch({
    uri: '/admin/api',
    // uri: 'https://cms-dev.readr.tw/admin/api',
    // uri: 'https://cms-dev.mnews.tw/admin/api',
})

function generateSelectString(columns) {
    return columns.join('\n')
}

function generateWhereString(columns) {
    const exclusion = ['duration']

    const filteredColumns = columns.filter(
        (column) => !exclusion.includes(column)
    )

    const whereArray = []
    let filterString = ''

    filteredColumns.map((column) => {
        // for video's filtering youtube
        if (column === 'youtubeUrl') {
            // prettier-ignore
            filterString='url_not_contains:"youtube"'
        }

        // for graphQL's coverPhoto part
        const isRelationShipField = column.split('{').length > 1
        if (!isRelationShipField) {
            whereArray.push(`{${column}_contains: $search}`)
        }
    })

    return `{OR: [${whereArray.join(',')}],${filterString}}`
}

export const fetchDataWithGql = async (
    { list, columns, maxItemsPerPage },
    search,
    page,
    setCallBack
) => {
    // console.log('fetchDataWithGql')
    const selectString = generateSelectString(columns)
    const whereString = generateWhereString(columns)
    // console.log(whereString)
    const { data } = await fetch({
        query: `
        query fetch${list}s($search: String!, $skip: Int!, $first: Int!) {
            all${list}s(where: ${whereString}, skip: $skip, first: $first, sortBy: id_DESC) {
              id
              ${selectString}
            }
        }`,
        variables: {
            search: search,
            skip: (page - 1) * maxItemsPerPage,
            first: maxItemsPerPage,
        },
    })

    // setCallBack(data[`all${list}s`])
    return data[`all${list}s`]
}

export const fetchDataCountWithGql = async (
    { list, columns, maxItemsPerPage },
    search
) => {
    // console.log('fetchDataCountWithGql')
    const whereString = generateWhereString(columns)
    const {
        data: {
            [`_all${list}sMeta`]: { count },
        },
    } = await fetch({
        query: `
            query($search: String!) {
                _all${list}sMeta(where: ${whereString}) {
                  count
                }
            }`,
        variables: {
            search: search,
        },
    })

    return count
}

// export const setPages = async ({ list, columns, maxItemsPerPage }, search) => {
//     console.log('setPages')
//     const whereString = generateWhereString(columns)
//     const {
//         data: {
//             [`_all${list}sMeta`]: { count },
//         },
//     } = await fetch({
//         query: `
//             query($search: String!) {
//                 _all${list}sMeta(where: ${whereString}) {
//                   count
//                 }
//             }`,
//         variables: {
//             search: search,
//         },
//     })

//     return Math.ceil(count / maxItemsPerPage)
// }
