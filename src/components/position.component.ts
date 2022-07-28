import { component, field } from '@lastolivegames/becsy';

// Component types are declared as classes and don't need to inherit from anything in particular.
// We use the `@component` decorator to automatically register the component type with the world
// (created below).
@component export class PositionComponent {
    // Each property needs a low level backing field type, as Becsy uses raw array buffers to share
    // data between workers (threads) rather than using objects to represent components.  To keep
    // TypeScript happy, we also use `declare` to expose the high level JavaScript type of each
    // property, whose implementation will be provided by Becsy.
    @field.float64 declare x: number;
    @field.float64 declare y: number;
    @field.float64 declare z: number;
}












