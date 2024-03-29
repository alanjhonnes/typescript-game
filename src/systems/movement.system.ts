import { system, System } from "@lastolivegames/becsy";
import { Object3DComponent } from "../components/object3d.component";
import { VelocityComponent } from "../components/velocity.component";

@system export class MovementSystem extends System {
    
    // In this query we're looking for every entity with both a `Position` and a `Velocity` component,
    // but while we declare that we'll be writing to `Position` we'll only be reading from `Velocity`.
    // Reading from `Velocity` will automatically make this system run after `VelocityInputController`
    // which writes it, and writing to `Position` will put it before the `Renderer` which reads it.
    // The order that systems are declared in doesn't matter.
    private readonly movables =
        this.query(q => q.current.with(VelocityComponent).and.with(Object3DComponent).write);

    execute(): void {
        for (const movable of this.movables.current) {
            // We retrive both velocity (to read) and position (to write) from our entities.
            const velocity = movable.read(VelocityComponent);
            const object3d = movable.write(Object3DComponent);
            // In the execute method, a system has access to `this.delta`, which is the delta time between
            // the current frame and the previous one.  This allows us to calculate a stable movement
            // regardless of the intervals between our frames.  For more on that see
            // https://drewcampbell92.medium.com/understanding-delta-time-b53bf4781a03.
            object3d.object3d.position.x += this.delta * velocity.vx;
            object3d.object3d.position.y += this.delta * velocity.vy;
            object3d.object3d.position.z += this.delta * velocity.vz;
        }
    }
}
