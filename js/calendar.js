const CalendarApp = (() => {
  let currentDate = new Date();
  let view = 'month';
  let selectedDate = null;
  let draggedEvent = null;

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function getApptsForDate(dateStr) {
    return DataStore.appointments.filter(a => a.date === dateStr);
  }

  function renderMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const container = document.getElementById('calendar-view');
    if (!container) return;

    let html = `<div class="calendar-month"><div class="calendar-weekdays">${DAYS.map(d => `<div class="calendar-weekday">${d}</div>`).join('')}</div><div class="calendar-days">`;

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevDays - i;
      const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += dayCell(d, dateStr, true);
    }
    const today = new Date().toISOString().split('T')[0];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += dayCell(d, dateStr, false, dateStr === today, dateStr === selectedDate);
    }
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remaining; d++) {
      html += dayCell(d, '', true);
    }
    html += '</div></div>';
    container.innerHTML = html;
    bindDayClicks();
  }

  function dayCell(num, dateStr, other, isToday, isSelected) {
    const appts = dateStr ? getApptsForDate(dateStr) : [];
    const events = appts.slice(0, 3).map(a =>
      `<div class="day-event ${App.getCategoryClass(a.category)}" style="background:${a.color}33;color:${a.color}" data-id="${a.id}" draggable="true">${a.time} ${a.serviceName.split(' ')[0]}</div>`
    ).join('');
    const more = appts.length > 3 ? `<div class="day-event-more">+${appts.length - 3} more</div>` : '';
    return `<div class="calendar-day ${other ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${dateStr}">
      <div class="day-number">${num}</div>
      <div class="day-events">${events}${more}</div>
    </div>`;
  }

  function renderWeek() {
    const container = document.getElementById('calendar-view');
    if (!container) return;
    const start = getWeekStart(currentDate);
    let html = '<div class="calendar-week"><div class="week-time-col"><div class="week-day-header"></div>';
    for (let h = 8; h <= 18; h++) html += `<div class="week-time-slot">${h}:00</div>`;
    html += '</div>';

    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + d);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      html += `<div class="week-day-col"><div class="week-day-header ${isToday ? 'today' : ''}">${DAYS[date.getDay()]} ${date.getDate()}</div><div class="week-day-body" data-date="${dateStr}">`;
      getApptsForDate(dateStr).forEach(a => {
        const [hh, mm] = a.time.split(':').map(Number);
        const top = ((hh - 8) * 60 + mm) / 60 * 48;
        const height = (a.duration / 60) * 48;
        html += `<div class="week-event ${App.getCategoryClass(a.category)}" style="top:${top}px;height:${height}px;background:${a.color}" data-id="${a.id}" draggable="true">${a.time} ${a.title}</div>`;
      });
      html += '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
    initDragDrop();
  }

  function renderDay() {
    const container = document.getElementById('calendar-view');
    if (!container) return;
    const dateStr = selectedDate || currentDate.toISOString().split('T')[0];
    const appts = getApptsForDate(dateStr).sort((a, b) => a.time.localeCompare(b.time));
    let html = `<div class="calendar-day-view"><div>`;
    for (let h = 8; h <= 20; h++) html += `<div class="day-time-label">${h}:00</div>`;
    html += `</div><div class="day-schedule-col" style="position:relative;min-height:${13 * 60}px">`;
    appts.forEach(a => {
      const [hh, mm] = a.time.split(':').map(Number);
      const top = ((hh - 8) * 60 + mm);
      const height = a.duration;
      html += `<div class="day-event-block ${App.getCategoryClass(a.category)}" style="top:${top}px;height:${height}px;border-left-color:${a.color}" data-id="${a.id}">
        <strong>${a.time} - ${a.serviceName}</strong><br>
        <span style="font-size:0.75rem;color:var(--text-secondary)">${a.customerName} · ${a.staffName}</span>
      </div>`;
    });
    html += '</div></div>';
    container.innerHTML = html;
  }

  function getWeekStart(d) {
    const s = new Date(d);
    s.setDate(s.getDate() - s.getDay());
    return s;
  }

  function bindDayClicks() {
    document.querySelectorAll('.calendar-day[data-date]').forEach(day => {
      day.addEventListener('click', () => {
        selectedDate = day.dataset.date;
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        updateSidebar(day.dataset.date);
      });
    });
    initDragDrop();
  }

  function updateSidebar(dateStr) {
    const el = document.getElementById('day-detail');
    if (!el || !dateStr) return;
    const appts = getApptsForDate(dateStr);
    el.innerHTML = `<h4 style="margin-bottom:1rem">${App.formatDate(dateStr)}</h4>
      <p style="color:var(--text-secondary);margin-bottom:1rem">${appts.length} appointments</p>
      ${appts.map(a => `<div class="appt-item glass-card" style="padding:0.75rem;margin-bottom:0.5rem">
        <div class="appt-time">${a.time}</div>
        <div style="flex:1"><strong>${a.serviceName}</strong><br><span style="font-size:0.75rem;color:var(--text-secondary)">${a.customerName}</span></div>
        ${App.getStatusBadge(a.status)}
      </div>`).join('') || '<p class="empty-state">No appointments</p>'}`;
  }

  function initDragDrop() {
    document.querySelectorAll('[draggable="true"]').forEach(el => {
      el.addEventListener('dragstart', (e) => {
        draggedEvent = el.dataset.id;
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
    });
    document.querySelectorAll('.calendar-day, .week-day-body').forEach(zone => {
      zone.addEventListener('dragover', e => e.preventDefault());
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedEvent && zone.dataset.date) {
          const appt = DataStore.appointments.find(a => a.id === draggedEvent);
          if (appt) { appt.date = zone.dataset.date; App.toast('Appointment rescheduled', 'success'); render(); }
        }
      });
    });
  }

  function updateTitle() {
    const el = document.getElementById('cal-title');
    if (!el) return;
    if (view === 'month') el.textContent = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    else if (view === 'week') {
      const s = getWeekStart(currentDate);
      const e = new Date(s); e.setDate(s.getDate() + 6);
      el.textContent = `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else el.textContent = App.formatDate(selectedDate || currentDate.toISOString().split('T')[0]);
  }

  function render() {
    const container = document.getElementById('calendar-view');
    if (container) container.classList.add('transitioning');
    setTimeout(() => {
      if (view === 'month') renderMonth();
      else if (view === 'week') renderWeek();
      else renderDay();
      updateTitle();
      container?.classList.remove('transitioning');
    }, 150);
  }

  function init() {
    document.getElementById('cal-prev')?.addEventListener('click', () => {
      if (view === 'month') currentDate.setMonth(currentDate.getMonth() - 1);
      else if (view === 'week') currentDate.setDate(currentDate.getDate() - 7);
      else currentDate.setDate(currentDate.getDate() - 1);
      render();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
      if (view === 'month') currentDate.setMonth(currentDate.getMonth() + 1);
      else if (view === 'week') currentDate.setDate(currentDate.getDate() + 7);
      else currentDate.setDate(currentDate.getDate() + 1);
      render();
    });
    document.getElementById('cal-today')?.addEventListener('click', () => { currentDate = new Date(); render(); });
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        view = btn.dataset.view;
        render();
      });
    });
    render();
    updateSidebar(new Date().toISOString().split('T')[0]);
  }

  return { init, render, getApptsForDate };
})();
