import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@arch-ui/button'
import './StyleButton.css'

function StyleButton({
    isActive,
    onToggle, // toggle handler from upper
    iconClassName, // fontawesome icon
    label, // which style name is (for tooltip)
    style, // which ttyle name is (fot draft)
    text, // if no icon, show text
}) {
    const buttonHandler = (e) => {
        e.preventDefault()
        onToggle(style)
    }

    let className = ''
    if (isActive) {
        className += ' RichEditor-activeButton'
    }

    const buttonContent =
        iconClassName.length > 0 ? (
            <i className={'fa ' + iconClassName}></i>
        ) : (
            <span>{text}</span>
        )
    return (
        <Button
            type="default"
            className={className + ' tooltip-box'}
            onClick={buttonHandler}
            data-tooltip={label}
            size="normal"
        >
            {buttonContent}
        </Button>
    )
}

StyleButton.propTypes = {
    isActive: PropTypes.bool,
    onToggle: PropTypes.func,
    iconClassName: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.string,
    text: PropTypes.string,
}

export default StyleButton
