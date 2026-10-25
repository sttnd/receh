import { useState } from "react";
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
  const [daftar, setDaftar] = useState(dataAwal);

  const tambahPengeluaran = (itemBaru) => {
    setDaftar([...daftar, { id: Date.now(), ...itemBaru }]);
  };

  const total = daftar.reduce((jumlah, item) => jumlah + item.nominal, 0);

  return (
    <div className="container">
      <Header judul="Pencatat Pengeluaran" subjudul="Catat uang keluar harianmu dengan rapi" />
      <RingkasanTotal jumlahData={daftar.length} totalNominal={total} />
      <FormTambah onTambah={tambahPengeluaran} />
      <DaftarPengeluaran daftar={daftar} />
    </div>
  );
}

export default App;