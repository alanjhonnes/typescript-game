import { system, System } from "@lastolivegames/becsy";
import { PlayerControllerComponent } from "../components/player-controller.component";
import { Object3DComponent } from "../components/object3d.component";
import { InputControllerComponent } from "../components/singletons/input-controller.component";
import { VelocityComponent } from "../components/velocity.component";
import { MovementSystem } from "./movement.system";

@system(
    s => s.before(MovementSystem)
)
@system export class PlayerVelocitySystem extends System {
    private readonly inputControllerComponent = this.singleton.read(InputControllerComponent)

    private readonly playerVelocity =
        this.query(q =>
            q.current.with(PlayerControllerComponent)
                .and.with(Object3DComponent).read
                .and.with(VelocityComponent).write
        );

    execute(): void {
        for (const player of this.playerVelocity.current) {
            const velocity = player.write(VelocityComponent);
            const object3d = player.read(Object3DComponent).object3d;

            const rotation = object3d.rotation;
            

            if (this.inputControllerComponent.activeActions.MOVE_FORWARD) {
                velocity.vz = -100;
            }
            else if (this.inputControllerComponent.activeActions.MOVE_BACK) {
                velocity.vz = 100;
            }
            else {
                velocity.vz = 0;
            }

            if (this.inputControllerComponent.activeActions.STRAFE_LEFT) {
                velocity.vx = -75;
            }
            else if (this.inputControllerComponent.activeActions.STRAFE_RIGHT) {
                velocity.vx = 75;
            }
            else {
                velocity.vx = 0;
            }
        }
    }
}
