function Header({ judul, subjudul }) {
  return (
    <header className="header">
      <div className="header-mark">PP</div>
      <p className="eyebrow">PERSONAL FINANCE TRACKER</p>
      <h1>{judul}</h1>
      <p className="header-subtitle">{subjudul}</p>
    </header>
  );
}

export default Header;
