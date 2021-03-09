// 'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EntityEditingBlockMixin from '../mixins/entity-editing-block-mixin'

export class YoutubeEditingBlock extends EntityEditingBlockMixin {
    constructor(props) {
        super(props)

        this.state = {
            editingFields: {
                id: props.id,
                description: props.description,
            },
        }
    }

    // overwrite
    _composeEditingFields(props) {
        return {
            id: {
                type: 'text',
                value: props.id,
            },
            description: {
                type: 'textarea',
                value: props.description,
            },
        }
    }
    // overwrite
    _decomposeEditingFields(fields) {
        return {
            id: fields.id.value,
            description: fields.description.value,
        }
    }
}

YoutubeEditingBlock.displayName = 'YoutubeEditingBlock'
YoutubeEditingBlock.propTypes = {
    description: PropTypes.string,
    isModalOpen: PropTypes.bool,
    onToggle: PropTypes.func,
    toggleModal: PropTypes.func,
    id: PropTypes.string,
}

YoutubeEditingBlock.defaultProps = {
    description: '',
    isModalOpen: false,
    id: '',
}

export default YoutubeEditingBlock
