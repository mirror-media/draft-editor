import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@arch-ui/button'
import './EnlargedButton.css'
import iconCompress from './icon-compress.svg'
import iconExpand from './icon-expand.svg'

function EnlargeButton({ isEnlarged, enlargeEditorHandler }) {
    return (
        <Button
            className={`expand-button ${isEnlarged ? 'expanded' : ''}`}
            onClick={enlargeEditorHandler}
            aria-haspopup="true"
            aria-expanded={isEnlarged}
            title="expand"
        >
            <div className="expand-button__icon">
                <img src={isEnlarged ? iconCompress : iconExpand} alt="" />
            </div>
        </Button>
    )
}

EnlargeButton.propTypes = {
    isEnlarged: PropTypes.bool,
    enlargeEditorHandler: PropTypes.func,
}

export default EnlargeButton
