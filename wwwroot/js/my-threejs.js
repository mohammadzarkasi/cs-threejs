window.MyThree = {
    Dispose: function() {
        console.log("MyThree dispose");
    },
    Init: function() {
        console.log("MyThree initialize"); 
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        //document.body.appendChild( renderer.domElement );
        const container = document.querySelector("#threejs-container");
        // container.append(renderer);
        container.appendChild(renderer.domElement);
    },
};