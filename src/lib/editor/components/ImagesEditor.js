import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dnd from './Dnd/Dnd'

class ImagesEditor extends Component {
    render() {
        const selectedImages = this.props.selectedImages

        return (
            <Dnd
                selectedImages={selectedImages}
                onChange={this.props.onChange}
            />
        )
    }
}

ImagesEditor.propTypes = {
    selectedImages: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

ImagesEditor.defaultProps = {
    selectedImages: [],
}

export default ImagesEditor
