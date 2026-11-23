function RingkasanTotal({ jumlahData, totalNominal }) {
  return (
    <section className="ringkasan">
      <div className="summary-card">
        <span className="summary-label">Jumlah Transaksi</span>
        <strong>{jumlahData}</strong>
        <small>Seluruh catatan pengeluaran</small>
      </div>
      <div className="summary-card summary-highlight">
        <span className="summary-label">Total Pengeluaran</span>
        <strong>Rp {totalNominal.toLocaleString("id-ID")}</strong>
        <small>Akumulasi nominal transaksi</small>
      </div>
    </section>
  );
}

export default RingkasanTotal;
