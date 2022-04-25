import * as THREE from "three";

const ZonePlane = props => {
    const geometry = new THREE.PlaneGeometry(props.width, props.height);
    var material ;
    if(props.color != null)
    {
        var material = new THREE.MeshBasicMaterial( { color: props.color } );
    }
    if(props.texture != null)
    {
        material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(props.texture)
        })
    }
    else if(props.transparent != null)
    {
        material = new THREE.MeshPhongMaterial({
            color:"red",
            opacity: 0,
            transparent: true,
          });
    }
    const Plane = new THREE.Mesh(geometry, material);
    Plane.position.set(props.X, props.Y);

    if(props.text != null)
    {
        var pendulumGeo = new THREE.CylinderGeometry(1, 1, 50, 16);
        Plane.updateMatrix();
        pendulumGeo.merge(Plane.geometry, Plane.matrix);

        Plane = new THREE.Mesh(pendulumGeo, material);
    }

    return Plane;
}


export default ZonePlane;