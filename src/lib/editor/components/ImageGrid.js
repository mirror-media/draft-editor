import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import objectAssign from 'object-assign'
import '@fortawesome/fontawesome-free/js/fontawesome'

import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../components/Dnd/ItemTypes'

function ImageItem(props) {
    const [image, setImage] = useState(props.image)
    const [isSelected, setIsSelected] = useState(props.isSelected)
    const ref = useRef(null)

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

    const { width, padding, doShowRemove, style, moveCard, index } = props
    const { url, id, urlMobileSized } = image
    // console.log(image)
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
            // image snapshot url
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

    let opacity = {}
    // Only image in Dng area would have this property\
    if (moveCard) {
        const [, drop] = useDrop({
            accept: ItemTypes.CARD,
            hover(item, monitor) {
                if (!ref.current) {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index
                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return
                }
                // Determine rectangle on screen
                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                // Get horizontal middle
                const hoverMiddleX =
                    (hoverBoundingRect.right - hoverBoundingRect.left) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                // Get pixels to the top
                // const hoverClientY = clientOffset.y - hoverBoundingRect.top
                const hoverClientX = hoverBoundingRect.right - clientOffset.x
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientX > hoverMiddleX) {
                    return
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientX < hoverMiddleX) {
                    return
                }
                // Time to actually perform the action
                moveCard(dragIndex, hoverIndex)
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                item.index = hoverIndex
            },
        })
        const [{ isDragging }, drag] = useDrag({
            item: { type: ItemTypes.CARD, id, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })
        opacity = isDragging ? 1 : 1
        drag(drop(ref))
    }
    return (
        <div
            onClick={handleSelect}
            className="imageGridItem"
            style={{ ...styles.imageGridItem, opacity }}
            ref={ref}
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
