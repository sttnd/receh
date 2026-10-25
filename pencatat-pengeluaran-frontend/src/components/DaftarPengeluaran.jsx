import KartuPengeluaran from "./KartuPengeluaran";

function DaftarPengeluaran({ daftar }) {
  return (
    <section className="daftar">
      <h2>Riwayat Pengeluaran</h2>
      {daftar.map((item) => (
        <KartuPengeluaran
          key={item.id}
          keterangan={item.keterangan}
          kategori={item.kategori}
          nominal={item.nominal}
          tanggal={item.tanggal}
        />
      ))}
    </section>
  );
}

export default DaftarPengeluaran;