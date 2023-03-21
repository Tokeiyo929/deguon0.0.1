import { _decorator, Component, Node, Vec3, EventKeyboard, tween, Input, input,KeyCode,ITweenOption,easing,TweenEasing, BoxCollider2D} from 'cc';
//import { easeInQuad, easeOutQuad } from 'cc/tween/easing';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    
    @property
    public moveSpeed: number = 100;

    @property
    public jumpHeight: number = 100;

    @property
    public jumpDuration: number = 0.2;

    private _scale: number = 1; // 精灵缩放比例
    private _movingLeft: boolean = false;
    private _movingRight: boolean = false;
    private _isJumping: boolean = false;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        tween(this.node).stop();
        let newPos = this.node.position.clone();
        if (this._movingLeft) {
            newPos.x -= this.moveSpeed * deltaTime;
        } else if (this._movingRight) {
            newPos.x += this.moveSpeed * deltaTime;
        }
        this.node.setPosition(newPos);
        // 更新精灵缩放
        this.node.scale = new Vec3(this._scale, 1, 1);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._movingLeft = true;
                this._scale = -1;
                break;
            case KeyCode.KEY_D:
                this._movingRight = true;
                this._scale = 1;
                break;
            case KeyCode.KEY_K:
                this.jump();
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._movingLeft = false;
                break;
            case KeyCode.KEY_D:
                this._movingRight = false;
                break;
        }
    }
    
    jump() {
        if (!this._isJumping) {
            const easingUp: TweenEasing = 'quadOut';
            const easingDown: TweenEasing = 'quadIn';
    
            this._isJumping = true;
            tween(this.node.position)
                .by(this.jumpDuration, { y: this.jumpHeight }, { easing: easingUp })
                .by(this.jumpDuration, { y: -this.jumpHeight }, { easing: easingDown })
                .call(() => {
                    this._isJumping = false;
                })
                .start();
        }
    }
    
    
    onLanded() {
        this._isJumping = false;
    }
}

