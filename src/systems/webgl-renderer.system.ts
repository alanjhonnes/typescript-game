import { system, System } from "@lastolivegames/becsy";
import { DOMRenderableComponent } from "../components/dom-renderable.component";
import { PositionComponent } from "../components/position.component";
import { CameraComponent } from "../components/singletons/camera.component";
import { SceneComponent } from "../components/singletons/scene.component";
import { WebGLRenderComponent } from "../components/singletons/webgl-renderer.component";

@system export class WebGLRendererSystem extends System {
    private readonly webglRenderer = this.singleton.write(WebGLRenderComponent);
    private readonly camera = this.singleton.read(CameraComponent);
    private readonly scene = this.singleton.write(SceneComponent);

    needsResize: boolean = true;

    onResize() {
        this.needsResize = true;
    }


    initialize(): void {
        this.needsResize = true;
        this.onResize = this.onResize.bind(this);
        window.addEventListener("resize", () => this.onResize(), false);
    }

    execute(): void {
        this.webglRenderer.renderer.render(this.scene.scene, this.camera.camera)
    }
}
