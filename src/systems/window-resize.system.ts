import { system, System } from "@lastolivegames/becsy";
import * as THREE from "three";
import { DOMRenderableComponent } from "../components/dom-renderable.component";
import { Object3DComponent } from "../components/object3d.component";
import { CameraComponent } from "../components/singletons/camera.component";
import { ResizeListenerComponent } from "../components/singletons/resize-listener.component";
import { SceneComponent } from "../components/singletons/scene.component";
import { WebGLRenderComponent } from "../components/singletons/webgl-renderer.component";

@system export class WindowResizeSystem extends System {

    private readonly resizeListener = this.singleton.write(ResizeListenerComponent);

    private resizeTime: number | null = null;


    initialize(): void {
        window.addEventListener("resize", () => {
            console.log('resize')
            this.resizeListener.needsResize = true;
            this.resizeTime = this.delta;
        }, false);
    }

    execute(): void {
        // console.log('resize execute')
        if (this.resizeTime !== this.delta) {
            // console.log('resize execute false')
            this.resizeListener.needsResize = false
        }
    }
}
