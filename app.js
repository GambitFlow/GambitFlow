// ==================== CONFIGURATION ====================
const CONFIG = {
    API: {
        NANO: 'https://gambitflow-nexus-nano-inference-api.hf.space',
        CORE: 'https://gambitflow-nexus-core-inference-api.hf.space',
        BASE: 'https://gambitflow-synapse-base-inference-api.hf.space',
        BRIDGE: 'https://gambitflow-api-bridge.hf.space'
    },
    MODELS: {
        nano: {
            name: 'Nexus-Nano',
            endpoint: 'https://gambitflow-nexus-nano-inference-api.hf.space',
            maxDepth: 4,
            defaultTimeLimit: 2000,
            elo: 1600
        },
        core: {
            name: 'Nexus-Core',
            endpoint: 'https://gambitflow-nexus-core-inference-api.hf.space',
            maxDepth: 5,
            defaultTimeLimit: 3000,
            elo: 2000
        },
        base: {
            name: 'Synapse-Base',
            endpoint: 'https://gambitflow-synapse-base-inference-api.hf.space',
            maxDepth: 6,
            defaultTimeLimit: 5000,
            elo: 2200
        }
    },
    CHESS: {
        PIECE_PATH: 'assets/pieces'
    }
};

// ==================== STATE MANAGEMENT ====================
const STATE = {
    currentPage: 'home',
    currentModel: 'core',
    playerColor: 'white',
    game: null,
    board: null,
    isThinking: false
};

// ==================== ROUTING ====================
function navigateTo(page) {
    STATE.currentPage = page;
    updateNavigation();
    renderPage(page);
    window.scrollTo(0, 0);
}

function updateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${STATE.currentPage}`) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ==================== PAGE TEMPLATES ====================
const PAGES = {
    home: `
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">
                            <span class="gradient-text">Advanced Chess AI</span>
                            <br>Powered by Deep Learning
                        </h1>
                        <p class="hero-description">
                            Experience chess at its finest with our three-tier neural network engines. 
                            From beginner-friendly Nexus-Nano to the powerful Synapse-Base, choose your challenge.
                        </p>
                        <div class="hero-actions">
                            <a href="#play" onclick="navigateTo('play')" class="btn btn-primary btn-lg">
                                Start Playing
                            </a>
                            <a href="#docs" onclick="navigateTo('docs')" class="btn btn-secondary btn-lg">
                                View Documentation
                            </a>
                        </div>
                        <div class="hero-stats">
                            <div class="stat">
                                <span class="stat-value">3</span>
                                <span class="stat-label">AI Models</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">5M+</span>
                                <span class="stat-label">Positions</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">2000+</span>
                                <span class="stat-label">ELO Rating</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="chess-preview">
                            <div class="preview-board">
                                <svg class="chess-icon" viewBox="0 0 100 100">
                                    <g transform="translate(30, 20)">
                                        <path d="M 20 5 L 25 15 L 15 15 Z" fill="currentColor" opacity="0.3"/>
                                        <circle cx="20" cy="25" r="8" fill="currentColor" opacity="0.6"/>
                                    </g>
                                    <g transform="translate(50, 50)">
                                        <path d="M 5 15 Q 10 5 15 15 L 12 20 L 8 20 Z" fill="currentColor" opacity="0.4"/>
                                    </g>
                                    <g opacity="0.1">
                                        <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" stroke-width="1"/>
                                        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="1"/>
                                        <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" stroke-width="1"/>
                                        <line x1="25" y1="0" x2="25" y2="100" stroke="currentColor" stroke-width="1"/>
                                        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="1"/>
                                        <line x1="75" y1="0" x2="75" y2="100" stroke="currentColor" stroke-width="1"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2 class="section-title">Powerful Features</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="12" r="3" fill="currentColor"/>
                                <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.7"/>
                                <circle cx="20" cy="30" r="7" fill="currentColor" opacity="0.4"/>
                            </svg>
                        </div>
                        <h3>Neural Network Engine</h3>
                        <p>Deep learning models trained on millions of positions</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Three Difficulty Levels</h3>
                        <p>Choose from Nano, Core, or Base models</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 8L24 16L32 18L26 24L28 32L20 28L12 32L14 24L8 18L16 16L20 8Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Real-time Analysis</h3>
                        <p>Instant position evaluation and move suggestions</p>
                    </div>
                </div>
            </div>
        </section>
    `,

    play: `
        <div class="play-page">
            <div class="container">
                <div class="play-header">
                    <div>
                        <h1>Play Against AI</h1>
                        <p>Challenge our neural network-powered engines</p>
                    </div>
                    <button class="btn btn-secondary" onclick="resetGame()">New Game</button>
                </div>

                <div class="game-container">
                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header">
                                <h3>Select Opponent</h3>
                            </div>
                            <button class="model-option" data-model="nano" onclick="selectModel('nano')">
                                <div>
                                    <strong>Nexus-Nano</strong><br>
                                    <small>Beginner • ELO ~1600</small>
                                </div>
                            </button>
                            <button class="model-option active" data-model="core" onclick="selectModel('core')">
                                <div>
                                    <strong>Nexus-Core</strong><br>
                                    <small>Intermediate • ELO ~2000</small>
                                </div>
                            </button>
                            <button class="model-option" data-model="base" onclick="selectModel('base')">
                                <div>
                                    <strong>Synapse-Base</strong><br>
                                    <small>Advanced • ELO ~2200</small>
                                </div>
                            </button>
                        </div>

                        <div class="sidebar-card">
                            <div class="card-header">
                                <h3>Settings</h3>
                            </div>
                            <div style="padding: 1rem;">
                                <label>Your Color</label><br>
                                <button class="btn btn-sm btn-secondary" onclick="setColor('white')" style="margin-top: 0.5rem;">White</button>
                                <button class="btn btn-sm btn-outline" onclick="setColor('black')" style="margin-top: 0.5rem;">Black</button>
                            </div>
                        </div>
                    </aside>

                    <div>
                        <div class="board-wrapper">
                            <div id="chessboard"></div>
                            <div class="board-overlay" id="thinkingOverlay">
                                <div style="text-align: center; color: white;">
                                    <div class="spinner"></div>
                                    <p style="margin-top: 1rem;">AI is thinking...</p>
                                </div>
                            </div>
                        </div>

                        <div class="card" style="margin-top: 1rem; padding: 1rem;">
                            <strong>Status:</strong> <span id="gameStatus">Your move</span><br>
                            <strong>Evaluation:</strong> <span id="evaluation">0.00</span>
                        </div>
                    </div>

                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header">
                                <h3>Move History</h3>
                            </div>
                            <div id="moveHistory" style="padding: 1rem; max-height: 300px; overflow-y: auto;"></div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `,

    models: `
        <div class="container" style="padding: 4rem 0;">
            <h1 class="section-title">Chess AI Models</h1>
            <div class="models-grid">
                <div class="model-card">
                    <div class="model-badge beginner">Beginner</div>
                    <h2>Nexus-Nano</h2>
                    <p>Perfect for learning and casual play</p>
                    <ul style="margin: 1.5rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                        <li>Model Size: 13 MB</li>
                        <li>Search Depth: 4</li>
                        <li>Training Data: 638K positions</li>
                        <li>ELO Rating: ~1600</li>
                    </ul>
                    <button class="btn btn-primary" onclick="navigateTo('play'); setTimeout(() => selectModel('nano'), 100)">Play Against Nano</button>
                </div>

                <div class="model-card">
                    <div class="model-badge intermediate">Intermediate</div>
                    <h2>Nexus-Core</h2>
                    <p>Balanced power and performance</p>
                    <ul style="margin: 1.5rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                        <li>Model Size: 13 MB</li>
                        <li>Search Depth: 5</li>
                        <li>Training Data: 2.5M positions</li>
                        <li>ELO Rating: ~2000</li>
                    </ul>
                    <button class="btn btn-primary" onclick="navigateTo('play'); setTimeout(() => selectModel('core'), 100)">Play Against Core</button>
                </div>

                <div class="model-card">
                    <div class="model-badge advanced">Advanced</div>
                    <h2>Synapse-Base</h2>
                    <p>Maximum strength with hybrid architecture</p>
                    <ul style="margin: 1.5rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                        <li>Model Size: 145 MB</li>
                        <li>Parameters: 38M</li>
                        <li>Architecture: CNN + Transformer</li>
                        <li>ELO Rating: ~2200</li>
                    </ul>
                    <button class="btn btn-primary" onclick="navigateTo('play'); setTimeout(() => selectModel('base'), 100)">Play Against Base</button>
                </div>
            </div>
        </div>
    `,

    docs: `
        <div class="container" style="padding: 4rem 0;">
            <h1 class="section-title">Documentation</h1>
            <div class="card" style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h2>Getting Started</h2>
                <p>Welcome to GambitFlow! This guide will help you get started with our chess AI engines.</p>
                
                <h3 style="margin-top: 2rem;">Quick Start</h3>
                <p>The fastest way to use GambitFlow is through our web interface:</p>
                <ol style="padding-left: 2rem; color: var(--text-secondary);">
                    <li>Click "Play" in the navigation</li>
                    <li>Select your preferred AI model</li>
                    <li>Start playing!</li>
                </ol>

                <h3 style="margin-top: 2rem;">API Usage</h3>
                <pre style="background: var(--bg-tertiary); padding: 1rem; border-radius: 0.5rem; overflow-x: auto;">
curl -X POST https://gambitflow-nexus-core-inference-api.hf.space/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "depth": 5,
    "time_limit": 3000
  }'
                </pre>
            </div>
        </div>
    `,

    api: `
        <div class="container" style="padding: 4rem 0;">
            <h1 class="section-title">API Reference</h1>
            <div class="card" style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h2>Endpoints</h2>
                
                <h3 style="margin-top: 2rem;">POST /predict</h3>
                <p>Get the best move for a given position</p>
                
                <h4 style="margin-top: 1rem;">Request Body</h4>
                <pre style="background: var(--bg-tertiary); padding: 1rem; border-radius: 0.5rem;">
{
  "fen": "string",       // FEN notation (required)
  "depth": 5,            // Search depth (1-10)
  "time_limit": 3000     // Time limit in ms
}
                </pre>

                <h4 style="margin-top: 1rem;">Response</h4>
                <pre style="background: var(--bg-tertiary); padding: 1rem; border-radius: 0.5rem;">
{
  "best_move": "e2e4",
  "evaluation": 0.25,
  "depth_searched": 5,
  "nodes_evaluated": 125000,
  "time_taken": 1500,
  "pv": ["e2e4", "e7e5", "Ng1f3"]
}
                </pre>

                <h3 style="margin-top: 2rem;">Base URLs</h3>
                <ul style="padding-left: 2rem; color: var(--text-secondary);">
                    <li>Nexus-Nano: https://gambitflow-nexus-nano-inference-api.hf.space</li>
                    <li>Nexus-Core: https://gambitflow-nexus-core-inference-api.hf.space</li>
                    <li>Synapse-Base: https://gambitflow-synapse-base-inference-api.hf.space</li>
                </ul>
            </div>
        </div>
    `,

    status: `
        <div class="container" style="padding: 4rem 0;">
            <h1 class="section-title">System Status</h1>
            <p class="text-center" style="color: var(--text-secondary); margin-bottom: 3rem;">Real-time monitoring of all services</p>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <div class="service-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3>Nexus-Nano</h3>
                        <span class="status-badge online" id="nanoStatus">Checking...</span>
                    </div>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary);">Latency: <span id="nanoLatency">-</span></p>
                </div>

                <div class="service-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3>Nexus-Core</h3>
                        <span class="status-badge online" id="coreStatus">Checking...</span>
                    </div>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary);">Latency: <span id="coreLatency">-</span></p>
                </div>

                <div class="service-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3>Synapse-Base</h3>
                        <span class="status-badge online" id="baseStatus">Checking...</span>
                    </div>
                    <p style="margin-top: 0.5rem; color: var(--text-secondary);">Latency: <span id="baseLatency">-</span></p>
                </div>
            </div>
        </div>
    `
};

// ==================== PAGE RENDERING ====================
function renderPage(page) {
    const app = document.getElementById('app');
    app.innerHTML = PAGES[page] || PAGES.home;
    
    // Initialize page-specific features
    if (page === 'play') {
        initializeChessBoard();
    } else if (page === 'status') {
        checkAllStatus();
    }
}

// ==================== CHESS GAME LOGIC ====================
function initializeChessBoard() {
    STATE.game = new Chess();
    
    const config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: function(piece) {
            return `${CONFIG.CHESS.PIECE_PATH}/${piece}.svg`;
        }
    };
    
    STATE.board = Chessboard('chessboard', config);
    updateGameStatus();
}

function onDragStart(source, piece) {
    if (STATE.game.game_over()) return false;
    if (STATE.isThinking) return false;
    
    const playerTurn = STATE.playerColor === 'white' ? 'w' : 'b';
    if (STATE.game.turn() !== playerTurn) return false;
    
    if ((STATE.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (STATE.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    const move = STATE.game.move({
        from: source,
        to: target,
        promotion: 'q'
    });
    
    if (move === null) return 'snapback';
    
    updateGameStatus();
    updateMoveHistory();
    
    if (!STATE.game.game_over()) {
        setTimeout(makeAIMove, 500);
    }
}

function onSnapEnd() {
    STATE.board.position(STATE.game.fen());
}

async function makeAIMove() {
    if (STATE.isThinking || STATE.game.game_over()) return;
    
    STATE.isThinking = true;
    document.getElementById('thinkingOverlay').classList.add('active');
    
    try {
        const modelConfig = CONFIG.MODELS[STATE.currentModel];
        const response = await fetch(`${modelConfig.endpoint}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fen: STATE.game.fen(),
                depth: modelConfig.maxDepth,
                time_limit: modelConfig.defaultTimeLimit
            })
        });
        
        const data = await response.json();
        
        if (data.best_move) {
            STATE.game.move(data.best_move, { sloppy: true });
            STATE.board.position(STATE.game.fen());
            
            if (data.evaluation !== undefined) {
                document.getElementById('evaluation').textContent = data.evaluation.toFixed(2);
            }
            
            updateGameStatus();
            updateMoveHistory();
        }
    } catch (error) {
        console.error('AI Move Error:', error);
        alert('Error getting AI move. Please try again.');
    } finally {
        STATE.isThinking = false;
        document.getElementById('thinkingOverlay').classList.remove('active');
    }
}

function updateGameStatus() {
    let status = 'Your move';
    
    if (STATE.game.in_checkmate()) {
        status = 'Checkmate!';
    } else if (STATE.game.in_draw()) {
        status = 'Draw';
    } else if (STATE.game.in_stalemate()) {
        status = 'Stalemate';
    } else if (STATE.game.in_check()) {
        status = 'Check!';
    }
    
    const statusEl = document.getElementById('gameStatus');
    if (statusEl) statusEl.textContent = status;
}

function updateMoveHistory() {
    const history = STATE.game.history();
    const historyEl = document.getElementById('moveHistory');
    if (!historyEl) return;
    
    let html = '<div style="font-family: monospace; font-size: 0.875rem;">';
    for (let i = 0; i < history.length; i += 2) {
        const moveNum = Math.floor(i / 2) + 1;
        const white = history[i];
        const black = history[i + 1] || '';
        html += `<div style="padding: 0.25rem 0;">${moveNum}. ${white} ${black}</div>`;
    }
    html += '</div>';
    
    historyEl.innerHTML = html;
    historyEl.scrollTop = historyEl.scrollHeight;
}

function selectModel(model) {
    STATE.currentModel = model;
    document.querySelectorAll('.model-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.model === model) {
            btn.classList.add('active');
        }
    });
}

function setColor(color) {
    STATE.playerColor = color;
    if (STATE.board) {
        STATE.board.orientation(color);
    }
}

function resetGame() {
    if (STATE.game) {
        STATE.game.reset();
    }
    if (STATE.board) {
        STATE.board.start();
    }
    updateGameStatus();
    const historyEl = document.getElementById('moveHistory');
    if (historyEl) historyEl.innerHTML = '';
    
    const evalEl = document.getElementById('evaluation');
    if (evalEl) evalEl.textContent = '0.00';
}

// ==================== STATUS CHECKING ====================
async function checkAllStatus() {
    const models = ['nano', 'core', 'base'];
    
    for (const model of models) {
        try {
            const start = Date.now();
            const response = await fetch(`${CONFIG.MODELS[model].endpoint}/health`, {
                method: 'GET',
                timeout: 10000
            });
            const latency = Date.now() - start;
            
            document.getElementById(`${model}Status`).textContent = 'Online';
            document.getElementById(`${model}Status`).classList.add('online');
            document.getElementById(`${model}Latency`).textContent = `${latency}ms`;
        } catch (error) {
            document.getElementById(`${model}Status`).textContent = 'Offline';
            document.getElementById(`${model}Status`).classList.remove('online');
            document.getElementById(`${model}Status`).classList.add('offline');
            document.getElementById(`${model}Latency`).textContent = 'N/A';
        }
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Handle hash navigation
    const hash = window.location.hash.substring(1) || 'home';
    navigateTo(hash);
    
    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.substring(1) || 'home';
        navigateTo(newHash);
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('navMenu').classList.remove('active');
        });
    });
});

// Make functions globally accessible
window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
window.selectModel = selectModel;
window.setColor = setColor;
window.resetGame = resetGame;
