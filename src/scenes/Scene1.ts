import { Container, Renderer, Sprite, isMobile } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { MyModel } from "../game/MyModel";
import { MySphere } from "../game/MySphere";
import { TouchControl } from "../utils/TouchControl";
import {
    CameraOrbitControl,
    Light,
    LightType,
    LightingEnvironment,
    Mesh3D,
    ShadowCastingLight,
    ShadowQuality
} from "pixi3d/pixi7";

export class Scene1 extends Container implements IScene {

    public player: MySphere;
    private camera: CameraOrbitControl;
    private myModel: MyModel;
    private myModel2: MyModel;
    private touchControl: any;

    constructor() {
        super();

        // Models
        this.myModel = new MyModel();
        this.myModel.x = 2;
        this.myModel.z = -5;
        this.addChild(this.myModel);

        this.myModel2 = new MyModel();
        this.myModel2.x = -9;
        this.myModel2.z = -5;
        this.addChild(this.myModel2);

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
            quality: ShadowQuality.high,

        });
        shadowCastingLight.softness = 1;
        shadowCastingLight.shadowArea = 22;
        Manager.app.renderer.plugins.pipeline.enableShadows(ground, shadowCastingLight);

        // Player (Sphere)
        this.player = new MySphere();
        this.addChild(this.player);

        // Camera
        this.camera = new CameraOrbitControl(Manager.app.view as HTMLCanvasElement);
        this.camera.allowControl = false;
        this.camera.angles.x = 20
        this.camera.distance = 6;

        // Touch Control
        if (isMobile.any) {
            this.touchControl = new TouchControl(this.player);
            this.addChild(this.touchControl);
        }


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

        this.player.update(_deltaTime);

        this.touchControl.update(_deltaTime);

        this.camera.angles.y = this.player.myMesh.x + 180;

        this.camera.distance = (this.player.myMesh.z + 6);

    }

}
