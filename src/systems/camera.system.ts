import { system, System } from "@lastolivegames/becsy";
import * as THREE from 'three';
import { CameraComponent } from "../components/singletons/camera.component";
import { ResizeListenerComponent } from "../components/singletons/resize-listener.component";

@system export class CameraSystem extends System {
    private readonly camera = this.singleton.write(CameraComponent);
    private readonly resizeListener = this.singleton.read(ResizeListenerComponent)

    initialize(): void {
        this.camera.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    }

    execute(): void {
        if (this.resizeListener.needsResize) {
            this.camera.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.camera.updateProjectionMatrix();
        }
    }
}
