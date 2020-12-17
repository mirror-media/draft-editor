import React from 'react'
import { render } from 'react-dom'
import HtmlDraftEditor from '../../lib'
import './styles.css'

function Demo() {
    function keystoneOnChange() {}
    return (
        <div>
            <h1>Demo with examples of the component</h1>
            <HtmlDraftEditor
                KeyStoneOnChange={keystoneOnChange}
                autoFocus={null}
                field={null}
                value={null}
            />
        </div>
    )
}

render(<Demo />, document.getElementById('app'))
