import { _decorator, Component, Node,AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioPlayer')
export class AudioPlayer extends Component {
    @property({ type: AudioClip })
    audioClip: AudioClip = null;

    private audioSource: AudioSource = null;
    start() {
        // 获取 AudioSource 组件
        this.audioSource = this.getComponent(AudioSource);
    }

    play() {
        // 播放音频
        this.audioSource.clip = this.audioClip;
        this.audioSource.play();
    }
}

