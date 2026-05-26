/* ScheduleHub - Core Application */
const App = (() => {
  const NAV = [
    { section: 'Main', items: [
      { href: 'dashboard.html', icon: '📊', label: 'Dashboard' },
      { href: 'calendar.html', icon: '📅', label: 'Calendar' },
      { href: 'booking.html', icon: '➕', label: 'Book Appointment' },
      { href: 'history.html', icon: '📋', label: 'History' },
      { href: 'details.html', icon: '📝', label: 'Booking Details' }
    ]},
    { section: 'Management', items: [
      { href: 'services.html', icon: '🏷️', label: 'Services' },
      { href: 'availability.html', icon: '⏰', label: 'Availability' },
      { href: 'customers.html', icon: '👥', label: 'Customers' },
      { href: 'team.html', icon: '👔', label: 'Team Scheduling' },
      { href: 'meeting.html', icon: '🤝', label: 'Meeting Scheduler' }
    ]},
    { section: 'Insights', items: [
      { href: 'analytics.html', icon: '📈', label: 'Analytics' },
      { href: 'notifications.html', icon: '🔔', label: 'Notifications', badge: true },
      { href: 'reviews.html', icon: '⭐', label: 'Reviews' },
      { href: 'reports.html', icon: '📄', label: 'Reports & Export' }
    ]},
    { section: 'Tools', items: [
      { href: 'payments.html', icon: '💳', label: 'Payments' },
      { href: 'video.html', icon: '📹', label: 'Video Consultation' },
      { href: 'search.html', icon: '🔍', label: 'Search' },
      { href: 'admin.html', icon: '⚙️', label: 'Admin Dashboard' },
      { href: 'staff.html', icon: '🧑‍💼', label: 'Staff Profiles' }
    ]},
    { section: 'Account', items: [
      { href: 'profile.html', icon: '👤', label: 'Profile' },
      { href: 'settings.html', icon: '🔧', label: 'Settings' },
      { href: 'security.html', icon: '🔒', label: 'Security' },
      { href: 'plans.html', icon: '💎', label: 'Subscription Plans' }
    ]}
  ];

  function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function renderSidebar() {
    const el = document.getElementById('sidebar');
    if (!el) return;
    const current = location.pathname.split('/').pop() || 'dashboard.html';
    const unread = DataStore.notifications.filter(n => !n.read).length;
    el.innerHTML = `
      <div class="sidebar-header">
        <a href="index.html" class="sidebar-logo">ScheduleHub</a>
      </div>
      <nav class="sidebar-nav">
        ${NAV.map(sec => `
          <div class="nav-section">
            <div class="nav-section-title">${sec.section}</div>
            ${sec.items.map(item => `
              <a href="${item.href}" class="nav-item ${current === item.href ? 'active' : ''}">
                <span class="icon">${item.icon}</span>
                <span>${item.label}</span>
                ${item.badge ? `<span class="badge-count">${unread}</span>` : ''}
              </a>
            `).join('')}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="glass-card" style="padding:1rem;text-align:center">
          <div style="font-size:0.75rem;color:var(--text-muted)">Upgrade to Pro</div>
          <a href="plans.html" class="btn btn-primary btn-sm" style="margin-top:0.5rem;width:100%">View Plans</a>
        </div>
      </div>`;
  }

  function renderHeader(title, subtitle) {
    const el = document.getElementById('top-header');
    if (!el) return;
    const unread = DataStore.notifications.filter(n => !n.read).length;
    el.innerHTML = `
      <div class="header-left">
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
        <div>
          <h1 class="page-title" style="font-size:1.25rem;margin:0">${title || 'Dashboard'}</h1>
          ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
      </div>
      <div class="header-right">
        <div class="search-box" style="width:240px">
          <span>🔍</span>
          <input type="text" placeholder="Search bookings..." id="global-search">
        </div>
        <div class="lang-selector">
          <select id="lang-select"><option value="en">EN</option><option value="es">ES</option><option value="fr">FR</option><option value="de">DE</option></select>
        </div>
        <button class="btn btn-icon btn-ghost" id="theme-toggle" title="Toggle theme">🌙</button>
        <div class="notif-dropdown">
          <button class="notif-btn" id="notif-toggle">🔔${unread ? `<span class="notif-badge">${unread}</span>` : ''}</button>
          <div class="notif-panel glass" id="notif-panel">
            <div style="padding:1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
              <strong>Notifications</strong>
              <a href="notifications.html" style="font-size:0.75rem">View all</a>
            </div>
            ${DataStore.notifications.slice(0, 8).map(n => `
              <div class="notif-item ${n.read ? '' : 'unread'}">
                <span>${n.icon}</span>
                <div><div style="font-size:0.8125rem">${n.message}</div><div style="font-size:0.6875rem;color:var(--text-muted)">${n.time}</div></div>
              </div>
            `).join('')}
          </div>
        </div>
        <a href="profile.html" class="avatar">AD</a>
      </div>`;
    bindHeaderEvents();
  }

  function bindHeaderEvents() {
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
      document.querySelector('.sidebar')?.classList.toggle('open');
      document.querySelector('.sidebar-overlay')?.classList.toggle('active');
    });
    document.getElementById('notif-toggle')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('notif-panel')?.classList.toggle('open');
    });
    document.addEventListener('click', () => document.getElementById('notif-panel')?.classList.remove('open'));
    document.getElementById('global-search')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') location.href = `search.html?q=${encodeURIComponent(e.target.value)}`;
    });
  }

  function toast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  function formatCurrency(n) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  }

  function formatDate(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function paginate(arr, page, perPage = 20) {
    const start = (page - 1) * perPage;
    return { items: arr.slice(start, start + perPage), total: arr.length, pages: Math.ceil(arr.length / perPage) };
  }

  function renderPagination(container, totalPages, currentPage, onPage) {
    if (!container || totalPages <= 1) return;
    let html = '<div class="pagination">';
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (totalPages > 10) html += `<span style="padding:0.5rem">...</span><button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    html += '</div>';
    container.innerHTML = html;
    container.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => onPage(parseInt(btn.dataset.page)));
    });
  }

  function initAIAssistant() {
    if (document.getElementById('ai-assistant')) return;
    const div = document.createElement('div');
    div.className = 'ai-assistant';
    div.id = 'ai-assistant';
    div.innerHTML = `
      <div class="ai-panel glass" id="ai-panel">
        <div style="padding:1rem;border-bottom:1px solid var(--border)"><strong>AI Booking Assistant</strong></div>
        <div class="ai-messages" id="ai-messages">
          <div class="ai-msg bot">Hello! I can help you book appointments, check availability, or find the best time slots. What would you like to do?</div>
        </div>
        <div style="padding:0.75rem;display:flex;gap:0.5rem">
          <input type="text" class="form-input" id="ai-input" placeholder="Ask me anything...">
          <button class="btn btn-primary btn-sm" id="ai-send">Send</button>
        </div>
      </div>
      <button class="ai-btn" id="ai-toggle" title="AI Assistant">🤖</button>`;
    document.body.appendChild(div);
    document.getElementById('ai-toggle').addEventListener('click', () => document.getElementById('ai-panel').classList.toggle('open'));
    const send = () => {
      const input = document.getElementById('ai-input');
      const msg = input.value.trim();
      if (!msg) return;
      const msgs = document.getElementById('ai-messages');
      msgs.innerHTML += `<div class="ai-msg user">${msg}</div>`;
      input.value = '';
      setTimeout(() => {
        const replies = [
          'I found 12 available slots this week. Would you like me to show the best options?',
          'Based on your history, Tuesday mornings have the highest availability.',
          'I recommend booking with Dr. Sam Rivera — highest rated for consultations.',
          'Your next appointment is tomorrow at 10:00 AM. Would you like a reminder?'
        ];
        msgs.innerHTML += `<div class="ai-msg bot">${replies[Math.floor(Math.random() * replies.length)]}</div>`;
        msgs.scrollTop = msgs.scrollHeight;
      }, 800);
    };
    document.getElementById('ai-send').addEventListener('click', send);
    document.getElementById('ai-input').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
  }

  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        const shortcuts = { 'k': 'search.html', 'b': 'booking.html', 'd': 'dashboard.html', 'c': 'calendar.html' };
        if (shortcuts[e.key]) { e.preventDefault(); location.href = shortcuts[e.key]; }
      }
    });
  }

  function initOffline() {
    const banner = document.createElement('div');
    banner.className = 'offline-banner';
    banner.id = 'offline-banner';
    banner.textContent = 'You are offline. Changes will sync when connection is restored.';
    document.body.appendChild(banner);
    window.addEventListener('online', () => banner.classList.remove('show'));
    window.addEventListener('offline', () => banner.classList.add('show'));
  }

  function initAppLayout(title, subtitle) {
    renderSidebar();
    renderHeader(title, subtitle);
    initParticles();
    initReveal();
    initAIAssistant();
    initKeyboardShortcuts();
    initOffline();
    document.querySelector('.sidebar-overlay')?.addEventListener('click', () => {
      document.querySelector('.sidebar')?.classList.remove('open');
      document.querySelector('.sidebar-overlay')?.classList.remove('active');
    });
  }

  function getStatusBadge(status) {
    const map = { confirmed: 'badge-success', pending: 'badge-warning', completed: 'badge-accent', cancelled: 'badge-danger', rescheduled: 'badge-primary', 'no-show': 'badge-danger' };
    return `<span class="badge ${map[status] || 'badge-primary'}">${status}</span>`;
  }

  function getCategoryClass(cat) {
    return `event-${cat}`;
  }

  return { initAppLayout, initParticles, toast, formatCurrency, formatDate, paginate, renderPagination, getStatusBadge, getCategoryClass, NAV };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'landing') return;
  App.initParticles?.();
  document.querySelectorAll('.reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    obs.observe(el);
  });
  const nav = document.querySelector('.landing-nav');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 50));
});
