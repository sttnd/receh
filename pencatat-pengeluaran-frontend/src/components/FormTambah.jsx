import { useState } from "react";

const formKosong = {
  keterangan: "",
  kategori: "Makanan",
  nominal: "",
  tanggal: "",
};

function FormTambah({ onSubmit, initialData, onCancel, isSubmitting }) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          keterangan: initialData.keterangan,
          kategori: initialData.kategori,
          nominal: String(initialData.nominal),
          tanggal: initialData.tanggal,
        }
      : formKosong,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const keterangan = form.keterangan.trim();
    const nominal = Number(form.nominal);

    if (keterangan.length < 3) {
      window.alert("Keterangan minimal terdiri dari 3 karakter.");
      return;
    }

    if (!Number.isFinite(nominal) || nominal <= 0) {
      window.alert("Nominal harus berupa angka lebih dari 0.");
      return;
    }

    if (!form.tanggal) {
      window.alert("Tanggal pengeluaran wajib diisi.");
      return;
    }

    const berhasil = await onSubmit({
      keterangan,
      kategori: form.kategori,
      nominal,
      tanggal: form.tanggal,
    });

    if (berhasil && !initialData) {
      setForm(formKosong);
    }
  };

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{initialData ? "PERBARUI DATA" : "TRANSAKSI BARU"}</p>
          <h2>{initialData ? "Edit Pengeluaran" : "Tambah Pengeluaran"}</h2>
        </div>
        {initialData && (
          <button type="button" className="button button-light" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>

      <form className="form-tambah" onSubmit={handleSubmit}>
        <label>
          Keterangan
          <input
            type="text"
            name="keterangan"
            placeholder="Contoh: Makan siang"
            value={form.keterangan}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </label>

        <label>
          Kategori
          <select name="kategori" value={form.kategori} onChange={handleChange}>
            <option value="Makanan">Makanan</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </label>

        <label>
          Nominal (Rp)
          <input
            type="number"
            name="nominal"
            placeholder="Contoh: 15000"
            value={form.nominal}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
        </label>

        <label>
          Tanggal
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Menyimpan..."
            : initialData
              ? "Simpan Perubahan"
              : "Tambah Pengeluaran"}
        </button>
      </form>
    </section>
  );
}

export default FormTambah;
