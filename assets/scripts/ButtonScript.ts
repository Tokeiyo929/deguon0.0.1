

import { _decorator, Component, Node, Vec3, EventTouch, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonScript')
export class ButtonScript extends Component {
    @property({ type: Node })
    cameraNode: Node = null;

    onButtonClick(event: EventTouch, customData: string) {
        // 将相机移动到(0, 0, 0)位置
        const camera = this.cameraNode.getComponent(Camera);
        camera.node.setPosition(new Vec3(0, 0, 0));
    }
}
