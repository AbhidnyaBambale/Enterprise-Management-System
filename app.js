// Modern Enterprise Management System JavaScript
class EnterpriseApp {
    constructor() {
        this.currentUser = {
            name: 'John Anderson',
            role: 'System Administrator',
            avatar: 'JA',
            notifications: 3
        };

        this.initializeApp();
    }

    initializeApp() {
        this.initializeCounters();
        this.initializeCharts();
        this.initializeInteractions();
        this.initializeDashboard();
        this.updateDateTime();
        
        // Update every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    initializeCounters() {
        // Animate KPI counters
        const counters = document.querySelectorAll('.kpi-value');
        counters.forEach(counter => {
            this.animateCounter(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original format
            const original = element.textContent;
            if (original.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (original.includes('$')) {
                element.textContent = '$' + this.formatNumber(Math.floor(current));
            } else if (original.includes('M')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (original.includes('K')) {
                element.textContent = (current / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    initializeCharts() {
        // Initialize Chart.js if available
        if (typeof Chart !== 'undefined') {
            this.createRevenueChart();
            this.createProjectChart();
            this.createCostChart();
        } else {
            // Fallback: create animated placeholder charts
            this.createPlaceholderCharts();
        }
    }

    createPlaceholderCharts() {
        const chartContainers = document.querySelectorAll('.chart-placeholder, [id$="Chart"]');
        chartContainers.forEach(container => {
            if (container.tagName.toLowerCase() === 'canvas') {
                this.drawPlaceholderChart(container);
            } else {
                container.innerHTML = this.createChartHTML();
            }
        });
    }

    drawPlaceholderChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0.1)');

        // Draw animated line chart
        ctx.beginPath();
        ctx.fillStyle = gradient;
        
        const points = [];
        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            const y = height - (Math.sin(i * 0.5) * 50 + Math.random() * 40 + 60);
            points.push({ x, y });
        }

        ctx.moveTo(0, height);
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.lineTo(point.x, point.y);
            } else {
                const prevPoint = points[index - 1];
                const cpx = (prevPoint.x + point.x) / 2;
                ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, (prevPoint.y + point.y) / 2);
            }
        });

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    }

    createChartHTML() {
        return `
            <div class="chart-placeholder-content" style="height: 200px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 8px; position: relative; overflow: hidden;">
                <div style="text-align: center; z-index: 2;">
                    <div style="font-size: 48px; color: #667eea; margin-bottom: 12px;">📊</div>
                    <div style="color: #4a5568; font-weight: 500;">Interactive Chart</div>
                    <div style="color: #718096; font-size: 14px; margin-top: 4px;">Data visualization ready</div>
                </div>
                <div class="chart-animation" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 49%, rgba(102, 126, 234, 0.1) 50%, transparent 51%); background-size: 30px 30px; animation: chartSlide 3s linear infinite;"></div>
            </div>
        `;
    }

    initializeInteractions() {
        // Navigation active state
        this.handleNavigation();
        
        // Button interactions
        this.initializeButtons();
        
        // Form interactions
        this.initializeForms();
        
        // Modal interactions
        this.initializeModals();
        
        // Table interactions
        this.initializeTables();
    }

    handleNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            const link = item.getAttribute('href') || item.querySelector('a')?.getAttribute('href');
            if (link && link.includes(currentPage)) {
                item.classList.add('active');
            }
            
            item.addEventListener('click', (e) => {
                if (!item.querySelector('a')) {
                    e.preventDefault();
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    initializeButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // Handle specific button actions
                this.handleButtonAction(button, e);
            });
        });
    }

    handleButtonAction(button, event) {
        const action = button.getAttribute('data-action');
        
        switch (action) {
            case 'new-project':
                this.showNewProjectModal();
                break;
            case 'export-data':
                this.exportData();
                break;
            case 'refresh-data':
                this.refreshDashboard();
                break;
            case 'ai-optimize':
                this.showAIOptimization();
                break;
            default:
                // Generic button feedback
                this.showToast('Action completed successfully!', 'success');
        }
    }

    initializeForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });

        // Input animations
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.showToast('Form submitted successfully!', 'success');
            
            // Reset form if needed
            form.reset();
        }, 1500);
    }

    initializeModals() {
        // Modal triggers
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Modal close buttons
        const closeButtons = document.querySelectorAll('.modal-close, .modal-overlay');
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target === button) {
                    this.closeModal(button.closest('.modal'));
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
        });
    }

    initializeTables() {
        const tables = document.querySelectorAll('.table');
        tables.forEach(table => {
            // Add row hover effects
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.addEventListener('click', () => {
                    rows.forEach(r => r.classList.remove('selected'));
                    row.classList.add('selected');
                });
            });

            // Add sorting functionality
            const headers = table.querySelectorAll('th[data-sortable]');
            headers.forEach(header => {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    this.sortTable(table, header);
                });
            });
        });
    }

    initializeDashboard() {
        // Real-time data simulation
        this.startDataSimulation();
        
        // Initialize dashboard widgets
        this.initializeWidgets();
        
        // Load dashboard data
        this.loadDashboardData();
    }

    startDataSimulation() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateKPIValues();
            this.updateAlerts();
        }, 30000);
    }

    updateKPIValues() {
        const kpiValues = document.querySelectorAll('.kpi-value');
        kpiValues.forEach(kpi => {
            const currentValue = parseInt(kpi.textContent.replace(/[^\d]/g, ''));
            const variation = Math.floor(Math.random() * 10) - 5; // ±5 variation
            const newValue = Math.max(0, currentValue + variation);
            
            // Animate to new value
            this.animateValueChange(kpi, newValue);
        });
    }

    animateValueChange(element, newValue) {
        const original = element.textContent;
        const currentValue = parseInt(original.replace(/[^\d]/g, ''));
        
        if (currentValue === newValue) return;
        
        const duration = 1000;
        const steps = 30;
        const increment = (newValue - currentValue) / steps;
        let current = currentValue;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                current = newValue;
                clearInterval(timer);
            }
            
            // Format based on original format
            if (original.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (original.includes('$')) {
                element.textContent = '$' + this.formatNumber(Math.floor(current));
            } else if (original.includes('M')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else {
                element.textContent = Math.floor(current);
            }
        }, duration / steps);
    }

    updateAlerts() {
        const alertsContainer = document.querySelector('.alerts-container');
        if (!alertsContainer) return;

        // Add new random alert
        if (Math.random() > 0.7) {
            const alerts = [
                { type: 'info', title: 'System Update', message: 'Automatic backup completed successfully.' },
                { type: 'warning', title: 'Resource Alert', message: 'Server usage is above 85%.' },
                { type: 'success', title: 'Task Completed', message: 'Monthly report has been generated.' }
            ];
            
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            this.showAlert(randomAlert.type, randomAlert.title, randomAlert.message);
        }
    }

    initializeWidgets() {
        // Progress bars animation
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width || bar.getAttribute('data-width') || '0%';
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });

        // Status badge interactions
        const statusBadges = document.querySelectorAll('.status-badge');
        statusBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.showStatusDetails(badge);
            });
        });
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        const loadingElements = document.querySelectorAll('.loading-placeholder');
        loadingElements.forEach(element => {
            setTimeout(() => {
                element.classList.remove('loading');
                element.classList.add('loaded');
            }, Math.random() * 2000 + 500);
        });
    }

    // Utility Methods
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    ${this.getToastIcon(type)}
                </div>
                <div class="toast-message">${message}</div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 4000);
        
        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
    }

    getToastIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    showAlert(type, title, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} animate-slide-up`;
        alert.innerHTML = `
            <div class="alert-icon">
                ${this.getAlertIcon(type)}
            </div>
            <div class="alert-content">
                <div class="alert-title">${title}</div>
                <div class="alert-message">${message}</div>
            </div>
            <button class="alert-close">&times;</button>
        `;
        
        const alertsContainer = document.querySelector('.alerts-container') || document.body;
        alertsContainer.appendChild(alert);
        
        alert.querySelector('.alert-close').addEventListener('click', () => {
            alert.remove();
        });
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 6000);
    }

    getAlertIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-triangle"></i>',
            warning: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || icons.info;
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    }

    sortTable(table, header) {
        const columnIndex = Array.from(header.parentElement.children).indexOf(header);
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const isAscending = !header.classList.contains('sort-desc');
        
        rows.sort((a, b) => {
            const aVal = a.children[columnIndex].textContent.trim();
            const bVal = b.children[columnIndex].textContent.trim();
            
            if (!isNaN(aVal) && !isNaN(bVal)) {
                return isAscending ? parseFloat(aVal) - parseFloat(bVal) : parseFloat(bVal) - parseFloat(aVal);
            }
            
            return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });
        
        const tbody = table.querySelector('tbody');
        rows.forEach(row => tbody.appendChild(row));
        
        // Update header classes
        table.querySelectorAll('th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
        header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
    }

    updateDateTime() {
        const dateTimeElement = document.querySelector('.current-datetime');
        if (dateTimeElement) {
            const now = new Date();
            dateTimeElement.textContent = now.toLocaleString();
        }
    }

    refreshDashboard() {
        this.showToast('Dashboard refreshing...', 'info');
        
        // Simulate refresh
        setTimeout(() => {
            this.updateKPIValues();
            this.showToast('Dashboard updated successfully!', 'success');
        }, 1500);
    }

    exportData() {
        this.showToast('Preparing export...', 'info');
        
        setTimeout(() => {
            this.showToast('Data exported successfully!', 'success');
        }, 2000);
    }

    showNewProjectModal() {
        // This would open a modal for creating new projects
        this.showToast('New Project modal opening...', 'info');
    }

    showAIOptimization() {
        this.showToast('AI optimization analysis running...', 'info');
        
        setTimeout(() => {
            this.showToast('AI optimization suggestions ready!', 'success');
        }, 3000);
    }

    showStatusDetails(badge) {
        const status = badge.textContent.trim();
        this.showToast(`Showing details for ${status} items`, 'info');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enterpriseApp = new EnterpriseApp();
});

// Add toast styles to document
const toastStyles = `
<style>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    min-width: 300px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-left: 4px solid;
}

.toast.show {
    transform: translateX(0);
}

.toast-success { border-left-color: #48bb78; }
.toast-error { border-left-color: #f56565; }
.toast-warning { border-left-color: #ed8936; }
.toast-info { border-left-color: #4299e1; }

.toast-content {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 12px;
}

.toast-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
}

.toast-success .toast-icon { background: #48bb78; }
.toast-error .toast-icon { background: #f56565; }
.toast-warning .toast-icon { background: #ed8936; }
.toast-info .toast-icon { background: #4299e1; }

.toast-message {
    flex: 1;
    font-weight: 500;
    color: #2d3748;
}

.toast-close {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #718096;
    padding: 0;
    width: 24px;
    height: 24px;
}

@keyframes chartSlide {
    0% { background-position: 0 0; }
    100% { background-position: 60px 60px; }
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
    align-items: center;
    justify-content: center;
}

.modal.show {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

body.modal-open {
    overflow: hidden;
}

.selected {
    background: rgba(102, 126, 234, 0.1) !important;
}

.sort-asc::after {
    content: ' ↑';
}

.sort-desc::after {
    content: ' ↓';
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', toastStyles);