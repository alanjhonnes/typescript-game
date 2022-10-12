import { system, System } from "@lastolivegames/becsy";
import { PlayerControllerComponent } from "../components/player-controller.component";
import { Object3DComponent } from "../components/object3d.component";
import { InputControllerComponent } from "../components/singletons/input-controller.component";
import { MovementSystem } from "./movement.system";

@system(
    s => s.before(MovementSystem)
)
export class PlayerRotationSystem extends System {
    private readonly inputControllerComponent = this.singleton.read(InputControllerComponent)

    private readonly player3dObject =
        this.query(q =>
            q.current.with(PlayerControllerComponent)
                .and.with(Object3DComponent).write
        );

    execute(): void {
        for (const player of this.player3dObject.current) {
            const player3d = player.write(Object3DComponent);

            if (this.inputControllerComponent.activeActions.TURN_LEFT) {
                player3d.object3d.rotateY(0.025);
            }
            else if (this.inputControllerComponent.activeActions.TURN_RIGHT) {
                player3d.object3d.rotateY(-0.025);
            }
        }
    }
}
