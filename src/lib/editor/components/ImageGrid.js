import React, { Component, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import objectAssign from 'object-assign'
import '@fortawesome/fontawesome-free/js/fontawesome'

import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../components/Dnd/ItemTypes'

function ImageItem(props) {
    const [image, setImage] = useState(props.image)
    const [isSelected, setIsSelected] = useState(props.isSelected)

    useEffect(() => {
        setImage(props.image)
        setIsSelected(props.isSelected)
    }, [props])

    const handleSelect = (e) => {
        if (typeof props.onSelect === 'function') {
            props.onSelect(e)
        }
    }

    const handleRemove = (e) => {
        props.onRemove(image)
    }

    const { width, padding, doShowRemove, style } = props
    const { url, id } = image
    const styles = {
        imageGridItem: objectAssign(
            {
                boxSizing: 'border-box',
                display: 'inline-block',
                padding,
                width: `${width}%`,
            },
            style
        ),
        imageWrapper: {
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            cursor: 'pointer',
            paddingTop: '100%',
            position: 'relative',
            textAlign: 'right',
            width: '100%',
        },
        iconWrapper: {
            height: '2rem',
            position: 'relative',
        },
    }

    let btStyle = {
        fontSize: '2em',
        color: 'rgb(44,162,252)',
        backgroundColor: 'white',
        borderRadius: '1rem',
        // position: 'absolute',
        // top: '0',
        // right: '0',
    }

    const bt = doShowRemove ? (
        <div style={{ display: 'inline-block' }} onClick={handleRemove}>
            <i className="fas fa-times-circle" style={btStyle} />
        </div>
    ) : isSelected ? (
        <div style={{ display: 'inline-block' }}>
            <i className="fas fa-check-circle" style={btStyle} />
        </div>
    ) : null

    return (
        <div
            onClick={handleSelect}
            className="imageGridItem"
            style={styles.imageGridItem}
        >
            <div className="imageWrapper" style={styles.imageWrapper}>
                <div className="iconWrapper" style={styles.iconWrapper}>
                    {bt}
                </div>
            </div>
            {props.children}
        </div>
    )
}

ImageItem.propTypes = {
    doShowRemove: PropTypes.bool,
    isSelected: PropTypes.bool,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
    padding: PropTypes.number,
    style: PropTypes.object,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
}

ImageItem.defaultProps = {
    doShowRemove: false,
    isSelected: false,
    padding: 0,
    style: {},
    url: '',
    width: 100,
}

function ImageGrid(props) {
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
            <ImageItem
                key={image.id}
                image={image}
                isSelected={isSelected}
                onSelect={() => handleSelect(image)}
                padding={padding}
                width={width}
            />
        )
    })
    const imageGridStyle = {
        //     display: 'flex',
        //     flexWrap: 'wrap',
    }
    return (
        <div className="imageGrid" style={imageGridStyle}>
            {imageNodes}
        </div>
    )
}

ImageGrid.propTypes = {
    columns: PropTypes.number,
    images: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    padding: PropTypes.number,
    selectedImages: PropTypes.array,
}

ImageGrid.defaultProps = {
    columns: 4,
    images: [],
    padding: 10,
    selectedImages: [],
}

export { ImageGrid, ImageItem }
