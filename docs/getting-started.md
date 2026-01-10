# Getting Started with GambitFlow

Welcome to GambitFlow! This guide will help you get started with our advanced chess AI platform.

## Quick Start

The fastest way to use GambitFlow is through our web interface:

1. Visit the [Play page](https://gambitflow.onrender.com/#play)
2. Select your preferred AI opponent (Nano, Core, or Base)
3. Choose your color (White or Black)
4. Start playing!

## Choosing Your Opponent

### Nexus-Nano (Beginner - 1600 ELO)
Perfect for:
- Learning chess fundamentals
- Casual play
- Teaching beginners
- Quick games

**Specs:**
- Response time: <2 seconds
- Search depth: 4 plies
- Model size: 13 MB
- Training data: 638K positions

### Nexus-Core (Intermediate - 2000 ELO)
Ideal for:
- Intermediate players
- Tactical training
- Balanced challenge
- Club-level play

**Specs:**
- Response time: <3 seconds
- Search depth: 5 plies
- Model size: 13 MB
- Training data: 2.5M positions

### Synapse-Base (Advanced - 2200 ELO)
Designed for:
- Advanced players
- Serious competition
- Deep analysis
- Master-level challenge

**Specs:**
- Response time: <5 seconds
- Search depth: 6+ plies
- Model size: 145 MB
- Architecture: CNN + Transformer
- Parameters: 38M
- Training data: 2.5M elite positions

## Game Controls

### Making Moves
- **Drag and drop** pieces to make moves
- Invalid moves will automatically snap back
- Promotion is automatic (always promotes to Queen)

### Game Status
The status bar shows:
- Current game state (your move, check, checkmate, etc.)
- Position evaluation (-∞ to +∞, where positive favors White)

### Move History
- View all moves played in algebraic notation
- Scroll through the game history
- Auto-scrolls to latest move

### Starting a New Game
Click the "New Game" button to reset the board and start fresh.

## Understanding Evaluation

The evaluation score shows the position assessment:
- **+0.00**: Equal position
- **+1.00**: White is up about a pawn
- **+3.00**: White has a significant advantage
- **-1.00**: Black is up about a pawn
- **Negative values**: Black is better

## Tips for Best Experience

1. **Start with Nano** if you're new to chess or AI opponents
2. **Use Core** for balanced, competitive games
3. **Challenge Base** when you want maximum difficulty
4. **Watch the evaluation** to understand position strength
5. **Study the move history** to improve your play

## Next Steps

- Explore the [Models page](#models) for detailed specifications
- Check the [API documentation](#api) to integrate GambitFlow into your projects
- Monitor [system status](#status) to see real-time performance

## Need Help?

If you encounter issues:
1. Check the [Status page](#status) to ensure services are online
2. Try refreshing the page
3. Switch to a different model if one is unavailable
4. Report persistent issues on our GitHub repository

Happy playing!
