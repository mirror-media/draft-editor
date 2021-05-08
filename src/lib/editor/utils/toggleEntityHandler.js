import ENTITY_LIST from '../../K3/entities'

export default function toggleEntity(entity, value) {
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
