const menu = [
  { id: "dashboard", label: "Dashboard", symbol: "⌂" },
  { id: "transaksi", label: "Transaksi", symbol: "↗" },
  { id: "anggaran", label: "Anggaran", symbol: "▤" },
];

function Header({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" onClick={() => onNavigate("dashboard")}>
        <span className="brand-mark">r.</span>
        <span>
          <strong>receh</strong>
          <small>personal finance</small>
        </span>
      </a>

      <div className="sidebar-caption">MENU UTAMA</div>
      <nav className="side-nav" aria-label="Navigasi utama">
        {menu.map((item) => (
          <button
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-symbol" aria-hidden="true">{item.symbol}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span className="note-dot" />
          <p>Kelola uang dengan lebih sadar, satu transaksi setiap waktu.</p>
        </div>
        <span className="sidebar-version">RECEH · PERSONAL FINANCE</span>
      </div>
    </aside>
  );
}

export default Header;
