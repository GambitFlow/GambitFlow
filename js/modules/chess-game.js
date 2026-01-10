// Chess Game Module
const ChessGame = {
    // Initialize chess game
    init() {
        STATE.game = new Chess();
        
        const config = {
            draggable: true,
            position: 'start',
            onDragStart: this.onDragStart.bind(this),
            onDrop: this.onDrop.bind(this),
            onSnapEnd: this.onSnapEnd.bind(this),
            pieceTheme: (piece) => {
                return `${CONFIG.CHESS.PIECE_PATH}/${piece}.svg`;
            }
        };
        
        STATE.board = Chessboard('chessboard', config);
        this.updateStatus();
        this.updateMoveHistory();
    },

    // Handle drag start
    onDragStart(source, piece) {
        // Game over
        if (STATE.game.game_over()) return false;
        
        // AI is thinking
        if (STATE.isThinking) return false;
        
        // Check if it's player's turn
        const playerTurn = STATE.playerColor === 'white' ? 'w' : 'b';
        if (STATE.game.turn() !== playerTurn) return false;
        
        // Only allow dragging player's pieces
        if ((STATE.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (STATE.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    },

    // Handle piece drop
    onDrop(source, target) {
        // Try to make the move
        const move = STATE.game.move({
            from: source,
            to: target,
            promotion: 'q' // Always promote to queen for simplicity
        });
        
        // Invalid move
        if (move === null) return 'snapback';
        
        // Update UI
        this.updateStatus();
        this.updateMoveHistory();
        
        // Make AI move if game is not over
        if (!STATE.game.game_over()) {
            setTimeout(() => this.makeAIMove(), 500);
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
        $('#thinkingOverlay').addClass('active');
        
        try {
            const result = await APIClient.getMove(STATE.game.fen(), STATE.currentModel);
            
            if (result.success && result.data.best_move) {
                // Make the AI move
                STATE.game.move(result.data.best_move, { sloppy: true });
                STATE.board.position(STATE.game.fen());
                
                // Update evaluation
                if (result.data.evaluation !== undefined) {
                    STATE.lastEvaluation = result.data.evaluation;
                    $('#evaluation').text(APIClient.formatEvaluation(result.data.evaluation));
                }
                
                // Update UI
                this.updateStatus();
                this.updateMoveHistory();
            } else {
                alert('Error: Could not get AI move. Please try again.');
            }
            
        } catch (error) {
            console.error('AI Move Error:', error);
            alert('Error communicating with AI. Please try again.');
        } finally {
            STATE.isThinking = false;
            $('#thinkingOverlay').removeClass('active');
        }
    },

    // Update game status
    updateStatus() {
        let status = 'Your move';
        
        if (STATE.game.in_checkmate()) {
            status = STATE.game.turn() === 'w' ? 'Black wins by checkmate!' : 'White wins by checkmate!';
        } else if (STATE.game.in_draw()) {
            status = 'Game drawn';
        } else if (STATE.game.in_stalemate()) {
            status = 'Game drawn by stalemate';
        } else if (STATE.game.in_threefold_repetition()) {
            status = 'Game drawn by threefold repetition';
        } else if (STATE.game.insufficient_material()) {
            status = 'Game drawn by insufficient material';
        } else if (STATE.game.in_check()) {
            status = 'Check!';
        }
        
        $('#gameStatus').text(status);
    },

    // Update move history
    updateMoveHistory() {
        const history = STATE.game.history();
        let html = '';
        
        for (let i = 0; i < history.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            const white = history[i];
            const black = history[i + 1] || '';
            
            html += `<div style="padding: 0.25rem 0;">
                <strong>${moveNum}.</strong> ${white} ${black}
            </div>`;
        }
        
        $('#moveHistory').html(html);
        $('#moveHistory').scrollTop($('#moveHistory')[0].scrollHeight);
    },

    // Select AI model
    selectModel(model) {
        STATE.currentModel = model;
        
        $('.model-option').removeClass('active');
        $(`.model-option[data-model="${model}"]`).addClass('active');
    },

    // Set player color
    setColor(color) {
        STATE.playerColor = color;
        
        if (STATE.board) {
            STATE.board.orientation(color);
        }
        
        // If player chose black, make AI move first
        if (color === 'black' && STATE.game && !STATE.isThinking) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    },

    // Reset game
    resetGame() {
        if (STATE.game) {
            STATE.game.reset();
        }
        
        if (STATE.board) {
            STATE.board.start();
        }
        
        STATE.isThinking = false;
        STATE.lastEvaluation = 0;
        
        this.updateStatus();
        this.updateMoveHistory();
        
        $('#evaluation').text('0.00');
        $('#thinkingOverlay').removeClass('active');
        
        // If player is black, AI makes first move
        if (STATE.playerColor === 'black') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
};
