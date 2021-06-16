import React, { useState } from 'react'
import PropTypes from 'prop-types'
import raf from 'raf' // requestAnimationFrame polyfill
import ReactPlayer from 'react-player/lazy'
import './UiVideoItem.style.css'

function UiVideoItem(props) {
    const [playing, setPlaying] = useState(false)
    const [loaded, setLoaded] = useState(false)

    //     const _handleToggle = (e) => {
    //         e.stopPropagation()
    //         this.setState({
    //             playing: !this.state.playing,
    //         })
    //         setPlaying((prev) => {
    //             !prev
    //         })
    //     }

    //     _handleOnLoad() {
    //         this.setState({
    //             loaded: true,
    //             duration: this.player.duration(),
    //         })
    //     }

    //     _handleOnPlay() {
    //         this.setState({
    //             playing: true,
    //         })
    //         this.renderSeekPos()
    //     }

    //     _handleOnEnd() {
    //         this.setState({
    //             playing: false,
    //         })
    //         this.clearRAF()
    //     }

    //     const clearRAF = () => {
    // 	raf.cancel(this._raf)
    //     }

    const _handleSelect = (e) => {
        e.stopPropagation()
        props.onSelect(e)
    }

    const { Video, coverPhoto, isSelected, name, description, width } = props
    let style = {
        VideoItem: {
            border: isSelected ? '1px solid rgba(44,162,252,0.7)' : '',
            width: `${width}%`,
        },
        infoTopic: {
            display: 'flex',
            flexDirection: 'row',
        },
    }
    return (
        <div
            className="video-item new"
            onClick={_handleSelect}
            style={style.VideoItem}
        >
            {/* <Video
	    content={[
		{
		    url: Video,
		    coverPhoto,
		    name,
		    description,
		},
	    ]}
	/> */}
            <ReactPlayer
                url={Video}
                controls={true}
                width="100%"
                height="100px"
                style={{ margin: '5px 0' }}
                light
            />
            <div className="info_container">
                <div className="info_topic" style={style.infoTopic}>
                    {/* <img src={coverPhoto.url} alt={coverPhoto.name} /> */}
                    <h5>{name}</h5>
                </div>
                <div className="info_detail">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

UiVideoItem.propTypes = {
    Video: PropTypes.string,
    coverPhoto: PropTypes.object,
    description: PropTypes.string,
    doShowRemove: PropTypes.bool,
    isSelected: PropTypes.bool,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
    name: PropTypes.string,
    width: PropTypes.number.isRequired,
}

UiVideoItem.defaultProps = {
    Video: '',
    coverPhoto: null,
    description: '',
    doShowRemove: false,
    isSelected: false,
    name: '',
    width: 100,
}

export default UiVideoItem
