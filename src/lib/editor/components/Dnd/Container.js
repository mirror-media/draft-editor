import React, { useState, useCallback, useEffect } from 'react'
// import { Card } from './Card'
import { ImageItem } from '../ImageGrid'
import { Form, Input } from 'element-react'

import update from 'immutability-helper'

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
}
export const Container = (props) => {
    const [images, setImages] = useState(props.images)
    const { onRemove, onChange } = props

    // When props update, update corresponding state.
    useEffect(() => {
        setImages(props.images)
    }, [props])

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragImage = images[dragIndex]
            setImages(
                update(images, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragImage],
                    ],
                })
            )
        },
        [images]
    )

    const handleInputChange = (value, image) => {
        let newImageData = image
        newImageData.title = value
        onChange(newImageData)
    }

    const renderCard = (image, index) => {
        return (
            <ImageItem
                key={image.id}
                doShowRemove
                image={image}
                width={33}
                // id={image.id}
                // link={image.link}
                onChange={onChange}
                onRemove={onRemove}
                padding={10}
                url={image.url}
                style={{ border: '1px solid gainsboro' }}
            >
                <Form
                    key={image.id}
                    label=""
                    htmlFor="image-caption-input"
                    style={{ paddingTop: '5px' }}
                >
                    <Input
                        key={image.id}
                        placeholder="input caption here"
                        // multiline
                        defaultValue={image.title}
                        name="image-caption-input"
                        onChange={(value) => handleInputChange(value, image)}
                    />
                </Form>
            </ImageItem>
        )
    }

    return (
        <>
            <div style={style}>
                {images.map((image, i) => renderCard(image, i))}
            </div>
        </>
    )
}

export default Container
