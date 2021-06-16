import quoteTypes from './blockquote-types'
import React from 'react'

const Quote = (props) => {
    console.log('LIYI QUOTE PROPS')
    console.log(props)
    return <blockquote {...props}></blockquote>
}

function findQuote(contentBlock, callback) {
    if (quoteTypes.hasOwnProperty(contentBlock.getType())) {
        callback(0, contentBlock.getLength - 1)
    }
    callback(0, 0)
}

export default { strategy: findQuote, component: Quote }
