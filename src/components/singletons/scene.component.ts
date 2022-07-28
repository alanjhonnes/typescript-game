import { component, field } from "@lastolivegames/becsy";
import { Scene } from "three";

@component export class SceneComponent {
    @field.object declare scene: Scene;
}
