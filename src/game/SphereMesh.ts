import { Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { Mesh3D, PickingHitArea } from "pixi3d/pixi7";
import { Manager } from "../utils/Manager";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Easing, Tween } from "tweedle.js";
import { Keyboard } from "../utils/Keyboard";

export class SphereMesh extends PhysicsContainer implements IHitbox {

    public static MODEL_SPEED = 0.1

    public myMesh: Mesh3D;

    private isJumping: boolean = false;

    constructor() {
        super();

        this.myMesh = Mesh3D.createSphere();
        this.addChild(this.myMesh);
        this.myMesh.scale.set(0.25)
        this.myMesh.position.y = 0.25;


        // Interactivity
        this.myMesh.eventMode = "static";
        this.myMesh.cursor = "pointer";
        this.myMesh.hitArea = new PickingHitArea(this.myMesh);
        this.myMesh.on("pointertap", () => {
            this.jump();
        });



        Manager.app.renderer.plugins.pipeline.enableShadows(this.myMesh)

    }



    getHitbox(): Rectangle {
        return this.getBounds()
    }




    
    public override update(_deltaMS: number) {

        if (Keyboard.state.get("ArrowRight")) {
            this.myMesh.x += SphereMesh.MODEL_SPEED;
        } else if (Keyboard.state.get("ArrowLeft")) {
            this.myMesh.x -= SphereMesh.MODEL_SPEED;
        }
        if (Keyboard.state.get("ArrowDown")) {
            this.myMesh.z += SphereMesh.MODEL_SPEED;
        } else if (Keyboard.state.get("ArrowUp")) {
            this.myMesh.z -= SphereMesh.MODEL_SPEED;
        }
        if (Keyboard.state.get("Space")) {
            this.jump();
        }

        // LIMITS 
        if (this.myMesh.x <= -5) {
            this.myMesh.x = -5;
        } else if (this.myMesh.x >= 5) {
            this.myMesh.x = 5;
        }

        if (this.myMesh.z <= -1) {
            this.myMesh.z = -1;
        } else if (this.myMesh.z >= 5) {
            this.myMesh.z = 5;
        }

    }



    public jump() {
        if (!this.isJumping) {
            this.isJumping = true
            new Tween(this.myMesh)
                .to({ y: this.myMesh.y + 1 }, 200)
                .start()
                .easing(Easing.Cubic.Out)

                .onComplete(() => {
                    new Tween(this.myMesh)
                        .to({ y: this.myMesh.y - 1 }, 500)
                        .start()
                        .easing(Easing.Bounce.Out)
                        .onComplete(() => {
                            this.isJumping = false;
                        })
                })
        }
    }
}