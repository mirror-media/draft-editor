import React from 'react'
import PropTypes from 'prop-types'
import './UiInfoBoxBlock.css'

function UiInfoBoxBlock({ title, body, toggleEditMode }) {
    return (
        <div contentEditable={false} className="info-box-block">
            <div className="info-box-block__text" onClick={toggleEditMode}>
                <h4 className="info-box-block__text_title">{title}</h4>

                <div
                    className="info-box-block__text_content"
                    dangerouslySetInnerHTML={{ __html: body }}
                />
            </div>
        </div>
    )
}

UiInfoBoxBlock.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    toggleEditMode: PropTypes.func,
}

export default UiInfoBoxBlock
