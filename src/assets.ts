import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "mainScene",
            assets:
            {
                // treeModel: "treeModel.glb",
                fullscreen: "fullscreen.png",

                sceneModel: "sceneModel.gltf",

                // bridgeModel: "bridgeModel.glb"

            }
        }
    ]
}