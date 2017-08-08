if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }

        var container;

        var camera, controls, scene, renderer;
        var lighting, ambient, keyLight, fillLight, backLight;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        animate();

        function init() {

            container = document.getElementById('3drender');
            // document.body.appendChild(container);

            /* Camera */

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            // camera.position.x = -8;
            // camera.position.y = 5;
            // camera.position.z = -8;

            camera.position.x = 52.23634861300164;
            camera.position.y = 16.330320070845936;
            camera.position.z = 496.9956584618866;

            //{x: 52.23634861300164, y: -16.330320070845936, z: 496.9956584618866}

            /* Scene */

            scene = new THREE.Scene();

            ambient = new THREE.AmbientLight(0xffffff, 1.0);
            scene.add(ambient);

            keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
            keyLight.position.set(-100, 0, 100);

            fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
            fillLight.position.set(100, 0, 100);

            backLight = new THREE.DirectionalLight(0xffffff, 1.0);
            backLight.position.set(100, 0, -100).normalize();

            /* Model */
            //  {_x: -0.11757140195856036, _y: 0.10400203356117892, _z: 0.012261571286953826,


            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setBaseUrl('assets/');
            mtlLoader.setPath('assets/');
            mtlLoader.load('female-croupier-2013-03-26.mtl', function (materials) {

                materials.preload();

                materials.materials.default.map.magFilter = THREE.NearestFilter;
                materials.materials.default.map.minFilter = THREE.LinearFilter;

                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/');
                objLoader.load('Test_008.obj', function (object) {

                    scene.add(object);

                });

            });

            /* Renderer */



            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);


            renderer.setSize(container.innerWidth, container.innerHeight);
            renderer.autoClear = false;
            renderer.setClearColor(0x000000, 0.0);


            container.appendChild(renderer.domElement);


            /* Controls */

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
            controls.minDistance = 100;
            controls.maxDistance = 500;

            /* Lighting */

            lighting = true;
            ambient.intensity = 0.25;
            scene.add(keyLight);
            scene.add(fillLight);
            scene.add(backLight);

            /* Events */

            window.addEventListener('resize', onWindowResize, false);
            //window.addEventListener('keydown', onKeyboardEvent, false);

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(container.innerWidth, container.innerHeight);

        }

        function onKeyboardEvent(e) {

            if (e.code === 'KeyL') {

                lighting = !lighting;
                alert(lighting);

                if (lighting) {

                    ambient.intensity = 0.25;
                    scene.add(keyLight);
                    scene.add(fillLight);
                    scene.add(backLight);

                } else {

                    ambient.intensity = 1.0;
                    scene.remove(keyLight);
                    scene.remove(fillLight);
                    scene.remove(backLight);

                }

            }

        }
        function resizeCanvasToDisplaySize(force) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          if (force || canvas.width !== width ||canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // set render target sizes here
          }
        }

        function animate() {

            requestAnimationFrame(animate);

            controls.update();
  resizeCanvasToDisplaySize();


            render();

        }
        resizeCanvasToDisplaySize(true);


        function render() {

            renderer.render(scene, camera);

        }

