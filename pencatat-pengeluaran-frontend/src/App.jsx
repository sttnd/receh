import Header from "./components/Header";
import FormTambah from "./components/FormTambah";
import RingkasanTotal from "./components/RingkasanTotal";
import DaftarPengeluaran from "./components/DaftarPengeluaran";
import "./App.css";

const dataAwal = [
  { id: 1, keterangan: "Makan siang di warteg", kategori: "Makanan", nominal: 15000, tanggal: "2026-10-20" },
  { id: 2, keterangan: "Bensin motor", kategori: "Transportasi", nominal: 25000, tanggal: "2026-10-21" },
  { id: 3, keterangan: "Fotokopi modul praktikum", kategori: "Pendidikan", nominal: 12000, tanggal: "2026-10-22" },
  { id: 4, keterangan: "Paket data bulanan", kategori: "Lainnya", nominal: 55000, tanggal: "2026-10-23" },
  { id: 5, keterangan: "Nonton bareng teman", kategori: "Hiburan", nominal: 40000, tanggal: "2026-10-24" },
];

function App() {
  const total = dataAwal.reduce((jumlah, item) => jumlah + item.nominal, 0);

  return (
    <div className="container">
      <Header judul="Pencatat Pengeluaran" subjudul="Catat uang keluar harianmu dengan rapi" />
      <RingkasanTotal jumlahData={dataAwal.length} totalNominal={total} />
      <FormTambah />
      <DaftarPengeluaran daftar={dataAwal} />
    </div>
  );
}

export default App;