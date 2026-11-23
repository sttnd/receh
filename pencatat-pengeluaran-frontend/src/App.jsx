import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import FormTambah from "./components/FormTambah";
import RingkasanTotal from "./components/RingkasanTotal";
import DaftarPengeluaran from "./components/DaftarPengeluaran";
import { pengeluaranApi } from "./services/pengeluaranApi";
import "./App.css";

function App() {
  const [daftar, setDaftar] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const muatPengeluaran = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await pengeluaranApi.findAll();
      setDaftar(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    muatPengeluaran();
  }, [muatPengeluaran]);

  const total = useMemo(
    () => daftar.reduce((jumlah, item) => jumlah + Number(item.nominal), 0),
    [daftar],
  );

  const simpanPengeluaran = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (editingItem) {
        const updated = await pengeluaranApi.update(editingItem.id, data);
        setDaftar((current) =>
          current.map((item) => (item.id === updated.id ? updated : item)),
        );
        setEditingItem(null);
      } else {
        const created = await pengeluaranApi.create(data);
        setDaftar((current) => [created, ...current]);
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const hapusPengeluaran = async (id) => {
    const disetujui = window.confirm(
      "Apakah kamu yakin ingin menghapus transaksi ini?",
    );

    if (!disetujui) return;

    setDeletingId(id);
    setError("");

    try {
      await pengeluaranApi.remove(id);
      setDaftar((current) => current.filter((item) => item.id !== id));

      if (editingItem?.id === id) {
        setEditingItem(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="container">
      <Header
        judul="Pencatat Pengeluaran"
        subjudul="Catat dan kelola pengeluaran harianmu dengan lebih rapi"
      />

      <RingkasanTotal jumlahData={daftar.length} totalNominal={total} />

      {error && (
        <div className="alert-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="alert-close"
            onClick={() => setError("")}
            aria-label="Tutup pesan"
          >
            ×
          </button>
        </div>
      )}

      <FormTambah
        key={editingItem?.id ?? "new"}
        onSubmit={simpanPengeluaran}
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
        isSubmitting={isSubmitting}
      />

      <DaftarPengeluaran
        daftar={daftar}
        isLoading={isLoading}
        deletingId={deletingId}
        onEdit={setEditingItem}
        onDelete={hapusPengeluaran}
      />
    </main>
  );
}

export default App;
