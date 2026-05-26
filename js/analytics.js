const AnalyticsCharts = (() => {
  function renderBarChart(containerId, data, labels) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = Math.max(...data);
    el.innerHTML = `<div class="chart-container bar-chart">${data.map((v, i) => `
      <div class="bar" style="height:${(v / max) * 100}%" title="${labels[i]}: ${v}">
        <span class="bar-label">${labels[i]}</span>
      </div>
    `).join('')}</div>`;
  }

  function renderLineChart(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = Math.max(...data);
    const w = 600, h = 200, pad = 40;
    const points = data.map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      return `${x},${y}`;
    }).join(' ');
    const area = `M${pad},${h - pad} L${points.split(' ').join(' L')} L${w - pad},${h - pad} Z`;
    el.innerHTML = `<svg class="line-chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7C3AED" stop-opacity="0.3"/><stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/></linearGradient></defs>
      <path d="${area}" fill="url(#lineGrad)"/>
      <polyline points="${points}" fill="none" stroke="#7C3AED" stroke-width="3" stroke-linecap="round"/>
      ${data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2);
        const y = h - pad - (v / max) * (h - pad * 2);
        return `<circle cx="${x}" cy="${y}" r="4" fill="#06B6D4"/>`;
      }).join('')}
    </svg>`;
  }

  function renderPieChart(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const total = items.reduce((s, i) => s + i.value, 0);
    let offset = 0;
    const gradients = items.map(item => {
      const pct = (item.value / total) * 100;
      const start = offset;
      offset += pct;
      return `${item.color || '#7C3AED'} ${start}% ${offset}%`;
    }).join(', ');
    el.innerHTML = `
      <div class="pie-chart" style="background:conic-gradient(${gradients})"></div>
      <div class="pie-legend">${items.map(i => `
        <div class="pie-legend-item"><span class="pie-legend-dot" style="background:${i.color}"></span>${i.name} (${Math.round(i.value / total * 100)}%)</div>
      `).join('')}</div>`;
  }

  function renderCircularProgress(containerId, value, label) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const r = 50, c = 2 * Math.PI * r, offset = c - (value / 100) * c;
    el.innerHTML = `<div class="circular-progress">
      <svg width="120" height="120"><circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--bg-tertiary)" stroke-width="10"/>
      <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#grad)" stroke-width="10" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      <defs><linearGradient id="grad"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#06B6D4"/></linearGradient></defs></svg>
      <div class="value">${value}%</div>
    </div><div style="text-align:center;margin-top:0.5rem;font-size:0.875rem;color:var(--text-secondary)">${label}</div>`;
  }

  function renderHeatmap(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let html = '<div class="booking-heatmap">';
    html += '<div></div>' + days.map(d => `<div style="text-align:center;padding:0.25rem">${d}</div>`).join('');
    for (let h = 8; h <= 18; h++) {
      html += `<div class="heatmap-hour">${h}:00</div>`;
      for (let d = 0; d < 7; d++) {
        const val = data[d]?.[h] || 0;
        const opacity = val / 100;
        html += `<div class="heatmap-cell" style="background:rgba(124,58,237,${opacity});min-height:20px" title="${val} bookings"></div>`;
      }
    }
    html += '</div>';
    el.innerHTML = html;
  }

  function renderStaffBars(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const data = DataStore.analytics.staffPerformance;
    const max = Math.max(...data.map(d => d.bookings));
    el.innerHTML = data.map(d => `
      <div style="margin-bottom:0.75rem">
        <div style="display:flex;justify-content:space-between;font-size:0.8125rem;margin-bottom:0.25rem"><span>${d.name}</span><span>${d.bookings} bookings</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${(d.bookings / max) * 100}%"></div></div>
      </div>
    `).join('');
  }

  function initDashboard() {
    const a = DataStore.analytics;
    renderBarChart('revenue-chart', a.monthlyRevenue, ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']);
    renderLineChart('bookings-chart', a.monthlyBookings);
    renderPieChart('services-pie', a.serviceBreakdown.slice(0, 6));
    renderCircularProgress('retention-chart', a.retentionRate, 'Retention Rate');
    renderHeatmap('heatmap-chart', a.weeklyHeatmap);
    renderStaffBars('staff-performance');
    const peakEl = document.getElementById('peak-hours-chart');
    if (peakEl) {
      const peak = a.peakHours.filter(p => p.hour >= 8 && p.hour <= 18);
      const max = Math.max(...peak.map(p => p.count));
      peakEl.innerHTML = `<div class="chart-container bar-chart">${peak.map(p => `
        <div class="bar" style="height:${(p.count / max) * 100}%;background:linear-gradient(to top,#06B6D4,#7C3AED)">
          <span class="bar-label">${p.hour}:00</span>
        </div>
      `).join('')}</div>`;
    }
  }

  return { initDashboard, renderBarChart, renderLineChart, renderPieChart, renderCircularProgress, renderHeatmap };
})();
