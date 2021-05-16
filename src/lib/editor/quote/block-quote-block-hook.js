import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import merge from 'lodash/merge'
import BlockQuoteEditingBlock from './block-quote-editing-block'

const _ = {
    get,
    merge,
}

function BlockQuoteBlock(props) {
    const originalData = getEntityBlockDataFromProps(props) || {}

    const [data, setData] = useState(originalData)
    const [editMode, setEditMode] = useState(false)
    if (!data) {
        return null
    }
    useEffect(() => {
        console.log('data', data)
    }, [data])

    function toggleEditMode(e) {
        if (typeof _.get(e, 'stopPropagation') === 'function') {
            e.stopPropagation()
        }
        setEditMode((prevState) => !prevState)
    }

    function handleEditingBlockChange(value) {
        setData(value)
        toggleEditMode()
    }

    const blockContent = _.get(data, ['content', 0], {})
    const { quote, quoteBy } = blockContent

    const EditBlock = (
        <BlockQuoteEditingBlock
            label="blockquote"
            isModalOpen={editMode}
            onToggle={handleEditingBlockChange}
            quote={quote}
            quoteBy={quoteBy}
            toggleModal={toggleEditMode}
        />
    )
    return (
        <div
            contentEditable={false}
            style={{
                // backgroundColor: 'GhostWhite',
                cursor: 'pointer',
                // padding: '16px 0',
            }}
        >
            <div className="Blockquote__text" onClick={toggleEditMode}>
                <blockquote>
                    <div>{quote}</div>
                    <h6>{`- ${quoteBy}`}</h6>
                </blockquote>
            </div>
            {EditBlock}
        </div>
    )
}

BlockQuoteBlock.propTypes = {}

function getEntityBlockDataFromProps(props) {
    const blockKey = props.block.getKey()
    let blocks = _.get(props, ['blockProps', 'data'], [])

    let rtn = null
    for (let block of blocks) {
        if (_.get(block, 'id') === blockKey) {
            rtn = _.merge({}, block)
            break
        }
    }

    return rtn
}

export default BlockQuoteBlock
