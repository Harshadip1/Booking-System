const CustomerManager = (() => {
  let page = 1, search = '', statusFilter = 'all';

  function renderGrid() {
    const el = document.getElementById('customer-grid');
    const pagEl = document.getElementById('customer-pagination');
    if (!el) return;
    let list = [...DataStore.customers];
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
    if (statusFilter !== 'all') list = list.filter(c => c.status === statusFilter);
    const { items, pages, total } = App.paginate(list, page, 24);
    el.innerHTML = items.map(c => `
      <div class="customer-card glass-card">
        <div style="display:flex;align-items:center;gap:1rem">
          <div class="avatar avatar-lg">${c.avatar}</div>
          <div><strong>${c.name}</strong><br><span style="font-size:0.75rem;color:var(--text-secondary)">${c.email}</span></div>
          <span class="badge ${c.status === 'vip' ? 'badge-warning' : c.status === 'active' ? 'badge-success' : 'badge-primary'}" style="margin-left:auto">${c.status}</span>
        </div>
        <div class="customer-stats">
          <div class="customer-stat"><div class="val">${c.bookings}</div><div class="lbl">Bookings</div></div>
          <div class="customer-stat"><div class="val">${App.formatCurrency(c.spent)}</div><div class="lbl">Spent</div></div>
          <div class="customer-stat"><div class="val stars">★ ${c.rating}</div><div class="lbl">Rating</div></div>
        </div>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.75rem">Last visit: ${c.lastVisit}</p>
      </div>
    `).join('');
    App.renderPagination(pagEl, pages, page, p => { page = p; renderGrid(); });
    document.getElementById('customer-count').textContent = `${total} customers`;
  }

  function renderTable() {
    const el = document.getElementById('customer-table');
    if (!el) return;
    const items = DataStore.customers.slice(0, 50);
    el.innerHTML = `<table><thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Bookings</th><th>Spent</th><th>Status</th><th>Last Visit</th></tr></thead><tbody>
      ${items.map(c => `<tr><td><div style="display:flex;align-items:center;gap:0.5rem"><div class="avatar avatar-sm">${c.avatar}</div>${c.name}</div></td><td>${c.email}</td><td>${c.phone}</td><td>${c.bookings}</td><td>${App.formatCurrency(c.spent)}</td><td><span class="badge badge-success">${c.status}</span></td><td>${c.lastVisit}</td></tr>`).join('')}
    </tbody></table>`;
  }

  function init() {
    document.getElementById('customer-search')?.addEventListener('input', e => { search = e.target.value.toLowerCase(); page = 1; renderGrid(); });
    document.getElementById('status-filter')?.addEventListener('change', e => { statusFilter = e.target.value; page = 1; renderGrid(); });
    renderGrid();
    renderTable();
  }

  return { init, renderGrid };
})();
