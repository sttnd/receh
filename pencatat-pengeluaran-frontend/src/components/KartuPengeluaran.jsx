function KartuPengeluaran({ item, onEdit, onDelete, isDeleting }) {
  return (
    <article className="kartu">
      <div className="kartu-info">
        <span className="kategori-label">{item.kategori}</span>
        <h3>{item.keterangan}</h3>
        <small>{item.tanggal}</small>
      </div>

      <div className="kartu-actions">
        <strong>Rp {Number(item.nominal).toLocaleString("id-ID")}</strong>
        <div className="action-buttons">
          <button
            type="button"
            className="button button-light button-small"
            onClick={() => onEdit(item)}
            disabled={isDeleting}
          >
            Edit
          </button>
          <button
            type="button"
            className="button button-danger button-small"
            onClick={() => onDelete(item.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default KartuPengeluaran;
