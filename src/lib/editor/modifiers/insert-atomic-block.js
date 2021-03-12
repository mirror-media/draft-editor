// 'use strict';

import { AtomicBlockUtils, Entity } from 'draft-js'

export default function insertAtomicBlock(editorState, type, value) {
    const contentState = editorState.getCurrentContent()
    const newContentState = contentState.createEntity(type, 'IMMUTABLE', value)
    const entityKey = newContentState.getLastCreatedEntityKey()

    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
}
