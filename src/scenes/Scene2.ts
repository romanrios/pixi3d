import { Assets, Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import {
    CameraOrbitControl,
    Light,
    LightType,
    LightingEnvironment,
    Model,
} from "pixi3d/pixi7";

export class Scene2 extends Container implements IScene {
    camera: CameraOrbitControl;
    myModel: any;



    constructor() {
        super();


        // Lights
        let dirLight = new Light();
        dirLight.type = "directional" as LightType;
        dirLight.intensity = 1;
        dirLight.rotationQuaternion.setEulerAngles(45, 45, 0);
        dirLight.position.set(0, 1, 1);
        LightingEnvironment.main.lights.push(dirLight);

        let pointLight = new Light();
        pointLight.type = "point" as LightType;
        pointLight.intensity = 10;
        pointLight.position.set(0, 2, 0);
        LightingEnvironment.main.lights.push(pointLight);

        // // Shadows
        // let shadowCastingLight = new ShadowCastingLight(Manager.app.renderer as Renderer, dirLight, {
        //     shadowTextureSize: 512,
        //     quality: ShadowQuality.medium,

        // });
        // shadowCastingLight.softness = 1;
        // shadowCastingLight.shadowArea = 18;
        // const pipeline = Manager.app.renderer.plugins.pipeline;
        // pipeline.enableShadows(ground, shadowCastingLight);

        // Models



        const myModelAsset = Assets.get("scene");
        this.myModel = Model.from(myModelAsset);
        this.addChild(this.myModel);

        for (let anim of this.myModel.animations) {
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
