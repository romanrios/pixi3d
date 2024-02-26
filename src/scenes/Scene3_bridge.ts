import { Container, Renderer, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import {
    CameraOrbitControl,
    Light,
    LightType,
    LightingEnvironment,
    Mesh3D,
    ShadowCastingLight,
    ShadowQuality
} from "pixi3d/pixi7";
import { BridgeModel } from "../game/BridgeModel";

export class Scene3_bridge extends Container implements IScene {

    private camera: CameraOrbitControl;
    private bridgeModel: BridgeModel;

    constructor() {
        super();

        // Ground
        const ground = Mesh3D.createPlane();
        ground.y = -0.01;
        ground.scale.x = 30;
        ground.scale.z = 15;
        this.addChild(ground);

        // Lights
        let dirLight = new Light();
        dirLight.type = "directional" as LightType;
        dirLight.intensity = 1;
        dirLight.rotationQuaternion.setEulerAngles(45, 45, 0);
        dirLight.position.set(0, 3, 2);
        LightingEnvironment.main.lights.push(dirLight);

        let pointLight = new Light();
        pointLight.type = "point" as LightType;
        pointLight.intensity = 30;
        pointLight.position.set(0, 2, 0);
        LightingEnvironment.main.lights.push(pointLight);

        // Shadows
        let shadowCastingLight = new ShadowCastingLight(Manager.app.renderer as Renderer, dirLight, {
            shadowTextureSize: 512,
            quality: ShadowQuality.medium,

        });
        shadowCastingLight.softness = 1;
        shadowCastingLight.shadowArea = 18;
        const pipeline = Manager.app.renderer.plugins.pipeline;
        pipeline.enableShadows(ground, shadowCastingLight);

        // Models
        this.bridgeModel = new BridgeModel(shadowCastingLight);
        this.bridgeModel.x = 0;
        this.bridgeModel.z = 0;
        this.addChild(this.bridgeModel);


        // Camera
        this.camera = new CameraOrbitControl(Manager.app.view as HTMLCanvasElement);
        this.camera.angles.x = 20
        this.camera.distance = 6;


        // HUD

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
