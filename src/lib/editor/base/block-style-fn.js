// 'use strict';
import quoteTypes from '../quote/quote-types(TODO)'

export default function blockStyleFn(contentBlock) {
    const blockType = contentBlock.getType()
    if (quoteTypes.hasOwnProperty(blockType)) {
        return quoteTypes[blockType].style
    }
    return
}
