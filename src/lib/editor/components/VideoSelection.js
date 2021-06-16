import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UiVideoGrid from './UiVideoGrid/UiVideoGrid'
import SelectionMixin from './mixins/SelectionMixin'
import merge from 'lodash/merge'

const _ = {
    merge,
}

class VideoSelection extends SelectionMixin {
    constructor(props) {
        super(props)

        this.state = {
            items: props.Videos,
            selectedItems: props.selectedVideos,
        }
    }

    // replacement of componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            items: nextProps.Videos,
            selectedItems: nextProps.selectedVideos,
        }
    }

    render() {
        return (
            <UiVideoGrid
                Videos={this.state.items}
                onSelect={this.handleSelect}
                selectedVideos={this.state.selectedItems}
            />
        )
    }
}

VideoSelection.propTypes = {
    Videos: PropTypes.array,
    selectedVideos: PropTypes.array,
    selectionLimit: PropTypes.number,
    updateSelection: PropTypes.func.isRequired,
}

VideoSelection.defaultProps = {
    Videos: [],
    selectedVideos: [],
    selectionLimit: 1,
}

// module.exports = VideoSelection;
export default VideoSelection
