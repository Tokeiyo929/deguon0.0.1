import { _decorator, Component, Node, Vec3, find } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('ZombieSearchPlayer')
export class ZombieSearchPlayer extends Component {
    @property(Node)
    player: Node = null;
    @property
    speed: number = 60;

    @property
    stopDistance: number = 50;
    private direction: Vec3 = Vec3.ZERO;
    onLoad() {
        // 查找玩家节点
        this.player = find('Canvas/Player');//提前赋值可以用来做刷怪笼
    }

    start() {
        this.schedule(this.updateDirection, 0.5);
    }

    private updateDirection() {
        if (this.player) {
            this.direction = this.player.position.clone().subtract(this.node.position).normalize();
        }
    }

    update(deltaTime: number) {
        if (this.player) {
            const distance = this.node.position.clone().subtract(this.player.position).length();
            if (distance > this.stopDistance) {
                this.node.position = this.node.position.add(this.direction.multiplyScalar(this.speed * deltaTime));
            }
            // 判断玩家是否在怪物的左侧
            if (this.player.position.x < this.node.position.x) {
                this.node.scale = new Vec3(-1, 1, 1); // 左侧，设置x缩放为-1
            } else {
                this.node.scale = new Vec3(1, 1, 1); // 右侧，设置x缩放为1
            }
        }
    }
}



