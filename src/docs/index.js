import React, { useState } from 'react'
import { render } from 'react-dom'
import HtmlDraftEditor from '../../lib'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import DraftConverter from './editorToBackendUtil/draft-converter'

import './styles.css'

function Demo() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const content = convertToRaw(editorState.getCurrentContent())
    const cHtml = JSON.stringify(DraftConverter.convertToHtml(content))

    const apiData = JSON.stringify(DraftConverter.convertToApiData(content))

    return (
        <div>
            <h1>Demo with examples of the component</h1>
            <HtmlDraftEditor
                KeyStoneOnChange={setEditorState}
                autoFocus={null}
                field={null}
                editorState={editorState}
            />

            <h1>---------</h1>
            {cHtml}
            <h1>---------</h1>
            {apiData}
        </div>
    )
}

render(<Demo />, document.getElementById('app'))
