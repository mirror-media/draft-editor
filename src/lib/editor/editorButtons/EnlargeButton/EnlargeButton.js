import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@arch-ui/button'
import './EnlargedButton.css'

function EnlargeButton({ isEnlarged, enlargeEditorHandler }) {
    let expandBtnClass = ''

    if (isEnlarged) {
        expandBtnClass = ' expanded'
    }
    return (
        <Button
            className={'DraftEditor-expandButton ' + expandBtnClass}
            onClick={enlargeEditorHandler}
            aria-haspopup="true"
            aria-expanded={isEnlarged}
            title="expand"
        >
            {isEnlarged ? (
                <i className="fa fa-compress" aria-hidden="true"></i>
            ) : (
                <i className="fa fa-expand" aria-hidden="true"></i>
            )}
        </Button>
    )
}

EnlargeButton.propTypes = {
    isEnlarged: PropTypes.bool,
    enlargeEditorHandler: PropTypes.func,
}

export default EnlargeButton
