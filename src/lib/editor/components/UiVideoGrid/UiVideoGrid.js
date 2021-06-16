import React, { Component } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import UiVideoItem from '../UiVideoItem/UiVideoItem'
import './UiVideoGrid.style.css'

const _ = {
    get,
}

class UiVideoGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Videos: props.Videos,
            selectedVideos: props.selectedVideos,
        }
    }

    // replacement of componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            Videos: nextProps.Videos,
            selectedVideos: nextProps.selectedVideos,
        }
    }
    _handleSelect(Video) {
        this.props.onSelect(Video)
    }

    render() {
        const { Videos, selectedVideos } = this.state
        const { columns } = this.props
        const width = Math.floor(100 / columns)
        const VideoItems = Videos.map((Video, index) => {
            const isSelected = selectedVideos.find((element) => {
                return element.id === Video.id
            })
                ? true
                : false
            return (
                <UiVideoItem
                    Video={_.get(Video, 'url')}
                    coverPhoto={_.get(Video, 'coverPhoto')}
                    description={_.get(Video, 'description')}
                    isSelected={isSelected}
                    key={Video.id}
                    onSelect={this._handleSelect.bind(this, Video)}
                    name={_.get(Video, 'name')}
                    width={width}
                />
            )
        })

        return <div className="video-grid">{VideoItems}</div>
    }
}

UiVideoGrid.propTypes = {
    Videos: PropTypes.array.isRequired,
    columns: PropTypes.number,
    onSelect: PropTypes.func,
    padding: PropTypes.number,
    selectedVideos: PropTypes.array,
}

UiVideoGrid.defaultProps = {
    Videos: [],
    columns: 3,
    padding: 10,
    selectedVideos: [],
}

export default UiVideoGrid
