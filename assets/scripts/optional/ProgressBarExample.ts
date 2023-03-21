import { _decorator, Component, ProgressBar, Label,Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

const LOADING_TIPS = ['正在加载资源...', '等等我，我还没准备好...', '这次加载会不会很快呢？', '再等一下，差不多就好了...', '我在努力加载，不要着急...'];

@ccclass('ProgressBarExample')
export class ProgressBarExample extends Component {
    
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    @property(Label)
    loadingLabel: Label = null;

    @property(Prefab)
    imagePrefab: Prefab = null;
    
    start() {
        // 模拟进度更新
        let progress = 0;
        this.schedule(() => {
            progress += 0.1;
            this.progressBar.progress = progress;
            if (progress >= 1) {
                this.unscheduleAllCallbacks();
                // 进度完成后的操作
                this.createImage();
            } else {
                // 随机选取一条加载提示并显示在 Label 上
                let tip = LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
                this.loadingLabel.string = tip;
            }
        }, 0.5);
    }
    createImage() {
        // 实例化图片预制资源
        let imageNode = instantiate(this.imagePrefab);
        // 将图片添加到场景中
        this.node.addChild(imageNode);
        imageNode.setPosition(0,200);
    }

}

