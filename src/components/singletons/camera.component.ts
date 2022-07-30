import { component, field } from "@lastolivegames/becsy";

@component export class CameraComponent {
    @field.object declare camera: THREE.PerspectiveCamera;
}
