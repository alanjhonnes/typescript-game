// Systems are declared as classes that extend `System`.  We use the `@system` decorator to
// automatically register the system type with the world, and `export` them so the linter won't

import { System, system } from "@lastolivegames/becsy";
import { PlayerControllerComponent } from "../components/player-controller.component";
import { InputControllerComponent } from "../components/singletons/input-controller.component";
import { VelocityComponent } from "../components/velocity.component";
import { ACTION_ID } from "../constants";
import { Keychar, keyCharToCode, KeyCode } from "../utils/keys";

const actionKeyMap: Record<string, ACTION_ID | undefined> = {
    "w": 'MOVE_FORWARD',
    "W": 'MOVE_FORWARD',
    's': 'MOVE_BACK',
    'S': 'MOVE_BACK',
    'q': 'STRAFE_LEFT',
    'Q': 'STRAFE_LEFT',
    'e': 'STRAFE_RIGHT',
    'E': 'STRAFE_RIGHT',
    'a': 'TURN_LEFT',
    'A': 'TURN_LEFT',
    'd': 'TURN_RIGHT',
    'D': 'TURN_RIGHT',
    '1': 'SKILL_1',
    '2': 'SKILL_2',
    '3': 'SKILL_3',
    '4': 'SKILL_4',
    '5': 'SKILL_5',
    '6': 'SKILL_6',
    '7': 'SKILL_7',
    '8': 'SKILL_8',
    'Tab': 'SWITCH_TARGET',
    'Space': 'ATTACK',
}



@system export class InputControllerSystem extends System {

    private readonly inputControllerComponent = this.singleton.write(InputControllerComponent)



    // Every system can provide an `initialize` method that will be called once as the world is being
    // set up.  We'll use it to register our DOM event handlers.
    initialize(): void {
        this.inputControllerComponent.keysPressed = new Set()
        this.inputControllerComponent.activeActions = {
            MOVE_FORWARD: false,
            MOVE_BACK: false,
            STRAFE_LEFT: false,
            STRAFE_RIGHT: false,
            TURN_LEFT: false,
            TURN_RIGHT: false,
            SKILL_1: false,
            SKILL_2: false,
            SKILL_3: false,
            SKILL_4: false,
            SKILL_5: false,
            SKILL_6: false,
            SKILL_7: false,
            SKILL_8: false,
            SWITCH_TARGET: false,
            ATTACK: false,
        }

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            const key = event.key;
            this.inputControllerComponent.keysPressed.add(key);  // add the pressed key to our set
            const action = actionKeyMap[key];
            if (action) {
                this.inputControllerComponent.activeActions[action] = true;
            }
        });

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            const key = event.key;
            this.inputControllerComponent.keysPressed.delete(key);  // remove the released key from our set
            const action = actionKeyMap[key];
            if (action) {
                this.inputControllerComponent.activeActions[action] = false;
            }
        });
    }

    // Every system can (and probably should) provide an `execute` method that implements its logic.
    // It will be invoked once per frame in our demo, so at 60fps it's called 60 times per second.
    // execute(): void {
    //     // We loop through the query results of the movables query we defined above.
    //     for (const movable of this.movables.current) {
    //         // This is how we access the data stored in the Velocity component of our movable entity.
    //         // We must specify whether we intend to only `read` the data or also to `write` it.  We'll
    //         // only be allowed to `write` to component types that we reserved as such in our queries.
    //         const velocity = movable.write(VelocityComponent);

    //         if (this.keysPressed.has('ArrowUp')) velocity.vy = -100;  // in pixels per second
    //         else if (this.keysPressed.has('ArrowDown')) velocity.vy = 100;
    //         else velocity.vy = 0;

    //         if (this.keysPressed.has('ArrowLeft')) velocity.vx = -100;
    //         else if (this.keysPressed.has('ArrowRight')) velocity.vx = 100;
    //         else velocity.vx = 0;
    //     }
    // }
}
