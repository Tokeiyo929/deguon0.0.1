// BulletSpawner.ts
import { _decorator, Component, Node, Prefab, instantiate, input, EventMouse, Vec3, tween, EventKeyboard, macro, Input } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FireRed')
export class FireRed extends Component {
    @property({ type: Prefab })
    public bulletPrefab: Prefab | null = null;

    @property
    public speed: number = 500;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === macro.KEY.i) {
            this.spawnBullet();
        }
    }

    spawnBullet() {
        if (!this.bulletPrefab) {
            console.error('子弹预制体未指定');
            return;
        }

        const bulletInstance = instantiate(this.bulletPrefab);
        this.node.addChild(bulletInstance);
        bulletInstance.setPosition(new Vec3(0, 0, 0));

        const direction = new Vec3(1, 0, 0); // 朝上的方向
        const duration = 1; // 子弹运动1秒

        tween(bulletInstance)
            .by(duration, { position: direction.multiplyScalar(this.speed * duration) })
            .call(() => {
                bulletInstance.destroy(); // 销毁子弹实例
            })
            .start();
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
}

