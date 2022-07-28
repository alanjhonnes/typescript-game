import { World } from '@lastolivegames/becsy';
import * as THREE from 'three';
import { DOMRenderableComponent } from './components/dom-renderable.component';
import { PositionComponent } from './components/position.component';
import { VelocityComponent } from './components/velocity.component';
import { InputControllerSystem } from './systems/input-controller.system';
import { MovementSystem } from './systems/movement.system';
import { CameraSystem } from './systems/camera.system';
import { WebGLRendererSystem } from './systems/webgl-renderer.system';
import { PlayerControllerComponent } from './components/player-controller.component';

let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let raycaster: THREE.Raycaster;
let renderer: THREE.WebGLRenderer;

let INTERSECTED: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial> | null = null;
let theta = 0;


const pointer = new THREE.Vector2();
const radius = 100;



// We can now create the world that all our entities and their components will live in.  All system
// and component classes tagged with `@system` and `@component` will be automatically added to the
// world's `defs`, and in this case we don't need to add any other types manually.
const world = await World.create({
    defs: [
        InputControllerSystem,
        CameraSystem,
        MovementSystem,
        WebGLRendererSystem,
    ]
});

// Now we create the entity that will represent our object and add the components it will need.
// Each component type can be optionally followed by an object with initial field values.
world.createEntity(PositionComponent, VelocityComponent, DOMRenderableComponent, { node: document.getElementById('object') });

world.build(system => {
    const player = system.createEntity(
        PlayerControllerComponent,
        PositionComponent,
        VelocityComponent,
    )
})

// Finally, we set up our game loop.  The `run` function will be executed once per frame.
async function run() {
    // Execute the world, which will call the `execute` method of all systems in sequence.  The call
    // is asynchronous and we _must_ await its result, otherwise errors won't be reported properly.
    await world.execute();
    // Continue the loop on the next animation frame.
    requestAnimationFrame(run);
}
// Kick things off with our first frame!
requestAnimationFrame(run);



init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const geometry = new THREE.BoxGeometry(20, 20, 20);

    for (let i = 0; i < 2000; i++) {

        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        scene.add(object);

    }

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onPointerMove);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event: MouseEvent) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

//

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects<THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>>(scene.children, false);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) {
                INTERSECTED.material.emissive.setHex(0x00ff00);
            }

            INTERSECTED = intersects[0].object;
            // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);

        }

    } else {

        if (INTERSECTED) {
            INTERSECTED.material.emissive.setHex(0x00ff00);
        }

        INTERSECTED = null;

    }

    renderer.render(scene, camera);

}
