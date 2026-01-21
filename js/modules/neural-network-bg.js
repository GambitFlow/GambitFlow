// Complex Neural Network Background - Full Screen
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
        this.scene.fog = new THREE.Fog(0x0a0e27, 50, 150);
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            300
        );
        this.camera.position.set(0, 0, 80);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.addLights();
        this.createComplexNeuralNetwork();
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    },
    
    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x4f9eff, 1.5, 150);
        pointLight1.position.set(40, 40, 30);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x22d3ee, 1.2, 150);
        pointLight2.position.set(-40, -30, 30);
        this.scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0xa78bfa, 1, 150);
        pointLight3.position.set(0, 40, -30);
        this.scene.add(pointLight3);
    },
    
    createComplexNeuralNetwork() {
        const isMobile = window.innerWidth < 768;
        const aspectRatio = window.innerWidth / window.innerHeight;
        
        const layerSizes = isMobile 
            ? [8, 12, 16, 12, 8] 
            : [12, 18, 24, 18, 12];
        
        const layerSpacing = isMobile ? 25 : 35;
        const neuronSpacingY = isMobile ? 8 : 6;
        const spreadX = aspectRatio > 1 ? 60 : 40;
        const spreadY = 50;
        
        layerSizes.forEach((size, layerIndex) => {
            const layer = [];
            const x = (layerIndex - (layerSizes.length - 1) / 2) * layerSpacing;
            
            for (let i = 0; i < size; i++) {
                const t = i / (size - 1);
                const y = (t - 0.5) * spreadY;
                const z = (Math.random() - 0.5) * 20;
                
                const neuron = this.createNeuron(x, y, z);
                neuron.userData = {
                    layer: layerIndex,
                    index: i,
                    basePos: new THREE.Vector3(x, y, z),
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.3 + Math.random() * 0.7,
                    amplitude: 1 + Math.random() * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                };
                layer.push(neuron);
                this.neurons.push(neuron);
                this.scene.add(neuron);
            }
            
            this.layers.push(layer);
            
            if (layerIndex > 0) {
                this.createLayerConnections(layerIndex);
            }
        });
        
        this.createSkipConnections();
    },
    
    createLayerConnections(layerIndex) {
        const currentLayer = this.layers[layerIndex];
        const prevLayer = this.layers[layerIndex - 1];
        
        currentLayer.forEach((neuron, i) => {
            const connectionCount = Math.floor(prevLayer.length * (0.5 + Math.random() * 0.4));
            const startIdx = Math.max(0, i - Math.floor(connectionCount / 2));
            const endIdx = Math.min(prevLayer.length, startIdx + connectionCount);
            
            for (let j = startIdx; j < endIdx; j++) {
                if (Math.random() > 0.3) {
                    const connection = this.createConnection(prevLayer[j], neuron, 'layer');
                    this.connections.push(connection);
                    this.scene.add(connection);
                }
            }
        });
    },
    
    createSkipConnections() {
        for (let i = 0; i < this.layers.length - 2; i++) {
            const layer = this.layers[i];
            const targetLayer = this.layers[i + 2];
            
            const skipCount = Math.floor(layer.length * 0.15);
            
            for (let j = 0; j < skipCount; j++) {
                const sourceIdx = Math.floor(Math.random() * layer.length);
                const targetIdx = Math.floor(Math.random() * targetLayer.length);
                
                const connection = this.createConnection(
                    layer[sourceIdx], 
                    targetLayer[targetIdx], 
                    'skip'
                );
                this.connections.push(connection);
                this.scene.add(connection);
            }
        }
    },
    
    createNeuron(x, y, z) {
        const size = 0.3 + Math.random() * 0.3;
        const geometry = new THREE.SphereGeometry(size, 16, 16);
        
        const color = Math.random() > 0.7 ? 0x22d3ee : 0x4f9eff;
        
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.6,
            shininess: 100,
            transparent: true,
            opacity: 0.95
        });
        
        const neuron = new THREE.Mesh(geometry, material);
        neuron.position.set(x, y, z);
        
        const glowGeometry = new THREE.SphereGeometry(size * 1.8, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        neuron.add(glow);
        
        return neuron;
    },
    
    createConnection(neuron1, neuron2, type) {
        const points = [];
        points.push(neuron1.position.clone());
        
        const numMidPoints = type === 'skip' ? 3 : 2;
        for (let i = 1; i < numMidPoints; i++) {
            const t = i / numMidPoints;
            const mid = new THREE.Vector3().lerpVectors(neuron1.position, neuron2.position, t);
            mid.z += (Math.random() - 0.5) * 5;
            mid.x += (Math.random() - 0.5) * 3;
            mid.y += (Math.random() - 0.5) * 3;
            points.push(mid);
        }
        
        points.push(neuron2.position.clone());
        
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(
            curve, 
            type === 'skip' ? 40 : 30, 
            type === 'skip' ? 0.06 : 0.08, 
            8, 
            false
        );
        
        const baseOpacity = type === 'skip' ? 0.25 : 0.4;
        const color = type === 'skip' ? 0xa78bfa : 0x22d3ee;
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: baseOpacity,
            blending: THREE.AdditiveBlending
        });
        
        const tube = new THREE.Mesh(tubeGeometry, material);
        tube.userData = {
            neuron1: neuron1,
            neuron2: neuron2,
            curve: curve,
            baseOpacity: baseOpacity,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 1.5,
            type: type,
            midPoints: points.slice(1, -1),
            color: color
        };
        
        return tube;
    },
    
    updateNeurons(time) {
        this.neurons.forEach((neuron) => {
            const data = neuron.userData;
            
            const offsetX = Math.sin(time * data.speed + data.phase) * data.amplitude * 0.5;
            const offsetY = Math.cos(time * data.speed * 0.8 + data.phase) * data.amplitude;
            const offsetZ = Math.sin(time * data.speed * 1.2 + data.phase) * data.amplitude * 0.3;
            
            neuron.position.x = data.basePos.x + offsetX;
            neuron.position.y = data.basePos.y + offsetY;
            neuron.position.z = data.basePos.z + offsetZ;
            
            const pulseIntensity = 0.4 + Math.sin(time * 2 + data.phase) * 0.3;
            neuron.material.emissiveIntensity = pulseIntensity;
            
            const scale = 1 + Math.sin(time * 3 + data.phase) * 0.15;
            neuron.scale.setScalar(scale);
            
            neuron.rotation.x += data.rotationSpeed;
            neuron.rotation.y += data.rotationSpeed * 0.7;
        });
    },
    
    updateConnections(time) {
        this.connections.forEach(connection => {
            const data = connection.userData;
            
            const points = [];
            points.push(data.neuron1.position.clone());
            
            data.midPoints.forEach((midPoint, idx) => {
                const offset = Math.sin(time * 2 + data.pulsePhase + idx) * 2;
                const newMid = midPoint.clone();
                newMid.z += offset;
                points.push(newMid);
            });
            
            points.push(data.neuron2.position.clone());
            
            const newCurve = new THREE.CatmullRomCurve3(points);
            const tubeSize = data.type === 'skip' ? 0.06 : 0.08;
            const segments = data.type === 'skip' ? 40 : 30;
            const newGeometry = new THREE.TubeGeometry(newCurve, segments, tubeSize, 8, false);
            
            connection.geometry.dispose();
            connection.geometry = newGeometry;
            
            const pulse = Math.sin(time * data.pulseSpeed + data.pulsePhase) * 0.5 + 0.5;
            connection.material.opacity = data.baseOpacity + pulse * 0.3;
            
            const colorPulse = Math.sin(time * 0.5 + data.pulsePhase) * 0.5 + 0.5;
            if (data.type === 'skip') {
                connection.material.color.setHex(
                    colorPulse > 0.5 ? 0xa78bfa : 0x8b5cf6
                );
            } else {
                connection.material.color.setHex(
                    colorPulse > 0.5 ? 0x22d3ee : 0x06b6d4
                );
            }
        });
    },
    
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    
    animate() {
        const time = Date.now() * 0.0008;
        
        this.updateNeurons(time);
        this.updateConnections(time);
        
        this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.03;
        this.camera.position.y += (this.mouse.y * 10 - this.camera.position.y) * 0.03;
        this.camera.lookAt(this.scene.position);
        
        this.scene.rotation.y = Math.sin(time * 0.5) * 0.02;
        this.scene.rotation.x = Math.cos(time * 0.3) * 0.01;
        
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
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
