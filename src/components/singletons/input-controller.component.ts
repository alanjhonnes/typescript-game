import { component, field } from "@lastolivegames/becsy";
import { Scene } from "three";
import { ActiveActions } from "../../utils/types";

@component export class InputControllerComponent {
    @field.object declare keysPressed: Set<string>;

    @field.object declare activeActions: ActiveActions;
}
