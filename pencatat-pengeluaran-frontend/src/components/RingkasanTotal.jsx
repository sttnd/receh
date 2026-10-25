function RingkasanTotal({ jumlahData, totalNominal }) {
  return (
    <section className="ringkasan">
      <div>
        <span>Jumlah Transaksi</span>
        <strong>{jumlahData}</strong>
      </div>
      <div>
        <span>Total Pengeluaran</span>
        <strong>Rp {totalNominal.toLocaleString("id-ID")}</strong>
      </div>
    </section>
  );
}

export default RingkasanTotal;