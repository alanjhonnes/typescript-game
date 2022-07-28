import { ACTION_ID } from "../constants";

export type EnumLiteral<T extends Object> = keyof T

export type ActiveActions = Record<ACTION_ID, boolean>;
