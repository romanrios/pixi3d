import { Assets, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { Container3D, Model } from "pixi3d/pixi7";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Manager } from "../utils/Manager";

export class MyModel extends PhysicsContainer implements IHitbox {
    private myModel: Model;
    private container: Container3D;

    constructor() {
        super();

        this.container = new Container3D()
        this.scale.set(1.5);
        this.addChild(this.container)

        const myModelAsset = Assets.get("myModel");
        this.myModel = Model.from(myModelAsset);
        this.container.addChild(this.myModel);

        Manager.app.renderer.plugins.pipeline.enableShadows(this.myModel)

    }

    getHitbox(): Rectangle {
        return this.getBounds()
    }

    public override update(_deltaMS: number) {
    }

}