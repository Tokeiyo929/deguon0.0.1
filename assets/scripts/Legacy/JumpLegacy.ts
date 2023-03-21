import { _decorator, Component, Node, systemEvent, SystemEvent, EventMouse, Vec3, tween,KeyCode, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JumpLegacy')
export class JumpLegacy extends Component {

    @property
    jumpHeight = 0; // 跳跃高度

    @property
    jumpDuration = 0; // 跳跃持续时间

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event) {
        if (event.keyCode === KeyCode.KEY_K) {
            this.jump();
        }
    }

    jump() {
        const up = new Vec3(0, this.jumpHeight, 0);
        const down = new Vec3(0, -this.jumpHeight, 0);
        const jumpUp = tween().by(this.jumpDuration / 2, { position: up });
        const jumpDown = tween().by(this.jumpDuration / 2, { position: down });
        tween(this.node)
            .sequence(jumpUp, jumpDown)
            .start();
    }
}
