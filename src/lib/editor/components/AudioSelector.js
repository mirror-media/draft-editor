import React from 'react'
import PropTypes from 'prop-types'
import {
    parseAudioAPIResponse,
    parseImageAPIResponse,
} from '../utils/parseAPIResponse'
import { Button } from '@arch-ui/button'
import Dialog from '@arch-ui/dialog'
import { Pagination } from '@arch-ui/pagination'

import AudioSelection from './AudioSelection'
import SelectorMixin from './mixins/SelectorMixin'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'
import set from 'lodash/set'

const _ = {
    forEach,
    get,
    merge,
    set,
}

const PAGINATION_LIMIT = 10

export class AudioSelector extends SelectorMixin {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            selectedItems: props.selectedAudios,
            isSelectionOpen: props.isSelectionOpen,
        }
    }

    // replacement of componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            // selectedItems: nextProps.selectedAudios,
            isSelectionOpen: nextProps.isSelectionOpen,
        }
    }

    loadItems(querystring = '') {
        return new Promise((resolve, reject) => {
            const dataConfig = {
                list: 'Audio',
                columns: ['name', 'url', 'coverPhoto{id,name,urlOriginal}'],
                maxItemsPerPage: 12,
            }

            // call loadItemsFromGql in SelectorMixin
            this.loadItemsFromCMS(querystring, dataConfig)
                .then((items) => {
                    items.map((audio) => {
                        // format fetched data's format
                        return parseAudioAPIResponse(audio)
                    })
                    resolve(items)
                })
                .catch((err) => reject(err))
        })
    }

    render() {
        if (this.state.error) {
            return <span>There is an error, please reload the page.</span>
        }

        const { isSelectionOpen, items, selectedItems } = this.state
        return (
            <Dialog
                heading="Select Audio"
                isOpen={isSelectionOpen}
                onClose={this.handleCancel}
                closeOnBlanketClick
                width={1000}
            >
                <div className="AudioSelector Selector">
                    <div className="Selector__container">
                        {this._renderSearchFilter()}
                        <AudioSelection
                            audios={items}
                            selectedAudios={selectedItems}
                            selectionLimit={this.props.selectionLimit}
                            updateSelection={this.updateSelection}
                        />
                        <Pagination
                            currentPage={this.state.currentPage}
                            pageSize={this.PAGE_SIZE}
                            total={this.state.total}
                            onChange={this.handlePageSelect}
                            limit={PAGINATION_LIMIT}
                        />
                    </div>

                    <div className="Selector__button">
                        <Button type="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                        <Button type="link-cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

AudioSelector.propTypes = {
    apiPath: PropTypes.string,
    isSelectionOpen: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    selectedAudios: PropTypes.array,
    selectionLimit: PropTypes.number,
}

AudioSelector.defaultProps = {
    apiPath: '',
    isSelectionOpen: false,
    selectedAudios: [],
    selectionLimit: 1,
}

export default AudioSelector
