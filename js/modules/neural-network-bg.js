// Enhanced Neural Network Background with THREE.js
const NeuralNetworkBG = {
    scene: null,
    camera: null,
    renderer: null,
    particles: null,
    lines: [],
    animationId: null,
    
    init() {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'neural-network-bg';
        bgContainer.innerHTML = '<canvas id="neuralCanvas"></canvas>';
        document.body.insertBefore(bgContainer, document.body.firstChild);
        
        const canvas = document.getElementById('neuralCanvas');
        
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.createParticles();
        this.createConnections();
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
    },
    
    createParticles() {
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 50 : 100;
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            
            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.01
            });
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x4f9eff,
            size: 0.8,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.particles.userData.velocities = velocities;
        this.scene.add(this.particles);
    },
    
    createConnections() {
        const positions = this.particles.geometry.attributes.position.array;
        const maxDistance = 15;
        
        for (let i = 0; i < positions.length; i += 3) {
            for (let j = i + 3; j < positions.length; j += 3) {
                const dx = positions[i] - positions[j];
                const dy = positions[i + 1] - positions[j + 1];
                const dz = positions[i + 2] - positions[j + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < maxDistance) {
                    const geometry = new THREE.BufferGeometry();
                    const linePositions = new Float32Array([
                        positions[i], positions[i + 1], positions[i + 2],
                        positions[j], positions[j + 1], positions[j + 2]
                    ]);
                    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                    
                    const material = new THREE.LineBasicMaterial({
                        color: 0x22d3ee,
                        transparent: true,
                        opacity: 0.3 * (1 - distance / maxDistance),
                        blending: THREE.AdditiveBlending
                    });
                    
                    const line = new THREE.Line(geometry, material);
                    line.userData = { i: i / 3, j: j / 3 };
                    this.lines.push(line);
                    this.scene.add(line);
                }
            }
        }
    },
    
    updateParticles() {
        const positions = this.particles.geometry.attributes.position.array;
        const velocities = this.particles.userData.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i / 3].x;
            positions[i + 1] += velocities[i / 3].y;
            positions[i + 2] += velocities[i / 3].z;
            
            if (positions[i] < -50 || positions[i] > 50) velocities[i / 3].x *= -1;
            if (positions[i + 1] < -50 || positions[i + 1] > 50) velocities[i / 3].y *= -1;
            if (positions[i + 2] < -25 || positions[i + 2] > 25) velocities[i / 3].z *= -1;
        }
        
        this.particles.geometry.attributes.position.needsUpdate = true;
    },
    
    updateConnections() {
        const positions = this.particles.geometry.attributes.position.array;
        const maxDistance = 15;
        
        this.lines.forEach(line => {
            const i = line.userData.i * 3;
            const j = line.userData.j * 3;
            
            const linePositions = line.geometry.attributes.position.array;
            linePositions[0] = positions[i];
            linePositions[1] = positions[i + 1];
            linePositions[2] = positions[i + 2];
            linePositions[3] = positions[j];
            linePositions[4] = positions[j + 1];
            linePositions[5] = positions[j + 2];
            
            const dx = positions[i] - positions[j];
            const dy = positions[i + 1] - positions[j + 1];
            const dz = positions[i + 2] - positions[j + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            line.material.opacity = distance < maxDistance ? 0.3 * (1 - distance / maxDistance) : 0;
            line.geometry.attributes.position.needsUpdate = true;
        });
    },
    
    animate() {
        this.updateParticles();
        this.updateConnections();
        
        this.particles.rotation.y += 0.0002;
        
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
        
        this.lines.forEach(line => {
            line.geometry.dispose();
            line.material.dispose();
        });
        
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }
        
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
