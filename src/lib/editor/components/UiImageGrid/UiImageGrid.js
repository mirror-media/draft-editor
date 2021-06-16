import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import '@fortawesome/fontawesome-free/js/fontawesome'
import UiImageItem from '../UiImageItem/UiImageItem'

function UiImageGrid(props) {
    const [images, setImages] = useState(props.images)
    const [selectedImages, setSelectedImages] = useState(props.selectedImages)

    useEffect(() => {
        setImages(props.images)
        setSelectedImages(props.selectedImages)
    }, [props])

    const handleSelect = (image) => {
        props.onSelect(image)
    }

    const { columns, padding } = props
    const width = Math.floor(100 / columns)

    const imageNodes = images.map((image) => {
        const isSelected = selectedImages.find((element) => {
            return element.id === image.id
        })
            ? true
            : false

        return (
            <UiImageItem
                key={image.id}
                image={image}
                isSelected={isSelected}
                onSelect={() => handleSelect(image)}
                padding={padding}
                width={width}
            />
        )
    })
    const imageGridStyle = {}
    return (
        <div className="image-grid" style={imageGridStyle}>
            {imageNodes}
        </div>
    )
}

UiImageGrid.propTypes = {
    columns: PropTypes.number,
    images: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    padding: PropTypes.number,
    selectedImages: PropTypes.array,
}

UiImageGrid.defaultProps = {
    columns: 6,
    images: [],
    padding: 10,
    selectedImages: [],
}

export default UiImageGrid
