# Changelog

All notable changes to GambitFlow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.2.1] - 22-1-2026

### Added - Enhanced Play Page & Neural Network Background

#### Play Page Enhancements
- **New Game Controls:**
  - Undo Move button - Take back your last move
  - Flip Board button - Rotate board perspective
  - Hint System - Get AI move suggestions
  - Position Analysis - Deep position evaluation with detailed stats
  - Share Game - Share game via URL or social media
  - Download PGN - Export game in standard PGN format
  - Sound Toggle - Enable/disable game sounds

- **Enhanced Game Information Display:**
  - Real-time game timer with minutes:seconds format
  - Move counter showing total moves played
  - Improved game status indicators with emojis
  - Better evaluation score display
  - Professional Google-style layout with info cards

- **Settings Panel:**
  - Change color mid-game option
  - Sound on/off toggle with status indicator
  - Quick access to game settings

#### Neural Network Background (THREE.js)
- **3D Animated Background:**
  - Beautiful 3D particle system using THREE.js
  - 100 animated nodes on desktop, 50 on mobile
  - Dynamic connection lines between nearby particles
  - Smooth GPU-accelerated animations
  - Increased opacity to 0.5 (from 0.15) for better visibility
  - Additive blending for glowing effects
  - Automatic performance optimization for mobile devices

- **Visual Enhancements:**
  - Particles with glow effects
  - Distance-based connection opacity
  - Slow rotation animation for depth perception
  - Responsive particle count based on device
  - Enhanced gradient overlays (15% opacity)

#### Mobile Responsiveness
- **Arena Page Optimization:**
  - Single column layout on mobile
  - Stacked engine selectors
  - Full-width board display
  - Touch-friendly controls
  - Optimized stats display

- **Play Page Mobile:**
  - Responsive button grid layout
  - Stacked sidebars on mobile
  - Full-width chessboard
  - Touch-optimized controls
  - Proper spacing for mobile screens

### Fixed - Modal & UI Issues

#### Color Selection Modal
- Fixed modal appearing immediately on Play page load
- Modal now only shows when clicking "New Game" button
- Modal properly closes after color selection
- Added smooth fade-in/fade-out animations
- Improved modal backdrop with backdrop-filter blur

#### Game Flow
- Disabled board dragging until color is selected
- Fixed game state initialization
- Proper timer start/stop on game events
- Correct move counter updates
- Better game status messaging

#### Performance
- Optimized THREE.js rendering for mobile
- Reduced particle count on mobile devices
- GPU-accelerated animations
- Efficient connection line updates
- Proper cleanup on page navigation

### Changed - Modular Architecture

#### CSS Structure
- Split pages.css into modular files:
  - `css/pages/home.css` - Home page styles
  - `css/pages/play.css` - Play page styles (enhanced)
  - `css/pages/arena.css` - Arena page styles (mobile responsive)
  - `css/pages/models.css` - Models page styles
  - `css/pages/docs.css` - Documentation styles
  - `css/pages/status.css` - Status page styles
- Main `css/pages.css` now imports all page-specific styles
- Added `css/neural-network-bg.css` for background styles

#### JavaScript Structure
- Created `js/templates/` directory:
  - `play-page.js` - Play page HTML template
  - `arena-page.js` - Arena page HTML template
- Enhanced `js/modules/chess-game.js` with new features
- Added `js/modules/neural-network-bg.js` with THREE.js implementation
- Updated `js/core/router.js` to use external templates

#### File Organization
```
css/
  └── pages/          # Page-specific styles
      ├── home.css
      ├── play.css
      ├── arena.css
      ├── models.css
      ├── docs.css
      └── status.css

js/
  ├── templates/      # HTML templates
  │   ├── play-page.js
  │   └── arena-page.js
  └── modules/        # Feature modules
      ├── neural-network-bg.js (NEW)
      └── chess-game.js (ENHANCED)
```

### Technical Details

#### Dependencies
- THREE.js r128 added for 3D graphics
- All existing dependencies maintained
- No breaking changes to API

#### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅ (optimized)

#### Performance Metrics
- Neural network: ~60 FPS on desktop
- Neural network: ~30 FPS on mobile
- Page load time: <2s
- Chess board render: <100ms

---

## [1.1.0] - 10-1-2026

### Added - Initial Release

#### Core Features
- Separate files for different tasks

---

## [1.0.0] - 9-1-2026

### Added - Initial Release

#### Core Features
- Prototype, single html css and js file
- Three AI difficulty levels (Nano, Core, Base)
- Interactive chess board with drag-and-drop
- Real-time position evaluation
- Move history tracking
- Responsive design (desktop, tablet, mobile)

#### AI Models
- **Nexus-Nano**: Beginner level 
  - 13 MB model size
  - Search depth: 4
  - Training: 638K positions
  - Response time: <2s

- **Nexus-Core**: Intermediate level 
  - 13 MB model size
  - Search depth: 5
  - Training: 2.5M positions
  - Response time: <3s

- **Synapse-Base**: Advanced level 
  - 145 MB model size
  - 38M parameters
  - CNN + Transformer architecture
  - Search depth: 6
  - Training: 2.5M positions
  - Response time: <5s

#### User Interface
- Modern dark theme with professional color scheme
- Smooth animations and transitions
- Intuitive navigation
- Mobile-responsive layout
- Status monitoring page
- Interactive documentation

#### Documentation
- Comprehensive README
- Getting Started guide
- Complete API reference
- Deployment instructions
- Contributing guidelines

#### Technical
- Single files
- No build process required
- CDN-based dependencies
- GPL-3.0 license

#### API Integration
- RESTful API client
- Health check monitoring
- Error handling and retry logic
- Evaluation formatting utilities
- FEN validation

---

## Version History

### Semantic Versioning Scheme

- **MAJOR** (1.x.x): Breaking changes, major redesigns
- **MINOR** (x.1.x): New features, backwards compatible
- **PATCH** (x.x.1): Bug fixes, minor improvements

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to this changelog and the project.

---

[1.0.0]: https://github.com/GambitFlow/GambitFlow/releases/tag/v1.0.0
[1.1.0]: https://github.com/GambitFlow/GambitFlow/releases/tag/v1.1.0
[1.2.1]: https://github.com/GambitFlow/GambitFlow/releases/tag/v1.2.1
