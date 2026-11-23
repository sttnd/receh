export const POS_ANGGARAN = ["Pokok", "Nabung", "Belanja"];

export const SUMBER_DANA = [
  "Tunai",
  "Rekening Bank",
  "GoPay",
  "DANA",
  "OVO",
  "ShopeePay",
  "Kartu Debit",
  "Kartu Kredit",
  "Lainnya",
];

export const KATEGORI_PENGELUARAN = [
  "Makanan",
  "Transportasi",
  "Pendidikan",
  "Tagihan",
  "Kesehatan",
  "Hiburan",
  "Belanja",
  "Lainnya",
];

export const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

export const getToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export const formatMonth = (month) => {
  if (!month) return "";
  return new Date(`${month}-01T00:00:00`).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

export const formatDate = (date) => {
  if (!date) return "-";
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const emptyBudget = (bulan) => ({
  bulan,
  totalBulanan: 0,
  pokok: 0,
  nabung: 0,
  belanja: 0,
});

/**
 * Menghitung pemakaian dana dengan sistem berjenjang.
 * Pokok dapat memakai Nabung lalu Belanja. Nabung dapat memakai Belanja.
 * Belanja hanya menggunakan alokasi Belanja.
 */
export function calculateBudgetUsage(transactions, budget) {
  const remaining = {
    Pokok: Number(budget?.pokok) || 0,
    Nabung: Number(budget?.nabung) || 0,
    Belanja: Number(budget?.belanja) || 0,
  };
  const used = { Pokok: 0, Nabung: 0, Belanja: 0 };
  let unfunded = 0;
  const order = ["Pokok", "Nabung", "Belanja"];

  const chronological = [...transactions].sort((a, b) =>
    a.tanggal.localeCompare(b.tanggal) || Number(a.id) - Number(b.id),
  );

  chronological.forEach((transaction) => {
    let amountLeft = Number(transaction.nominal) || 0;
    const requestedBucket = transaction.posAnggaran || "Pokok";
    const startIndex = Math.max(order.indexOf(requestedBucket), 0);

    for (let index = startIndex; index < order.length && amountLeft > 0; index += 1) {
      const bucket = order[index];
      const taken = Math.min(remaining[bucket], amountLeft);
      remaining[bucket] -= taken;
      used[bucket] += taken;
      amountLeft -= taken;
    }

    if (amountLeft > 0) unfunded += amountLeft;
  });

  return { remaining, used, unfunded };
}

export const getProgress = (used, allocated) => {
  if (!allocated) return 0;
  return Math.min(100, Math.round((used / allocated) * 100));
};
