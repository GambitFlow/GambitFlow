# Changelog

All notable changes to GambitFlow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


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


## [1.1.0] - 10-1-2026

### Added - Initial Release

#### Core Features
- Separate files for different tasks

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
