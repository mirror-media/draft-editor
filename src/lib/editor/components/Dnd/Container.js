import React, { useState, useCallback, useEffect } from 'react'
// import { Card } from './Card'
import { ImageItem } from '../ImageGrid'
import { Form, Input } from 'element-react'

import update from 'immutability-helper'

const style = {
    display: 'flex',
    flexWrap: 'wrap',
}
export const Container = (props) => {
    // const [cards, setCards] = useState(props.cards)
    const [images, setImages] = useState(props.images)

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
    const renderCard = (image, index) => {
        const { onRemove, onChange } = props

        return (
            // <Card
            //     key={card.id}
            //     index={index}
            //     id={card.id}
            //     text={card.title}
            //     moveCard={moveCard}
            // />
            <ImageItem
                key={image.id}
                doShowRemove
                image={image}
                width={33}
                // id={image.id}
                // link={image.link}
                // onChange={this._handleChange.bind(this, image)}
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
                        defaultValue={image.description}
                        name="image-caption-input"
                        // onChange={this._handleInputChange.bind(this, image)}
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
