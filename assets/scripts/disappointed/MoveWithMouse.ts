import { _decorator, Component, Node,Sprite,Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveWithMouse')
export class MoveWithMouse extends Component {
    @property(Sprite )
    sprite: Sprite = null;

    private mousePos = new Vec2(0, 0);
    private position = new Vec3(0, 0, 0);
    onLoad() {
        this.position = this.node.position.clone();
        this.node.on(Node.EventType.MOUSE_MOVE, (event) => {
            this.mousePos = event.getLocation();
        });
    }
    update(dt: number) {
        Vec3.set(this.position, this.mousePos.x, this.mousePos.y, 0);
        this.node.setPosition(this.position);
    }
}

