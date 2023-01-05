import React, { Component } from 'react'
import ENTITY_LIST from '../entities'
import Wrapper from './block-wrapper'

import BlockQuoteBlock from '../quote/block-quote-block'
import EmbeddedCodeBlock from '../embedded-code/embedded-code-block'
import AudioBlock from '../audio/audio-block'
import VideoBlock from '../video/video-block'
import ImageBlock from '../image/image-block'
// import ImageDiffBlock from '../image-diff/image-diff-block'
// import ImageLinkBlock from '../image-link/image-link-block'
import InfoBoxBlock from '../info-box/info-box-block'
import SlideshowBlock from '../slideshow/slideshow-block'
import YoutubeBlock from '../youtube/youtube-block'
// import classNames from 'classnames'
import get from 'lodash/get'
import { Entity } from 'draft-js'
import {
    mobileStyle,
    tabletMinStyle,
    tabletMaxStyle,
} from '../constants/layout-style'

const _ = {
    get,
}

export class AtomicBlockSwitcher extends Component {
    constructor(props) {
        super(props)
        // this.alignLeft = this._alignLeft.bind(this)
        // this.alignCenter = this._alignCenter.bind(this)
        // this.alignRight = this._alignRight.bind(this)
        // this.alignCenterSmall = this._alignCenterSmall.bind(this)
    }

    // _alignLeft(e) {
    //     e.stopPropagation()
    //     this.props.align('left')
    // }

    // _alignCenter(e) {
    //     e.stopPropagation()
    //     this.props.align('center')
    // }

    // _alignRight(e) {
    //     e.stopPropagation()
    //     this.props.align('right')
    // }

    // _alignCenterSmall(e) {
    //     e.stopPropagation()
    //     this.props.align('center-small')
    // }

    render() {
        try {
            const contentState = this.props.contentState
            const contentBlock = this.props.block
            const entityKey = contentBlock.getEntityAt(0)
            const entityInstance = contentState.getEntity(entityKey)

            let type = entityKey ? entityInstance.getType() : ''
            // backward compatible. Old data type is lower case
            type = type && type.toUpperCase()

            const Buttons = (
                <div style={{ textAlign: 'center' }}>
                    <span
                        className="alignmentButton"
                        onClick={this.alignLeft}
                        style={{ marginLeft: '-2.4em' }}
                        role="button"
                        key="left"
                    >
                        L
                    </span>
                    <span
                        className="alignmentButton"
                        onClick={this.alignCenter}
                        role="button"
                        key="center"
                    >
                        C
                    </span>
                    <span
                        className="alignmentButton"
                        onClick={this.alignRight}
                        style={{ marginLeft: '0.9em' }}
                        role="button"
                        key="right"
                    >
                        R
                    </span>
                    <span
                        className="alignmentButton"
                        onClick={this.alignCenterSmall}
                        style={{ marginLeft: '2.6em' }}
                        role="button"
                        key="center-small"
                    >
                        S
                    </span>
                </div>
            )

            const device = _.get(this.props, ['blockProps', 'device'], 'mobile')
            let BlockComponent
            let style

            switch (type) {
                case ENTITY_LIST.BLOCKQUOTE.type:
                    BlockComponent = BlockQuoteBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMinStyle
                    }
                    break
                case ENTITY_LIST.EMBEDDEDCODE.type:
                    BlockComponent = EmbeddedCodeBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMinStyle
                    }
                    break
                case ENTITY_LIST.INFOBOX.type:
                    BlockComponent = InfoBoxBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMinStyle
                    }
                    break
                case ENTITY_LIST.AUDIO.type:
                    BlockComponent = AudioBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMinStyle
                    }
                    break
                case ENTITY_LIST.VIDEO.type:
                    BlockComponent = VideoBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMinStyle
                    }
                    break
                case ENTITY_LIST.IMAGE.type:
                    BlockComponent = ImageBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMaxStyle
                    }
                    break
                case ENTITY_LIST.IMAGELINK.type:
                    //     BlockComponent = ImageLinkBlock
                    //     if (device === 'mobile') {
                    //         style = mobileStyle
                    //     } else {
                    //         style = tabletMaxStyle
                    //     }
                    break
                case ENTITY_LIST.IMAGEDIFF.type:
                    //     BlockComponent = ImageDiffBlock
                    //     if (device === 'mobile') {
                    //         style = mobileStyle
                    //     } else {
                    //         style = tabletMaxStyle
                    //     }
                    break
                case ENTITY_LIST.SLIDESHOW.type:
                    BlockComponent = SlideshowBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMaxStyle
                    }
                    break
                case ENTITY_LIST.YOUTUBE.type:
                    BlockComponent = YoutubeBlock
                    if (device === 'mobile') {
                        style = mobileStyle
                    } else {
                        style = tabletMaxStyle
                    }
                    break
                default:
                    return null
            }
        } catch (error) {
            console.error(error)
            return <h2 style={{color: "red"}}>{"<-- 此行為不明錯誤，請點擊箭頭位置進行刪除"}</h2>
        }

        return (
            <div className="BlockComponent_wrapper" style={style}>
                <BlockComponent
                    {...this.props}
                    device={device}
                    entityKey={entityKey}
                >
                    {/* {device !== 'mobile' ? Buttons : null} */}
                </BlockComponent>
            </div>
        )
    }
}

// export default Wrapper(AtomicBlockSwitcher)
export default AtomicBlockSwitcher
