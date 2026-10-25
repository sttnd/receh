function KartuPengeluaran({ keterangan, kategori, nominal, tanggal }) {
  return (
    <article className="kartu">
      <div>
        <h3>{keterangan}</h3>
        <small>
          {kategori} • {tanggal}
        </small>
      </div>
      <strong>Rp {nominal.toLocaleString("id-ID")}</strong>
    </article>
  );
}

export default KartuPengeluaran;