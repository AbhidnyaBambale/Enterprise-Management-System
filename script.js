// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeCharts();
    addInteractivity();
});

// Initialize the application
function initializeApp() {
    // Module navigation
    const navItems = document.querySelectorAll('.nav-item');
    const moduleContents = document.querySelectorAll('.module-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetModule = item.dataset.module;
            
            // Update navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update content
            moduleContents.forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(targetModule);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    console.log('Enterprise Management System POC initialized');
}

// Initialize charts and visualizations
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        createRevenueChart(revenueCtx);
    }
    
    // Animate KPI cards
    animateKPIs();
}

// Create revenue chart
function createRevenueChart(ctx) {
    // Simulate chart rendering (in real implementation, use Chart.js or similar)
    const chartContainer = ctx.parentElement;
    chartContainer.innerHTML = `
        <div style="position: relative; height: 200px; display: flex; align-items: end; justify-content: space-around; padding: 20px;">
            <div style="background: #3498db; width: 30px; height: 60%; border-radius: 4px 4px 0 0; position: relative;">
                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: #666;">Jan</span>
                <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #333;">$1.8M</span>
            </div>
            <div style="background: #3498db; width: 30px; height: 70%; border-radius: 4px 4px 0 0; position: relative;">
                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: #666;">Feb</span>
                <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #333;">$1.95M</span>
            </div>
            <div style="background: #27ae60; width: 30px; height: 85%; border-radius: 4px 4px 0 0; position: relative;">
                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: #666;">Mar</span>
                <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #333;">$2.1M</span>
            </div>
            <div style="background: #e74c3c; width: 30px; height: 50%; border-radius: 4px 4px 0 0; opacity: 0.5; position: relative;">
                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: #666;">Apr</span>
                <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #999;">$2.3M*</span>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 0.8rem; color: #666;">
            <i class="fas fa-brain"></i> AI Forecast: 15% growth projected for Q2
        </div>
    `;
}

// Animate KPI values
function animateKPIs() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    
    kpiValues.forEach(value => {
        const originalText = value.textContent;
        const numericValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
        
        if (numericValue) {
            animateNumber(value, 0, numericValue, originalText);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, originalText) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (end - start) * easeOutQuart(progress);
        
        // Format the number based on original text format
        if (originalText.includes('$')) {
            if (originalText.includes('M')) {
                element.textContent = `$${(currentValue).toFixed(1)}M`;
            } else {
                element.textContent = `$${Math.round(currentValue)}`;
            }
        } else if (originalText.includes('%')) {
            element.textContent = `${currentValue.toFixed(1)}%`;
        } else {
            element.textContent = Math.round(currentValue).toString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing function
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Add interactive features
function addInteractivity() {
    // Project card interactions
    addProjectCardInteractions();
    
    // AI recommendation interactions
    addAIRecommendationInteractions();
    
    // Mobile app simulation
    addMobileAppInteractions();
    
    // Real-time updates simulation
    simulateRealTimeUpdates();
}

// Project card interactions
function addProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects for project actions
        const actionButtons = card.querySelectorAll('.btn-icon');
        
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const icon = button.querySelector('i');
                if (icon.classList.contains('fa-eye')) {
                    showProjectDetails(card);
                } else if (icon.classList.contains('fa-edit')) {
                    editProject(card);
                } else if (icon.classList.contains('fa-chart-bar')) {
                    showProjectAnalytics(card);
                } else if (icon.classList.contains('fa-exclamation')) {
                    handleEmergencyAlert(card);
                }
            });
        });
    });
}

// Show project details modal (simulated)
function showProjectDetails(card) {
    const projectTitle = card.querySelector('.project-header h3').textContent;
    showNotification(`Viewing details for: ${projectTitle}`, 'info');
}

// Edit project (simulated)
function editProject(card) {
    const projectTitle = card.querySelector('.project-header h3').textContent;
    showNotification(`Edit mode activated for: ${projectTitle}`, 'info');
}

// Show project analytics (simulated)
function showProjectAnalytics(card) {
    const projectTitle = card.querySelector('.project-header h3').textContent;
    showNotification(`Loading analytics dashboard for: ${projectTitle}`, 'info');
}

// Handle emergency alerts
function handleEmergencyAlert(card) {
    const projectTitle = card.querySelector('.project-header h3').textContent;
    showNotification(`Emergency alert escalated for: ${projectTitle}`, 'warning');
}

// AI recommendation interactions
function addAIRecommendationInteractions() {
    const applyButtons = document.querySelectorAll('.ai-recommendations-panel .btn-primary');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const recommendation = button.closest('.recommendation-item');
            const title = recommendation.querySelector('strong').textContent;
            
            // Simulate applying recommendation
            button.textContent = 'Applying...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Applied';
                button.style.background = '#27ae60';
                showNotification(`AI Recommendation Applied: ${title}`, 'success');
            }, 2000);
        });
    });
}

// Mobile app interactions
function addMobileAppInteractions() {
    const mobileFrame = document.querySelector('.mobile-frame');
    if (!mobileFrame) return;
    
    // Clock in/out button
    const clockButton = mobileFrame.querySelector('.btn-success');
    if (clockButton) {
        clockButton.addEventListener('click', () => {
            const isClockingOut = clockButton.textContent.includes('Clock Out');
            
            if (isClockingOut) {
                clockButton.innerHTML = '<i class="fas fa-play"></i> Clock In';
                clockButton.classList.remove('btn-success');
                clockButton.classList.add('btn-primary');
                showNotification('Clocked out successfully', 'success');
                updateTimesheet();
            } else {
                clockButton.innerHTML = '<i class="fas fa-pause"></i> Clock Out';
                clockButton.classList.remove('btn-primary');
                clockButton.classList.add('btn-success');
                showNotification('Clocked in successfully', 'success');
            }
        });
    }
    
    // Action buttons
    const actionButtons = mobileFrame.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const actionType = button.querySelector('span').textContent;
            showNotification(`${actionType} feature activated`, 'info');
            
            // Simulate different actions
            if (actionType === 'Photo') {
                simulateCameraAction();
            } else if (actionType === 'Materials') {
                simulateMaterialsLogging();
            }
        });
    });
}

// Simulate camera action
function simulateCameraAction() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 9999;
    `;
    notification.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-camera" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>Camera activated - Photo captured and linked to project</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Simulate materials logging
function simulateMaterialsLogging() {
    const currentStat = document.querySelector('.stat-value:last-child');
    if (currentStat) {
        const currentValue = parseInt(currentStat.textContent.replace('$', ''));
        const newValue = currentValue + Math.floor(Math.random() * 50) + 25;
        currentStat.textContent = `$${newValue}`;
    }
}

// Update timesheet after clock out
function updateTimesheet() {
    const hoursElement = document.querySelector('.stat-value');
    if (hoursElement && hoursElement.textContent.includes('h')) {
        const currentHours = parseFloat(hoursElement.textContent);
        const newHours = Math.round((currentHours + 0.5) * 10) / 10;
        hoursElement.textContent = `${newHours}h`;
    }
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Update active staff count every 30 seconds
    setInterval(() => {
        const staffElement = document.querySelector('.kpi-value');
        if (staffElement) {
            const currentValue = parseInt(staffElement.textContent);
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const newValue = Math.max(580, currentValue + change);
            animateNumber(staffElement, currentValue, newValue, newValue.toString());
        }
    }, 30000);
    
    // Add new alerts periodically
    setInterval(() => {
        addRandomAlert();
    }, 45000);
}

// Add random alert
function addRandomAlert() {
    const alertsContainer = document.querySelector('.alerts-widget');
    if (!alertsContainer) return;
    
    const alerts = [
        {
            type: 'info',
            icon: 'fas fa-info-circle',
            title: 'New Project Assignment Available',
            message: 'AI identified optimal staffing for upcoming maintenance project.'
        },
        {
            type: 'warning',
            icon: 'fas fa-clock',
            title: 'Material Delivery Delay',
            message: 'Supplier notification: 2-day delay for Project XYZ materials.'
        },
        {
            type: 'critical',
            icon: 'fas fa-exclamation-triangle',
            title: 'Safety Incident Reported',
            message: 'Minor incident at Site C - immediate supervisor review required.'
        }
    ];
    
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    const alertElement = document.createElement('div');
    alertElement.className = `alert-item ${randomAlert.type}`;
    alertElement.innerHTML = `
        <i class="${randomAlert.icon}"></i>
        <div>
            <strong>${randomAlert.title}</strong>
            <p>${randomAlert.message}</p>
        </div>
    `;
    
    // Add with animation
    alertElement.style.opacity = '0';
    alertElement.style.transform = 'translateY(-10px)';
    
    alertsContainer.appendChild(alertElement);
    
    // Animate in
    setTimeout(() => {
        alertElement.style.transition = 'all 0.3s ease';
        alertElement.style.opacity = '1';
        alertElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove old alerts if too many
    const allAlerts = alertsContainer.querySelectorAll('.alert-item');
    if (allAlerts.length > 5) {
        const oldestAlert = allAlerts[1]; // Keep the first one as it's likely static
        oldestAlert.style.transition = 'all 0.3s ease';
        oldestAlert.style.opacity = '0';
        oldestAlert.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            if (oldestAlert.parentNode) {
                oldestAlert.parentNode.removeChild(oldestAlert);
            }
        }, 300);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add some advanced features for demonstration
document.addEventListener('keydown', function(e) {
    // Demo mode shortcuts
    if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
            case 'D':
                e.preventDefault();
                toggleDemoMode();
                break;
            case 'A':
                e.preventDefault();
                showAIInsights();
                break;
            case 'R':
                e.preventDefault();
                generateRandomData();
                break;
        }
    }
});

// Toggle demo mode with enhanced features
function toggleDemoMode() {
    const body = document.body;
    
    if (body.classList.contains('demo-mode')) {
        body.classList.remove('demo-mode');
        showNotification('Demo mode disabled', 'info');
    } else {
        body.classList.add('demo-mode');
        showNotification('Demo mode enabled - Enhanced features active', 'success');
        startDemoAnimations();
    }
}

// Start demo animations
function startDemoAnimations() {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        let direction = 1;
        
        setInterval(() => {
            if (document.body.classList.contains('demo-mode')) {
                const newWidth = currentWidth + (Math.random() * 2 - 1);
                bar.style.width = Math.max(10, Math.min(100, newWidth)) + '%';
            }
        }, 3000);
    });
}

// Show AI insights modal
function showAIInsights() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
            <h3 style="color: #2c3e50; margin-bottom: 20px;">
                <i class="fas fa-brain" style="color: #9b59b6;"></i> AI Insights Dashboard
            </h3>
            <div style="margin-bottom: 15px;">
                <strong>Predictive Analytics:</strong>
                <p style="color: #7f8c8d; margin: 5px 0;">Forecasting 18% increase in project demand next quarter based on historical patterns.</p>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Resource Optimization:</strong>
                <p style="color: #7f8c8d; margin: 5px 0;">AI suggests reallocating 12 staff members to improve overall efficiency by 24%.</p>
            </div>
            <div style="margin-bottom: 20px;">
                <strong>Cost Optimization:</strong>
                <p style="color: #7f8c8d; margin: 5px 0;">Identified $127,000 potential savings through automated scheduling optimization.</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Generate random data for demonstration
function generateRandomData() {
    showNotification('Generating random data for demonstration...', 'info');
    
    // Update KPI values
    setTimeout(() => {
        animateKPIs();
        showNotification('Data updated successfully', 'success');
    }, 1000);
}

console.log('Enterprise Management System POC - Interactive wireframes loaded successfully');