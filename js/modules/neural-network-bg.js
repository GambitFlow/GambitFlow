// Realistic Neural Network Background with THREE.js
const NeuralNetworkBG = {
    scene: null,
    camera: null,
    renderer: null,
    neurons: [],
    connections: [],
    layers: [],
    animationId: null,
    mouse: { x: 0, y: 0 },
    
    init() {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'neural-network-bg';
        bgContainer.innerHTML = '<canvas id="neuralCanvas"></canvas>';
        document.body.insertBefore(bgContainer, document.body.firstChild);
        
        const canvas = document.getElementById('neuralCanvas');
        
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0e27, 30, 100);
        
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            200
        );
        this.camera.position.z = 60;
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.addLights();
        this.createNeuralNetwork();
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    },
    
    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x4f9eff, 1, 100);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x22d3ee, 0.8, 100);
        pointLight2.position.set(-20, -20, 20);
        this.scene.add(pointLight2);
    },
    
    createNeuralNetwork() {
        const isMobile = window.innerWidth < 768;
        const layerSizes = isMobile ? [4, 6, 6, 4] : [6, 10, 10, 6];
        const layerSpacing = 15;
        const neuronSpacing = isMobile ? 6 : 4;
        
        layerSizes.forEach((size, layerIndex) => {
            const layer = [];
            const startX = (layerSizes.length - 1) * layerSpacing / 2 - layerIndex * layerSpacing;
            const startY = (size - 1) * neuronSpacing / 2;
            
            for (let i = 0; i < size; i++) {
                const neuron = this.createNeuron(
                    startX,
                    startY - i * neuronSpacing,
                    (Math.random() - 0.5) * 10
                );
                neuron.userData = {
                    layer: layerIndex,
                    index: i,
                    baseY: startY - i * neuronSpacing,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.5 + Math.random() * 0.5,
                    amplitude: 0.5 + Math.random() * 1
                };
                layer.push(neuron);
                this.neurons.push(neuron);
                this.scene.add(neuron);
            }
            
            this.layers.push(layer);
            
            if (layerIndex > 0) {
                const prevLayer = this.layers[layerIndex - 1];
                layer.forEach(neuron => {
                    const numConnections = Math.floor(prevLayer.length * (0.4 + Math.random() * 0.4));
                    const indices = this.shuffleArray([...Array(prevLayer.length).keys()]).slice(0, numConnections);
                    
                    indices.forEach(idx => {
                        const connection = this.createConnection(prevLayer[idx], neuron);
                        this.connections.push(connection);
                        this.scene.add(connection);
                    });
                });
            }
        });
    },
    
    createNeuron(x, y, z) {
        const geometry = new THREE.SphereGeometry(0.4, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x4f9eff,
            emissive: 0x2196f3,
            emissiveIntensity: 0.5,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        const neuron = new THREE.Mesh(geometry, material);
        neuron.position.set(x, y, z);
        
        const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x4f9eff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        neuron.add(glow);
        
        return neuron;
    },
    
    createConnection(neuron1, neuron2) {
        const points = [];
        points.push(neuron1.position.clone());
        
        const mid = new THREE.Vector3().lerpVectors(neuron1.position, neuron2.position, 0.5);
        mid.z += (Math.random() - 0.5) * 3;
        points.push(mid);
        
        points.push(neuron2.position.clone());
        
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0x22d3ee,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        
        const tube = new THREE.Mesh(tubeGeometry, material);
        tube.userData = {
            neuron1: neuron1,
            neuron2: neuron2,
            curve: curve,
            baseOpacity: 0.4,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 1 + Math.random() * 2
        };
        
        return tube;
    },
    
    updateNeurons(time) {
        this.neurons.forEach((neuron, index) => {
            const data = neuron.userData;
            const offset = Math.sin(time * data.speed + data.phase) * data.amplitude;
            neuron.position.y = data.baseY + offset;
            
            const pulseIntensity = 0.3 + Math.sin(time * 2 + data.phase) * 0.2;
            neuron.material.emissiveIntensity = pulseIntensity;
            
            const scale = 1 + Math.sin(time * 3 + data.phase) * 0.1;
            neuron.scale.setScalar(scale);
        });
    },
    
    updateConnections(time) {
        this.connections.forEach(connection => {
            const data = connection.userData;
            
            const points = [];
            points.push(data.neuron1.position.clone());
            
            const mid = new THREE.Vector3().lerpVectors(
                data.neuron1.position, 
                data.neuron2.position, 
                0.5
            );
            mid.z += Math.sin(time + data.pulsePhase) * 2;
            points.push(mid);
            
            points.push(data.neuron2.position.clone());
            
            const newCurve = new THREE.CatmullRomCurve3(points);
            const newGeometry = new THREE.TubeGeometry(newCurve, 20, 0.08, 8, false);
            
            connection.geometry.dispose();
            connection.geometry = newGeometry;
            
            const pulse = Math.sin(time * data.pulseSpeed + data.pulsePhase);
            connection.material.opacity = data.baseOpacity + pulse * 0.3;
            
            const distance = data.neuron1.position.distanceTo(data.neuron2.position);
            const colorMix = (distance - 10) / 20;
            connection.material.color.setHex(
                colorMix > 0.5 ? 0x4f9eff : 0x22d3ee
            );
        });
    },
    
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    
    animate() {
        const time = Date.now() * 0.001;
        
        this.updateNeurons(time);
        this.updateConnections(time);
        
        this.camera.position.x += (this.mouse.x * 5 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 5 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        this.scene.rotation.y = Math.sin(time * 0.1) * 0.05;
        
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.neurons.forEach(neuron => {
            neuron.geometry.dispose();
            neuron.material.dispose();
            if (neuron.children.length > 0) {
                neuron.children[0].geometry.dispose();
                neuron.children[0].material.dispose();
            }
        });
        
        this.connections.forEach(connection => {
            connection.geometry.dispose();
            connection.material.dispose();
        });
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        const bg = document.querySelector('.neural-network-bg');
        if (bg) bg.remove();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NeuralNetworkBG.init());
} else {
    NeuralNetworkBG.init();
}
