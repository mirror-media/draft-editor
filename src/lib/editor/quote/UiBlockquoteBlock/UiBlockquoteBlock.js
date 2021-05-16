import React from 'react'
import PropTypes from 'prop-types'
import './UiBlockquoteBlock.css'

function UiBlockquoteBlock({ quote, quoteBy, toggleEditMode }) {
    return (
        <>
            <div
                className="block-quote-block"
                contentEditable={false}
                onClick={toggleEditMode}
            >
                <div className="block-quote-block__quote">{quote}</div>
                <div className="block-quote-block__quote_by">{`- ${quoteBy}`}</div>
            </div>
        </>
    )
}

UiBlockquoteBlock.propTypes = {
    quote: PropTypes.string,
    quoteBy: PropTypes.string,

    toggleEditMode: PropTypes.func,
}

export default UiBlockquoteBlock
