import { useMemo, useState } from "react";
import FormTambah from "./FormTambah";
import KartuPengeluaran from "./KartuPengeluaran";
import { KATEGORI_PENGELUARAN, POS_ANGGARAN, SUMBER_DANA, formatRupiah } from "../utils/finance";

function TransaksiPage({
  transactions,
  monthLabel,
  editingItem,
  onEdit,
  onCancelEdit,
  onSubmit,
  onDelete,
  isSubmitting,
  deletingId,
  isLoading,
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua kategori");
  const [bucketFilter, setBucketFilter] = useState("Semua pos");
  const [sourceFilter, setSourceFilter] = useState("Semua sumber dana");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((item) => {
      const matchesSearch = !query || item.keterangan.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "Semua kategori" || item.kategori === categoryFilter;
      const matchesBucket = bucketFilter === "Semua pos" || (item.posAnggaran || "Pokok") === bucketFilter;
      const matchesSource = sourceFilter === "Semua sumber dana" || (item.sumberDana || "Tunai") === sourceFilter;
      return matchesSearch && matchesCategory && matchesBucket && matchesSource;
    });
  }, [transactions, search, categoryFilter, bucketFilter, sourceFilter]);

  const totalFiltered = filteredTransactions.reduce((sum, item) => sum + Number(item.nominal), 0);

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">PENCATATAN HARIAN</p>
        <h2>Semua transaksi, tercatat rapi.</h2>
        <p>Kelola pengeluaran, cari transaksi, dan lihat riwayat catatan untuk {monthLabel}.</p>
      </section>

      <FormTambah key={editingItem?.id ?? "new"} onSubmit={onSubmit} initialData={editingItem} onCancel={onCancelEdit} isSubmitting={isSubmitting} />

      <section className="panel transaction-history-panel">
        <div className="section-heading history-heading">
          <div>
            <p className="eyebrow">RIWAYAT BULANAN</p>
            <h2>Daftar transaksi</h2>
          </div>
          <div className="history-total"><span>Total terfilter</span><strong>{formatRupiah(totalFiltered)}</strong></div>
        </div>

        <div className="filter-row">
          <label className="search-field"><span aria-hidden="true">⌕</span><input type="search" placeholder="Cari keterangan..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter kategori">
            <option>Semua kategori</option>
            {KATEGORI_PENGELUARAN.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={bucketFilter} onChange={(event) => setBucketFilter(event.target.value)} aria-label="Filter pos anggaran">
            <option>Semua pos</option>
            {POS_ANGGARAN.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} aria-label="Filter sumber dana">
            <option>Semua sumber dana</option>
            {SUMBER_DANA.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        {isLoading ? <p className="empty-copy">Memuat transaksi...</p> : filteredTransactions.length ? (
          <div className="transaction-list">
            {filteredTransactions.map((item) => (
              <KartuPengeluaran key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} isDeleting={deletingId === item.id} />
            ))}
          </div>
        ) : (
          <div className="empty-panel empty-panel-small">
            <span className="empty-icon">⌕</span>
            <strong>Tidak ada transaksi ditemukan</strong>
            <p>Coba ubah kata kunci atau filter yang digunakan.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TransaksiPage;
