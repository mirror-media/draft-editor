import React from 'react'

export default ({ onClick }) => {
    return (
        <div
            className="editingBt"
            onClick={onClick}
            style={{
                position: 'absolute',
                fontSize: '50px',
                top: 'calc((100% - 37px) / 2)',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '55px',
                height: '55px',
                backgroundColor: '#FFF',
                borderRadius: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <i className="fas fa-pen-square" />
        </div>
    )
}
