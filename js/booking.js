const BookingWizard = (() => {
  let step = 1;
  let booking = { service: null, staff: null, date: null, time: null, notes: '' };

  function renderServices() {
    const el = document.getElementById('booking-step-content');
    if (!el) return;
    el.innerHTML = `<h3 style="margin-bottom:1rem">Select a Service</h3>
      <div class="service-grid">
        ${DataStore.services.map(s => `
          <div class="service-card glass-card ${booking.service?.id === s.id ? 'selected' : ''}" data-id="${s.id}">
            <div class="service-icon">${s.icon}</div>
            <strong>${s.name}</strong>
            <p style="font-size:0.75rem;color:var(--text-secondary);margin:0.25rem 0">${s.duration} min · ${App.formatCurrency(s.price)}</p>
            <span class="badge badge-primary">${s.category}</span>
          </div>
        `).join('')}
      </div>`;
    el.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        booking.service = DataStore.services.find(s => s.id === card.dataset.id);
        el.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  function renderStaff() {
    const el = document.getElementById('booking-step-content');
    el.innerHTML = `<h3 style="margin-bottom:1rem">Choose Staff Member</h3>
      <div class="staff-grid">
        ${DataStore.staff.map(s => `
          <div class="staff-card glass-card ${booking.staff?.id === s.id ? 'selected' : ''}" data-id="${s.id}">
            <div class="avatar avatar-lg" style="margin:0 auto 0.5rem">${s.avatar}</div>
            <strong>${s.name}</strong>
            <p style="font-size:0.75rem;color:var(--text-secondary)">${s.role}</p>
            <div class="stars">${'★'.repeat(Math.floor(s.rating))} ${s.rating}</div>
          </div>
        `).join('')}
      </div>`;
    el.querySelectorAll('.staff-card').forEach(card => {
      card.addEventListener('click', () => {
        booking.staff = DataStore.staff.find(s => s.id === card.dataset.id);
        el.querySelectorAll('.staff-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  function renderDateTime() {
    const el = document.getElementById('booking-step-content');
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(); d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    const slots = [];
    for (let h = 8; h <= 18; h++) {
      for (const m of [0, 30]) slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    }
    el.innerHTML = `
      <h3 style="margin-bottom:1rem">Pick Date & Time</h3>
      <div class="form-group"><label class="form-label">Date</label>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem">
          ${dates.map(d => `<button class="btn btn-ghost btn-sm date-pick ${booking.date === d ? 'btn-primary' : ''}" data-date="${d}">${new Date(d+'T00:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</button>`).join('')}
        </div>
      </div>
      <div class="form-group"><label class="form-label">Available Times</label>
        <div class="time-slots">
          ${slots.map(t => {
            const taken = Math.random() > 0.7;
            return `<div class="time-slot ${taken ? 'unavailable' : ''} ${booking.time === t ? 'selected' : ''}" data-time="${t}">${t}</div>`;
          }).join('')}
        </div>
      </div>
      <div class="form-group" style="margin-top:1.5rem"><label class="form-label">Notes (optional)</label>
        <textarea class="form-textarea" id="booking-notes" rows="3" placeholder="Any special requests...">${booking.notes}</textarea>
      </div>`;
    el.querySelectorAll('.date-pick').forEach(btn => btn.addEventListener('click', () => { booking.date = btn.dataset.date; renderDateTime(); }));
    el.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => slot.addEventListener('click', () => {
      booking.time = slot.dataset.time;
      el.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    }));
    document.getElementById('booking-notes')?.addEventListener('input', e => booking.notes = e.target.value);
  }

  function renderConfirm() {
    const el = document.getElementById('booking-step-content');
    el.innerHTML = `
      <div style="text-align:center;padding:2rem">
        <div style="font-size:4rem;margin-bottom:1rem">✅</div>
        <h2>Booking Confirmed!</h2>
        <p style="color:var(--text-secondary);margin:1rem 0">Your appointment has been scheduled successfully.</p>
      </div>
      <div class="glass-card" style="max-width:500px;margin:0 auto">
        <div style="display:grid;gap:0.75rem">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Service</span><strong>${booking.service?.name || '—'}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Staff</span><strong>${booking.staff?.name || '—'}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Date</span><strong>${booking.date ? App.formatDate(booking.date) : '—'}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Time</span><strong>${booking.time || '—'}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Price</span><strong>${booking.service ? App.formatCurrency(booking.service.price) : '—'}</strong></div>
        </div>
      </div>
      <div style="text-align:center;margin-top:2rem">
        <a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>
        <a href="calendar.html" class="btn btn-secondary" style="margin-left:0.5rem">View Calendar</a>
      </div>`;
    const newAppt = {
      id: 'a' + (DataStore.appointments.length + 1),
      title: `${booking.service?.name} - Demo`,
      customerName: 'Demo User',
      serviceName: booking.service?.name,
      category: booking.service?.category,
      staffName: booking.staff?.name,
      date: booking.date,
      time: booking.time,
      duration: booking.service?.duration,
      price: booking.service?.price,
      status: 'confirmed',
      color: booking.service?.color
    };
    DataStore.appointments.push(newAppt);
    localStorage.setItem('last-booking', JSON.stringify(newAppt));
  }

  function updateSteps() {
    document.querySelectorAll('.booking-step').forEach((s, i) => {
      s.classList.remove('active', 'completed');
      if (i + 1 < step) s.classList.add('completed');
      if (i + 1 === step) s.classList.add('active');
    });
    document.getElementById('booking-prev').style.display = step > 1 && step < 4 ? 'inline-flex' : 'none';
    document.getElementById('booking-next').textContent = step === 3 ? 'Confirm Booking' : step === 4 ? 'Done' : 'Continue';
    document.getElementById('booking-next').style.display = step < 4 ? 'inline-flex' : 'none';
  }

  function renderStep() {
    updateSteps();
    if (step === 1) renderServices();
    else if (step === 2) renderStaff();
    else if (step === 3) renderDateTime();
    else renderConfirm();
  }

  function init() {
    document.getElementById('booking-next')?.addEventListener('click', () => {
      if (step === 1 && !booking.service) return App.toast('Please select a service', 'warning');
      if (step === 2 && !booking.staff) return App.toast('Please select staff', 'warning');
      if (step === 3 && (!booking.date || !booking.time)) return App.toast('Please select date and time', 'warning');
      if (step < 4) { step++; renderStep(); }
    });
    document.getElementById('booking-prev')?.addEventListener('click', () => { if (step > 1) { step--; renderStep(); } });
    renderStep();
  }

  return { init };
})();
