// ─── Sidebar toggle (mobile) ──────────────────────────────
const sidebar   = document.querySelector('.sidebar');
const overlay   = document.querySelector('.sidebar-overlay');
const toggler   = document.querySelector('.topbar-toggle');

function openSidebar()  { sidebar?.classList.add('show');    overlay?.classList.add('show'); }
function closeSidebar() { sidebar?.classList.remove('show'); overlay?.classList.remove('show'); }

toggler?.addEventListener('click', openSidebar);
overlay?.addEventListener('click', closeSidebar);

// ─── Sidebar submenu toggles ──────────────────────────────
document.querySelectorAll('.sidebar-link.has-sub').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const submenu = link.nextElementSibling;
    const isOpen  = link.classList.contains('open');
    document.querySelectorAll('.sidebar-link.has-sub.open').forEach(l => {
      l.classList.remove('open');
      l.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) {
      link.classList.add('open');
      submenu?.classList.add('open');
    }
  });
});

// Open the active submenu on load
document.querySelectorAll('.sidebar-submenu .sidebar-link.active').forEach(link => {
  const sub = link.closest('.sidebar-submenu');
  const parent = sub?.previousElementSibling;
  sub?.classList.add('open');
  parent?.classList.add('open');
});

// ─── DataTables init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof $.fn.DataTable !== 'undefined') {
    document.querySelectorAll('table.dt-table').forEach(t => {
      $(t).DataTable({
        pageLength: 15,
        responsive: true,
        language: {
          search:          '<i class="bi bi-search"></i>',
          searchPlaceholder: 'Search…',
          lengthMenu:      'Show _MENU_',
          paginate: { previous: '<i class="bi bi-chevron-left"></i>', next: '<i class="bi bi-chevron-right"></i>' }
        },
        dom: "<'table-toolbar'<'table-search'f><'d-flex gap-2 ms-auto'lB>>" +
             "t" +
             "<'d-flex align-items-center justify-content-between mt-3'<'dataTables_info'i><'dataTables_paginate'p>>"
      });
    });
  }
});

// ─── Confirm delete ───────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.closest('[data-confirm]')) {
    const msg = e.target.closest('[data-confirm]').dataset.confirm || 'Are you sure?';
    if (!confirm(msg)) e.preventDefault();
  }
});

// ─── Upload zone drag-and-drop ────────────────────────────
document.querySelectorAll('.upload-zone').forEach(zone => {
  const input = zone.querySelector('input[type="file"]');
  zone.addEventListener('click', () => input?.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (input && e.dataTransfer.files.length) {
      input.files = e.dataTransfer.files;
      const name = e.dataTransfer.files[0]?.name;
      zone.querySelector('.upload-filename') && (zone.querySelector('.upload-filename').textContent = name);
    }
  });
  input?.addEventListener('change', () => {
    const name = input.files[0]?.name;
    if (name && zone.querySelector('.upload-filename'))
      zone.querySelector('.upload-filename').textContent = name;
  });
});

// ─── Back to top ─────────────────────────────────────────
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 300));
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── Toast notification helper ───────────────────────────
function showToast(msg, type = 'success') {
  const colours = { success: '#16a34a', danger: '#dc3545', info: '#0ea5e9', warning: '#e9a710' };
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;bottom:1.5rem;right:1.5rem;background:${colours[type]};color:white;
    padding:0.75rem 1.25rem;border-radius:8px;font-size:0.85rem;font-weight:600;
    box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:9999;max-width:320px;`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ─── Inline table search (non-DataTables fallback) ────────
document.querySelectorAll('[data-table-search]').forEach(inp => {
  const target = document.querySelector(inp.dataset.tableSearch);
  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase();
    target?.querySelectorAll('tbody tr').forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
});

// ─── Status badge colour refresh (after dynamic updates) ──
function applyBadgeColors() {
  document.querySelectorAll('[data-status]').forEach(el => {
    const s = el.dataset.status?.toLowerCase().replace(/\s/g, '');
    el.className = `badge-status badge-${s}`;
  });
}
applyBadgeColors();
