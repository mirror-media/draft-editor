import { Button } from '@arch-ui/button'
import { Input } from '@arch-ui/input'
import Dialog from '@arch-ui/dialog'

import {
    BlockMapBuilder,
    Editor,
    EditorState,
    Entity,
    KeyBindingUtil,
    Modifier,
    RichUtils,
    convertFromHTML,
    convertFromRaw,
    getDefaultKeyBinding,
    convertToRaw,
} from 'draft-js'
import {
    BlockStyleButtons,
    EntityButtons,
    InlineStyleButtons,
} from '../editor-buttons'
// import ENTITY_LIST from '../entities'
import React, { Component, Fragment } from 'react'
import blockStyleFn from '../base/block-style-fn'
import decorator from '../entity-decorator'

// import '../styles/editor.css'
import './entity-editing-block-mixin.css'
import dialogCjsDev from '@arch-ui/dialog/dist/dialog.cjs.dev'

const { isCtrlKeyCommand } = KeyBindingUtil

export class EntityEditingBlock extends Component {
    constructor(props) {
        super(props)
        this.toggleModal = this._toggleModal.bind(this)
        this.handleSave = this._handleSave.bind(this)
        this.composeEditingFields = this._composeEditingFields.bind(this)
        this.focus = this._focus.bind(this)
        this._handleEditorStateChange = this._handleEditorStateChange.bind(this)

        this._handleKeyCommand = this._handleKeyCommand.bind(this)
        this._handlePastedText = this._handlePastedText.bind(this)
        this._toggleBlockType = this._toggleBlockStyle.bind(this)
        this._toggleInlineStyle = this._toggleInlineStyle.bind(this)
        this._toggleEntity = this._toggleEntity.bind(this)
        this._editingFields = this.composeEditingFields(props)
        this.state = {
            editingFields: this._editingFields,
            editorState: EditorState.createEmpty(decorator),
        }
    }

    componentWillReceiveProps(nextProps) {
        this._editingFields = this.composeEditingFields(nextProps)
        this.setState({
            editingFields: this._editingFields,
            editorState: this._initEditorState(nextProps.draftRawObj),
        })
    }

    componentWillUnmount() {
        this._editingFields = null
    }

    _initEditorState(draftRawObj) {
        let editorState
        if (draftRawObj) {
            let contentState = convertFromRaw(draftRawObj)
            editorState = EditorState.createWithContent(contentState, decorator)
        } else {
            editorState = EditorState.createEmpty(decorator)
        }
        return editorState
    }

    // need to be overwrited
    _handleEditorStateChange(editorState) {
        this.setState({ ...this.state, editorState: editorState })
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state
        let newState
        switch (command) {
            case 'insert-soft-newline':
                newState = RichUtils.insertSoftNewline(editorState)
                break
            default:
                newState = RichUtils.handleKeyCommand(editorState, command)
        }
        if (newState) {
            this._handleEditorStateChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    _handlePastedText(text, html) {
        function insertFragment(editorState, fragment) {
            let newContent = Modifier.replaceWithFragment(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                fragment
            )
            return EditorState.push(editorState, newContent, 'insert-fragment')
        }

        // if (html) {
        //     // remove meta tag
        //     html = html.replace(/<meta (.+?)>/g, '')
        //     // replace p, h2 by div.
        //     // TODO need to find out how many block tags we need to replace
        //     // currently, just handle p, h1, h2, ..., h6 tag
        //     // NOTE: I don't know why header style can not be parsed into ContentBlock,
        //     // so I replace it by div temporarily
        //     html = html
        //         .replace(/<p|<h1|<h2|<h3|<h4|<h5|<h6/g, '<div')
        //         .replace(/<\/p|<\/h1|<\/h2|<\/h3|<\/h4|<\/h5|<\/h6/g, '</div')

        //     let editorState = this.state.editorState
        //     var htmlFragment = convertFromHTML(html)
        //     if (htmlFragment) {
        //         var htmlMap = BlockMapBuilder.createFromArray(htmlFragment)
        //         this._handleEditorStateChange(
        //             insertFragment(editorState, htmlMap)
        //         )
        //         // prevent the default paste behavior.
        //         return true
        //     }
        // }
        // use default paste behavior
        return false
    }

    _keyBindingFn(e) {
        if (e.keyCode === 13 /* `enter` key */) {
            if (isCtrlKeyCommand(e) || e.shiftKey) {
                return 'insert-soft-newline'
            }
        }
        return getDefaultKeyBinding(e)
    }

    // this function should be overwritten by children
    _composeEditingFields(props) {
        console.warn('_composeEditingFields should be extended')
        return {}
    }

    // this function should be overwritten by children
    _decomposeEditingFields(fields) {
        console.warn('_decomposeEditingFields should be extended')
        return {}
    }

    _focus() {
        this.refs.subEditor.focus()
    }

    _handleEditingFieldChange(field, event) {
        this._editingFields[field].value = event.target.value

        this.setState({
            ...this.state,
            editingFields: this._editingFields,
        })
    }

    _handleSave() {
        this.setState(
            {
                editingFields: this._editingFields,
            },
            () => {
                // call function in bt-wrapper, close edit screen
                this.props.toggleModal()
                // call function in Field, create/update entity data
                this.props.onToggle(
                    this._decomposeEditingFields(this._editingFields)
                )
                //after updating entity, clear editingFields
                this.editingFields = {}
            }
        )
    }

    _renderDraftjsEditingField(editorState) {
        return (
            <div className="RichEditor-root" key={editorState}>
                <div className={'DraftEditor-controls'}>
                    <div className={'DraftEditor-controlsInner'}>
                        <BlockStyleButtons
                            buttons={BLOCK_TYPES}
                            editorState={editorState}
                            onToggle={this._toggleBlockType}
                        />
                        <InlineStyleButtons
                            buttons={INLINE_STYLES}
                            editorState={editorState}
                            onToggle={this._toggleInlineStyle}
                        />
                        {/* <EntityButtons
                            entities={[ENTITY_LIST.LINK.type]}
                            editorState={editorState}
                            onToggle={this._toggleEntity}
                        /> */}
                    </div>
                </div>
                <div className={'RichEditor-editor'} onClick={this.focus}>
                    <Editor
                        blockStyleFn={blockStyleFn}
                        handleKeyCommand={this._handleKeyCommand}
                        handlePastedText={this._handlePastedText}
                        keyBindingFn={this._keyBindingFn}
                        editorState={this.state.editorState}
                        onChange={this._handleEditorStateChange}
                        placeholder="Enter HTML Here..."
                        ref="subEditor"
                        spellCheck
                    />
                </div>
            </div>
        )
    }

    _renderEditingField(field, type, value) {
        if (type === 'html') {
            return this._renderDraftjsEditingField(this.state.editorState)
        }
        let onChange = this._handleEditingFieldChange.bind(this, field)

        return (
            <div key={field}>
                <Input
                    type="text"
                    value={value ? value : ''}
                    onChange={onChange}
                    isMultiline={type === 'textarea'}
                    placeholder={'Enter ' + field}
                    name={'form-input-' + field}
                />

                <div style={{ margin: '20px 0' }}></div>
            </div>
        )
    }

    _renderEditingFields(editingFields) {
        let Fields = Object.keys(editingFields).map((field) => {
            const type = editingFields[field].type
            const value = editingFields[field].value

            return this._renderEditingField(field, type, value)
        })

        return Fields
    }

    _toggleBlockStyle(blockType) {
        this._handleEditorStateChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        )
    }

    _toggleEntity(entity, value) {
        switch (entity) {
            case ENTITY_LIST.LINK.type:
                return this._toggleLink(entity, value)
            default:
                return
        }
    }

    _toggleInlineStyle(inlineStyle) {
        this._handleEditorStateChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        )
    }

    _toggleLink(entity, value) {
        const { url, text } = value
        const entityKey =
            url !== ''
                ? Entity.create(entity, 'IMMUTABLE', {
                      text: text || url,
                      url: url,
                  })
                : null
        this._toggleTextWithEntity(entityKey, text || url)
    }

    _toggleModal() {
        this.props.toggleModal()
    }

    _toggleTextWithEntity(entityKey, text) {
        const { editorState } = this.state
        const selection = editorState.getSelection()
        let contentState = editorState.getCurrentContent()

        if (selection.isCollapsed()) {
            contentState = Modifier.removeRange(
                editorState.getCurrentContent(),
                selection,
                'backward'
            )
        }
        contentState = Modifier.replaceText(
            contentState,
            selection,
            text,
            null,
            entityKey
        )
        const _editorState = EditorState.push(
            editorState,
            contentState,
            editorState.getLastChangeType()
        )
        this._handleEditorStateChange(_editorState)
    }

    render() {
        const heading = `Insert ${
            this.props.label === 'BLOCKQUOTE' ? 'QUOTE BY' : this.props.label
        }`
        return (
            <Dialog
                heading={heading}
                isOpen={this.props.isModalOpen}
                onClose={this.toggleModal}
                lockScroll={false}
                closeOnBlanketClick
            >
                <div className="EntityEditingBlock">
                    <div className="EntityEditingBlock__container">
                        {this._renderEditingFields(this.state.editingFields)}
                    </div>

                    <div className="EntityEditingBlock__button">
                        <Button type="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                        <Button type="link-cancel" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

// block settings
const BLOCK_TYPES = [
    { label: 'H2', style: 'header-two', icon: '', text: 'H2' },
    { label: 'OL', style: 'ordered-list-item', icon: 'fa-list-ol', text: '' },
    { label: 'UL', style: 'unordered-list-item', icon: 'fa-list-ul', text: '' },
]

// inline style settings
var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: 'fa-bold', text: '' },
    { label: 'Italic', style: 'ITALIC', icon: 'fa-italic', text: '' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'fa-underline', text: '' },
]

export default EntityEditingBlock
