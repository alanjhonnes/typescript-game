import { system, System } from "@lastolivegames/becsy";
import THREE from "three";
import { CameraComponent } from "../components/singletons/camera.component";

@system export class CameraSystem extends System {
    private readonly camera = this.singleton.read(CameraComponent);


    needsResize: boolean = true;

    onResize() {
        this.needsResize = true;
    }


    initialize(): void {
        this.camera.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    }

    execute(): void {

    }
}
