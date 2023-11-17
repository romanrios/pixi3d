import { Assets, Container } from "pixi.js";
import { IScene } from "../utils/IScene";
import { CameraOrbitControl, Light, LightingEnvironment, Mesh3D, Model, PickingHitArea, ShadowCastingLight, ShadowQuality } from "pixi3d/pixi7";
import { Manager } from "../utils/Manager";
import { Easing, Tween } from "tweedle.js";

export class Scene1 extends Container implements IScene {
    camera: CameraOrbitControl;

    constructor() {
        super();

        const myModelAsset = Assets.get("myModel");
        const myModel = Model.from(myModelAsset);
        this.addChild(myModel);

        let dirLight = new Light();
        dirLight.type = "directional" as any;
        dirLight.intensity = 1;
        dirLight.rotationQuaternion.setEulerAngles(45, 45, 0);
        dirLight.position.set(-4, 7, -4);
        LightingEnvironment.main.lights.push(dirLight);

        let pointLight = new Light();
        pointLight.type = "point" as any;
        pointLight.intensity = 10;
        pointLight.position.set(1, 2, 3);
        LightingEnvironment.main.lights.push(pointLight);

        myModel.eventMode = "static";
        myModel.cursor = "pointer";
        myModel.hitArea = new PickingHitArea(myModel);
        myModel.on("pointertap", () => {
            new Tween(myModel)
            .to({y: myModel.y+2},700)
            .start()
            .easing(Easing.Bounce.Out)
            .yoyo(true)
            .repeat(1)
            .onUpdate(()=>{myModel.eventMode="none"})
            .onComplete(()=>{myModel.eventMode="static"})
        })

        this.camera = new CameraOrbitControl(Manager.app.view as any);
        this.camera.angles.x = 20
        this.camera.distance = 6;

        const ground = Mesh3D.createPlane();
        ground.y = -0.02;
        ground.scale.set(15);
        this.addChild(ground);

        // Creates a shadow casting light for the directional light.
        let shadowCastingLight = new ShadowCastingLight(Manager.app.renderer as any, dirLight, {
            shadowTextureSize: 512,
            quality: ShadowQuality.medium
        });
        shadowCastingLight.softness = 1;
        shadowCastingLight.shadowArea = 13;

        // Enables shadows to be both casted and received for the model and ground.
        let pipeline = Manager.app.renderer.plugins.pipeline;
        pipeline.enableShadows(myModel, shadowCastingLight);
        pipeline.enableShadows(ground, shadowCastingLight);


    }





    public update(_deltaTime: number, _deltaFrame: number) {
        this.camera.angles.y += 0.1
    }



}
