# GambitFlow - Advanced Chess AI

Professional chess AI platform powered by deep learning neural networks. Play against three different difficulty levels of chess engines trained on millions of master games.

## 🎯 Features

- **Three AI Models**: Nexus-Nano, Nexus-Core, Synapse-Base 
- **Real-time Analysis**: Instant position evaluation and move suggestions
- **Modern UI**: Professional dark-themed interface with smooth animations
- **Comprehensive Docs**: Full documentation and API reference
- **System Monitoring**: Real-time health checks and latency monitoring

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/GambitFlow/GambitFlow.git
cd GambitFlow
```

2. Add chess piece SVG files to `assets/pieces/`:
   - White pieces: `wP.svg`, `wN.svg`, `wB.svg`, `wR.svg`, `wQ.svg`, `wK.svg`
   - Black pieces: `bP.svg`, `bN.svg`, `bB.svg`, `bR.svg`, `bQ.svg`, `bK.svg`

3. Deploy to Render.com:
   - Create a new Static Site
   - Connect your GitHub repository
   - Build Command: (leave empty)
   - Publish Directory: `.`

## 📁 Project Structure

```
GambitFlow/
├── assets/
│   └── pieces/          # Chess piece SVG files
├── css/
│   ├── base.css         # Base styles and variables
│   ├── components.css   # Component styles
│   ├── pages.css        # Page-specific styles
│   └── animations.css   # Animation definitions
├── js/
│   ├── core/
│   │   ├── config.js    # Configuration
│   │   ├── state.js     # State management
│   │   └── router.js    # Routing and page templates
│   ├── modules/
│   │   ├── api-client.js     # API communication
│   │   ├── chess-game.js     # Chess game logic
│   │   └── status-monitor.js # Service monitoring
│   └── main.js          # Application entry point
├── docs/                # Markdown documentation
├── index.html           # Main HTML file
└── README.md

```

## 🎮 AI Models

### Nexus-Nano
- **Level**: Beginner
- **ELO**: ~1600 (Estimated)
- **Size**: 13 MB
- **Depth**: 4
- **Training Data**: 638K positions
- **Response Time**: <2s

### Nexus-Core
- **Level**: Intermediate
- **ELO**: ~2000 (Estimated)
- **Size**: 13 MB
- **Depth**: 5
- **Training Data**: 2.5M positions
- **Response Time**: <3s

### Synapse-Base
- **Level**: Advanced
- **ELO**: ~2200 (Estimated)
- **Size**: 145 MB
- **Parameters**: 38M
- **Architecture**: CNN + Transformer
- **Training Data**: 2.5M positions
- **Response Time**: <5s

## 🔌 API Endpoints

All models expose the same API interface:

### POST /get-move

Request:
```json
{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "depth": 5,
  "time_limit": 3000
}
```

Response:
```json
{
  "best_move": "e2e4",
  "evaluation": 0.25,
  "depth_searched": 5,
  "seldepth": 7,
  "nodes_evaluated": 125000,
  "time_taken": 1500,
  "nps": 83333,
  "pv": ["e2e4", "e7e5", "Ng1f3"],
  "tt_hit_rate": 0.65
}
```

### GET /health

Check service health status.

## 🌐 API Base URLs

- **Nexus-Nano**: https://gambitflow-nexus-nano-inference-api.hf.space
- **Nexus-Core**: https://gambitflow-nexus-core-inference-api.hf.space
- **Synapse-Base**: https://gambitflow-synapse-base-inference-api.hf.space

## 🛠️ Development

### Prerequisites
- Modern web browser
- Text editor
- Git

### Local Development
1. Open `index.html` in a web browser
2. For live reload, use a local server:
```bash
python -m http.server 8000
# or
npx serve
```

### Code Style
- Modular architecture with separation of concerns
- CSS organized by purpose (base, components, pages, animations)
- JavaScript modules for different functionality
- Consistent naming conventions

## 📚 Documentation

Visit the `/docs` page in the application or check the `docs/` directory for:
- Getting Started Guide
- API Reference
- Model Documentation
- Usage Examples

## 🔄 Branching Strategy

- **compact**: Production-ready minified code
- **master**: Main development branch (readable code)
- **test**: Testing and feature integration

## 📝 License

All rights reserved © 2025 GambitFlow

## 🤝 Contributing

This is a personal project. Feel free to fork and modify for your own use.

## 📧 Contact

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using PyTorch, JavaScript, and modern web technologies.
