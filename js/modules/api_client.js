// API Client Module
const APIClient = {
    // Get best move from AI
    async getMove(fen, model = 'core') {
        const modelConfig = CONFIG.MODELS[model];
        
        try {
            const response = await fetch(`${modelConfig.endpoint}/get-move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fen: fen,
                    depth: modelConfig.maxDepth,
                    time_limit: modelConfig.defaultTimeLimit
                }),
                timeout: CONFIG.TIMEOUTS.API_REQUEST
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return {
                success: true,
                data: data
            };

        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Health check for a model
    async healthCheck(model) {
        const modelConfig = CONFIG.MODELS[model];
        const startTime = Date.now();

        try {
            const response = await fetch(`${modelConfig.endpoint}/health`, {
                method: 'GET',
                timeout: CONFIG.TIMEOUTS.HEALTH_CHECK
            });

            const latency = Date.now() - startTime;

            if (response.ok) {
                return {
                    online: true,
                    latency: latency,
                    status: response.status
                };
            } else {
                return {
                    online: false,
                    latency: null,
                    status: response.status
                };
            }

        } catch (error) {
            return {
                online: false,
                latency: null,
                error: error.message
            };
        }
    },

    // Batch health check for all models
    async healthCheckAll() {
        const results = {};
        
        for (const model of ['nano', 'core', 'base']) {
            results[model] = await this.healthCheck(model);
        }
        
        return results;
    },

    // Get model information
    getModelInfo(model) {
        return CONFIG.MODELS[model] || null;
    },

    // Validate FEN string
    isValidFEN(fen) {
        try {
            new Chess(fen);
            return true;
        } catch (error) {
            return false;
        }
    },

    // Format evaluation score
    formatEvaluation(score) {
        if (typeof score !== 'number') return '0.00';
        
        // Convert to centipawns if needed
        const formatted = Math.abs(score) > 10 ? score / 100 : score;
        const sign = score > 0 ? '+' : '';
        
        return sign + formatted.toFixed(2);
    },

    // Format time in milliseconds to readable format
    formatTime(ms) {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    },

    // Format nodes per second
    formatNPS(nps) {
        if (nps >= 1000000) {
            return `${(nps / 1000000).toFixed(2)}M nps`;
        } else if (nps >= 1000) {
            return `${(nps / 1000).toFixed(2)}K nps`;
        }
        return `${nps} nps`;
    }
};