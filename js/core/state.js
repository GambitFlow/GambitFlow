// Application State Management
const STATE = {
    // Current page
    currentPage: 'home',
    
    // Chess game state
    game: null,
    board: null,
    isThinking: false,
    moveHistory: [],
    
    // Selected model
    currentModel: 'core',
    
    // Player settings
    playerColor: 'white',
    
    // API status
    apiStatus: {
        nano: { online: false, latency: null },
        core: { online: false, latency: null },
        base: { online: false, latency: null }
    },
    
    // Last evaluation
    lastEvaluation: 0.0,
    
    // Game stats
    gameStats: {
        movesPlayed: 0,
        capturedPieces: { white: [], black: [] },
        timeElapsed: 0
    }
};

// State management functions
const StateManager = {
    // Get current state
    getState(key) {
        return key ? STATE[key] : STATE;
    },
    
    // Update state
    setState(key, value) {
        STATE[key] = value;
        this.notifyListeners(key, value);
    },
    
    // Update nested state
    updateState(key, updates) {
        if (typeof STATE[key] === 'object') {
            STATE[key] = { ...STATE[key], ...updates };
            this.notifyListeners(key, STATE[key]);
        }
    },
    
    // State listeners
    listeners: {},
    
    // Subscribe to state changes
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    },
    
    // Notify listeners
    notifyListeners(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    },
    
    // Reset game state
    resetGame() {
        STATE.game = null;
        STATE.board = null;
        STATE.isThinking = false;
        STATE.moveHistory = [];
        STATE.lastEvaluation = 0.0;
        STATE.gameStats = {
            movesPlayed: 0,
            capturedPieces: { white: [], black: [] },
            timeElapsed: 0
        };
    }
};