import { Assets, Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import {
    CameraOrbitControl,

    Model,

} from "pixi3d/pixi7";

export class Scene2_cave extends Container implements IScene {
    camera: CameraOrbitControl;
    sceneModel: any;

    constructor() {
        super();

        // Model
        const sceneModelAsset = Assets.get("sceneModel");
        this.sceneModel = Model.from(sceneModelAsset);
        this.addChild(this.sceneModel);

        // Model animations
        for (let anim of this.sceneModel.animations) {
            anim.play();
            anim.loop = true;
            anim.speed = 1;
        }


        // Camera
        this.camera = new CameraOrbitControl(Manager.app.view as HTMLCanvasElement);
        this.camera.angles.x = 20
        this.camera.distance = 6;


        const fullscreen = Sprite.from("fullscreen.png");
        this.addChild(fullscreen)
        fullscreen.position.set(1200, 22);
        fullscreen.alpha = 0.5;
        fullscreen.eventMode = "static";
        fullscreen.on("pointertap", () => {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        })


    }


    public update(_deltaTime: number, _deltaFrame: number) {

    }

}
