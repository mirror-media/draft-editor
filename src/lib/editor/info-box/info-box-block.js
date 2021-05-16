// Aligned
import React from 'react'
import AtomicBlockRendererMixin from '../mixins/atomic-block-renderer-mixin'
import InfoBoxEditingBlock from './info-box-editing-block'
import get from 'lodash/get'
import UiInfoBoxBlock from './UiInfoBoxBlock/UiInfoBoxBlock'

const _ = {
    get,
}

export class InfoBoxBlock extends AtomicBlockRendererMixin {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        const { setMainDraftReadOnly } = this.props.blockProps
        if (this.state.editMode) {
            setMainDraftReadOnly(true)
        } else {
            setMainDraftReadOnly(false)
        }
    }

    render() {
        if (!this.state.data) {
            return null
        }

        let blockContent = _.get(this.state.data, ['content', 0], {})
        let title = blockContent.title
        let body = blockContent.body
        let draftRawObj = blockContent.draftRawObj

        const EditBlock = (
            <InfoBoxEditingBlock
                label="infobox"
                onToggle={this.handleEditingBlockChange}
                title={title}
                body={body}
                draftRawObj={draftRawObj}
                isModalOpen={this.state.editMode}
                toggleModal={this.toggleEditMode}
            />
        )

        return (
            <>
                <UiInfoBoxBlock
                    title={title}
                    body={body}
                    toggleEditMode={this.toggleEditMode}
                />
                {EditBlock}
            </>
        )
    }
}

export default InfoBoxBlock
