window.MyThree = {
    myScene: null,
    myCamera: null,
    Dispose: function() {
        console.log("MyThree dispose");
    },
    Init: function(params) {
        console.log("MyThree initialize"); 
        const scene = new THREE.Scene();
        this.myScene = scene;

        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.myCamera = camera;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-210, window.innerHeight-160 );
        //document.body.appendChild( renderer.domElement );
        const container = document.querySelector("#threejs-container");
        // container.append(renderer);
        container.appendChild(renderer.domElement);

        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // const cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        
        camera.position.z = 5;

        if(params){
            if(params.objects){
                this.AddObjects(params.objects);
            }
            
            const cam = params.camera;
            console.log('camera params', cam);
            const pos = cam?.position;
            camera.position.set(pos?.x ?? 0, pos?.y ?? 0, pos?.z ?? 5);
            
        }

        

        function animate() {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        }
        renderer.setAnimationLoop( animate );
    },
    AddObjects: function(objects){
        for(var obj of objects){
            console.log(obj);
            if(obj.type == 'cube'){
                this.AddCube(obj.args);
            }
        }
    },
    AddCube: function(params){
        // console.log('add cube', params);
        // console.log('add cube', typeof params);
        if(params == undefined || params == null){
            return;
        }
        const size = params.size;
        const geometry = new THREE.BoxGeometry( size?.x ?? 1, size?.y ?? 1, size?.z ?? 1 );
        const material = this.CreateMaterial(params);
        const cube = new THREE.Mesh( geometry, material );
        const position = params.position;
        cube.position.set(position?.x ?? 0, position?.y ?? 0, position?.z ?? 0);
        console.log('new cube', cube);
        this.myScene.add( cube );

        return cube.id;
    },
    CreateMaterial: function(params){
        if(params.material == 'meshbasic'){
            return new THREE.MeshBasicMaterial({color: params.color ?? 0xffff00 });
        }
    },
};