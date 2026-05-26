const NotificationCenter = (() => {
  let filter = 'all';

  function renderList() {
    const el = document.getElementById('notif-list');
    if (!el) return;
    let items = [...DataStore.notifications];
    if (filter !== 'all') items = items.filter(n => n.type === filter);
    el.innerHTML = items.map(n => `
      <div class="glass-card notif-item ${n.read ? '' : 'unread'}" style="margin-bottom:0.75rem;padding:1rem;display:flex;gap:1rem;align-items:flex-start">
        <span style="font-size:1.5rem">${n.icon}</span>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="badge badge-${n.type === 'confirmation' ? 'success' : n.type === 'cancellation' ? 'danger' : 'primary'}">${n.type}</span>
            <span style="font-size:0.75rem;color:var(--text-muted)">${n.time}</span>
          </div>
          <p style="margin:0.5rem 0;font-size:0.875rem">${n.message}</p>
          <div style="display:flex;gap:0.5rem">
            ${!n.read ? '<button class="btn btn-ghost btn-sm mark-read">Mark read</button>' : ''}
            <button class="btn btn-ghost btn-sm dismiss">Dismiss</button>
          </div>
        </div>
      </div>
    `).join('');
    el.querySelectorAll('.mark-read').forEach((btn, i) => btn.addEventListener('click', () => { items[i].read = true; renderList(); App.toast('Marked as read', 'success'); }));
    el.querySelectorAll('.dismiss').forEach(btn => btn.addEventListener('click', () => { btn.closest('.notif-item').remove(); }));
  }

  function renderTimeline() {
    const el = document.getElementById('reminder-timeline');
    if (!el) return;
    const reminders = DataStore.notifications.filter(n => n.type === 'reminder').slice(0, 20);
    el.innerHTML = reminders.map((r, i) => `
      <div class="activity-item" style="padding-left:1.5rem;border-left:2px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'};margin-left:0.5rem">
        <div><strong>${r.message}</strong><div class="activity-time">${r.time}</div></div>
      </div>
    `).join('');
  }

  function init() {
    document.querySelectorAll('[data-notif-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.notifFilter;
        document.querySelectorAll('[data-notif-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList();
      });
    });
    document.getElementById('mark-all-read')?.addEventListener('click', () => {
      DataStore.notifications.forEach(n => n.read = true);
      renderList();
      App.toast('All notifications marked as read', 'success');
    });
    renderList();
    renderTimeline();
    setInterval(() => {
      if (Math.random() > 0.95) App.toast('New booking reminder received', 'info');
    }, 30000);
  }

  return { init, renderList };
})();
