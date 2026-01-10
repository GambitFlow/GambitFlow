// GambitFlow Configuration
const CONFIG = {
    API: {
        NANO: 'https://gambitflow-nexus-nano-inference-api.hf.space',
        CORE: 'https://gambitflow-nexus-core-inference-api.hf.space',
        BASE: 'https://gambitflow-synapse-base-inference-api.hf.space'
    },
    
    MODELS: {
        nano: {
            name: 'Nexus-Nano',
            description: 'Perfect for learning and casual play',
            endpoint: 'https://gambitflow-nexus-nano-inference-api.hf.space',
            huggingface: 'https://huggingface.co/GambitFlow/Nexus-Nano',
            dataset: 'https://huggingface.co/datasets/GambitFlow/Starter-Data',
            maxDepth: 4,
            defaultTimeLimit: 2000,
            elo: 1600,
            size: '13 MB',
            trainingData: '638K positions',
            level: 'beginner'
        },
        core: {
            name: 'Nexus-Core',
            description: 'Balanced power and performance',
            endpoint: 'https://gambitflow-nexus-core-inference-api.hf.space',
            huggingface: 'https://huggingface.co/GambitFlow/Nexus-Core',
            dataset: 'https://huggingface.co/datasets/GambitFlow/Elite-Data',
            maxDepth: 5,
            defaultTimeLimit: 3000,
            elo: 2000,
            size: '13 MB',
            trainingData: '2.5M positions',
            level: 'intermediate'
        },
        base: {
            name: 'Synapse-Base',
            description: 'Maximum strength with hybrid architecture',
            endpoint: 'https://gambitflow-synapse-base-inference-api.hf.space',
            huggingface: 'https://huggingface.co/GambitFlow/Synapse-Base',
            dataset: 'https://huggingface.co/datasets/GambitFlow/Elite-Data',
            maxDepth: 6,
            defaultTimeLimit: 5000,
            elo: 2200,
            size: '145 MB',
            trainingData: '2.5M positions',
            parameters: '38M',
            architecture: 'CNN + Transformer',
            level: 'advanced'
        }
    },

    CHESS: {
        PIECE_PATH: 'assets/pieces',
        DEFAULT_POSITION: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    },

    DOCS: {
        GETTING_STARTED: 'docs/getting-started.md',
        API_REFERENCE: 'docs/api-reference.md',
        MODELS: 'docs/models.md',
        EXAMPLES: 'docs/examples.md'
    },

    TIMEOUTS: {
        API_REQUEST: 30000,
        HEALTH_CHECK: 10000
    }
};