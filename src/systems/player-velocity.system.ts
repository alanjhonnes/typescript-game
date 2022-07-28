import { system, System } from "@lastolivegames/becsy";
import { PlayerControllerComponent } from "../components/player-controller.component";
import { PositionComponent } from "../components/position.component";
import { InputControllerComponent } from "../components/singletons/input-controller.component";
import { VelocityComponent } from "../components/velocity.component";

@system export class PlayerVelocitySystem extends System {
    // In this query we're looking for every entity with both a `Position` and a `Velocity` component,
    // but while we declare that we'll be writing to `Position` we'll only be reading from `Velocity`.
    // Reading from `Velocity` will automatically make this system run after `VelocityInputController`
    // which writes it, and writing to `Position` will put it before the `Renderer` which reads it.
    // The order that systems are declared in doesn't matter.

    private readonly inputControllerComponent = this.singleton.read(InputControllerComponent)

    private readonly playerVelocity =
        this.query(q =>
            q.current.with(PlayerControllerComponent)
                .and.with(VelocityComponent).write
        );

    execute(): void {
        for (const player of this.playerVelocity.current) {
            const velocity = player.write(VelocityComponent);

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
