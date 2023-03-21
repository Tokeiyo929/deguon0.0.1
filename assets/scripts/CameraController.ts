import { Component, Node, _decorator,Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property(Node)
    cameraNode: Node = null;

    @property(Node)
    playerNode: Node = null;

    update(deltaTime: number) {
        if (this.playerNode.position.x > 480||this.playerNode.position.x<1440) {
            this.cameraNode.position = this.cameraNode.position.set(new Vec3(960, 0, 0));
        }
        if (this.playerNode.position.x < 480) {
            this.cameraNode.position = this.cameraNode.position.set(new Vec3(0, 0, 0));
        }
        if (this.playerNode.position.x > 1440) {
            this.cameraNode.position = this.cameraNode.position.set(new Vec3(1920, 0, 0));
        }
    }
}

