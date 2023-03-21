import { _decorator, Component, Node,find,ProgressBar, Collider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Blood')
export class Blood extends Component {
    @property
    blood = 100; // 怪物初始血量为100

    @property({ type:Node })
    bloodBar = null; // 血条节点

    // onLoad() {
    //     // 查找血条节点
    //     //this.bloodBar = find('Canvas/Player');
    // }

    update(dt: number) {
        // 更新血条进度
        this.bloodBar.getComponent(ProgressBar).progress = this.blood / 100;
    }

    takeDamage(damage: number) {
        // 受到伤害，减少血量
        this.blood -= damage;

        // 如果血量小于等于0，怪物死亡
        if (this.blood <= 0) {
            this.blood = 0;
            this.die();
        }
    }

    die() {
        // 销毁怪物和血条节点
        this.node.destroy();
        this.bloodBar.destroy();
    }
    onCollisionEnter(other: Collider2D, self: Collider2D) {
        // 当怪物碰到子弹时
        if (other.node.name === 'Bullet') {
            other.node.destroy(); // 销毁子弹节点
            this.getComponent(Blood).takeDamage(10); // 减少怪物10点血量
        }
    }
}

