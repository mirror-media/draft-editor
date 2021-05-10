import React, { useState, useRef } from 'react'

import {
    BlockMapBuilder,
    Editor,
    EditorState,
    KeyBindingUtil,
    Modifier,
    Entity,
    RichUtils,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
    getDefaultKeyBinding,
} from 'draft-js'

import {
    BlockStyleButtons,
    InlineStyleButtons,
    EntityButtons,
} from './editor/editor-buttons'
import { Button } from '@arch-ui/button'
import 'element-theme-default'
import EnlargeButton from './editor/editorButtons/EnlargeButton/EnlargeButton'

import ENTITY_LIST from './K3/entities'
// import toggleEntity from './editor/utils/toggleEntityHandler'
import BlockModifier from './editor/modifiers/index'
import decorator from './editor/entity-decorator'
const { isCtrlKeyCommand } = KeyBindingUtil
import AtomicBlockSwitcher from './editor/base/atomic-block-switcher'
import DraftConverter from './K3/draft-converter'
import blockStyleFn from './editor/base/block-style-fn'

import './editor/styles/editor.css'
import './editor/styles/normalize.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

function HtmlDraftEditor({ KeyStoneOnChange, autoFocus, field, value }) {
    const initialEditorState = getInitialState(value)
    const [editorState, setEditorState] = useState(initialEditorState)
    const [isEnlarged, setIsEnlarged] = useState(false)
    const mainEditorRef = useRef()
    const [readOnly, setReadOnly] = useState(false)

    // Handle both editorstate and keystone value change
    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState)
        KeyStoneOnChange(newEditorState)
    }

    // enable key command in draft
    const handleKeyCommand = (command, editorState) => {
        // After receiving key command, generate new state from RichUtils, and update state.
        // RichUtils.handleKeyCommand will handle blocks in different cases which the default behavior of Editor does not handle.
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if (newState) {
            onEditorStateChange(newState)
            return 'handled'
        } else {
            // Upon receiving 'not-handled', Editor will fallback to the default behavior.
            return 'not-handled'
        }
    }

    // focus editor
    function focus() {
        mainEditorRef.current.focus()
    }

    // assign new eidtorState with new blocktype
    function toggleBlockType(blockType) {
        const newEditorState = RichUtils.toggleBlockType(editorState, blockType)
        onEditorStateChange(newEditorState)
    }

    // assign new editorState with new inlineStyle
    function toggleInlineStyle(inlineStyle) {
        const newEditorState = RichUtils.toggleInlineStyle(
            editorState,
            inlineStyle
        )
        onEditorStateChange(newEditorState)
    }

    function _blockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: AtomicBlockSwitcher,
                props: {
                    onFinishEdit: (blockKey, valueChanged) => {
                        const _editorState = BlockModifier.handleAtomicEdit(
                            editorState,
                            blockKey,
                            valueChanged
                        )

                        // workaround here.
                        // use refreshEditorState to make the Editor rerender
                        onEditorStateChange(refreshEditorState(_editorState))
                    },
                    refreshEditorState: () => {
                        onEditorStateChange(refreshEditorState(editorState))
                    },
                    data: _convertToApiData(editorState),
                    // render desktop layout when editor is enlarged,
                    // otherwise render mobile layout
                    device: isEnlarged ? 'desktop' : 'mobile',
                    setMainDraftReadOnly: (boolean) => setReadOnly(boolean),
                    isEnlarged: isEnlarged,
                },
            }
        }
        return null
    }

    // for some reason, it'll make audio/video availible to get media data.
    function _convertToApiData(editorState) {
        const content = convertToRaw(editorState.getCurrentContent())
        const apiData = DraftConverter.convertToApiData(content)
        return apiData.toJS()
    }

    function enlargeEditor() {
        // also set editorState to force editor to re-render
        setIsEnlarged((prevState) => !prevState)
        // onEditorStateChange(refreshEditorState(editorState))
    }

    function handlePastedText(text, html, editorstate) {
        // console.log(text)
        // console.log(html)
        // console.log(editorstate)
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

        //     let newEditorState = editorState
        //     var htmlFragment = convertFromHTML(html)
        //     console.log(htmlFragment)
        //     if (htmlFragment) {
        //         var htmlMap = BlockMapBuilder.createFromArray(htmlFragment)
        //         onEditorStateChange(insertFragment(newEditorState, htmlMap))
        //         // prevent the default paste behavior.
        //         return true
        //     }
        // }
        // use default paste behavior
        return false
    }

    const useSpellCheck = true

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let fullscreen = ''
    let className = 'RichEditor-editor'
    let expandBtnClass = ''
    let contentState = editorState.getCurrentContent()

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder'
        }
    }

    if (isEnlarged) {
        fullscreen = 'draft-editor-fullscreen'
        expandBtnClass = ' expanded'
    }

    // ------------------------------------------------------------
    function toggleEntity(entity, value) {
        // entity(array) has all block's entity data
        switch (entity) {
            case ENTITY_LIST.AUDIO.type:
                return _toggleAudio(entity, value)
            case ENTITY_LIST.VIDEO.type:
                return _toggleVideo(entity, value)
            case ENTITY_LIST.BLOCKQUOTE.type:
            case ENTITY_LIST.IMAGELINK.type:
            case ENTITY_LIST.INFOBOX.type:
            case ENTITY_LIST.EMBEDDEDCODE.type:
            case ENTITY_LIST.YOUTUBE.type:
                return _toggleAtomicBlock(entity, value)
            case ENTITY_LIST.ANNOTATION.type:
            case ENTITY_LIST.LINK.type:
                return _toggleInlineEntity(entity, value)
            case ENTITY_LIST.IMAGE.type:
                return _toggleImage(entity, value)
            case ENTITY_LIST.SLIDESHOW.type:
                return _toggleSlideshow(entity, value)
            case ENTITY_LIST.IMAGEDIFF.type:
                return _toggleImageDiff(entity, value)
            default:
                return
        }
    }

    function _toggleAudio(entity, value) {
        const audio = Array.isArray(value) ? value[0] : null
        if (!audio) {
            return
        }
        _toggleAtomicBlock(entity, audio)
    }

    function _toggleVideo(entity, value) {
        const video = Array.isArray(value) ? value[0] : null
        if (!video) {
            return
        }
        _toggleAtomicBlock(entity, video)
    }

    function _toggleAtomicBlock(entity, value) {
        const _editorState = BlockModifier.insertAtomicBlock(
            editorState,
            entity,
            value
        )
        onEditorStateChange(_editorState)
    }

    function _toggleInlineEntity(entity, value) {
        const entityKey = Entity.create(entity, 'IMMUTABLE', value)
        _toggleTextWithEntity(entityKey, _.get(value, 'text'))
    }

    function _toggleImage(entity, value) {
        const image = Array.isArray(value) ? value[0] : null
        if (!image) {
            return
        }
        _toggleAtomicBlock(entity, image)
    }

    function _toggleImageDiff(entity, value) {
        const images = Array.isArray(value) && value.length === 2 ? value : null
        if (!images) {
            return
        }
        _toggleAtomicBlock(entity, images)
    }

    function _toggleSlideshow(entity, value) {
        const images = Array.isArray(value) && value.length > 0 ? value : null
        if (!images) {
            return
        }
        _toggleAtomicBlock(entity, images)
    }

    function _toggleTextWithEntity(entityKey, text) {
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
        onEditorStateChange(_editorState)
    }

    return (
        <div className={`draft-editor ${fullscreen}`}>
            <div className={`draft-editor__wrapper ${fullscreen}`}>
                <div className={`draft-editor__controls  ${fullscreen}`}>
                    <div
                        className={`draft-editor__controls_wrapper ${expandBtnClass}`}
                    >
                        <BlockStyleButtons
                            buttons={BLOCK_TYPES}
                            editorState={editorState}
                            onToggle={toggleBlockType}
                        />

                        <InlineStyleButtons
                            buttons={INLINE_STYLES}
                            editorState={editorState}
                            onToggle={toggleInlineStyle}
                        />

                        <EntityButtons
                            entities={Object.keys(ENTITY_LIST)}
                            editorState={editorState}
                            onToggle={toggleEntity}
                        />

                        <EnlargeButton
                            isEnlarged={isEnlarged}
                            enlargeEditorHandler={enlargeEditor}
                        />
                    </div>
                </div>

                <div
                    className={`draft-editor__textarea ${fullscreen}`}
                    onClick={() => focus()}
                >
                    <Editor
                        blockRendererFn={_blockRenderer}
                        blockStyleFn={blockStyleFn}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        handlePastedText={handlePastedText}
                        keyBindingFn={keyBindingFn}
                        onChange={onEditorStateChange}
                        placeholder="Enter HTML Here..."
                        spellCheck={useSpellCheck}
                        ref={mainEditorRef}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
    )
}

export default HtmlDraftEditor

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
}

// block settings
const BLOCK_TYPES = [
    { label: 'Normal', style: 'unstyled', icon: '', text: 'Normal' },
    { label: 'H1', style: 'header-one', icon: '', text: 'H1' },
    { label: 'H2', style: 'header-two', icon: '', text: 'H2' },
    { label: 'Code Block', style: 'code-block', icon: 'fa-code', text: '' },
    {
        label: 'Blockquote',
        style: 'blockquote',
        icon: 'fa-quote-left',
        text: '',
    },
    { label: 'OL', style: 'ordered-list-item', icon: 'fa-list-ol', text: '' },
    { label: 'UL', style: 'unordered-list-item', icon: 'fa-list-ul', text: '' },
]

// inline style settings
var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: 'fa-bold', text: '' },
    { label: 'Italic', style: 'ITALIC', icon: 'fa-italic', text: '' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'fa-underline', text: '' },
    // { label: 'Monospace', style: 'CODE', icon: 'fa-terminal', text: '' },
]

function getInitialState(value) {
    let editorState
    try {
        if (value) {
            // create an EditorState from the raw Draft data
            let contentState = value.getCurrentContent()
            editorState = EditorState.createWithContent(contentState, decorator)
        } else {
            // create empty draft object
            editorState = EditorState.createEmpty(decorator)
        }
    } catch (error) {
        // create empty EditorState
        editorState = EditorState.createEmpty(decorator)
    }

    return editorState

    // return value ? value : EditorState.createEmpty()
}

function refreshEditorState(editorState) {
    return EditorState.forceSelection(
        editorState,
        editorState.getCurrentContent().getSelectionAfter()
    )
}

function keyBindingFn(e) {
    if (e.keyCode === 13 /* `enter` key */) {
        if (isCtrlKeyCommand(e) || e.shiftKey) {
            return 'insert-soft-newline'
        }
    }
    return getDefaultKeyBinding(e)
}
