import KartuPengeluaran from "./KartuPengeluaran";

function DaftarPengeluaran({
  daftar,
  isLoading,
  deletingId,
  onEdit,
  onDelete,
}) {
  return (
    <section className="panel daftar">
      <div className="section-heading">
        <div>
          <p className="eyebrow">AKTIVITAS TERBARU</p>
          <h2>Riwayat Pengeluaran</h2>
        </div>
        <span className="count-badge">{daftar.length} transaksi</span>
      </div>

      {isLoading ? (
        <p className="empty-state">Memuat data pengeluaran...</p>
      ) : daftar.length === 0 ? (
        <p className="empty-state">Belum ada data pengeluaran. Tambahkan transaksi pertamamu.</p>
      ) : (
        <div className="daftar-items">
          {daftar.map((item) => (
            <KartuPengeluaran
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={deletingId === item.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DaftarPengeluaran;
