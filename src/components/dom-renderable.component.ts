import { component, field } from "@lastolivegames/becsy";

@component export class DOMRenderableComponent {
    // We'll need a reference to the DOM node we set up in the HTML file in order to manipulate it
    // later on.
    @field.object declare node: HTMLElement;
}
