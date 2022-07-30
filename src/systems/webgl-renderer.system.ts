import { system, System } from "@lastolivegames/becsy";
import * as THREE from "three";
import { DOMRenderableComponent } from "../components/dom-renderable.component";
import { Object3DComponent } from "../components/object3d.component";
import { CameraComponent } from "../components/singletons/camera.component";
import { ResizeListenerComponent } from "../components/singletons/resize-listener.component";
import { SceneComponent } from "../components/singletons/scene.component";
import { WebGLRenderComponent } from "../components/singletons/webgl-renderer.component";

@system export class WebGLRendererSystem extends System {
    private readonly resizeListener = this.singleton.read(ResizeListenerComponent);
    private readonly camera = this.singleton.read(CameraComponent);
    private readonly scene = this.singleton.write(SceneComponent);
    private readonly webglRenderer = this.singleton.write(WebGLRenderComponent);
    private readonly objects = this.query(q => q.added.with(Object3DComponent).read)


    initialize(): void {
        this.scene.scene = new THREE.Scene();
        this.scene.scene.background = new THREE.Color(0x000000);
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        this.scene.scene.add(light);

        const renderer = new THREE.WebGLRenderer();
        this.webglRenderer.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        document.body.appendChild(renderer.domElement);
    }

    execute(): void {
        const scene = this.scene.scene;
        for (const object of this.objects.added) {
            console.log('added object3d')
            const object3dComp = object.read(Object3DComponent)
            scene.add(object3dComp.object3d)
        }
        
        // console.log(this.resizeListener.needsResize)
        // if (this.resizeListener.needsResize) {
            this.webglRenderer.renderer.setSize(window.innerWidth, window.innerHeight, false)
        // }
        const camera = this.camera.camera;
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;

        camera.lookAt(scene.position);
        camera.updateMatrixWorld();
        this.webglRenderer.renderer.render(this.scene.scene, this.camera.camera)
    }
}
