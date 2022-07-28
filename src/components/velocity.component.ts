import { component, field } from "@lastolivegames/becsy";

@component export class VelocityComponent {
    // Velocity is also a two floats vector just like Position, but we nonetheless define it as a
    // separate component type.  Since an entity can have at most one instance of any given component
    // type this will allow an entity to have both a Velocity and a Position.  We could reuse property
    // names but prefer not to, as it will make code clearer later on.
    @field.float64 declare vx: number;
    @field.float64 declare vy: number;
    @field.float64 declare vz: number;
}
