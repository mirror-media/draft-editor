import React, { useState, useEffect } from 'react'
import ImageItem from './ImageItem'

function ImageGrid(props) {
    // console.log(props.images)
    const [images, setImages] = useState(props.images)
    const [selectedImages, setSelectedImages] = useState(props.selectedImages)
    const [prevProps, setPrevProps] = useState({
        images: props.images,
        selectedImages: props.selectedImages,
    })

    //getDerivedStateFromProps
    if (props.images !== images || props.selectedImages !== selectedImages) {
        setImages(props.images)
        setSelectedImages(props.selectedImages)
    }

    const handleSelect = (image) => {
        props.onSelect(image)
    }

    // handle rendering image previews
    const { columns, padding } = props
    const width = Math.floor(100 / columns)
    const imageNodes = images.map((image, index) => {
        const checkIfSelected = selectedImages.find((element) => {
            return element.id === image.id
        })
        const isSelected = checkIfSelected ? true : false

        return (
            // <h1 key={image.id}>ImageItem</h1>
            <ImageItem
                key={image.id}
                // image={image}
                // isSelected={isSelected}
                // onSelect={handleSelect(image)}
                // padding={padding}
                // width={width}
            />
        )
    })

    return <div className="imageGrid">{imageNodes}</div>
}

export default ImageGrid
