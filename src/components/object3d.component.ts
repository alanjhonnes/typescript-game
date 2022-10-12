import { component, field } from '@lastolivegames/becsy';
import { Object3D } from 'three';

@component export class Object3DComponent {
    @field.object declare object3d: Object3D;
}
