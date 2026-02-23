# 4 properties to transform an object (Mesh):

## 1. Position and Set
- [`position`](https://threejs.org/docs/#Object3D.position), [position.`?`](https://threejs.org/docs/?q=Vector#Vector3.x), [`set`](https://threejs.org/docs/#Vector3.set):

Move the object

```javascript
mesh.position.x = 0.7;
mesh.position.y = - 0.6;
mesh.position.z = 1;
// or
mesh.position.set(0.7, -0.6, 1);
```


## 2. Scale
- [`scale`](https://threejs.org/docs/#Object3D.scale) instance of [Vector3](https://threejs.org/docs/#Vector3)

Resize the object. Exemple:
```javascript
mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;
// or
mesh.scale.set(2, 0.25, 0.5);
```

## 3. Rotation
[`rotation`](https://threejs.org/docs/#Object3D.rotation) instance of [Euler](https://threejs.org/docs/#Euler)

Rotate the Object using **Radians**

```javascript
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
// or - (x, y, z)
mesh.rotation(Math.PI * 0.25, Math.PI * 0.25, 0);
```

Appling the rotation on `x`, `y` and `z` axies in this order will result in weird behaviors like the [gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock), when one axis has no more effect, all because of the previous ones.
- [Video explanation on gimbal lock](https://www.youtube.com/watch?v=zc8b2Jo7mno)


To solve in part this problem, we change the rotation order. For cameras the best one is `yxz`.
```javascript
mesh.rotation.reorder('YXZ');
// and then
mesh.rotation.x = Math.PI * 0.25; // done second
mesh.rotation.y = Math.PI * 0.25; // done first 
```

But the gimbal lock still will happen.

### Look At
It's possible for the camera to look directely at a object, by rotating the camera:

```javascript
camera.lockAt(mesh.position);
```

But is possible to apply it for any Object3D, and it will rotates the object to face a point in world space. [docs](https://threejs.org/docs/?q=lookat#Object3D.lookAt)

## 4. Quaternion
I will study this topic later:
- [Quaternion - Wikipedia](https://en.wikipedia.org/wiki/Quaternion)
- [A descoberta dos Quaternions | Carta do Hamilton para Graves - Corre de PhD](https://www.youtube.com/watch?v=IyOUBRUQWR8)
- [Quaternions and 3d rotation, explained interactively](https://youtu.be/zjMuIxRvygQ?si=aC1njxPXLjDTZkjt)
- [Visualizing the 4d numbers Quaternions](https://youtu.be/d4EgbgTm0Bg?si=YgIfsVFlIHc_dyO5)

```math
i^{2} = j^{2} = k^{2} = i \times j \times k =-1
```

# Combining Transformations
You can combine the position, the rotation (or quaternion), and the scale in any order. The result will be the same.
```javascript
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

# Calculating distances
The position property is not any object. It's an instance of the Vector3 class. [See more](https://threejs.org/docs/#Object3D.position)
- Length of a Vector3: `mesh.position.length()`
- Distance from another Vector3: `mesh.position.distanceTo(camera.position)`
  - It returns the distance between an object and the camera.
- Normalize the Vector3: `mesh.position.normalize()`


# Helper 
- Axis:
```javascript
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```


# Grouping Objects
To simplify the process of changing all object if they are in the wrong place, we can put all of them in a group and then change their position / rotation / scale at the same time. Becaus the instance of [Group](https://threejs.org/docs/#Group) works the same way as a Object3D.

To add a object to a group just `group.add( someObject );`
