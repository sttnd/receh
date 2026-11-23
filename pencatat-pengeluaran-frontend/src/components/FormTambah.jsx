import { useState } from "react";
import { getToday, KATEGORI_PENGELUARAN, POS_ANGGARAN, SUMBER_DANA } from "../utils/finance";

const createEmptyForm = () => ({
  keterangan: "",
  kategori: "Makanan",
  posAnggaran: "Pokok",
  sumberDana: "Tunai",
  nominal: "",
  tanggal: getToday(),
});

function FormTambah({ onSubmit, initialData, onCancel, isSubmitting }) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          keterangan: initialData.keterangan,
          kategori: initialData.kategori,
          posAnggaran: initialData.posAnggaran || "Pokok",
          sumberDana: initialData.sumberDana || "Tunai",
          nominal: String(initialData.nominal),
          tanggal: initialData.tanggal,
        }
      : createEmptyForm(),
  );
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const keterangan = form.keterangan.trim();
    const nominal = Number(form.nominal);

    if (keterangan.length < 3) return setFormError("Keterangan minimal 3 karakter.");
    if (!Number.isFinite(nominal) || nominal <= 0) return setFormError("Nominal harus lebih dari Rp0.");
    if (!form.tanggal) return setFormError("Tanggal transaksi wajib diisi.");

    const berhasil = await onSubmit({
      keterangan,
      kategori: form.kategori,
      posAnggaran: form.posAnggaran,
      sumberDana: form.sumberDana,
      nominal,
      tanggal: form.tanggal,
    });

    if (berhasil && !initialData) setForm(createEmptyForm());
  };

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{initialData ? "PERBARUI CATATAN" : "CATAT PENGELUARAN"}</p>
          <h2>{initialData ? "Edit transaksi" : "Transaksi baru"}</h2>
        </div>
        {initialData && (
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        <label className="field field-wide">
          <span>Keterangan</span>
          <input name="keterangan" type="text" placeholder="Contoh: Belanja kebutuhan dapur" value={form.keterangan} onChange={handleChange} maxLength={100} required />
        </label>
        <label className="field">
          <span>Kategori transaksi</span>
          <select name="kategori" value={form.kategori} onChange={handleChange}>
            {KATEGORI_PENGELUARAN.map((kategori) => <option key={kategori} value={kategori}>{kategori}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Diambil dari pos</span>
          <select name="posAnggaran" value={form.posAnggaran} onChange={handleChange}>
            {POS_ANGGARAN.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Sumber dana</span>
          <select name="sumberDana" value={form.sumberDana} onChange={handleChange}>
            {SUMBER_DANA.map((sumber) => <option key={sumber} value={sumber}>{sumber}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Nominal (Rp)</span>
          <input name="nominal" type="number" placeholder="25000" value={form.nominal} onChange={handleChange} min="1" step="1" required />
        </label>
        <label className="field">
          <span>Tanggal</span>
          <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} required />
        </label>
        <div className="form-hint field-wide">
          <span className="hint-icon">i</span>
          Pos anggaran menunjukkan alokasi (Pokok, Nabung, atau Belanja). Sumber dana menunjukkan tempat uang disimpan atau metode pembayaran. Pengeluaran tetap mengikuti urutan dana Pokok → Nabung → Belanja.
        </div>
        {formError && <p className="field-error field-wide">{formError}</p>}
        <button className="button button-primary field-wide" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : initialData ? "Simpan perubahan" : "+ Simpan transaksi"}
        </button>
      </form>
    </section>
  );
}

export default FormTambah;
