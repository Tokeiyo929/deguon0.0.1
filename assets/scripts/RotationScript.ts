import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RotationScript')
export class RotationScript extends Component {
    private rotationSpeed: number = 1.25; // 旋转速度，单位：度/秒
    private interval: number = 0.16; // 每次旋转需要的帧数
    private currentFrame: number = 0; // 当前帧数
    private isRotating: boolean = true; // 是否正在旋转
    
    start () {
        // 在 start 方法中设置节点的初始角度
        this.node.angle = 0;
    }

    update (dt: number) {
        if (this.isRotating) {
            // 如果正在旋转，累加当前帧数
            this.currentFrame+=dt;

            if (this.currentFrame >= this.interval) {
                // 如果累加的帧数达到了每次旋转需要的帧数，改变旋转方向
                this.node.angle += this.rotationSpeed * this.interval;
                this.currentFrame = 0;
            }

            // 根据旋转速度改变节点的角度
            this.node.angle += this.rotationSpeed;

            // 判断节点的角度是否超过了 25 度，如果超过了，改变旋转方向
            if (this.node.angle > 25) {
                this.rotationSpeed = -this.rotationSpeed;
                this.node.angle = 25;
            }

            // 判断节点的角度是否小于了 0 度，如果小于了，改变旋转方向
            if (this.node.angle < 0) {
                this.rotationSpeed = -this.rotationSpeed;
                this.node.angle = 0;
            }
        }
    }
}


    



