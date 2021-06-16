// 'use strict';
import quoteTypes from '../blockquote(NO_USE)/blockquote-types'

export default function blockStyleFn(contentBlock) {
    const blockType = contentBlock.getType()
    if (quoteTypes.hasOwnProperty(blockType)) {
        return quoteTypes[blockType].style
    }
    return
}
