import { _decorator, Component, Node,SystemEvent ,Input,KeyCode, input,Event,EventKeyboard,Vec3,Prefab,instantiate,RigidBody2D,Vec2,tween  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControllerLegacy')
export class PlayerControllerLegacy extends Component {
    

    @property({ type: Vec3 })
    moveSpeed: Vec3 = new Vec3(200, 200); // 精灵移动速度

    private _direction: Vec3 = new Vec3(0, 0,0); // 精灵移动方向
    private _scale: number = 1; // 精灵缩放比例

    
    start () {
        // 监听键盘按下事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // 监听键盘抬起事件
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        // 取消监听键盘事件
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update (deltaTime: number) {
        // 计算精灵移动距离
        let distance = this.moveSpeed.clone().multiply(this._direction).multiplyScalar(deltaTime);
        // 更新精灵位置
        this.node.position = this.node.position.add(distance);
        // 更新精灵缩放
        this.node.scale = new Vec3(this._scale, 1, 1);
    }

    private onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._direction.x = -1;
                this._scale = -1;
                break;
            case KeyCode.KEY_D:
                this._direction.x = 1;
                this._scale = 1;
                break;
            
        }
    }
    

    private onKeyUp (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._direction.x = 0;
                break;
            case KeyCode.KEY_D:
                this._direction.x = 0;
                break;
        }
    }
}

