import { _decorator, Component, Node, Animation, AnimationClip, Input, input, KeyCode, EventKeyboard } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('SwitchAni')
export class SwitchAni extends Component {

    @property({ type: Animation })
    public animationComponent: Animation | null = null;

    @property({ type: AnimationClip })
    public animation1: AnimationClip | null = null;

    @property({ type: AnimationClip })
    public animation2: AnimationClip | null = null;

    private currentAnimation: number = 1;

    start() {
        if (this.animationComponent && this.animation1 && this.animation2) {
            this.animation1.wrapMode = AnimationClip.WrapMode.Loop;
            this.animation2.wrapMode = AnimationClip.WrapMode.Loop;
            this.animationComponent.play(this.animation1.name);
        }
    }
    onLoad () {
        // 监听键盘按下事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy () {
        // 取消监听键盘事件
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    private onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.NUM_1:
                this.switchAnimation(1);
                break;
            case KeyCode.NUM_2:
                this.switchAnimation(2);
                break;
        }
    }

    switchAnimation(animationNumber: number) {
        if (!this.animationComponent || !this.animation1 || !this.animation2) {
            return;
        }

        if (this.currentAnimation !== animationNumber) {
            this.animationComponent.stop();

            if (animationNumber === 1) {
                this.animationComponent.play(this.animation1.name);
                this.currentAnimation = 1;
            } else if (animationNumber === 2) {
                this.animationComponent.play(this.animation2.name);
                this.currentAnimation = 2;
            }
        }
    }
}
