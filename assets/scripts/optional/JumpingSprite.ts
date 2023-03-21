

import { Component, Node,_decorator, Sprite, tween,Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('JumpingSprite01')
export class JumpingSprite01 extends Component {
    @property(Sprite)
    sprite: Sprite = null;

    private initialY: number = 0; // 初始位置的 y 坐标
    private jumpHeight: number = 50; // 跳跃高度
    private jumpDuration: number = 0.5; // 跳跃持续时间
    private jumpInterval: number = 1; // 跳跃间隔时间
    private jumpCount: number = 0; // 已经跳跃的次数

    start() {
        this.initialY = this.node.position.y; // 记录初始位置的 y 坐标
        this.jump(); // 开始跳跃
    }

    private jump() {
        if (this.jumpCount < 3) { // 最多跳跃三次
            const jumpToPos = new Vec3(this.node.position.x, this.initialY + this.jumpHeight, this.node.position.z); // 跳跃到的位置
            const jumpDownPos = new Vec3(this.node.position.x, this.initialY, this.node.position.z); // 落地的位置

            const jumpUp = tween(this.node).to(this.jumpDuration / 2, { position: jumpToPos }, { easing: 'sineOut' }); // 跳跃上升的 tween
            const jumpDown = tween(this.node).to(this.jumpDuration / 2, { position: jumpDownPos }, { easing: 'sineIn' }); // 跳跃下降的 tween

            const jumpSequence = tween(this.node).sequence(jumpUp, jumpDown); // 跳跃序列 tween

            const callback = tween(this.node).call(() => {
                this.jumpCount++; // 增加跳跃次数
                this.jump(); // 继续跳跃
            });

            const jumpAction = tween(this.node).then(jumpSequence).then(callback); // 完整的跳跃 tween

            tween(this.node).then(jumpAction).delay(this.jumpInterval).call(() => {
                this.jumpCount++; // 增加跳跃次数
                this.jump(); // 继续跳跃
            }).start(); // 执行跳跃 tween，并等待跳跃间隔时间后继续跳跃
        }
    }
}