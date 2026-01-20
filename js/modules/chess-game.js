// Enhanced Chess Game Module
const ChessGame = {
    gameStarted: false,
    gameStartTime: null,
    timeInterval: null,
    soundEnabled: true,
    
    // Initialize chess game
    init() {
        this.gameStarted = false;
        this.showColorSelection();
    },
    
    // Start game with selected color
    startGame(color) {
        STATE.playerColor = color;
        this.gameStarted = true;
        
        STATE.game = new Chess();
        
        const config = {
            draggable: true,
            position: 'start',
            onDragStart: this.onDragStart.bind(this),
            onDrop: this.onDrop.bind(this),
            onSnapEnd: this.onSnapEnd.bind(this),
            orientation: color,
            pieceTheme: function(piece) {
                return 'assets/pieces/' + piece + '.svg';
            }
        };
        
        STATE.board = Chessboard('chessboard', config);
        
        $(window).resize(() => {
            if (STATE.board) STATE.board.resize();
        });
        
        this.gameStartTime = Date.now();
        this.startTimer();
        this.updateStatus();
        this.updateMoveHistory();
        this.updateMoveCount();
        
        if (color === 'black') {
            setTimeout(() => this.makeAIMove(), 800);
        }
    },

    // Show color selection
    showColorSelection() {
        // Create modal if it doesn't exist
        if (!$('#colorModal').length) {
            const modal = $(`
                <div class="color-selection-modal" id="colorModal">
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
            `);
            $('body').append(modal);
        }
        $('#colorModal').addClass('active');
    },

    // Handle drag start
    onDragStart(source, piece) {
        if (!this.gameStarted) return false;
        if (STATE.game.game_over()) return false;
        if (STATE.isThinking) return false;
        
        const playerTurn = STATE.playerColor === 'white' ? 'w' : 'b';
        if (STATE.game.turn() !== playerTurn) return false;
        
        if ((STATE.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (STATE.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    },

    // Handle piece drop
    onDrop(source, target) {
        const move = STATE.game.move({
            from: source,
            to: target,
            promotion: 'q'
        });
        
        if (move === null) return 'snapback';
        
        if (this.soundEnabled) this.playSound('move');
        
        this.updateStatus();
        this.updateMoveHistory();
        this.updateMoveCount();
        
        if (!STATE.game.game_over()) {
            setTimeout(() => this.makeAIMove(), 500);
        } else {
            if (this.soundEnabled) this.playSound('gameEnd');
        }
    },

    // Update board position
    onSnapEnd() {
        STATE.board.position(STATE.game.fen());
    },

    // Make AI move
    async makeAIMove() {
        if (STATE.isThinking || STATE.game.game_over()) return;
        
        STATE.isThinking = true;
        $('#thinkingIndicator').addClass('active');
        
        try {
            const result = await APIClient.getMove(STATE.game.fen(), STATE.currentModel);
            
            if (result.success && result.data.best_move) {
                STATE.game.move(result.data.best_move, { sloppy: true });
                STATE.board.position(STATE.game.fen());
                
                if (this.soundEnabled) this.playSound('move');
                
                if (result.data.evaluation !== undefined) {
                    STATE.lastEvaluation = result.data.evaluation;
                    $('#evaluation').text(APIClient.formatEvaluation(result.data.evaluation));
                }
                
                this.updateStatus();
                this.updateMoveHistory();
                this.updateMoveCount();
                
                if (STATE.game.game_over() && this.soundEnabled) {
                    this.playSound('gameEnd');
                }
            } else {
                this.showError('Could not get AI move. Please try again.');
            }
            
        } catch (error) {
            console.error('AI Move Error:', error);
            this.showError('Error communicating with AI. Please try again.');
        } finally {
            STATE.isThinking = false;
            $('#thinkingIndicator').removeClass('active');
        }
    },

    // Update game status
    updateStatus() {
        let status = 'Your move';
        let statusColor = 'var(--text-primary)';
        
        if (STATE.game.in_checkmate()) {
            status = STATE.game.turn() === 'w' ? '🏆 Black wins by checkmate!' : '🏆 White wins by checkmate!';
            statusColor = 'var(--accent-green)';
            this.stopTimer();
        } else if (STATE.game.in_draw()) {
            status = '🤝 Game drawn';
            statusColor = 'var(--accent-orange)';
            this.stopTimer();
        } else if (STATE.game.in_stalemate()) {
            status = '🤝 Game drawn by stalemate';
            statusColor = 'var(--accent-orange)';
            this.stopTimer();
        } else if (STATE.game.in_threefold_repetition()) {
            status = '🤝 Game drawn by repetition';
            statusColor = 'var(--accent-orange)';
            this.stopTimer();
        } else if (STATE.game.insufficient_material()) {
            status = '🤝 Game drawn by insufficient material';
            statusColor = 'var(--accent-orange)';
            this.stopTimer();
        } else if (STATE.game.in_check()) {
            status = '⚠️ Check!';
            statusColor = 'var(--accent-red)';
        } else if (STATE.isThinking) {
            status = '🤖 AI is thinking...';
            statusColor = 'var(--accent-blue)';
        }
        
        $('#gameStatus').text(status).css('color', statusColor);
    },

    // Update move history with PGN table
    updateMoveHistory() {
        const history = STATE.game.history();
        let html = '';
        
        for (let i = 0; i < history.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            const white = history[i];
            const black = history[i + 1] || '';
            
            html += `<tr>
                <td class="move-num">${moveNum}</td>
                <td class="move-white">${white}</td>
                <td class="move-black">${black}</td>
            </tr>`;
        }
        
        $('#moveHistory').html(html);
        
        const container = $('.move-history-container');
        container.scrollTop(container[0].scrollHeight);
    },

    // Update move count
    updateMoveCount() {
        const moveCount = STATE.game.history().length;
        $('#moveCount').text(moveCount);
    },

    // Start game timer
    startTimer() {
        this.timeInterval = setInterval(() => {
            const elapsed = Date.now() - this.gameStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            $('#gameTime').text(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    },

    // Stop game timer
    stopTimer() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    },

    // Select AI model
    selectModel(model) {
        STATE.currentModel = model;
        
        $('.model-option').removeClass('active');
        $(`.model-option[data-model="${model}"]`).addClass('active');
    },

    // Undo last move
    undoMove() {
        if (!this.gameStarted || STATE.isThinking) return;
        
        // Undo player move and AI move
        STATE.game.undo();
        STATE.game.undo();
        STATE.board.position(STATE.game.fen());
        
        this.updateStatus();
        this.updateMoveHistory();
        this.updateMoveCount();
    },

    // Flip board
    flipBoard() {
        if (!this.gameStarted) return;
        STATE.board.flip();
    },

    // Get hint
    async hint() {
        if (!this.gameStarted || STATE.isThinking || STATE.game.game_over()) return;
        
        const playerTurn = STATE.playerColor === 'white' ? 'w' : 'b';
        if (STATE.game.turn() !== playerTurn) return;
        
        STATE.isThinking = true;
        $('#thinkingIndicator').addClass('active');
        
        try {
            const result = await APIClient.getMove(STATE.game.fen(), STATE.currentModel);
            
            if (result.success && result.data.best_move) {
                alert(`Hint: ${result.data.best_move}`);
            }
        } catch (error) {
            this.showError('Could not get hint');
        } finally {
            STATE.isThinking = false;
            $('#thinkingIndicator').removeClass('active');
        }
    },

    // Analyze position
    async analyzePosition() {
        if (!this.gameStarted) return;
        
        const fen = STATE.game.fen();
        const result = await APIClient.getMove(fen, STATE.currentModel);
        
        if (result.success) {
            alert(`Position Analysis:\nBest Move: ${result.data.best_move}\nEvaluation: ${APIClient.formatEvaluation(result.data.evaluation)}`);
        }
    },

    // Download PGN
    downloadPGN() {
        if (!this.gameStarted) return;
        
        const pgn = STATE.game.pgn();
        const blob = new Blob([pgn], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'game.pgn';
        a.click();
        URL.revokeObjectURL(url);
    },

    // Share game
    shareGame() {
        if (!this.gameStarted) return;
        
        const fen = STATE.game.fen();
        const url = `${window.location.origin}${window.location.pathname}?fen=${encodeURIComponent(fen)}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'GambitFlow Chess Game',
                text: 'Check out my chess game!',
                url: url
            });
        } else {
            navigator.clipboard.writeText(url);
            alert('Game link copied to clipboard!');
        }
    },

    // Toggle sound
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        $('#soundStatus').text(this.soundEnabled ? 'On' : 'Off');
    },

    // Play sound
    playSound(type) {
        // Sound implementation would go here
        // For now, just a placeholder
    },

    // Reset game
    resetGame() {
        if (!this.gameStarted) {
            this.init();
            return;
        }
        
        if (confirm('Are you sure you want to start a new game?')) {
            this.stopTimer();
            STATE.game.reset();
            STATE.board.start();
            STATE.isThinking = false;
            STATE.lastEvaluation = 0;
            
            this.gameStartTime = Date.now();
            this.startTimer();
            this.updateStatus();
            this.updateMoveHistory();
            this.updateMoveCount();
            
            $('#evaluation').text('0.00');
            $('#thinkingIndicator').removeClass('active');
            
            if (STATE.playerColor === 'black') {
                setTimeout(() => this.makeAIMove(), 800);
            }
        }
    },
    
    showError(message) {
        const errorDiv = $(`
            <div style="position: fixed; top: 100px; right: 20px; background: var(--accent-red); 
                        color: white; padding: 1rem 1.5rem; border-radius: var(--radius-lg); 
                        box-shadow: var(--shadow-xl); z-index: 9999; animation: slideInRight 0.3s ease;">
                <i class="fas fa-exclamation-circle"></i> ${message}
            </div>
        `);
        
        $('body').append(errorDiv);
        
        setTimeout(() => {
            errorDiv.fadeOut(300, function() { $(this).remove(); });
        }, 4000);
    }
};
