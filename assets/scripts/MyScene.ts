import { _decorator, Component, Node,director,PhysicsSystem2D, Collider2D, Contact2DType  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyScene')
export class MyScene extends Component {
    onLoad() {
        const physicsSystem = PhysicsSystem2D.instance;
        physicsSystem.enable = true;
 
        const bulletCollider = this.node.getChildByName('Bullet').getComponent(Collider2D);
        bulletCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    
    

    onBeginContact(contact: any, selfCollider: Collider2D, otherCollider: Collider2D) {
        console.log('1');
    }
    
    
}

