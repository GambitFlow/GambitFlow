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
                            <a href="#play" class="btn btn-primary btn-lg">
                                <i class="fas fa-chess"></i> Start Playing
                            </a>
                            <a href="#docs" class="btn btn-secondary btn-lg">
                                <i class="fas fa-book"></i> Documentation
                            </a>
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
                        <div style="position: relative;">
                            <svg style="position: absolute; top: -40px; right: -40px; width: 120px; height: 120px; opacity: 0.15; z-index: 0;" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-blue);"/>
                                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-cyan);"/>
                                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-blue);"/>
                            </svg>
                            <svg style="position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; opacity: 0.12; z-index: 0;" viewBox="0 0 100 100">
                                <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="currentColor" stroke-width="3" style="color: var(--accent-cyan);"/>
                            </svg>
                            <div class="chess-board-preview" id="heroBoard"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2 class="section-title gradient-text">Powerful Features</h2>
                <div class="features-grid">
                    <div class="card feature-card scale-in" data-aos="fade-up">
                        <div class="feature-icon">
                            <i class="fas fa-brain fa-2x"></i>
                        </div>
                        <h3>Neural Network Engine</h3>
                        <p>Deep learning models trained on millions of high-quality positions from master games for superior strategic understanding.</p>
                    </div>
                    <div class="card feature-card scale-in" data-aos="fade-up" data-aos-delay="100">
                        <div class="feature-icon">
                            <i class="fas fa-layer-group fa-2x"></i>
                        </div>
                        <h3>Three Difficulty Levels</h3>
                        <p>Choose from Nano (1600 ELO), Core (2000 ELO), or Base (2200 ELO) engines tailored to your skill level.</p>
                    </div>
                    <div class="card feature-card scale-in" data-aos="fade-up" data-aos-delay="200">
                        <div class="feature-icon">
                            <i class="fas fa-chart-line fa-2x"></i>
                        </div>
                        <h3>Real-time Analysis</h3>
                        <p>Instant position evaluation with detailed move analysis and principal variations for every position.</p>
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
                        <h1><i class="fas fa-chess"></i> Play Against AI</h1>
                        <p>Challenge our neural network engines</p>
                    </div>
                    <button class="btn btn-secondary" onclick="ChessGame.resetGame()">
                        <i class="fas fa-redo"></i> New Game
                    </button>
                </div>

                <div class="play-grid">
                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header"><i class="fas fa-robot"></i> Select Opponent</div>
                            <button class="model-option" data-model="nano" onclick="ChessGame.selectModel('nano')">
                                <div>
                                    <strong>Nexus-Nano</strong><br>
                                    <small style="color: var(--accent-green);">Beginner • ELO ~1600</small>
                                </div>
                            </button>
                            <button class="model-option active" data-model="core" onclick="ChessGame.selectModel('core')">
                                <div>
                                    <strong>Nexus-Core</strong><br>
                                    <small style="color: var(--accent-blue);">Intermediate • ELO ~2000</small>
                                </div>
                            </button>
                            <button class="model-option" data-model="base" onclick="ChessGame.selectModel('base')">
                                <div>
                                    <strong>Synapse-Base</strong><br>
                                    <small style="color: var(--accent-purple);">Advanced • ELO ~2200</small>
                                </div>
                            </button>
                        </div>
                    </aside>

                    <div>
                        <div class="board-wrapper">
                            <div id="chessboard"></div>
                        </div>

                        <div class="card" style="margin-top: 1.5rem; padding: 1.5rem;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                                <div>
                                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">STATUS</strong>
                                    <p id="gameStatus" style="margin-top: 0.5rem; font-size: 1.125rem; color: var(--text-primary);">Your move</p>
                                </div>
                                <div>
                                    <strong style="color: var(--text-secondary); font-size: 0.875rem;">EVALUATION</strong>
                                    <p id="evaluation" style="margin-top: 0.5rem; font-size: 1.125rem; color: var(--accent-blue);">0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div class="sidebar-card">
                            <div class="card-header"><i class="fas fa-history"></i> Move History</div>
                            <div class="move-history-container">
                                <table class="pgn-table" id="moveHistoryTable">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">#</th>
                                            <th>White</th>
                                            <th>Black</th>
                                        </tr>
                                    </thead>
                                    <tbody id="moveHistory"></tbody>
                                </table>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            
            <div class="thinking-indicator" id="thinkingIndicator">
                <div class="spinner spinner-sm"></div>
                <span><strong>AI is thinking...</strong></span>
            </div>
            
            <div class="color-selection-modal active" id="colorModal">
                <div class="color-modal-content scale-in">
                    <h2>Choose Your Color</h2>
                    <p>Select which color you want to play as</p>
                    <div class="color-options">
                        <div class="color-option white" onclick="ChessGame.startGame('white')">
                            <i class="fas fa-chess-king"></i>
                            <h3>White</h3>
                            <p>Play first</p>
                        </div>
                        <div class="color-option black" onclick="ChessGame.startGame('black')">
                            <i class="fas fa-chess-king"></i>
                            <h3>Black</h3>
                            <p>AI plays first</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    arena: `
        <div class="arena-page fade-in">
            <div class="container">
                <div class="arena-header text-center" style="margin-bottom: 4rem;">
                    <h1 class="section-title gradient-text"><i class="fas fa-trophy"></i> Engine Arena</h1>
                    <p style="color: var(--text-secondary); font-size: 1.125rem; max-width: 700px; margin: 0 auto;">
                        Watch our AI engines compete against each other with detailed benchmarks and statistics
                    </p>
                </div>

                <div class="arena-controls card" style="padding: 2rem; margin-bottom: 2rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; justify-content: space-between;">
                        <div style="flex: 1; min-width: 200px;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">White Engine</label>
                            <select id="whiteEngine" class="form-select" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border); padding: 0.75rem; border-radius: var(--radius-md);">
                                <option value="nano">Nexus-Nano</option>
                                <option value="core" selected>Nexus-Core</option>
                                <option value="base">Synapse-Base</option>
                            </select>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-exchange-alt fa-2x" style="color: var(--accent-blue);"></i>
                        </div>
                        <div style="flex: 1; min-width: 200px;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Black Engine</label>
                            <select id="blackEngine" class="form-select" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border); padding: 0.75rem; border-radius: var(--radius-md);">
                                <option value="nano">Nexus-Nano</option>
                                <option value="core">Nexus-Core</option>
                                <option value="base" selected>Synapse-Base</option>
                            </select>
                        </div>
                        <button class="btn btn-primary btn-lg" onclick="Arena.startMatch()">
                            <i class="fas fa-play"></i> Start Match
                        </button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start;">
                    <div>
                        <div class="card" style="padding: 2rem; margin-bottom: 1.5rem;">
                            <div style="text-align: center; margin-bottom: 1.5rem;">
                                <h3 id="whitePlayerName" style="color: var(--text-primary);">Nexus-Core</h3>
                                <span class="badge badge-info">White</span>
                            </div>
                            <div id="arenaBoard"></div>
                            <div style="text-align: center; margin-top: 1.5rem;">
                                <h3 id="blackPlayerName" style="color: var(--text-primary);">Synapse-Base</h3>
                                <span class="badge badge-info">Black</span>
                            </div>
                        </div>

                        <div class="card" style="padding: 1.5rem;">
                            <h4 style="margin-bottom: 1rem;"><i class="fas fa-info-circle"></i> Match Status</h4>
                            <div id="arenaStatus" style="color: var(--text-secondary);">
                                Select engines and start the match
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 1.5rem;"><i class="fas fa-chart-bar"></i> Live Benchmarks</h4>
                            <div id="benchmarkStats"></div>
                        </div>

                        <div class="card" style="padding: 1.5rem;">
                            <h4 style="margin-bottom: 1rem;"><i class="fas fa-list"></i> Move Log</h4>
                            <div id="arenaMoveLog" style="max-height: 400px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 0.875rem;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    models: `
        <div class="models-page fade-in">
            <div class="container">
                <h1 class="section-title text-center gradient-text">Chess AI Models</h1>
                <p class="text-center" style="color: var(--text-secondary); font-size: 1.125rem; max-width: 700px; margin: 0 auto 4rem;">
                    Three powerful neural network engines designed for different skill levels
                </p>
                <div class="models-grid">
                    <div class="card model-card" data-aos="fade-up">
                        <div class="model-badge beginner">Beginner Friendly</div>
                        <h2>Nexus-Nano</h2>
                        <p>Perfect for learning and casual play with fast response times</p>
                        <ul class="model-specs">
                            <li><span>Model Size:</span> <strong>13 MB</strong></li>
                            <li><span>Search Depth:</span> <strong>4 plies</strong></li>
                            <li><span>Training Data:</span> <strong>638K positions</strong></li>
                            <li><span>ELO Rating:</span> <strong>~1600</strong></li>
                            <li><span>Response Time:</span> <strong>&lt;2 seconds</strong></li>
                        </ul>
                        <button class="btn btn-primary w-100" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('nano'), 100)">
                            <i class="fas fa-play"></i> Play Now
                        </button>
                    </div>

                    <div class="card model-card" data-aos="fade-up" data-aos-delay="100">
                        <div class="model-badge intermediate">Intermediate</div>
                        <h2>Nexus-Core</h2>
                        <p>Balanced power and performance for competitive players</p>
                        <ul class="model-specs">
                            <li><span>Model Size:</span> <strong>13 MB</strong></li>
                            <li><span>Search Depth:</span> <strong>5 plies</strong></li>
                            <li><span>Training Data:</span> <strong>2.5M positions</strong></li>
                            <li><span>ELO Rating:</span> <strong>~2000</strong></li>
                            <li><span>Response Time:</span> <strong>&lt;3 seconds</strong></li>
                        </ul>
                        <button class="btn btn-primary w-100" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('core'), 100)">
                            <i class="fas fa-play"></i> Play Now
                        </button>
                    </div>

                    <div class="card model-card" data-aos="fade-up" data-aos-delay="200">
                        <div class="model-badge advanced">Advanced</div>
                        <h2>Synapse-Base</h2>
                        <p>Maximum strength with hybrid CNN + Transformer architecture</p>
                        <ul class="model-specs">
                            <li><span>Model Size:</span> <strong>145 MB</strong></li>
                            <li><span>Parameters:</span> <strong>38 Million</strong></li>
                            <li><span>Architecture:</span> <strong>CNN + Transformer</strong></li>
                            <li><span>Training Data:</span> <strong>2.5M positions</strong></li>
                            <li><span>ELO Rating:</span> <strong>~2200</strong></li>
                        </ul>
                        <button class="btn btn-primary w-100" onclick="Router.navigate('play'); setTimeout(() => ChessGame.selectModel('base'), 100)">
                            <i class="fas fa-play"></i> Play Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,

    docs: `
        <div class="docs-page fade-in">
            <div class="container">
                <div class="docs-content card" id="docsContent">
                    <div style="text-align: center; padding: 3rem;">
                        <div class="spinner"></div>
                        <p style="margin-top: 1rem; color: var(--text-secondary);">Loading documentation...</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    api: `
        <div class="api-page fade-in">
            <div class="container">
                <div class="docs-content card" id="apiContent">
                    <div style="text-align: center; padding: 3rem;">
                        <div class="spinner"></div>
                        <p style="margin-top: 1rem; color: var(--text-secondary);">Loading API documentation...</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    status: `
        <div class="status-page fade-in">
            <div class="container">
                <h1 class="section-title text-center gradient-text">System Status</h1>
                <p class="text-center" style="color: var(--text-secondary); margin-bottom: 4rem; font-size: 1.125rem;">
                    Real-time monitoring of all services
                </p>
                
                <div class="status-grid">
                    <div class="status-card" data-aos="fade-up">
                        <div class="status-header">
                            <h3><i class="fas fa-server"></i> Nexus-Nano</h3>
                            <span class="badge badge-info" id="nanoStatus">
                                <i class="fas fa-circle-notch fa-spin"></i> Checking...
                            </span>
                        </div>
                        <div class="status-info">
                            <div>
                                <strong>Latency</strong>
                                <p id="nanoLatency">-</p>
                            </div>
                            <div>
                                <strong>Endpoint</strong>
                                <p style="font-size: 0.8125rem; word-break: break-all;">${CONFIG.API.NANO.split('//')[1]}</p>
                            </div>
                        </div>
                    </div>

                    <div class="status-card" data-aos="fade-up" data-aos-delay="100">
                        <div class="status-header">
                            <h3><i class="fas fa-server"></i> Nexus-Core</h3>
                            <span class="badge badge-info" id="coreStatus">
                                <i class="fas fa-circle-notch fa-spin"></i> Checking...
                            </span>
                        </div>
                        <div class="status-info">
                            <div>
                                <strong>Latency</strong>
                                <p id="coreLatency">-</p>
                            </div>
                            <div>
                                <strong>Endpoint</strong>
                                <p style="font-size: 0.8125rem; word-break: break-all;">${CONFIG.API.CORE.split('//')[1]}</p>
                            </div>
                        </div>
                    </div>

                    <div class="status-card" data-aos="fade-up" data-aos-delay="200">
                        <div class="status-header">
                            <h3><i class="fas fa-server"></i> Synapse-Base</h3>
                            <span class="badge badge-info" id="baseStatus">
                                <i class="fas fa-circle-notch fa-spin"></i> Checking...
                            </span>
                        </div>
                        <div class="status-info">
                            <div>
                                <strong>Latency</strong>
                                <p id="baseLatency">-</p>
                            </div>
                            <div>
                                <strong>Endpoint</strong>
                                <p style="font-size: 0.8125rem; word-break: break-all;">${CONFIG.API.BASE.split('//')[1]}</p>
                            </div>
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
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        if (page === 'home') {
            setTimeout(() => this.renderHeroBoard(), 100);
        } else if (page === 'play') {
            setTimeout(() => ChessGame.init(), 100);
        } else if (page === 'arena') {
            setTimeout(() => Arena.init(), 100);
        } else if (page === 'docs') {
            this.loadDocs();
        } else if (page === 'api') {
            this.loadApiDocs();
        } else if (page === 'status') {
            setTimeout(() => StatusMonitor.checkAll(), 100);
        }
    },
    
    renderHeroBoard() {
        const board = document.getElementById('heroBoard');
        if (!board) return;
        
        // Clear any existing content
        board.innerHTML = '';
        
        const pieces = {
            '0-0': 'bR', '0-7': 'bR', '0-1': 'bN', '0-6': 'bN',
            '0-2': 'bB', '0-5': 'bB', '0-3': 'bQ', '0-4': 'bK',
            '1-0': 'bP', '1-1': 'bP', '1-2': 'bP', '1-3': 'bP',
            '1-4': 'bP', '1-5': 'bP', '1-6': 'bP', '1-7': 'bP',
            '6-0': 'wP', '6-1': 'wP', '6-2': 'wP', '6-3': 'wP',
            '6-4': 'wP', '6-5': 'wP', '6-6': 'wP', '6-7': 'wP',
            '7-0': 'wR', '7-7': 'wR', '7-1': 'wN', '7-6': 'wN',
            '7-2': 'wB', '7-5': 'wB', '7-3': 'wQ', '7-4': 'wK'
        };
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `board-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                
                const key = `${row}-${col}`;
                if (pieces[key]) {
                    const img = document.createElement('img');
                    img.className = 'chess-piece';
                    img.src = `assets/pieces/${pieces[key]}.svg`;
                    img.alt = pieces[key];
                    img.style.cssText = 'width: 70%; height: 70%; object-fit: contain;';
                    square.appendChild(img);
                }
                
                board.appendChild(square);
            }
        }
    },

    loadDocs() {
        if (typeof MarkdownRenderer !== 'undefined') {
            MarkdownRenderer.loadMarkdown(CONFIG.DOCS.GETTING_STARTED, 'docsContent');
        } else {
            $('#docsContent').html('<h1>Documentation Coming Soon</h1><p>Check back later for comprehensive documentation.</p>');
        }
    },

    loadApiDocs() {
        if (typeof MarkdownRenderer !== 'undefined') {
            MarkdownRenderer.loadMarkdown(CONFIG.DOCS.API_REFERENCE, 'apiContent');
        } else {
            $('#apiContent').html('<h1>API Documentation Coming Soon</h1><p>Check back later for API reference.</p>');
        }
    }
};
