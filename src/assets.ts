import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "mainScene",
            assets:
            {
                myModel: "b.glb",
                fullscreen: "fullscreen.png",
                // scene: "scene.gltf"

            }
        }
    ]
}