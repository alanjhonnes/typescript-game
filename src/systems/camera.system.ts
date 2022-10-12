import { system, System } from "@lastolivegames/becsy";
import * as THREE from 'three';
import { Object3D } from "three";
import { Object3DComponent } from "../components/object3d.component";
import { PlayerControllerComponent } from "../components/player-controller.component";
import { CameraComponent } from "../components/singletons/camera.component";
import { ResizeListenerComponent } from "../components/singletons/resize-listener.component";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


@system export class CameraSystem extends System {
    private readonly camera = this.singleton.write(CameraComponent);
    private readonly resizeListener = this.singleton.read(ResizeListenerComponent)

    private readonly playerToFollow =
        this.query(q => q.current.with(PlayerControllerComponent).and.with(Object3DComponent).read);

    private _currentPosition = new THREE.Vector3(0, 1000, 0);
    private _currentLookat = new THREE.Vector3();
    controls: OrbitControls | null = null;

    initialize(): void {
        this.camera.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.camera.position.y = 2000;
        this.camera.camera.position.set( 0, 20, 100 );
        console.log(document.body)
    }

    execute(): void {
        if(!this.controls) {
            console.log(document.body.querySelector('canvas'))
            this.controls = new OrbitControls( this.camera.camera, document.body.querySelector('canvas')! );
            this.controls.enableDamping = true;
            this.controls.minDistance = 5;
            this.controls.maxDistance = 1000;
            this.controls.enablePan = false;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minPolarAngle = Math.PI/ 4;
            this.controls.maxAzimuthAngle = 0;
            this.controls.minAzimuthAngle = 0;
        }
        this.camera.camera.aspect = window.innerWidth / window.innerHeight;
        
        if (this.resizeListener.needsResize) {

        }
        
        const camera = this.camera.camera;
        this.playerToFollow.current.forEach(player => {
            
            const player3d = player.read(Object3DComponent)
            // camera.lookAt(player3d.object3d.position)
            
            const idealOffset = this._CalculateIdealOffset(player3d.object3d);
            const idealLookat = this._CalculateIdealLookat(player3d.object3d);

            // const t = 0.05;
            // const t = 4.0 * timeElapsed;
            
            const t = 1.0 - Math.pow(0.001, this.delta);

            this._currentPosition.lerp(idealOffset, t);
            this._currentLookat.lerp(idealLookat, t);

            // camera.position.copy(this._currentPosition);
            // camera.lookAt(this._currentLookat);

            console.log('');
            this.controls!.target = player3d.object3d.position.clone();
            
            this.controls!.update();
        })

        this.camera.camera.updateProjectionMatrix();
    }


    _CalculateIdealOffset(target: Object3D) {
        // const idealOffset = new THREE.Vector3(-15, 20, -30);
        const idealOffset = new THREE.Vector3(-50, 50, -50);
        idealOffset.applyQuaternion(target.quaternion);
        idealOffset.add(target.position);
        return idealOffset;
    }

    _CalculateIdealLookat(target: Object3D) {
        const idealLookat = new THREE.Vector3(0, 30, 50);
        idealLookat.applyQuaternion(target.quaternion);
        idealLookat.add(target.position);
        return idealLookat;
    }


}
