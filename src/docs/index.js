import React, { useState } from 'react'
import { render } from 'react-dom'
import HtmlDraftEditor from '../../lib'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import DraftConverter from './editorToBackendUtil/draft-converter'

import './styles.css'
// block settings
const blocktypes = [
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
var inlineStyles = [
    { label: 'Bold', style: 'BOLD', icon: 'fa-bold', text: '' },
    { label: 'Italic', style: 'ITALIC', icon: 'fa-italic', text: '' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'fa-underline', text: '' },
    // { label: 'Monospace', style: 'CODE', icon: 'fa-terminal', text: '' },
]

const entityList = {
    ANNOTATION: {
        type: 'ANNOTATION',
    },
    BLOCKQUOTE: {
        type: 'BLOCKQUOTE',
    },
    LINK: {
        type: 'LINK',
    },
    INFOBOX: {
        type: 'INFOBOX',
    },
    EMBEDDEDCODE: {
        type: 'EMBEDDEDCODE',
    },
    AUDIO: {
        type: 'AUDIO',
    },
    VIDEO: {
        type: 'VIDEO',
    },
    IMAGE: {
        type: 'IMAGE',
    },
    SLIDESHOW: {
        type: 'SLIDESHOW',
        slideshowSelectionLimit: 50,
    },
    YOUTUBE: {
        type: 'YOUTUBE',
    },
}

function Demo() {
    // stored data format in our database
    const storedContentBlock = `{\"blocks\":[{\"key\":\"bbacc\",\"text\":\"我是normal!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8f5e6\",\"text\":\"我是H1\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2892a\",\"text\":\"我是H2\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fd320\",\"text\":\"我是code\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"0a161\",\"text\":\"我是ol1\",\"type\":\"ordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"63bb8\",\"text\":\"我是ol2\",\"type\":\"ordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cceac\",\"text\":\"我是ul1\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f7e4a\",\"text\":\"我是ul2\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bbb93\",\"text\":\"我是粗體加上普通文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":2,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6368\",\"text\":\"我是斜體加上普通文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":2,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d87cd\",\"text\":\"我是底線加上普通文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":2,\"style\":\"UNDERLINE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d754c\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"decf2\",\"text\":\"我是annotation文字加上普通文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":2,\"length\":12,\"key\":0}],\"data\":{}},{\"key\":\"956b8\",\"text\":\"我是annotation文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":14,\"key\":1}],\"data\":{}},{\"key\":\"e827a\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":2}],\"data\":{}},{\"key\":\"e80d7\",\"text\":\"我是連結文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e066e\",\"text\":\"我是連結加上普通文字\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"20053\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"37622\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6341\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"abcaa\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"949bb\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2037d\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5abd1\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e1cb7\",\"text\":\"\",\"type\":\"ordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"48411\",\"text\":\"\",\"type\":\"ordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e2f7e\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6db8\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"ANNOTATION\",\"mutability\":\"IMMUTABLE\",\"data\":{\"text\":\"annotation文字\",\"annotation\":\"<p>我是annotation內容</p>\\n\",\"pureAnnotationText\":\"我是annotation內容\",\"draftRawObj\":null}},\"1\":{\"type\":\"ANNOTATION\",\"mutability\":\"IMMUTABLE\",\"data\":{\"text\":\"我是annotation文字\",\"annotation\":\"<p>我是annotation內文</p>\\n\",\"pureAnnotationText\":\"我是annotation內文\",\"draftRawObj\":null}},\"2\":{\"type\":\"BLOCKQUOTE\",\"mutability\":\"IMMUTABLE\",\"data\":{\"quoteBy\":\"我是quoteBy\",\"quote\":\"我是quote\"}}}}`

    // need to transfer it to object (NOTE: this process is in keystone's controller.js, which is in custom field folder)
    let storedContentState
    storedContentState = convertFromRaw(JSON.parse(storedContentBlock))

    // use contentBlock to generate a EditorState, or create a clean EditorState if contentBlock is empty
    const storedEditorState = storedContentState
        ? EditorState.createWithContent(storedContentState)
        : EditorState.createEmpty()

    const [editorState, setEditorState] = useState(storedEditorState)

    // this shows how to generate html/apiDate with content (for debug purpose)
    const content = convertToRaw(editorState.getCurrentContent())
    const cHtml = JSON.stringify(DraftConverter.convertToHtml(content))
    const apiData = JSON.stringify(DraftConverter.convertToApiData(content))

    // if need to make editor readonly, use this flag
    const globalReadOnly = true
    return (
        <div>
            <form action="">
                <h1>Demo with examples of the component</h1>
                <HtmlDraftEditor
                    KeyStoneOnChange={setEditorState}
                    autoFocus={null}
                    field={null}
                    value={editorState}
                    customBlocktypes={blocktypes}
                    customInlineStyles={inlineStyles}
                    customEntityList={entityList}
                    mediaApi=""
                    globalReadOnly={globalReadOnly}
                />

                <h1>---------</h1>
                {JSON.stringify(content)}
                <h1>---------</h1>
                {cHtml}
                <h1>---------</h1>
                {apiData}
            </form>
        </div>
    )
}

render(<Demo />, document.getElementById('app'))
