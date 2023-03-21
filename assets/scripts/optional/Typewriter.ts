import { _decorator, Component, Node,RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Typewriter')
export class Typewriter extends Component {
    @property({ type: RichText })
    private richText!: RichText;

    private _fullText = '';
    private _currentText = '';
    private _isTyping = false;
    private _typingSpeed = 50; // 每个字符打印的时间（毫秒）
    private _typingTimer = 0;
    start() {
        // 获取完整的文本内容
        this._fullText = this.richText.string;
        // 清空富文本内容
        this.richText.string = '';
        // 开始逐字打印
        this.type();
    }

    type() {
        // 如果已经打印完成，则直接返回
        if (this._currentText === this._fullText) {
            return;
        }
        // 如果正在打印中，则直接返回
        if (this._isTyping) {
            return;
        }
        // 获取下一个字符
        const nextChar = this._fullText.charAt(this._currentText.length);
        // 在当前文本内容后面添加下一个字符
        this._currentText += nextChar;
        this.richText.string = this._currentText;
        // 开始计时，等待一段时间后再打印下一个字符
        this._isTyping = true;
        this._typingTimer = setTimeout(() => {
            this._isTyping = false;
            this.type();
        }, this._typingSpeed);
    }

    onDestroy() {
        // 清除计时器
        clearTimeout(this._typingTimer);
    }
}

