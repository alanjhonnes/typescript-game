import { system, System } from "@lastolivegames/becsy";
import * as THREE from "three";
import { DOMRenderableComponent } from "../components/dom-renderable.component";
import { PositionComponent } from "../components/position.component";
import { CameraComponent } from "../components/singletons/camera.component";
import { ResizeListenerComponent } from "../components/singletons/resize-listener.component";
import { SceneComponent } from "../components/singletons/scene.component";
import { WebGLRenderComponent } from "../components/singletons/webgl-renderer.component";

@system export class WebGLRendererSystem extends System {
    private readonly resizeListener = this.singleton.read(ResizeListenerComponent);
    private readonly camera = this.singleton.read(CameraComponent);
    private readonly scene = this.singleton.write(SceneComponent);
    private readonly webglRenderer = this.singleton.write(WebGLRenderComponent);


    initialize(): void {
        this.scene.scene = new THREE.Scene();
        this.scene.scene.background = new THREE.Color(0xf0f0f0);
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        this.scene.scene.add(light);

        const renderer = new THREE.WebGLRenderer();
        this.webglRenderer.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(renderer.domElement);
    }

    execute(): void {
        console.log(this.resizeListener.needsResize)
        if (this.resizeListener.needsResize) {
            this.webglRenderer.renderer.setSize(window.innerWidth, window.innerHeight)
        }
        this.webglRenderer.renderer.render(this.scene.scene, this.camera.camera)
    }
}
