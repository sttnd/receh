import AnggaranCards from "./AnggaranCards";
import KartuPengeluaran from "./KartuPengeluaran";
import { formatRupiah } from "../utils/finance";

function Dashboard({
  monthLabel,
  budget,
  usage,
  totalSpent,
  transactionCount,
  transactions,
  categoryTotals,
  dailyLimit,
  onNavigate,
  onAddTransaction,
  onEdit,
  onDelete,
  deletingId,
}) {
  const totalRemaining = Object.values(usage.remaining).reduce((sum, amount) => sum + amount, 0);
  const totalCategories = categoryTotals.reduce((sum, item) => sum + item.amount, 0);
  const hasBudget = Boolean(budget);

  return (
    <div className="page-stack">
      <section className="welcome-card">
        <div>
          <p className="eyebrow eyebrow-light">RANGKUMAN KEUANGAN</p>
          <h2>Uangmu, lebih terarah.</h2>
          <p>Pantau alokasi, pengeluaran, dan sisa dana untuk {monthLabel}.</p>
        </div>
        <button type="button" className="button button-white" onClick={onAddTransaction}>
          + Catat transaksi
        </button>
        <div className="welcome-decoration" aria-hidden="true">R</div>
      </section>

      {!hasBudget && (
        <div className="notice notice-info">
          <div>
            <strong>Anggaran bulan ini belum diatur.</strong>
            <p>Masukkan uang bulanan dan bagi ke tiga pos agar Receh bisa menghitung sisa dana secara otomatis.</p>
          </div>
          <button className="button button-primary" type="button" onClick={() => onNavigate("anggaran")}>Atur anggaran</button>
        </div>
      )}

      <section className="stat-grid">
        <article className="stat-card">
          <span className="stat-label">Uang bulanan</span>
          <strong>{hasBudget ? formatRupiah(budget.totalBulanan) : "Belum diatur"}</strong>
          <small>Alokasi dana {monthLabel}</small>
          <span className="stat-mark mark-green">Rp</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Total pengeluaran</span>
          <strong>{formatRupiah(totalSpent)}</strong>
          <small>{transactionCount} transaksi bulan ini</small>
          <span className="stat-mark mark-orange">↗</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Sisa dana</span>
          <strong>{hasBudget ? formatRupiah(totalRemaining) : "-"}</strong>
          <small>{hasBudget ? "Dari seluruh pos anggaran" : "Atur anggaran terlebih dahulu"}</small>
          <span className="stat-mark mark-blue">◎</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Batas harian</span>
          <strong>{hasBudget ? formatRupiah(dailyLimit) : "-"}</strong>
          <small>Estimasi sisa dana per hari</small>
          <span className="stat-mark mark-purple">⌁</span>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ALOKASI DANA</p>
            <h2>Pembagian uang bulanan</h2>
          </div>
          <button className="button button-secondary" type="button" onClick={() => onNavigate("anggaran")}>Kelola anggaran <span aria-hidden="true">→</span></button>
        </div>
        {hasBudget ? (
          <>
            <AnggaranCards budget={budget} usage={usage} />
            <p className="cascade-note"><span className="cascade-icon">↳</span> Sistem berjenjang aktif: Pokok → Nabung → Belanja. Dana pos berikutnya digunakan otomatis saat pos sebelumnya tidak mencukupi.</p>
            {usage.unfunded > 0 && (
              <div className="notice notice-warning">
                <strong>Pengeluaran melewati total anggaran sebesar {formatRupiah(usage.unfunded)}.</strong>
                <span>Ketiga pos sudah habis. Pertimbangkan menyesuaikan anggaran atau mengurangi pengeluaran.</span>
              </div>
            )}
          </>
        ) : (
          <div className="empty-panel">
            <span className="empty-icon">＋</span>
            <strong>Belum ada pembagian dana</strong>
            <p>Atur uang bulanan dan tentukan nominal untuk Pokok, Nabung, serta Belanja.</p>
            <button type="button" className="button button-primary" onClick={() => onNavigate("anggaran")}>Buat anggaran bulan ini</button>
          </div>
        )}
      </section>

      <section className="dashboard-lower">
        <div className="panel category-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">POLA PENGELUARAN</p>
              <h2>Pengeluaran per kategori</h2>
            </div>
          </div>
          {categoryTotals.length ? (
            <div className="category-bars">
              {categoryTotals.slice(0, 6).map((item) => (
                <div className="category-bar-row" key={item.category}>
                  <div className="category-bar-label"><span>{item.category}</span><strong>{formatRupiah(item.amount)}</strong></div>
                  <div className="progress-track category-track"><span className="progress-fill" style={{ width: `${totalCategories ? (item.amount / totalCategories) * 100 : 0}%` }} /></div>
                </div>
              ))}
            </div>
          ) : <p className="empty-copy">Belum ada pengeluaran pada bulan ini.</p>}
        </div>

        <div className="panel insight-panel">
          <p className="eyebrow">CATATAN RECEH</p>
          <h2>Jaga pengeluaran tetap terkendali.</h2>
          <p>Catat transaksi segera setelah membayar. Dengan begitu, sisa dana dan pembagian anggaran selalu lebih mudah dipantau.</p>
          <button className="inline-link" type="button" onClick={() => onNavigate("transaksi")}>Lihat semua transaksi <span>→</span></button>
        </div>
      </section>

      <section className="panel recent-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AKTIVITAS TERBARU</p>
            <h2>Transaksi terakhir</h2>
          </div>
          <button className="inline-link" type="button" onClick={() => onNavigate("transaksi")}>Semua transaksi <span>→</span></button>
        </div>
        {transactions.length ? (
          <div className="transaction-list">
            {transactions.slice(0, 5).map((item) => (
              <KartuPengeluaran key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} isDeleting={deletingId === item.id} />
            ))}
          </div>
        ) : <p className="empty-copy">Belum ada transaksi untuk bulan ini.</p>}
      </section>
    </div>
  );
}

export default Dashboard;
