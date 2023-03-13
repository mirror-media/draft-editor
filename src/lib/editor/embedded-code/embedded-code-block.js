// Aligned

import React, { Component } from 'react'
import htmlParser from 'html-react-parser'

import AtomicBlockRendererMixin from '../mixins/atomic-block-renderer-mixin'
import EditingBt from '../base/editing-bt'
import EmbeddedEditingBlock from './embedded-code-editing-block'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
    get,
    merge,
}

export class EmbeddedCodeBlock extends AtomicBlockRendererMixin {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.state.data) {
            return null
        }

        let blockContent = _.get(this.state.data, ['content', 0], {})
        // some post's embeddedCode is named as "code", not "embeddedCode"
        // need to handle code property for safety
        let embeddedCode = blockContent.embeddedCode || blockContent.code
        let description = blockContent.caption
        let style = {}
        if (blockContent.height) {
            style.minHeight = blockContent.height
        }
        if (blockContent.width) {
            style.width = blockContent.width
        }

        // this.props.blockProps.setReadOnly(this.state.editMode)

        const EditBlock = (
            <EmbeddedEditingBlock
                caption={description}
                embeddedCode={embeddedCode}
                label="embedded"
                isModalOpen={this.state.editMode}
                onToggle={this.handleEditingBlockChange}
                toggleModal={this.toggleEditMode}
            />
        )

        const contentState = this.props.contentState
        const blockWithLinkAtBeginning = contentState.getBlockForKey(
            this.props.entityKey
        )
        // const linkKey = blockWithLinkAtBeginning.getEntityAt(0)
        const data = contentState.getEntity(this.props.entityKey).getData()

        // const { url } = linkInstance.getData()
        const { caption, alignment } = data
        // const code = data.embeddedCode || data.code || ''

        // const convertHtmlStringToReactComponent = htmlParser(code)
        return (
            <div
                contentEditable={false}
                className="embedded-container center-block"
                style={_.merge(style, {
                    alignItem: 'center',
                    position: 'relative',
                    userSelect: 'none',
                })}
            >
                {caption}
                <EditingBt onClick={this.toggleEditMode} />
                {EditBlock}
            </div>
        )
    }
}

export default EmbeddedCodeBlock
