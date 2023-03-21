import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonsterGenerator')
export class MonsterGenerator extends Component {
    @property(Prefab)
    monsterPrefab: Prefab = null;

    @property(Number)
    generateInterval: number = 5; // 生成间隔时间，单位：秒

    @property(Number)
    generateLimit: number = 10; // 生成上限

    private _generatedCount: number = 0; // 已生成的怪物数量
    private _timer: number = 0; // 计时器
    start() {
        this.schedule(this.generateMonster, this.generateInterval);
    }

    generateMonster() {
        if (this._generatedCount >= this.generateLimit) {
            this.unschedule(this.generateMonster);
            return;
        }
        const monsterNode: Node = instantiate(this.monsterPrefab);
        this.node.addChild(monsterNode);
        this._generatedCount++;
    }
}

