import get from 'lodash/get'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
const probe = require('probe-image-size')

const _ = {
    get,
    merge,
    pick,
}

function composeImageSet(imageObj = {}) {
    let resizedTargets = _.get(imageObj, 'resizedTargets')
    if (!resizedTargets) {
        return imageObj
    }
    let original = {
        url: imageObj.url,
        width: imageObj.width,
        height: imageObj.height,
    }
    let image = {}
    return _.merge(image, resizedTargets, {
        original: original,
        url: _.get(resizedTargets, ['mobile', 'url']),
        description: imageObj.description,
        keywords: imageObj.keywords,
        id: imageObj.id,
    })
}

async function getUrlImageDimentions(url) {
    // console.log('getUrlImageDimentions', url)
    // try {
    //     let result = await probe(url, { rejectUnauthorized: false })
    //     console.log(result) // =>
    // } catch (err) {
    //     console.log(err) // =>
    // }
    return null
}

export const parseImageAPIResponse = function (apiResponse) {
    console.log('apiResponse')
    console.log(apiResponse)
    let imageObj = _.get(apiResponse, ['fields', 'image'], {})
    let id = apiResponse.id
    // let description = _.get(apiResponse, ['fields', 'description'])
    // let keywords = _.get(apiResponse, ['fields', 'keywords'])
    // console.log("fetch image and get it's height and width")
    let name = apiResponse.name
    let url = apiResponse.urlOriginal
    let urlDesktopSized = apiResponse.urlDesktopSized
    let urlTabletSized = apiResponse.urlTabletSized
    let urlMobileSized = apiResponse.urlMobileSized
    let urlTinySized = apiResponse.urlTinySized
    getUrlImageDimentions(url)
    // getUrlImageDimentions(urlDesktopSized)
    // getUrlImageDimentions(urlTabletSized)
    // getUrlImageDimentions(urlMobileSized)
    // getUrlImageDimentions(urlTinySized)
    let image = _.merge({}, imageObj, {
        id,
        name,
        url,
        desktop: {
            url: urlDesktopSized,
        },
        tablet: {
            url: urlTabletSized,
        },
        mobile: {
            url: urlMobileSized,
        },
        tiny: {
            url: urlTinySized,
        },
    })
    return composeImageSet(image)
}

export const parseAudioAPIResponse = function (apiResponse) {
    // let audio = _.get(apiResponse, ['fields', 'audio'], {})

    // audio = _.pick(audio, ['filetype', 'name', 'url'])

    // let coverPhoto = composeImageSet(
    //     _.get(apiResponse, ['fields', 'coverPhoto'], {})
    // )
    // let description = _.get(apiResponse, ['fields', 'description', 'html'], '')
    // let name = _.get(apiResponse, ['fields', 'name'], '')
    // audio = _.merge(audio, {
    //     id: apiResponse.id,
    //     coverPhoto,
    //     description,
    //     name,
    // })
    // return audio
    return apiResponse
}
