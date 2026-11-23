import { formatDate, formatRupiah } from "../utils/finance";

const categoryInitial = {
  Makanan: "M",
  Transportasi: "T",
  Pendidikan: "P",
  Tagihan: "Tg",
  Kesehatan: "K",
  Hiburan: "H",
  Belanja: "B",
  Lainnya: "L",
};

function KartuPengeluaran({ item, onEdit, onDelete, isDeleting }) {
  return (
    <article className="transaction-row">
      <div className={`transaction-avatar avatar-${(item.kategori || "lainnya").toLowerCase()}`}>
        {categoryInitial[item.kategori] || "R"}
      </div>
      <div className="transaction-main">
        <strong>{item.keterangan}</strong>
        <div className="transaction-meta">
          <span>{item.kategori}</span>
          <span className="meta-dot">·</span>
          <span>{item.posAnggaran || "Pokok"}</span>
          <span className="meta-dot">·</span>
          <span>{item.sumberDana || "Tunai"}</span>
          <span className="meta-dot">·</span>
          <span>{formatDate(item.tanggal)}</span>
        </div>
      </div>
      <div className="transaction-right">
        <strong className="transaction-amount">− {formatRupiah(item.nominal)}</strong>
        <div className="transaction-actions">
          <button type="button" className="text-button" onClick={() => onEdit(item)} disabled={isDeleting}>
            Edit
          </button>
          <button type="button" className="text-button danger-text" onClick={() => onDelete(item.id)} disabled={isDeleting}>
            {isDeleting ? "Menghapus" : "Hapus"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default KartuPengeluaran;
