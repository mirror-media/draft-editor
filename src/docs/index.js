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
    LINK: {
        type: 'LINK',
    },

    VIDEO: {
        type: 'VIDEO',
    },
    IMAGE: {
        type: 'IMAGE',
    },
    SLIDESHOW: {
        type: 'SLIDESHOW',
        slideshowSelectionLimit: 30,
    },
    YOUTUBE: {
        type: 'YOUTUBE',
    },
}

function Demo() {
    const storedContentBlock2 = {
        blocks: [
            {
                text: '2017年底「珍寶海鮮」在台北信義區開張的時候，在門口水族箱裡悠遊的海鮮，很吸引眼球。招牌菜「辣椒螃蟹」選用厚實沙公，蓋上艷紅色的醬料「被子」，肥嘟嘟的蟹肉吸飽醬汁，甜辣鹹的濃郁滋味，讓人吮指回味，有夠想念。',
                entityRanges: [],
                depth: 0,
                key: 'cq65l',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 0,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '901id',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: '87pu0',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 1,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '5rar2',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: 'bgmrb',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 2,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '1a11c',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '這道菜的核心，由10種以上的辛香料調配而成的醬料，現在台北也買得到。3款醬料包括「新加坡辣椒螃蟹」「新加坡黑胡椒螃蟹香料」「新加坡麥片蝦料包」，5月初登台，第1批從珍寶海鮮新加坡總店空運，消費者可致電到台北、台中2家餐廳預約外帶自取，或透過UberEats、foodpanda、Skmeats等外送平台訂購，珍寶海鮮的YouTube頻道也有「新加坡辣椒螃蟹」的烹調影片可以參考，醬料拿來配義大利麵、煮其他海鮮也很適合，在家自煮輕鬆靈活，要是真懶得動手料理，查好菜單、完成預訂，就能把大菜外帶或外送回家享用。',
                entityRanges: [
                    {
                        length: 14,
                        key: 3,
                        offset: 170,
                    },
                ],
                depth: 0,
                key: '7350i',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 4,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '3o8ja',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: 'cs04',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 5,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: 'dnmvb',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: '9e3jv',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 6,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '6kkj8',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: 'bh1ep',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: ' ',
                entityRanges: [
                    {
                        length: 1,
                        key: 7,
                        offset: 0,
                    },
                ],
                depth: 0,
                key: '8pv0g',
                type: 'atomic',
                inlineStyleRanges: [],
                data: {},
            },
            {
                text: '',
                entityRanges: [],
                depth: 0,
                key: '5daq6',
                type: 'unstyled',
                inlineStyleRanges: [],
                data: {},
            },
        ],
        entityMap: {
            0: {
                type: 'IMAGE',
                data: {
                    square: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-square.jpeg',
                        width: 1400,
                        height: 1400,
                    },
                    description:
                        '祕製「新加坡辣椒螃蟹醬」包（右下），用10多種辛香料調配而成。（230元／包）（珍寶海鮮提供）',
                    tablet: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-tablet.jpeg',
                        width: 1024,
                        height: 1280,
                    },
                    url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-tablet.jpeg',
                    tiny: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-tiny.jpeg',
                        width: 150,
                        height: 188,
                    },
                    desktop: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-desktop.jpeg',
                        width: 1024,
                        height: 1280,
                    },
                    mobile: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6-mobile.jpeg',
                        width: 800,
                        height: 1000,
                    },
                    id: '60b740dbe7e8b30f00f4c905',
                    original: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162707-0b55e75bc06656dfb67e70ba1de1c4a6.jpeg',
                        width: 1024,
                        height: 1280,
                    },
                },
                mutability: 'IMMUTABLE',
            },
            1: {
                type: 'IMAGE',
                data: {
                    square: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-square.jpeg',
                        width: 1400,
                        height: 1400,
                    },
                    description:
                        '「新加坡黑胡椒螃蟹香料」包（右，230元／包，珍寶海鮮提供）有炒過的黑胡椒、白胡椒，再準備奶油、醬油等，就能做出重口味的「珍寶黑胡椒螃蟹」（左，何宗昇攝）料理。',
                    tablet: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-tablet.jpeg',
                        width: 1200,
                        height: 750,
                    },
                    url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-tablet.jpeg',
                    tiny: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-tiny.jpeg',
                        width: 150,
                        height: 94,
                    },
                    desktop: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-desktop.jpeg',
                        width: 1280,
                        height: 800,
                    },
                    mobile: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753-mobile.jpeg',
                        width: 800,
                        height: 500,
                    },
                    id: '60b740e8e7e8b30f00f4c906',
                    original: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162720-4efddcd33861ef32ebf1dd299eba5753.jpeg',
                        width: 1280,
                        height: 800,
                    },
                },
                mutability: 'IMMUTABLE',
            },
            2: {
                type: 'IMAGE',
                data: {
                    square: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-square.jpg',
                        width: 1400,
                        height: 1400,
                    },
                    description:
                        '人氣菜色「麥片蝦」（右）使用的特調麥片（左，150元／包），略帶甜味。（珍寶海鮮提供）',
                    tablet: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-tablet.jpg',
                        width: 1200,
                        height: 750,
                    },
                    url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-tablet.jpg',
                    tiny: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-tiny.jpg',
                        width: 150,
                        height: 94,
                    },
                    desktop: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-desktop.jpg',
                        width: 2000,
                        height: 1250,
                    },
                    mobile: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97-mobile.jpg',
                        width: 800,
                        height: 500,
                    },
                    id: '60b740f1e7e8b30f00f4c907',
                    original: {
                        url: 'https://storage.googleapis.com/mirrormedia-files/assets/images/20210602162729-add0f8fea182c99aa686d20e38a4ed97.jpg',
                        width: 2560,
                        height: 1600,
                    },
                },
                mutability: 'IMMUTABLE',
            },
            3: {
                type: 'LINK',
                data: {
                    url: 'https://youtu.be/3Ovjxxtprgo',
                    text: '「新加坡辣椒螃蟹」的烹調影片',
                },
                mutability: 'IMMUTABLE',
            },
            4: {
                type: 'INFOBOX',
                data: {
                    body: '<ul><li>地址：台北市信義區松高路12號3樓（新光三越台北信義新天地A8）</li><li>電話：02-2720-7333 </li><li>備註：防疫期間僅提供外帶、外送，營業時間調整為12：00～20：00 </li></ul>',
                    draftRawObj: {
                        entityMap: {},
                        blocks: [
                            {
                                text: '地址：台北市信義區松高路12號3樓（新光三越台北信義新天地A8）',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: 'ampds',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                            {
                                text: '電話：02-2720-7333 ',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: 'f3e8b',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                            {
                                text: '備註：防疫期間僅提供外帶、外送，營業時間調整為12：00～20：00 ',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: 'mujd',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                        ],
                    },
                    title: '珍寶海鮮　台北信義店',
                },
                mutability: 'IMMUTABLE',
            },
            5: {
                type: 'EMBEDDEDCODE',
                data: {
                    caption: '',
                    embeddedCode:
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.862206847909!2d121.56458871442604!3d25.038749883970077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abba35ad0ac5%3A0x6ce2ca11990604cc!2z54-N5a-25rW36a6uIOWPsOWMl-S_oee-qeW6lyBKVU1CTyBTZWFmb29k!5e0!3m2!1szh-TW!2stw!4v1622622088340!5m2!1szh-TW!2stw" width="600" height="450" style="border: 0;" allowfullscreen="" loading="lazy"></iframe>',
                },
                mutability: 'IMMUTABLE',
            },
            6: {
                type: 'INFOBOX',
                data: {
                    body: '<ul><li>地址：台中市西屯區台灣大道三段301號7樓（新光三越台中中港店）</li><li>電話：04-2254-3777 </li><li>備註：防疫期間僅提供外帶、外送，營業時間調整為12：00～20：00 </li></ul>',
                    draftRawObj: {
                        entityMap: {},
                        blocks: [
                            {
                                text: '地址：台中市西屯區台灣大道三段301號7樓（新光三越台中中港店）',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: 'c4k5j',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                            {
                                text: '電話：04-2254-3777 ',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: '1er2k',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                            {
                                text: '備註：防疫期間僅提供外帶、外送，營業時間調整為12：00～20：00 ',
                                entityRanges: [],
                                depth: 0,
                                data: {},
                                key: '4i52r',
                                inlineStyleRanges: [],
                                type: 'unordered-list-item',
                            },
                        ],
                    },
                    title: '珍寶海鮮　台中中港店',
                },
                mutability: 'IMMUTABLE',
            },
            7: {
                type: 'EMBEDDEDCODE',
                data: {
                    caption: '',
                    embeddedCode:
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.1985860058917!2d120.6412861144049!3d24.164767284386727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d2469e4ca53%3A0x73049004c2ec7307!2z54-N5a-25rW36a6uIOWPsOS4reS4rea4r-W6lyBKVU1CTyBTZWFmb29k!5e0!3m2!1szh-TW!2stw!4v1622622131950!5m2!1szh-TW!2stw" width="600" height="450" style="border: 0;" allowfullscreen="" loading="lazy"></iframe>',
                },
                mutability: 'IMMUTABLE',
            },
        },
    }

    const storedContentBlock =
        '{"blocks": [{"data": {}, "entityRanges": [], "inlineStyleRanges": [], "depth": 0, "type": "unstyled", "text": "民進黨高雄左營、楠梓市議員參選人黃偵琳今（31日）在臉書發文質疑，「為何黃昭順前立委能先打疫苗？」黃偵琳表示，接獲爆料黃昭順已施打疫苗，質疑黃昭順可不可以說明一下屬於哪一類人員？不然為何5月30日可以去教學醫院注射疫苗？", "key": "326nt"}, {"data": {}, "entityRanges": [], "inlineStyleRanges": [], "depth": 0, "type": "unstyled", "text": "黃偵琳指出，畢竟曾是長達30、40年的公眾民意代表，長期的國民黨中常委，在這個與病毒作戰的時刻，怎麼好意思用特權去跟第一線的醫護人員們搶疫苗、剝奪他們安全的屏障呢？", "key": "1kh5d"}, {"data": {}, "entityRanges": [], "inlineStyleRanges": [], "depth": 0, "type": "unstyled", "text": "對此，據《自由時報》報導，黃昭順說明，自己是現職藥師，屬第一線醫護人員，本來就在施打範圍內，只是造冊在台北，她為此請教醫院，台北造冊可否在高雄打，醫院說明照規定是不可以，但因為每瓶疫苗通常會有些許剩餘量，如果是剩下湊一湊幫她打，她認為沒問題，因為這樣可避免在台北、高雄跑來跑去。", "key": "cjvlu"}, {"data": {}, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": [], "depth": 0, "type": "atomic", "text": " ", "key": "dlq6s"}, {"data": {}, "entityRanges": [], "inlineStyleRanges": [], "depth": 0, "type": "unstyled", "text": "", "key": "dddta"}], "entityMap": {"0": {"data": {"embeddedCode": "<iframe src=\\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fapplewin0516%2Fposts%2F117768150481487&show_text=true&width=500\\" width=\\"500\\" height=\\"657\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowfullscreen=\\"true\\" allow=\\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\\"></iframe>", "caption": "（取自黃偵琳 進擊的令果 左營楠梓臉書）"}, "mutability": "IMMUTABLE", "type": "EMBEDDEDCODE"}}}'

    let storedContentState
    // storedContentState = convertFromRaw(storedContentBlock2)
    // storedContentState = convertFromRaw(JSON.parse(storedContentBlock))

    const storedEditorState = storedContentState
        ? EditorState.createWithContent(storedContentState)
        : EditorState.createEmpty()
    const [editorState, setEditorState] = useState(storedEditorState)

    const content = convertToRaw(editorState.getCurrentContent())
    console.log(content)
    const cHtml = JSON.stringify(DraftConverter.convertToHtml(content))
    const apiData = JSON.stringify(DraftConverter.convertToApiData(content))

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
                />

                <h1>---------</h1>
                {cHtml}
                <h1>---------</h1>
                {apiData}
            </form>
        </div>
    )
}

render(<Demo />, document.getElementById('app'))
