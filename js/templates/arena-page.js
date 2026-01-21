// Arena Page Template
const ArenaPageTemplate = `
    <div class="arena-page fade-in">
        <div class="container">
            <div class="arena-header">
                <h1 class="section-title gradient-text"><i class="fas fa-trophy"></i> Engine Arena</h1>
                <p>Watch our AI engines compete with detailed benchmarks and statistics</p>
            </div>

            <div class="arena-controls">
                <div class="arena-controls-grid">
                    <div>
                        <label>White Engine</label>
                        <select id="whiteEngine" class="form-select">
                            <option value="nano">Nexus-Nano</option>
                            <option value="core" selected>Nexus-Core</option>
                            <option value="base">Synapse-Base</option>
                        </select>
                    </div>
                    <div class="arena-exchange-icon">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    <div>
                        <label>Black Engine</label>
                        <select id="blackEngine" class="form-select">
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

            <div class="arena-layout">
                <div class="arena-board-section">
                    <div class="arena-player-info">
                        <span class="badge badge-info">White</span>
                        <h3 class="arena-player-name" id="whitePlayerName">Nexus-Core</h3>
                    </div>
                    
                    <div class="arena-board-container">
                        <div id="arenaBoard"></div>
                    </div>
                    
                    <div class="arena-player-info">
                        <span class="badge badge-info">Black</span>
                        <h3 class="arena-player-name" id="blackPlayerName">Synapse-Base</h3>
                    </div>
                    
                    <div class="arena-status-card">
                        <h4 class="arena-card-title"><i class="fas fa-info-circle"></i> Match Status</h4>
                        <div id="arenaStatus">Select engines and start the match</div>
                    </div>
                </div>

                <div class="arena-sidebar">
                    <div class="arena-stats-card">
                        <h4 class="arena-card-title"><i class="fas fa-chart-bar"></i> Live Benchmarks</h4>
                        <div id="benchmarkStats"></div>
                    </div>

                    <div class="arena-log-card">
                        <h4 class="arena-card-title"><i class="fas fa-list"></i> Move Log</h4>
                        <div id="arenaMoveLog"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
