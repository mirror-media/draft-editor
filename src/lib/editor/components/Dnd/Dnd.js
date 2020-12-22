import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Container from './Container'
import PropTypes from 'prop-types'

function Dnd(props) {
    const [images, setImages] = useState(props.selectedImages)

    useEffect(() => {
        console.log(props.selectedImages)
        setImages(props.selectedImages)
    }, [props])

    const handleRemove = (imageToRemove) => {
        const filtered = images.filter((image) => image.id !== imageToRemove.id)

        setImages(filtered)
        props.onChange(filtered)
    }

    const handleChange = (imageToChange) => {
        const changed = images.map((image) => {
            if (image.id === imageToChange.id) {
                return imageToChange
            }
            return image
        })
        setImages(changed)
        props.onChange(changed)
    }
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Container
                    images={images}
                    onChange={handleChange}
                    onRemove={handleRemove}
                />
            </DndProvider>
        </div>
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
