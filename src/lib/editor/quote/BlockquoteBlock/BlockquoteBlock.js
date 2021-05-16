import React from 'react'
import PropTypes from 'prop-types'
import './BlockquoteBlock.css'

function BlockquoteBlock({ quote, quoteBy, EditBlock, toggleEditMode }) {
    return (
        <div
            className="block-quote-block"
            contentEditable={false}
            onClick={toggleEditMode}
        >
            <div className="block-quote-block__quote">{quote}</div>
            <div className="block-quote-block__quote_by">{`- ${quoteBy}`}</div>

            {EditBlock}
        </div>
    )
}

BlockquoteBlock.propTypes = {
    quote: PropTypes.string,
    quoteBy: PropTypes.string,
    EditBlock: PropTypes.object,
    toggleEditMode: PropTypes.func,
}

export default BlockquoteBlock
