// Markdown Renderer Module
const MarkdownRenderer = {
    async loadMarkdown(url, targetId) {
        const target = $(`#${targetId}`);
        
        target.html(`
            <div style="text-align: center; padding: 3rem;">
                <div class="spinner"></div>
                <p style="margin-top: 1rem; color: var(--text-secondary);">Loading content...</p>
            </div>
        `);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to load');
            }
            
            const markdown = await response.text();
            const html = this.renderMarkdown(markdown);
            
            target.html(html);
            this.enhanceRenderedContent(target);
            
        } catch (error) {
            console.error('Markdown load error:', error);
            target.html(this.getDefaultContent(targetId));
        }
    },
    
    renderMarkdown(markdown) {
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                highlight: function(code, lang) {
                    return `<pre><code class="language-${lang}">${code}</code></pre>`;
                }
            });
            
            return marked.parse(markdown);
        }
        
        return this.basicMarkdownParse(markdown);
    },
    
    basicMarkdownParse(markdown) {
        let html = markdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\`(.*?)\`/gim, '<code>$1</code>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        return `<p>${html}</p>`;
    },
    
    enhanceRenderedContent(target) {
        target.find('pre code').each(function() {
            $(this).parent().css({
                'background': 'var(--bg-tertiary)',
                'padding': '1.5rem',
                'border-radius': 'var(--radius-lg)',
                'border': '1px solid var(--border)',
                'overflow-x': 'auto'
            });
        });
        
        target.find('code:not(pre code)').css({
            'background': 'var(--bg-tertiary)',
            'padding': '0.25rem 0.5rem',
            'border-radius': 'var(--radius-sm)',
            'color': 'var(--accent-cyan)',
            'border': '1px solid var(--border)',
            'font-size': '0.9em'
        });
        
        target.find('a').css({
            'color': 'var(--accent-blue)',
            'text-decoration': 'underline',
            'text-decoration-color': 'rgba(59, 130, 246, 0.3)'
        }).hover(
            function() { $(this).css('text-decoration-color', 'var(--accent-blue)'); },
            function() { $(this).css('text-decoration-color', 'rgba(59, 130, 246, 0.3)'); }
        );
        
        target.find('table').css({
            'width': '100%',
            'border-collapse': 'separate',
            'border-spacing': '0',
            'margin': '2rem 0',
            'border': '1px solid var(--border)',
            'border-radius': 'var(--radius-lg)',
            'overflow': 'hidden'
        });
        
        target.find('th, td').css({
            'padding': '1rem',
            'text-align': 'left',
            'border-bottom': '1px solid var(--border)'
        });
        
        target.find('th').css({
            'background': 'var(--bg-tertiary)',
            'font-weight': '600',
            'color': 'var(--text-primary)'
        });
        
        target.find('tr:last-child td').css('border-bottom', 'none');
        
        target.find('tr').hover(
            function() { $(this).css('background', 'rgba(59, 130, 246, 0.05)'); },
            function() { $(this).css('background', 'transparent'); }
        );
        
        target.find('blockquote').css({
            'border-left': '4px solid var(--accent-blue)',
            'padding-left': '1.5rem',
            'margin': '1.5rem 0',
            'color': 'var(--text-secondary)',
            'font-style': 'italic'
        });
        
        target.find('img').css({
            'max-width': '100%',
            'height': 'auto',
            'border-radius': 'var(--radius-lg)',
            'margin': '2rem 0'
        });
        
        target.find('ul, ol').css({
            'padding-left': '2rem',
            'margin': '1.5rem 0'
        });
        
        target.find('li').css({
            'margin-bottom': '0.875rem',
            'line-height': '1.7'
        });
        
        this.addCopyButtons(target);
    },
    
    addCopyButtons(target) {
        target.find('pre').each(function() {
            const pre = $(this);
            
            if (pre.find('.copy-btn').length > 0) return;
            
            const copyBtn = $(`
                <button class="copy-btn" style="
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    background: var(--accent-blue);
                    color: white;
                    border: none;
                    padding: 0.5rem 0.875rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    transition: var(--transition);
                    z-index: 10;
                ">
                    <i class="fas fa-copy"></i> Copy
                </button>
            `);
            
            pre.css('position', 'relative');
            pre.append(copyBtn);
            
            copyBtn.on('click', function() {
                const code = pre.find('code').text();
                
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.html('<i class="fas fa-check"></i> Copied!');
                    copyBtn.css('background', 'var(--accent-green)');
                    
                    setTimeout(() => {
                        copyBtn.html('<i class="fas fa-copy"></i> Copy');
                        copyBtn.css('background', 'var(--accent-blue)');
                    }, 2000);
                });
            });
            
            copyBtn.hover(
                function() { $(this).css('transform', 'translateY(-2px)'); },
                function() { $(this).css('transform', 'translateY(0)'); }
            );
        });
    },
    
    getDefaultContent(targetId) {
        if (targetId === 'docsContent') {
            return `
                <h1>📚 Getting Started with GambitFlow</h1>
                <p>Welcome to GambitFlow, a powerful chess AI platform powered by deep learning.</p>
                
                <h2>Quick Start</h2>
                <p>Follow these steps to start playing against our AI engines:</p>
                <ol>
                    <li>Navigate to the <a href="#play">Play</a> page</li>
                    <li>Select your preferred AI model (Nano, Core, or Base)</li>
                    <li>Choose your color (White or Black)</li>
                    <li>Make your moves and challenge the AI!</li>
                </ol>
                
                <h2>Available Models</h2>
                <h3>Nexus-Nano (Beginner)</h3>
                <p>Perfect for learning chess. ELO rating of approximately 1600.</p>
                <ul>
                    <li>Fast response times (&lt;2 seconds)</li>
                    <li>13 MB model size</li>
                    <li>Trained on 638K positions</li>
                </ul>
                
                <h3>Nexus-Core (Intermediate)</h3>
                <p>Balanced performance for competitive play. ELO rating around 2000.</p>
                <ul>
                    <li>Medium response times (&lt;3 seconds)</li>
                    <li>13 MB model size</li>
                    <li>Trained on 2.5M elite positions</li>
                </ul>
                
                <h3>Synapse-Base (Advanced)</h3>
                <p>Maximum strength with hybrid architecture. ELO rating of 2200+.</p>
                <ul>
                    <li>CNN + Transformer architecture</li>
                    <li>145 MB model size with 38M parameters</li>
                    <li>Trained on 2.5M elite positions</li>
                </ul>
                
                <h2>Features</h2>
                <ul>
                    <li><strong>Real-time Evaluation:</strong> See position assessment in real-time</li>
                    <li><strong>Move History:</strong> Track all moves in PGN format</li>
                    <li><strong>Arena Mode:</strong> Watch engines compete against each other</li>
                    <li><strong>Mobile Responsive:</strong> Play on any device</li>
                </ul>
                
                <h2>Tips for Better Play</h2>
                <ol>
                    <li>Start with Nexus-Nano if you're a beginner</li>
                    <li>Study the move history to learn from the AI</li>
                    <li>Pay attention to the evaluation score</li>
                    <li>Try the Arena mode to see different strategies</li>
                </ol>
                
                <h2>System Requirements</h2>
                <p>GambitFlow works on all modern browsers with JavaScript enabled.</p>
                
                <h2>Support</h2>
                <p>For issues or questions, check our <a href="https://github.com/GambitFlow" target="_blank">GitHub repository</a> or the <a href="#status">Status page</a> for service health.</p>
            `;
        } else if (targetId === 'apiContent') {
            return `
                <h1>🔌 API Reference</h1>
                <p>GambitFlow provides a REST API for integrating our chess engines into your applications.</p>
                
                <h2>Base URLs</h2>
                <pre><code>Nexus-Nano: ${CONFIG.API.NANO}
Nexus-Core: ${CONFIG.API.CORE}
Synapse-Base: ${CONFIG.API.BASE}</code></pre>
                
                <h2>Authentication</h2>
                <p>Currently, no authentication is required for API access.</p>
                
                <h2>Endpoints</h2>
                
                <h3>GET /health</h3>
                <p>Check the health status of the service.</p>
                <p><strong>Response:</strong></p>
                <pre><code>{
  "status": "healthy",
  "model": "nexus-core",
  "version": "1.0.0"
}</code></pre>
                
                <h3>POST /get-move</h3>
                <p>Get the best move for a given position.</p>
                <p><strong>Request Body:</strong></p>
                <pre><code>{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "depth": 5,
  "time_limit": 3000
}</code></pre>
                
                <p><strong>Response:</strong></p>
                <pre><code>{
  "best_move": "e2e4",
  "evaluation": 0.25,
  "depth": 5,
  "nodes": 125000,
  "time": 2450,
  "pv": ["e2e4", "e7e5", "g1f3"]
}</code></pre>
                
                <h2>Parameters</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>fen</code></td>
                            <td>string</td>
                            <td>Board position in FEN notation</td>
                        </tr>
                        <tr>
                            <td><code>depth</code></td>
                            <td>integer</td>
                            <td>Search depth (1-10)</td>
                        </tr>
                        <tr>
                            <td><code>time_limit</code></td>
                            <td>integer</td>
                            <td>Max thinking time in milliseconds</td>
                        </tr>
                    </tbody>
                </table>
                
                <h2>Example Usage</h2>
                
                <h3>JavaScript (Fetch API)</h3>
                <pre><code>const response = await fetch('${CONFIG.API.CORE}/get-move', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    depth: 5,
    time_limit: 3000
  })
});

const data = await response.json();
console.log('Best move:', data.best_move);</code></pre>
                
                <h3>Python (Requests)</h3>
                <pre><code>import requests

response = requests.post('${CONFIG.API.CORE}/get-move', json={
    'fen': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'depth': 5,
    'time_limit': 3000
})

data = response.json()
print(f"Best move: {data['best_move']}")</code></pre>
                
                <h2>Rate Limits</h2>
                <p>There are currently no rate limits, but please be respectful of the service.</p>
                
                <h2>Error Codes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>400</td>
                            <td>Invalid request parameters</td>
                        </tr>
                        <tr>
                            <td>500</td>
                            <td>Internal server error</td>
                        </tr>
                        <tr>
                            <td>503</td>
                            <td>Service temporarily unavailable</td>
                        </tr>
                    </tbody>
                </table>
                
                <h2>Support</h2>
                <p>For API support, visit our <a href="https://github.com/GambitFlow" target="_blank">GitHub repository</a>.</p>
            `;
        }
        
        return '<h1>Content Not Available</h1><p>Unable to load content at this time.</p>';
    }
};
