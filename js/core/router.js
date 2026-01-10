// Page Templates
const PAGES = {
    home: `
        <section class="hero fade-in">
            <div class="container">
                <div class="hero-grid">
                    <div class="slide-in-left">
                        <h1 class="hero-title">
                            <span class="gradient-text">Advanced Chess AI</span><br>
                            Powered by Deep Learning
                        </h1>
                        <p class="hero-description">
                            Experience chess at its finest with our three-tier neural network engines. 
                            From beginner-friendly Nexus-Nano to the powerful Synapse-Base, choose your challenge.
                        </p>
                        <div class="hero-actions">
                            <a href="#play" class="btn btn-primary btn-lg">Start Playing</a>
                            <a href="#docs" class="btn btn-secondary btn-lg">Documentation</a>
                        </div>
                        <div class="hero-stats">
                            <div class="stat">
                                <div class="stat-value">3</div>
                                <div class="stat-label">AI Models</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">5M+</div>
                                <div class="stat-label">Positions</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">2200+</div>
                                <div class="stat-label">Max ELO</div>
                            </div>
                        </div>
                    </div>
                    <div class="slide-in-right">
                        <div class="chess-board-preview float-animation">
                            <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <g opacity="0.1">
                                    <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" stroke-width="1"/>
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="1"/>
                                    <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" stroke-width="1"/>
                                    <line x1="25" y1="0" x2="25" y2="100" stroke="currentColor" stroke-width="1"/>
                                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="1"/>
                                    <line x1="75" y1="0" x2="75" y2="100" stroke="currentColor" stroke-width="1"/>
                                </g>
                                <g transform="translate(30, 20)" style="color: var(--accent-blue)">
                                    <path d="M 20 5 L 25 15 L 15 15 Z" fill="currentColor" opacity="0.3"/>
                                    <circle cx="20" cy="25" r="8" fill="currentColor" opacity="0.6"/>
                                </g>
                                <g transform="translate(50, 50)" style="color: var(--accent-cyan)">
                                    <path d="M 5 15 Q 10 5 15 15 L 12 20 L 8 20 Z" fill="currentColor" opacity="0.4"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2 class="section-title gradient-text">Powerful Features</h2>
                <div class="features-grid">
                    <div class="card feature-card scale-in">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                                <circle cx="16" cy="10" r="3"/>
                                <circle cx="16" cy="16" r="5" opacity="0.7"/>
                                <circle cx="16" cy="24" r="7" opacity="0.4"/>
                            </svg>
                        </div>
                        <h3>Neural Network Engine</h3>
                        <p>Deep learning models trained on millions of high-quality positions from master games.</p>
                    </div>
                    <div class="card feature-card scale-in" style="animation-delay: 0.1s">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="6" y="6" width="20" height="20" rx="4"/>
                                <line x1="6" y1="16" x2="26" y2="16"/>
                                <line x1="16" y1="6" x2="16" y2="26"/>
                            </svg>
                        </div>
                        <h3>Three Difficulty Levels</h3>
                        <p>Choose from Nano (1600 ELO), Core (2000 ELO), or Base (2200 ELO) engines.</p>
                    </div>
                    <div class="card feature-card scale-in" style="animation-delay: 0.2s">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 6L20 14L28 16L22 22L24 30L16 26L8 30L10 22L4 16L12 14L16 6Z"/>
                            </svg>
                        </div>
                        <h3>Real-time Analysis</h3>
                        <p>Instant position evaluation with detailed move analysis and principal variations.</p>
                    </div>
                </div>
            </div>
        </section>
    `,

    play: `
        <div class="play-page fade-in">
            <div class="container">
                <div class="play-header">
                    <div>
                        <h1>Play Against AI</h1>
                        <p>Challenge our neural network engines</p>
                    </div>
                    <button class="btn btn-secondary" onclick="ChessGame.resetGame()">New Game</button>
                </div>

                <div class="play-grid">
                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header">Select Opponent</div>
                            <button class="model-option" data-model="nano" onclick="ChessGame.selectModel('nano')">
                                <div>
                                    <strong>Nexus-Nano</strong><br>
                                    <small>Beginner • ELO ~1600</small>
                                </div>
                            </button>
                            <button class="model-option active" data-model="core" onclick="ChessGame.selectModel('core')">
                                <div>
                                    <strong>Nexus-Core</strong><br>
                                    <small>Intermediate • ELO ~2000</small>
                                </div>
                            </button>
                            <button class="model-option" data-model="base" onclick="ChessGame.selectModel('base')">
                                <div>
                                    <strong>Synapse-Base</strong><br>
                                    <small>Advanced • ELO ~2200</small>
                                </div>
                            </button>
                        </div>

                        <div class="sidebar-card">
                            <div class="card-header">Settings</div>
                            <div style="padding: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Your Color</label>
                                <button class="btn btn-sm btn-secondary" onclick="ChessGame.setColor('white')" style="margin-right: 0.5rem;">White</button>
                                <button class="btn btn-sm btn-outline" onclick="ChessGame.setColor('black')">Black</button>
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
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <strong>Status:</strong> <span id="gameStatus">Your move</span>
                                </div>
                                <div>
                                    <strong>Evaluation:</strong> <span id="evaluation">0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header">Move History</div>
                            <div class="move-history" id="moveHistory"></div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `,

    models: `
        <div class="container fade-in" style="padding: 4rem 0;">
            <h1 class="section-title">Chess AI Models</h1>
            <div class="models-grid">
                <div class="card model-card">
                    <div class="model-badge beginner">Beginner</div>
                    <h2>Nexus-Nano</h2>
                    <p>Perfect for learning and casual play</p>
                    <ul class="model-specs">
                        <li>Model Size: 13 MB</li>
                        <li>Search Depth: 4</li>
                        <li>Training Data: 638K positions</li>
                        <li>ELO Rating: ~1600</li>
                        <li>Response Time: <2s</li>
                    </ul>
                    <button class="btn btn-primary" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('nano'), 100)">Play Now</button>
                </div>

                <div class="card model-card">
                    <div class="model-badge intermediate">Intermediate</div>
                    <h2>Nexus-Core</h2>
                    <p>Balanced power and performance</p>
                    <ul class="model-specs">
                        <li>Model Size: 13 MB</li>
                        <li>Search Depth: 5</li>
                        <li>Training Data: 2.5M positions</li>
                        <li>ELO Rating: ~2000</li>
                        <li>Response Time: <3s</li>
                    </ul>
                    <button class="btn btn-primary" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('core'), 100)">Play Now</button>
                </div>

                <div class="card model-card">
                    <div class="model-badge advanced">Advanced</div>
                    <h2>Synapse-Base</h2>
                    <p>Maximum strength with hybrid architecture</p>
                    <ul class="model-specs">
                        <li>Model Size: 145 MB</li>
                        <li>Parameters: 38M</li>
                        <li>Architecture: CNN + Transformer</li>
                        <li>Training Data: 2.5M positions</li>
                        <li>ELO Rating: ~2200</li>
                    </ul>
                    <button class="btn btn-primary" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('base'), 100)">Play Now</button>
                </div>
            </div>
        </div>
    `,

    docs: `
        <div class="docs-page fade-in">
            <div class="container">
                <div class="docs-content card" id="docsContent">
                    <h1>Loading documentation...</h1>
                </div>
            </div>
        </div>
    `,

    api: `
        <div class="api-page fade-in">
            <div class="container">
                <div class="docs-content card" id="apiContent">
                    <h1>Loading API documentation...</h1>
                </div>
            </div>
        </div>
    `,

    status: `
        <div class="status-page fade-in">
            <div class="container">
                <h1 class="section-title">System Status</h1>
                <p class="text-center" style="color: var(--text-secondary); margin-bottom: 3rem;">Real-time monitoring of all services</p>
                
                <div class="status-grid">
                    <div class="status-card">
                        <div class="status-header">
                            <h3>Nexus-Nano</h3>
                            <span class="badge badge-info" id="nanoStatus">Checking...</span>
                        </div>
                        <div class="status-info">
                            <p>Latency: <span id="nanoLatency">-</span></p>
                            <p>Endpoint: ${CONFIG.API.NANO}</p>
                        </div>
                    </div>

                    <div class="status-card">
                        <div class="status-header">
                            <h3>Nexus-Core</h3>
                            <span class="badge badge-info" id="coreStatus">Checking...</span>
                        </div>
                        <div class="status-info">
                            <p>Latency: <span id="coreLatency">-</span></p>
                            <p>Endpoint: ${CONFIG.API.CORE}</p>
                        </div>
                    </div>

                    <div class="status-card">
                        <div class="status-header">
                            <h3>Synapse-Base</h3>
                            <span class="badge badge-info" id="baseStatus">Checking...</span>
                        </div>
                        <div class="status-info">
                            <p>Latency: <span id="baseLatency">-</span></p>
                            <p>Endpoint: ${CONFIG.API.BASE}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Router
const Router = {
    navigate(page) {
        STATE.currentPage = page;
        this.updateNav();
        this.render(page);
        window.location.hash = page;
        window.scrollTo(0, 0);
    },

    updateNav() {
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-page="${STATE.currentPage}"]`).addClass('active');
    },

    render(page) {
        $('#app').html(PAGES[page] || PAGES.home);
        
        if (page === 'play') {
            setTimeout(() => ChessGame.init(), 100);
        } else if (page === 'docs') {
            this.loadDocs();
        } else if (page === 'api') {
            this.loadApiDocs();
        } else if (page === 'status') {
            setTimeout(() => StatusMonitor.checkAll(), 100);
        }
    },

    loadDocs() {
        fetch(CONFIG.DOCS.GETTING_STARTED)
            .then(res => res.text())
            .then(md => {
                $('#docsContent').html(marked.parse(md));
            })
            .catch(() => {
                $('#docsContent').html('<h1>Documentation Coming Soon</h1>');
            });
    },

    loadApiDocs() {
        fetch(CONFIG.DOCS.API_REFERENCE)
            .then(res => res.text())
            .then(md => {
                $('#apiContent').html(marked.parse(md));
            })
            .catch(() => {
                $('#apiContent').html('<h1>API Documentation Coming Soon</h1>');
            });
    }
};