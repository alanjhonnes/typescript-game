import { component, field } from "@lastolivegames/becsy";
import { Camera, Scene, WebGLRenderer } from "three";

@component export class WebGLRenderComponent {
    @field.object declare renderer: WebGLRenderer;
}
