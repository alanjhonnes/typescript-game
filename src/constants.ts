import { EnumLiteral } from "./utils/types";

export const ACTION_ID = {
    MOVE_FORWARD: 'MOVE_FORWARD',
    MOVE_BACK: 'MOVE_BACK',
    STRAFE_LEFT: 'STRAFE_LEFT',
    STRAFE_RIGHT: 'STRAFE_RIGHT',
    TURN_LEFT: 'TURN_LEFT',
    TURN_RIGHT: 'TURN_RIGHT',
    SKILL_1: 'SKILL_1',
    SKILL_2: 'SKILL_2',
    SKILL_3: 'SKILL_3',
    SKILL_4: 'SKILL_4',
    SKILL_5: 'SKILL_5',
    SKILL_6: 'SKILL_6',
    SKILL_7: 'SKILL_7',
    SKILL_8: 'SKILL_8',
    SWITCH_TARGET: 'SWITCH_TARGET',
    ATTACK: 'ATTACK',
} as const;

export type ACTION_ID = EnumLiteral<typeof ACTION_ID>;


