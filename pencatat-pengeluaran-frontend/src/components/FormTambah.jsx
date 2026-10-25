import { useState } from "react";

function FormTambah({ onTambah }) {
  const [keterangan, setKeterangan] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [nominal, setNominal] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleTambah = () => {
    if (keterangan.trim() === "" || Number(nominal) <= 0 || tanggal === "") {
      alert("Lengkapi keterangan, nominal (lebih dari 0), dan tanggal dulu ya.");
      return;
    }

    onTambah({
      keterangan: keterangan.trim(),
      kategori,
      nominal: Number(nominal),
      tanggal,
    });

    setKeterangan("");
    setKategori("Makanan");
    setNominal("");
    setTanggal("");
  };

  return (
    <section className="form-tambah">
      <h2>Tambah Pengeluaran</h2>
      <input
        type="text"
        placeholder="Keterangan (mis. Makan siang)"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
        <option>Makanan</option>
        <option>Transportasi</option>
        <option>Pendidikan</option>
        <option>Hiburan</option>
        <option>Lainnya</option>
      </select>
      <input
        type="number"
        placeholder="Nominal (Rp)"
        value={nominal}
        onChange={(e) => setNominal(e.target.value)}
      />
      <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
      <button type="button" onClick={handleTambah}>
        Tambah
      </button>
    </section>
  );
}

export default FormTambah;