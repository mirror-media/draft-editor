import quoteTypes from './blockquote-types'
import React from 'react'

const Quote = (props) => {
    return <blockquote {...props}>FUCK</blockquote>
}

function findQuote(contentBlock, callback) {
    if (quoteTypes.hasOwnProperty(contentBlock.getType())) {
        callback(0, contentBlock.getLength - 1)
    }
    callback(0, 0)
}

export default { strategy: findQuote, component: Quote }
