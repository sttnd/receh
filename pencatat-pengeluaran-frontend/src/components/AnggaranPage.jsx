import { useEffect, useState } from "react";
import AnggaranCards from "./AnggaranCards";
import { formatRupiah } from "../utils/finance";

const createForm = (budget) => ({
  totalBulanan: String(budget?.totalBulanan || ""),
  pokok: String(budget?.pokok ?? ""),
  nabung: String(budget?.nabung ?? ""),
  belanja: String(budget?.belanja ?? ""),
});

function AnggaranPage({ budget, usage, monthLabel, onSave, isSaving }) {
  const [form, setForm] = useState(() => createForm(budget));
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    setForm(createForm(budget));
    setFormError("");
    setFormSuccess("");
  }, [budget]);

  const values = {
    totalBulanan: Number(form.totalBulanan) || 0,
    pokok: Number(form.pokok) || 0,
    nabung: Number(form.nabung) || 0,
    belanja: Number(form.belanja) || 0,
  };
  const totalAlokasi = values.pokok + values.nabung + values.belanja;
  const selisih = values.totalBulanan - totalAlokasi;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFormError("");
    setFormSuccess("");
  };

  const usePreset = () => {
    const total = Number(form.totalBulanan);
    if (!Number.isFinite(total) || total <= 0) {
      setFormError("Isi uang bulanan terlebih dahulu untuk menggunakan pembagian otomatis.");
      return;
    }
    const pokok = Math.round(total * 0.6);
    const nabung = Math.round(total * 0.25);
    const belanja = total - pokok - nabung;
    setForm((current) => ({ ...current, pokok: String(pokok), nabung: String(nabung), belanja: String(belanja) }));
    setFormError("");
    setFormSuccess("Preset 60:25:15 diterapkan. Kamu masih bisa mengubah nominalnya.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (values.totalBulanan <= 0) return setFormError("Uang bulanan harus lebih dari Rp0.");
    if ([values.pokok, values.nabung, values.belanja].some((value) => value < 0 || !Number.isInteger(value))) {
      return setFormError("Setiap alokasi harus berupa bilangan bulat dan tidak boleh negatif.");
    }
    if (totalAlokasi !== values.totalBulanan) {
      return setFormError(`Total alokasi ${formatRupiah(totalAlokasi)} harus sama dengan uang bulanan ${formatRupiah(values.totalBulanan)}.`);
    }

    const saved = await onSave(values);
    if (saved) setFormSuccess("Anggaran bulanan berhasil disimpan.");
  };

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">PERENCANAAN KEUANGAN</p>
        <h2>Atur uang bulananmu.</h2>
        <p>Tentukan jumlah uang yang tersedia, lalu bagi ke tiga pos sesuai prioritas kebutuhanmu untuk {monthLabel}.</p>
      </section>

      <div className="budget-layout">
        <section className="panel budget-form-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PENGATURAN BULANAN</p>
              <h2>{budget ? "Ubah anggaran" : "Buat anggaran"}</h2>
            </div>
            <span className="month-mini">{monthLabel}</span>
          </div>

          <form className="budget-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Total uang bulanan</span>
              <div className="currency-input"><span>Rp</span><input type="number" min="1" step="1" name="totalBulanan" placeholder="5000000" value={form.totalBulanan} onChange={handleChange} required /></div>
              <small>Masukkan uang yang tersedia untuk bulan ini.</small>
            </label>

            <div className="allocation-heading">
              <div><strong>Pembagian dana</strong><span>Sesuaikan nominal setiap pos.</span></div>
              <button className="text-button" type="button" onClick={usePreset}>Pakai preset 60:25:15</button>
            </div>

            <label className="field allocation-field allocation-pokok">
              <span><i /> Pokok</span>
              <div className="currency-input"><span>Rp</span><input type="number" min="0" step="1" name="pokok" placeholder="3000000" value={form.pokok} onChange={handleChange} /></div>
              <small>Makan, tagihan, transportasi, dan kebutuhan utama.</small>
            </label>
            <label className="field allocation-field allocation-nabung">
              <span><i /> Nabung</span>
              <div className="currency-input"><span>Rp</span><input type="number" min="0" step="1" name="nabung" placeholder="1250000" value={form.nabung} onChange={handleChange} /></div>
              <small>Simpanan dan dana cadangan.</small>
            </label>
            <label className="field allocation-field allocation-belanja">
              <span><i /> Belanja</span>
              <div className="currency-input"><span>Rp</span><input type="number" min="0" step="1" name="belanja" placeholder="750000" value={form.belanja} onChange={handleChange} /></div>
              <small>Keinginan, hiburan, dan belanja tambahan.</small>
            </label>

            <div className={`allocation-total ${selisih === 0 && values.totalBulanan > 0 ? "balanced" : "unbalanced"}`}>
              <div><span>Total alokasi</span><strong>{formatRupiah(totalAlokasi)}</strong></div>
              <div><span>{selisih === 0 ? "Sesuai anggaran" : selisih > 0 ? "Belum dialokasikan" : "Melebihi uang bulanan"}</span><strong>{formatRupiah(Math.abs(selisih))}</strong></div>
            </div>

            {formError && <p className="field-error">{formError}</p>}
            {formSuccess && <p className="field-success">{formSuccess}</p>}
            <button className="button button-primary button-full" type="submit" disabled={isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan anggaran"}
            </button>
          </form>
        </section>

        <div className="budget-side-column">
          <section className="panel budget-preview-panel">
            <p className="eyebrow">PREVIEW ALOKASI</p>
            <h2>Rencana dana</h2>
            <strong className="preview-total">{formatRupiah(values.totalBulanan)}</strong>
            <div className="allocation-stack">
              {[
                { key: "pokok", label: "Pokok", color: "stack-pokok" },
                { key: "nabung", label: "Nabung", color: "stack-nabung" },
                { key: "belanja", label: "Belanja", color: "stack-belanja" },
              ].map((item) => (
                <div className="stack-row" key={item.key}>
                  <span>{item.label}</span>
                  <div className="stack-track"><i className={item.color} style={{ width: `${values.totalBulanan ? Math.min(100, (values[item.key] / values.totalBulanan) * 100) : 0}%` }} /></div>
                  <strong>{values.totalBulanan ? Math.round((values[item.key] / values.totalBulanan) * 100) : 0}%</strong>
                </div>
              ))}
            </div>
          </section>

          {budget && (
            <section className="panel current-budget-panel">
              <p className="eyebrow">POS SAAT INI</p>
              <h2>Sisa anggaran</h2>
              <AnggaranCards budget={budget} usage={usage} compact />
            </section>
          )}

          <section className="cascade-card">
            <span className="cascade-card-symbol">↳</span>
            <div>
              <strong>Sistem dana berjenjang</strong>
              <p>Jika Pokok tidak cukup, Receh mengambil kekurangannya dari Nabung. Jika Nabung habis, dana Belanja menjadi cadangan terakhir.</p>
              <div className="cascade-flow"><b>Pokok</b><span>→</span><b>Nabung</b><span>→</span><b>Belanja</b></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AnggaranPage;
