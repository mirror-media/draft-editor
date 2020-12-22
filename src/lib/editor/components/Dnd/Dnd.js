import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Container from './Container'
import PropTypes from 'prop-types'

function Dnd(props) {
    const [images, setImages] = useState(props.selectedImages)

    // When props update, update corresponding state.
    useEffect(() => {
        setImages(props.selectedImages)
    }, [props])

    const handleImageRemove = (imageToRemove) => {
        const filtered = images.filter((image) => image.id !== imageToRemove.id)
        setImages(filtered)

        if (props.onChange) {
            props.onChange(filtered)
        }
    }

    const handleImageDataChange = (imageToChange) => {
        const changed = images.map((image) => {
            if (image.id === imageToChange.id) {
                return imageToChange
            }
            return image
        })
        setImages(changed)

        if (props.onChange) {
            props.onChange(changed)
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Container
                images={images}
                onRemove={handleImageRemove}
                onChange={handleImageDataChange}
            />
        </DndProvider>
    )
}

export default Dnd

Dnd.propTypes = {
    images: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

Dnd.defaultProps = {
    images: [],
}
