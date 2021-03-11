import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@arch-ui/button'
import Dialog from '@arch-ui/dialog'
import { Pagination } from 'element-react'

import { parseImageAPIResponse } from '../utils/parseAPIResponse'
import ImagesEditor from './ImagesEditor'
import ImageSelection from './ImageSelection'
import SelectorMixin from './mixins/SelectorMixin'
import merge from 'lodash/merge'

// import {
//     setPages,
//     fetchDataWithGql,
// } from '../../../fields/HTML/views/editor/utils/fetchData'
parseImageAPIResponse
const _ = {
    merge,
}

const PAGINATION_LIMIT = 10

export class ImageSelector extends SelectorMixin {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            selectedItems: props.selectedImages,
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
                list: 'Image',
                columns: [
                    'name',
                    'urlDesktopSized',
                    'urlTabletSized',
                    'urlMobileSized',
                    'urlTinySized',
                    'urlOriginal',
                ],
                maxItemsPerPage: 12,
            }

            // call loadItemsFromGql in SelectorMixin

            this.loadItemsFromCMS(querystring, dataConfig)
                .then((items) => {
                    const reFormatData = items.map((image) => {
                        // format fetched data's format
                        return parseImageAPIResponse(image)
                    })
                    resolve(reFormatData)
                })
                .catch((err) => reject(err))
        })
    }

    render() {
        if (this.state.error) {
            return (
                <span>
                    There is an error, please reload the page.
                    {/* {this.state.error} */}
                </span>
            )
        }

        const { isSelectionOpen, items, selectedItems } = this.state
        return (
            <Dialog
                heading="Select image"
                isOpen={isSelectionOpen}
                onClose={this.handleCancel}
                closeOnBlanketClick
                width={1000}
            >
                <div
                    className="ImageSelector"
                    style={{ height: '60vh', overflow: 'scroll' }}
                >
                    <Fragment>
                        <div>
                            {this._renderSearchFilter()}
                            <ImageSelection
                                images={items}
                                selectedImages={selectedItems}
                                selectionLimit={this.props.selectionLimit}
                                updateSelection={this.updateSelection}
                            />
                            <Pagination
                                pageSize={this.PAGE_SIZE}
                                total={this.state.total}
                                currentPage={this.state.currentPage}
                                onCurrentChange={this.handlePageSelect}
                                // limit={PAGINATION_LIMIT}
                            />
                        </div>
                        <div>
                            <ImagesEditor
                                selectedImages={selectedItems}
                                onChange={this.updateSelection}
                            />
                        </div>
                    </Fragment>
                    <Fragment>
                        <Button type="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                        <Button type="link-cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </Fragment>
                </div>
            </Dialog>
        )
    }
}

ImageSelector.propTypes = {
    apiPath: PropTypes.string,
    isSelectionOpen: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    selectedImages: PropTypes.array,
    selectionLimit: PropTypes.number,
}

ImageSelector.defaultProps = {
    apiPath: '',
    isSelectionOpen: false,
    selectedImages: [],
    selectionLimit: 1,
}

export default ImageSelector
