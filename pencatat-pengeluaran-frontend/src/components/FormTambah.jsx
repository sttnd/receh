function FormTambah() {
  return (
    <section className="form-tambah">
      <h2>Tambah Pengeluaran</h2>
      <input type="text" placeholder="Keterangan (mis. Makan siang)" />
      <select>
        <option>Makanan</option>
        <option>Transportasi</option>
        <option>Pendidikan</option>
        <option>Hiburan</option>
        <option>Lainnya</option>
      </select>
      <input type="number" placeholder="Nominal (Rp)" />
      <input type="date" />
      <button type="button">Tambah</button>
    </section>
  );
}

export default FormTambah;