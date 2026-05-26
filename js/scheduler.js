const TeamScheduler = (() => {
  function renderTeamGrid() {
    const el = document.getElementById('team-grid');
    if (!el) return;
    el.innerHTML = DataStore.staff.map(s => {
      const shifts = Array.from({ length: 7 }, () => Math.random() > 0.3);
      return `<div class="glass-card team-member" style="padding:1.25rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
          <div class="avatar avatar-lg">${s.avatar}</div>
          <div><strong>${s.name}</strong><br><span style="font-size:0.75rem;color:var(--text-secondary)">${s.role} · ${s.dept}</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.8125rem">
          <span>${s.bookings} bookings</span><span class="stars">★ ${s.rating}</span>
        </div>
        <div class="shift-timeline">${shifts.map(active => `<div class="shift-block ${active ? 'active' : ''}"></div>`).join('')}</div>
        <div style="display:flex;gap:0.25rem;margin-top:0.5rem;font-size:0.625rem;color:var(--text-muted);justify-content:space-between">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
        <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:1rem">Edit Schedule</button>
      </div>`;
    }).join('');
  }

  function renderWorkload() {
    const el = document.getElementById('workload-chart');
    if (!el) return;
    const max = Math.max(...DataStore.staff.map(s => s.bookings));
    el.innerHTML = DataStore.staff.map(s => `
      <div style="margin-bottom:0.75rem">
        <div style="display:flex;justify-content:space-between;font-size:0.8125rem"><span>${s.name.split(' ')[0]}</span><span>${Math.round(s.bookings / max * 100)}% workload</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${s.bookings / max * 100}%;background:${s.bookings / max > 0.8 ? 'var(--danger)' : 'var(--gradient-primary)'}"></div></div>
      </div>
    `).join('');
  }

  function initAvailability() {
    const el = document.getElementById('availability-editor');
    if (!el) return;
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let html = '<div class="availability-grid"><div class="avail-day-label">Time</div>';
    days.forEach(d => html += `<div style="text-align:center;font-weight:600;font-size:0.75rem;padding:0.5rem">${d.slice(0,3)}</div>`);
    for (let h = 8; h <= 18; h++) {
      html += `<div class="avail-day-label">${h}:00</div>`;
      for (let d = 0; d < 7; d++) {
        const status = Math.random() > 0.3 ? (Math.random() > 0.85 ? 'break' : 'available') : 'unavailable';
        html += `<div class="avail-slot ${status}" data-day="${d}" data-hour="${h}"></div>`;
      }
    }
    html += '</div>';
    el.innerHTML = html;
    el.querySelectorAll('.avail-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        const states = ['available', 'break', 'unavailable'];
        const idx = states.indexOf([...slot.classList].find(c => states.includes(c)) || 'unavailable');
        slot.className = 'avail-slot ' + states[(idx + 1) % 3];
      });
    });
  }

  function init() {
    renderTeamGrid();
    renderWorkload();
    initAvailability();
    document.getElementById('vacation-toggle')?.addEventListener('click', function() {
      this.classList.toggle('active');
      App.toast(this.classList.contains('active') ? 'Vacation mode enabled' : 'Vacation mode disabled', 'info');
    });
  }

  return { init, renderTeamGrid, initAvailability };
})();
