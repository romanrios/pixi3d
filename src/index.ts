import { isMobile } from "pixi.js";
import { Keyboard } from "./utils/Keyboard";
import { LoaderScene } from "./utils/LoaderScene";
import { Manager } from "./utils/Manager";


Manager.initialize(1280, 720, 0x888888);

if (!isMobile.any) {
    Keyboard.initialize();
};

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

