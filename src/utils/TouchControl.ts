import { Container, Graphics } from "pixi.js";
import { MySphere } from "../game/MySphere";


export class TouchControl extends Container {
    public player: MySphere;

    private upButton: Graphics;
    private rightButton: Graphics;
    private leftButton: Graphics;
    private downButton: Graphics;
    jumpButton: Graphics;


    constructor(player: MySphere) {
        super()

        this.player = player;

        this.upButton = new Graphics();
        this.upButton.lineStyle(3, 0xFFFFFF);
        this.upButton.beginFill(0xFF00FF, 0.3);
        this.upButton.alpha = 0.3;
        this.upButton.drawPolygon(94, 467, 200, 467, 200, 520, 147, 573, 94, 520);
        this.upButton.eventMode = "static";
        this.addChild(this.upButton);
        this.upButton.on("pointerdown", () => { this.goUp = true; this.upButton.alpha = 0.8 })
            .on("pointerup", () => { this.goUp = false; this.upButton.alpha = 0.3 })
            .on("pointerupoutside", () => { this.goUp = false; this.upButton.alpha = 0.3 })

        this.rightButton = new Graphics();
        this.rightButton.beginFill(0xFF00FF, 0.3);
        this.rightButton.lineStyle(3, 0xFFFFFF);
        this.rightButton.alpha = 0.3;
        this.rightButton.drawPolygon(200, 520, 253, 520, 253, 626, 200, 626, 147, 573);
        this.rightButton.eventMode = "static";
        this.addChild(this.rightButton);
        this.rightButton.on("pointerdown", () => { this.goRight = true; this.rightButton.alpha = 0.8 })
            .on("pointerup", () => { this.goRight = false; this.rightButton.alpha = 0.3 })
            .on("pointerupoutside", () => { this.goRight = false; this.rightButton.alpha = 0.3 })

        this.downButton = new Graphics();
        this.downButton.beginFill(0xFF00FF, 0.3);
        this.downButton.lineStyle(3, 0xFFFFFF);
        this.downButton.alpha = 0.3;
        this.downButton.drawPolygon(147, 573, 200, 626, 200, 679, 94, 679, 94, 626);
        this.downButton.eventMode = "static";
        this.addChild(this.downButton);
        this.downButton.on("pointerdown", () => { this.goDown = true; this.downButton.alpha = 0.8 })
            .on("pointerup", () => { this.goDown = false; this.downButton.alpha = 0.3 })
            .on("pointerupoutside", () => { this.goDown = false; this.downButton.alpha = 0.3 })

        this.leftButton = new Graphics();
        this.leftButton.beginFill(0xFF00FF, 0.3);
        this.leftButton.lineStyle(3, 0xFFFFFF);
        this.leftButton.alpha = 0.3;
        this.leftButton.drawPolygon(94., 626, 41, 626, 41, 520, 94, 520, 147, 573);
        this.leftButton.eventMode = "static";
        this.addChild(this.leftButton);
        this.leftButton.on("pointerdown", () => { this.goLeft = true; this.leftButton.alpha = 0.8 })
            .on("pointerup", () => { this.goLeft = false; this.leftButton.alpha = 0.3 })
            .on("pointerupoutside", () => { this.goLeft = false; this.leftButton.alpha = 0.3 })

        this.jumpButton = new Graphics();
        this.jumpButton.beginFill(0xFF00FF, 0.3);
        this.jumpButton.lineStyle(3, 0xFFFFFF);
        this.jumpButton.alpha = 0.3;
        this.jumpButton.drawCircle(1134, 584, 70);
        this.jumpButton.position.set
        this.jumpButton.eventMode = "static";
        this.addChild(this.jumpButton);
        this.jumpButton.on("pointerdown", () => { this.player.jump(); this.jumpButton.alpha = 0.8 })
            .on("pointerup", () => { this.jumpButton.alpha = 0.3 })
            .on("pointerupoutside", () => { this.jumpButton.alpha = 0.3 })


    }

    goUp = false
    goRight = false
    goDown = false
    goLeft = false

    public update(_deltaMS: number) {

            if (this.goLeft) {
                this.player.myMesh.x -= MySphere.MODEL_SPEED;
            } else if (this.goRight) {
                this.player.myMesh.x += MySphere.MODEL_SPEED;
            }

            if (this.goUp) {
                this.player.myMesh.z -= MySphere.MODEL_SPEED;
            } else if (this.goDown) {
                this.player.myMesh.z += MySphere.MODEL_SPEED;
            }

    }


}



