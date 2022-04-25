import * as THREE from "three";

const UserCircle = props => {
    // console.log(props);
    var radius = 0.6;
    var segments = 128;
    if(props.current=== true){ 
      //  circleColor="transparent"; 
    }

    const geometry = new THREE.CircleGeometry( radius, segments );
    const material = new THREE.MeshBasicMaterial( {color: "Blue" });
    const circle = new THREE.Mesh( geometry, material );
    var coordinate = new THREE.Vector3();
    circle.position.set(props.X, props.Y);
    // const getPosition = () => {circle.getWorldPosition(coordinate);};
    return circle;
}


export default UserCircle;