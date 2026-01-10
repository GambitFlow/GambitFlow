// Status Monitor Module
const StatusMonitor = {
    // Check all services
    async checkAll() {
        const models = ['nano', 'core', 'base'];
        
        for (const model of models) {
            await this.checkModel(model);
        }
    },

    // Check individual model
    async checkModel(model) {
        const statusEl = $(`#${model}Status`);
        const latencyEl = $(`#${model}Latency`);
        
        statusEl.removeClass('badge-success badge-error');
        statusEl.addClass('badge-info');
        statusEl.text('Checking...');
        
        try {
            const result = await APIClient.healthCheck(model);
            
            if (result.online) {
                statusEl.removeClass('badge-info badge-error');
                statusEl.addClass('badge-success');
                statusEl.text('Online');
                latencyEl.text(`${result.latency}ms`);
                
                // Update state
                STATE.apiStatus[model] = {
                    online: true,
                    latency: result.latency
                };
            } else {
                statusEl.removeClass('badge-info badge-success');
                statusEl.addClass('badge-error');
                statusEl.text('Offline');
                latencyEl.text('N/A');
                
                // Update state
                STATE.apiStatus[model] = {
                    online: false,
                    latency: null
                };
            }
            
        } catch (error) {
            console.error(`Error checking ${model}:`, error);
            
            statusEl.removeClass('badge-info badge-success');
            statusEl.addClass('badge-error');
            statusEl.text('Error');
            latencyEl.text('N/A');
            
            STATE.apiStatus[model] = {
                online: false,
                latency: null
            };
        }
    },

    // Start periodic monitoring
    startMonitoring(interval = 60000) {
        this.checkAll();
        
        setInterval(() => {
            if (STATE.currentPage === 'status') {
                this.checkAll();
            }
        }, interval);
    },

    // Get current status
    getStatus(model) {
        return STATE.apiStatus[model];
    },

    // Check if all services are online
    allOnline() {
        return Object.values(STATE.apiStatus).every(status => status.online);
    },

    // Get average latency
    getAverageLatency() {
        const latencies = Object.values(STATE.apiStatus)
            .filter(s => s.online && s.latency)
            .map(s => s.latency);
        
        if (latencies.length === 0) return null;
        
        return latencies.reduce((a, b) => a + b, 0) / latencies.length;
    }
};
