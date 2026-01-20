// Neural Network Background Module
const NeuralNetworkBG = {
    canvas: null,
    ctx: null,
    nodes: [],
    connections: [],
    animationId: null,
    
    init() {
        // Create background container
        const bgContainer = document.createElement('div');
        bgContainer.className = 'neural-network-bg';
        bgContainer.innerHTML = '<canvas id="neuralCanvas"></canvas>';
        document.body.insertBefore(bgContainer, document.body.firstChild);
        
        this.canvas = document.getElementById('neuralCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    },
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    createNodes() {
        const isMobile = window.innerWidth < 768;
        const nodeCount = isMobile ? 20 : 40;
        
        this.nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    },
    
    createConnections() {
        this.connections = [];
        const maxDistance = window.innerWidth < 768 ? 150 : 200;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        opacity: 1 - (distance / maxDistance)
                    });
                }
            }
        }
    },
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
        });
        
        this.createConnections();
    },
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = `rgba(79, 158, 255, ${conn.opacity * 0.3})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(79, 158, 255, 0.6)';
            this.ctx.fill();
            
            // Glow effect
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(79, 158, 255, 0.2)';
            this.ctx.fill();
        });
    },
    
    animate() {
        this.updateNodes();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        const bg = document.querySelector('.neural-network-bg');
        if (bg) {
            bg.remove();
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NeuralNetworkBG.init());
} else {
    NeuralNetworkBG.init();
}
