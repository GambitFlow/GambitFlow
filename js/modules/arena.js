// Arena Module - Engine vs Engine
const Arena = {
    game: null,
    board: null,
    isPlaying: false,
    whiteEngine: 'core',
    blackEngine: 'base',
    moveLog: [],
    benchmarks: {
        white: { totalTime: 0, moves: 0, avgTime: 0 },
        black: { totalTime: 0, moves: 0, avgTime: 0 }
    },
    
    init() {
        this.game = new Chess();
        
        const config = {
            draggable: false,
            position: 'start',
            pieceTheme: function(piece) {
                return 'assets/pieces/' + piece + '.svg';
            }
        };
        
        this.board = Chessboard('arenaBoard', config);
        
        $(window).resize(() => {
            if (this.board) this.board.resize();
        });
        
        // Initialize engine selections
        this.whiteEngine = $('#whiteEngine').val() || 'core';
        this.blackEngine = $('#blackEngine').val() || 'base';
        
        // Add change listeners
        $('#whiteEngine').on('change', (e) => {
            this.whiteEngine = e.target.value;
        });
        
        $('#blackEngine').on('change', (e) => {
            this.blackEngine = e.target.value;
        });
        
        this.updateBenchmarks();
    },
    
    async startMatch() {
        if (this.isPlaying) {
            alert('Match already in progress!');
            return;
        }
        
        this.whiteEngine = $('#whiteEngine').val();
        this.blackEngine = $('#blackEngine').val();
        
        if (this.whiteEngine === this.blackEngine) {
            alert('Please select different engines!');
            return;
        }
        
        this.isPlaying = true;
        this.game.reset();
        this.board.start();
        this.moveLog = [];
        this.benchmarks = {
            white: { totalTime: 0, moves: 0, avgTime: 0 },
            black: { totalTime: 0, moves: 0, avgTime: 0 }
        };
        
        $('#whitePlayerName').text(CONFIG.MODELS[this.whiteEngine].name);
        $('#blackPlayerName').text(CONFIG.MODELS[this.blackEngine].name);
        
        $('#arenaStatus').html(`
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="spinner spinner-sm"></div>
                <span style="color: #e2e8f0;">Match in progress...</span>
            </div>
        `);
        
        this.updateMoveLog();
        this.updateBenchmarks();
        
        await this.playMatch();
    },
    
    async playMatch() {
        while (!this.game.game_over() && this.isPlaying) {
            const currentPlayer = this.game.turn() === 'w' ? 'white' : 'black';
            const engine = currentPlayer === 'white' ? this.whiteEngine : this.blackEngine;
            
            this.updateStatus(`${CONFIG.MODELS[engine].name} is thinking...`, currentPlayer);
            
            const startTime = Date.now();
            const result = await APIClient.getMove(this.game.fen(), engine);
            const endTime = Date.now();
            const thinkTime = endTime - startTime;
            
            if (result.success && result.data.best_move) {
                const move = this.game.move(result.data.best_move, { sloppy: true });
                this.board.position(this.game.fen());
                
                this.benchmarks[currentPlayer].totalTime += thinkTime;
                this.benchmarks[currentPlayer].moves++;
                this.benchmarks[currentPlayer].avgTime = 
                    this.benchmarks[currentPlayer].totalTime / this.benchmarks[currentPlayer].moves;
                
                this.moveLog.push({
                    moveNum: Math.ceil(this.moveLog.length / 2) + 1,
                    player: currentPlayer,
                    move: move.san,
                    time: thinkTime,
                    evaluation: result.data.evaluation || 0
                });
                
                this.updateMoveLog();
                this.updateBenchmarks();
                
                await this.sleep(500);
            } else {
                this.endMatch('Error occurred');
                return;
            }
        }
        
        if (this.game.game_over()) {
            this.endMatch(this.getGameResult());
        }
    },
    
    endMatch(result) {
        this.isPlaying = false;
        
        let resultHTML = `<div style="text-align: center; padding: 1.5rem;">`;
        
        if (this.game.in_checkmate()) {
            const winner = this.game.turn() === 'w' ? 'Black' : 'White';
            const winnerEngine = winner === 'White' ? this.whiteEngine : this.blackEngine;
            resultHTML += `
                <i class="fas fa-trophy fa-3x" style="color: var(--accent-green); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--accent-green); margin-bottom: 0.5rem;">
                    ${CONFIG.MODELS[winnerEngine].name} wins!
                </h3>
                <p style="color: #e2e8f0;">by checkmate</p>
            `;
        } else if (this.game.in_draw()) {
            resultHTML += `
                <i class="fas fa-handshake fa-3x" style="color: var(--accent-orange); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--accent-orange); margin-bottom: 0.5rem;">Draw!</h3>
                <p style="color: #e2e8f0;">${result}</p>
            `;
        } else {
            resultHTML += `
                <i class="fas fa-exclamation-triangle fa-3x" style="color: var(--accent-red); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--accent-red);">${result}</h3>
            `;
        }
        
        resultHTML += `</div>`;
        $('#arenaStatus').html(resultHTML);
    },
    
    getGameResult() {
        if (this.game.in_checkmate()) {
            return this.game.turn() === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate';
        } else if (this.game.in_stalemate()) {
            return 'Stalemate';
        } else if (this.game.in_threefold_repetition()) {
            return 'Draw by repetition';
        } else if (this.game.insufficient_material()) {
            return 'Draw by insufficient material';
        }
        return 'Game over';
    },
    
    updateStatus(message, player) {
        $('#arenaStatus').html(`
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="spinner spinner-sm"></div>
                <span style="color: #e2e8f0;">${message}</span>
            </div>
        `);
    },
    
    updateMoveLog() {
        let html = '';
        
        for (let i = 0; i < this.moveLog.length; i++) {
            const log = this.moveLog[i];
            const icon = log.player === 'white' ? '○' : '●';
            const moveDisplay = log.player === 'white' ? 
                `${log.moveNum}. ${log.move}` : `${log.moveNum}... ${log.move}`;
            
            html += `
                <div style="padding: 0.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #e2e8f0;">${icon} ${moveDisplay}</span>
                    <span style="color: #cbd5e1; font-size: 0.75rem;">${log.time}ms</span>
                </div>
            `;
        }
        
        $('#arenaMoveLog').html(html);
        $('#arenaMoveLog').scrollTop($('#arenaMoveLog')[0].scrollHeight);
    },
    
    updateBenchmarks() {
        const whiteStats = this.benchmarks.white;
        const blackStats = this.benchmarks.black;
        
        const html = `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: #ffffff;">
                        <i class="fas fa-chess-king" style="color: white;"></i> ${CONFIG.MODELS[this.whiteEngine].name}
                    </strong>
                </div>
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
                        <div>
                            <span style="color: #cbd5e1;">Moves:</span>
                            <strong style="color: var(--accent-blue); margin-left: 0.5rem;">${whiteStats.moves}</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">Total Time:</span>
                            <strong style="color: var(--accent-cyan); margin-left: 0.5rem;">${(whiteStats.totalTime / 1000).toFixed(2)}s</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">Avg Time:</span>
                            <strong style="color: var(--accent-green); margin-left: 0.5rem;">${whiteStats.avgTime.toFixed(0)}ms</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">ELO:</span>
                            <strong style="color: var(--accent-orange); margin-left: 0.5rem;">${CONFIG.MODELS[this.whiteEngine].elo}</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin: 1.5rem 0; color: #cbd5e1;">
                <i class="fas fa-exchange-alt"></i>
            </div>
            
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: #ffffff;">
                        <i class="fas fa-chess-king" style="color: black; background: white; border-radius: 50%; padding: 2px;"></i> ${CONFIG.MODELS[this.blackEngine].name}
                    </strong>
                </div>
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
                        <div>
                            <span style="color: #cbd5e1;">Moves:</span>
                            <strong style="color: var(--accent-blue); margin-left: 0.5rem;">${blackStats.moves}</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">Total Time:</span>
                            <strong style="color: var(--accent-cyan); margin-left: 0.5rem;">${(blackStats.totalTime / 1000).toFixed(2)}s</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">Avg Time:</span>
                            <strong style="color: var(--accent-green); margin-left: 0.5rem;">${blackStats.avgTime.toFixed(0)}ms</strong>
                        </div>
                        <div>
                            <span style="color: #cbd5e1;">ELO:</span>
                            <strong style="color: var(--accent-orange); margin-left: 0.5rem;">${CONFIG.MODELS[this.blackEngine].elo}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#benchmarkStats').html(html);
    },
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
