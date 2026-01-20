// Play Page Template
const PlayPageTemplate = `
    <div class="play-page fade-in">
        <div class="container">
            <div class="play-header">
                <div>
                    <h1><i class="fas fa-chess"></i> Play Against AI</h1>
                    <p>Challenge our neural network engines</p>
                </div>
                <div class="play-header-actions">
                    <button class="btn btn-secondary" onclick="ChessGame.resetGame()">
                        <i class="fas fa-redo"></i> New Game
                    </button>
                    <button class="btn btn-secondary" onclick="ChessGame.undoMove()">
                        <i class="fas fa-undo"></i> Undo
                    </button>
                    <button class="btn btn-secondary" onclick="ChessGame.flipBoard()">
                        <i class="fas fa-sync"></i> Flip
                    </button>
                    <button class="btn btn-secondary" onclick="ChessGame.downloadPGN()">
                        <i class="fas fa-download"></i> PGN
                    </button>
                </div>
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
                    
                    <div class="sidebar-card">
                        <div class="card-header"><i class="fas fa-cog"></i> Game Settings</div>
                        <div style="padding: 1.5rem;">
                            <button class="btn btn-outline w-100" onclick="ChessGame.showColorSelection()" style="margin-bottom: 0.75rem;">
                                <i class="fas fa-palette"></i> Change Color
                            </button>
                            <button class="btn btn-outline w-100" onclick="ChessGame.toggleSound()">
                                <i class="fas fa-volume-up"></i> Sound: <span id="soundStatus">On</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <div>
                    <div class="board-wrapper">
                        <div id="chessboard"></div>
                    </div>

                    <div class="game-controls">
                        <button class="btn btn-primary" onclick="ChessGame.hint()">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="btn btn-secondary" onclick="ChessGame.analyzePosition()">
                            <i class="fas fa-chart-line"></i> Analyze
                        </button>
                        <button class="btn btn-secondary" onclick="ChessGame.shareGame()">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>

                    <div class="card game-info-grid" style="margin-top: 1.5rem;">
                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value" id="gameStatus">Ready</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Evaluation</div>
                            <div class="info-value" id="evaluation" style="color: var(--accent-blue);">0.00</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Moves</div>
                            <div class="info-value" id="moveCount">0</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Time</div>
                            <div class="info-value" id="gameTime">0:00</div>
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
    </div>
`;
