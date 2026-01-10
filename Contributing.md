# Contributing to GambitFlow

Thank you for your interest in contributing to GambitFlow! This document provides guidelines and instructions for contributing.

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template**
3. **Provide details**:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. **Search existing feature requests**
2. **Use the feature request template**
3. **Explain the use case clearly**
4. **Consider implementation complexity**

### Code Contributions

## 🌿 Branching Strategy

```
main (production-ready, readable code)
  ├── test (integration testing)
  │   ├── f1 (feature 1)
  │   ├── f2 (feature 2)
  │   └── bugfix-xyz
  └── compact (auto-generated minified code)
```

### Workflow

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/GambitFlow/GambitFlow.git
   cd GambitFlow
   ```

3. **Create feature branch from test**
   ```bash
   git checkout test
   git pull origin test
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow coding standards
   - Write clean, documented code
   - Test thoroughly

5. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add new chess variant support"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Base: `test` branch
   - Title: Clear, descriptive
   - Description: What, why, how

## 📝 Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: formatting, no code change
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

**Examples:**
```bash
feat: add move analysis panel
fix: resolve chess piece rendering issue
docs: update API documentation
style: format CSS files
refactor: optimize chess game module
```

## 🎨 Coding Standards

### HTML
- Semantic markup
- Proper indentation (2 spaces)
- Descriptive IDs and classes
- Accessibility attributes

### CSS
- BEM naming convention for custom classes
- Organize by: base → components → pages → animations
- Use CSS variables for colors/spacing
- Mobile-first responsive design

### JavaScript
- ES6+ syntax
- Modular architecture
- Clear function names
- JSDoc comments for complex functions
- No jQuery for new code (use vanilla JS)

### File Organization
```
- New CSS: appropriate file in css/
- New JS module: js/modules/
- New page: add to router.js PAGES object
- New docs: docs/ directory
```

## 🧪 Testing Guidelines

### Before Submitting PR

1. **Test in multiple browsers**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Test responsive design**
   - Desktop (1920px+)
   - Tablet (768px-1024px)
   - Mobile (320px-767px)

3. **Check functionality**
   - All navigation works
   - Chess game plays correctly
   - API calls succeed
   - No console errors

4. **Validate code**
   - No syntax errors
   - No broken links
   - Assets load properly

## 📁 Project Structure

```
GambitFlow/
├── index.html          # Main entry point
├── css/
│   ├── base.css        # Variables, resets
│   ├── components.css  # Reusable components
│   ├── pages.css       # Page layouts
│   └── animations.css  # Animations
├── js/
│   ├── core/          # Core functionality
│   ├── modules/       # Feature modules
│   └── main.js        # Initialization
├── assets/            # Static files
├── docs/              # Documentation
└── .github/           # GitHub config
```

## 🔍 Code Review Process

1. **Automated checks run** (CI/CD pipeline)
2. **Maintainers review code**
3. **Feedback provided** (if needed)
4. **Approved PRs merged to test**
5. **After testing, merged to main**
6. **Compact branch auto-updated**

## 🚀 Release Process

1. Features merged to `test` branch
2. Thorough testing performed
3. Approved features merged to `main`
4. CI/CD creates compact version
5. Version tagged (v1.1.0, etc.)
6. Release notes published
7. Deployed to production

## 💡 Development Tips

### Local Setup
```bash
# Serve locally
python -m http.server 8000
# or
npx serve

# Watch for changes
npx live-server
```

### Debugging
- Use browser DevTools
- Check console for errors
- Monitor network requests
- Test API endpoints separately

### Performance
- Minimize HTTP requests
- Optimize images
- Use CSS/JS minification
- Leverage browser caching

## 🎯 Priority Areas

We're especially interested in contributions for:

- [ ] Additional chess variants
- [ ] Improved AI analysis display
- [ ] Mobile app version
- [ ] Internationalization (i18n)
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Documentation improvements

## 📚 Resources

- [Chess Programming Wiki](https://www.chessprogramming.org/)
- [Chess.js Documentation](https://github.com/jhlywa/chess.js)
- [Chessboard.js Documentation](https://chessboardjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## ❓ Questions?

- Open a [GitHub Discussion](../../discussions)
- Check existing [Issues](../../issues)
- Review [Documentation](../../wiki)

## 📄 License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.

## 🙏 Thank You!

Your contributions make GambitFlow better for everyone. We appreciate your time and effort!

---

**Happy Contributing! ♟️**
