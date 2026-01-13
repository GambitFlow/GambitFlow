// Chess Game Module
const ChessGame = {
    gameStarted: false,
    
    // Initialize chess game
    init() {
        this.gameStarted = false;
        $('#colorModal').addClass('active');
    },
    
    // Start game with selected color
    startGame(color) {
        STATE.playerColor = color;
        this.gameStarted = true;
        $('#colorModal').removeClass('active');
        
        STATE.game = new Chess();
        
        const config = {
            draggable: true,
            position: 'start',
            onDragStart: this.onDragStart.bind(this),
            onDrop: this.onDrop.bind(this),
            onSnapEnd: this.onSnapEnd.bind(this),
            onDragMove: this.onDragMove.bind(this),
            orientation: color,
            pieceTheme: function(piece) {
                return 'assets/pieces/' + piece + '.svg';
            }
        };
        
        STATE.board = Chessboard('chessboard', config);
        
        $(window).resize(() => {
            if (STATE.board) STATE.board.resize();
        });
        
        this.updateStatus();
        this.updateMoveHistory();
        
        if (color === 'black') {
            setTimeout(() => this.makeAIMove(), 800);
        }
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
        
        // Prevent body scroll on mobile
        $('body').addClass('dragging');
    },

    // Handle drag move
    onDragMove() {
        // Keep body scroll disabled while dragging
        if (!$('body').hasClass('dragging')) {
            $('body').addClass('dragging');
        }
    },

    // Handle piece drop
    onDrop(source, target) {
        // Re-enable body scroll
        $('body').removeClass('dragging');
        
        const move = STATE.game.move({
            from: source,
            to: target,
            promotion: 'q'
        });
        
        if (move === null) return 'snapback';
        
        this.updateStatus();
        this.updateMoveHistory();
        
        if (!STATE.game.game_over()) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    },

    // Update board position
    onSnapEnd() {
        STATE.board.position(STATE.game.fen());
        // Ensure body scroll is re-enabled
        $('body').removeClass('dragging');
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
                
                if (result.data.evaluation !== undefined) {
                    STATE.lastEvaluation = result.data.evaluation;
                    $('#evaluation').text(APIClient.formatEvaluation(result.data.evaluation));
                }
                
                this.updateStatus();
                this.updateMoveHistory();
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
        } else if (STATE.game.in_draw()) {
            status = '🤝 Game drawn';
            statusColor = 'var(--accent-orange)';
        } else if (STATE.game.in_stalemate()) {
            status = '🤝 Game drawn by stalemate';
            statusColor = 'var(--accent-orange)';
        } else if (STATE.game.in_threefold_repetition()) {
            status = '🤝 Game drawn by repetition';
            statusColor = 'var(--accent-orange)';
        } else if (STATE.game.insufficient_material()) {
            status = '🤝 Game drawn by insufficient material';
            statusColor = 'var(--accent-orange)';
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

    // Select AI model
    selectModel(model) {
        STATE.currentModel = model;
        
        $('.model-option').removeClass('active');
        $(`.model-option[data-model="${model}"]`).addClass('active');
    },

    // Reset game
    resetGame() {
        if (!this.gameStarted) {
            this.init();
            return;
        }
        
        if (confirm('Are you sure you want to start a new game?')) {
            STATE.game.reset();
            STATE.board.start();
            STATE.isThinking = false;
            STATE.lastEvaluation = 0;
            
            this.updateStatus();
            this.updateMoveHistory();
            
            $('#evaluation').text('0.00');
            $('#thinkingIndicator').removeClass('active');
            $('body').removeClass('dragging');
            
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
