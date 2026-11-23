import { formatRupiah, getProgress } from "../utils/finance";

const descriptions = {
  Pokok: "Makan, tagihan, transportasi, dan kebutuhan wajib",
  Nabung: "Dana simpanan dan cadangan kebutuhan",
  Belanja: "Keinginan, hiburan, dan belanja tambahan",
};

function AnggaranCards({ budget, usage, compact = false }) {
  const buckets = [
    { name: "Pokok", amount: budget?.pokok || 0, tone: "primary" },
    { name: "Nabung", amount: budget?.nabung || 0, tone: "blue" },
    { name: "Belanja", amount: budget?.belanja || 0, tone: "orange" },
  ];

  return (
    <div className={`bucket-grid ${compact ? "bucket-grid-compact" : ""}`}>
      {buckets.map((bucket) => {
        const used = usage?.used?.[bucket.name] || 0;
        const remaining = usage?.remaining?.[bucket.name] || 0;
        const progress = getProgress(used, bucket.amount);
        return (
          <article className={`bucket-card bucket-${bucket.tone}`} key={bucket.name}>
            <div className="bucket-topline">
              <span className="bucket-symbol">{bucket.name === "Pokok" ? "01" : bucket.name === "Nabung" ? "02" : "03"}</span>
              <span className="bucket-status">{progress >= 100 ? "Terpakai penuh" : `${progress}% terpakai`}</span>
            </div>
            <div className="bucket-title">{bucket.name}</div>
            <p className="bucket-description">{descriptions[bucket.name]}</p>
            <strong className="bucket-remaining">{formatRupiah(remaining)}</strong>
            <span className="bucket-caption">sisa dari {formatRupiah(bucket.amount)}</span>
            <div className="progress-track">
              <span className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="bucket-foot">
              <span>Terpakai {formatRupiah(used)}</span>
              <span>{formatRupiah(bucket.amount)}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default AnggaranCards;
