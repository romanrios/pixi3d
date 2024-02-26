import { Assets, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { Container3D, Model, ShadowCastingLight } from "pixi3d/pixi7";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Manager } from "../utils/Manager";

export class BridgeModel extends PhysicsContainer implements IHitbox {
    private myModel: Model;
    private container: Container3D;

    constructor(light: ShadowCastingLight) {
        super();

        this.container = new Container3D()
        this.scale.set(0.1);
        this.addChild(this.container)

        const myModelAsset = Assets.get("bridgeModel");
        this.myModel = Model.from(myModelAsset);
        this.container.addChild(this.myModel);

        const pipeline = Manager.app.renderer.plugins.pipeline;
        pipeline.enableShadows(this.myModel, light)

    }

    getHitbox(): Rectangle {
        return this.getBounds()
    }

    public override update(_deltaMS: number) {
    }

}