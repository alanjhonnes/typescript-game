import { component, field } from "@lastolivegames/becsy";

@component export class ResizeListenerComponent {
    @field.boolean declare needsResize: boolean;
}
