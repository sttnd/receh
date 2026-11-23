import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AnggaranPage from "./components/AnggaranPage";
import TransaksiPage from "./components/TransaksiPage";
import { pengeluaranApi } from "./services/pengeluaranApi";
import { anggaranApi } from "./services/anggaranApi";
import {
  calculateBudgetUsage,
  emptyBudget,
  formatMonth,
  getCurrentMonth,
} from "./utils/finance";
import "./App.css";

const pageTitles = {
  dashboard: "Dashboard",
  transaksi: "Transaksi",
  anggaran: "Anggaran bulanan",
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBudgetLoading, setIsBudgetLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBudgetSaving, setIsBudgetSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const loadTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await pengeluaranApi.findAll();
      setTransactions(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    let isCurrentRequest = true;
    setIsBudgetLoading(true);

    anggaranApi.findOne(selectedMonth)
      .then((data) => {
        if (isCurrentRequest) setBudget(data);
      })
      .catch((err) => {
        if (isCurrentRequest) {
          setBudget(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (isCurrentRequest) setIsBudgetLoading(false);
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedMonth]);

  const monthTransactions = useMemo(
    () => transactions
      .filter((item) => item.tanggal?.slice(0, 7) === selectedMonth)
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal) || Number(b.id) - Number(a.id)),
    [transactions, selectedMonth],
  );

  const budgetUsage = useMemo(
    () => calculateBudgetUsage(monthTransactions, budget || emptyBudget(selectedMonth)),
    [monthTransactions, budget, selectedMonth],
  );

  const totalSpent = useMemo(
    () => monthTransactions.reduce((sum, item) => sum + Number(item.nominal), 0),
    [monthTransactions],
  );

  const categoryTotals = useMemo(() => {
    const totals = monthTransactions.reduce((result, item) => {
      result[item.kategori] = (result[item.kategori] || 0) + Number(item.nominal);
      return result;
    }, {});
    return Object.entries(totals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [monthTransactions]);

  const dailyLimit = useMemo(() => {
    if (!budget) return 0;
    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const isCurrentMonth = selectedMonth === getCurrentMonth();
    const daysRemaining = isCurrentMonth
      ? Math.max(1, daysInMonth - new Date().getDate() + 1)
      : daysInMonth;
    const remaining = Object.values(budgetUsage.remaining).reduce((sum, value) => sum + value, 0);
    return Math.floor(remaining / daysRemaining);
  }, [budget, budgetUsage, selectedMonth]);

  const handleSaveExpense = async (data) => {
    setIsSubmitting(true);
    setError("");
    try {
      if (editingItem) {
        const updated = await pengeluaranApi.update(editingItem.id, data);
        setTransactions((current) => current.map((item) => item.id === updated.id ? updated : item));
        setEditingItem(null);
      } else {
        const created = await pengeluaranApi.create(data);
        setTransactions((current) => [created, ...current]);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Hapus transaksi ini? Tindakan ini tidak dapat dibatalkan.")) return;
    setDeletingId(id);
    setError("");
    try {
      await pengeluaranApi.remove(id);
      setTransactions((current) => current.filter((item) => item.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveBudget = async (data) => {
    setIsBudgetSaving(true);
    setError("");
    try {
      const saved = await anggaranApi.save(selectedMonth, data);
      setBudget(saved);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsBudgetSaving(false);
    }
  };

  const navigate = (page) => {
    setActivePage(page);
    if (page !== "transaksi") setEditingItem(null);
  };

  const startNewTransaction = () => {
    setEditingItem(null);
    setActivePage("transaksi");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setActivePage("transaksi");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const monthLabel = formatMonth(selectedMonth);

  return (
    <div className="app-layout">
      <Header activePage={activePage} onNavigate={navigate} />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-title">
            <span className="topbar-kicker">RECEH / PERSONAL FINANCE</span>
            <h1>{pageTitles[activePage]}</h1>
          </div>
          <div className="topbar-actions">
            <label className="month-picker">
              <span>Bulan</span>
              <input type="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} />
            </label>
            <button className="button button-primary topbar-add" type="button" onClick={startNewTransaction}>+ Transaksi</button>
          </div>
        </header>

        {error && (
          <div className="alert-error" role="alert">
            <span>{error}</span>
            <button type="button" className="alert-close" onClick={() => setError("")} aria-label="Tutup pesan">×</button>
          </div>
        )}

        {(isLoading && !transactions.length) || isBudgetLoading ? (
          <div className="loading-screen"><span className="loading-spinner" /><p>Menyiapkan ringkasan keuangan...</p></div>
        ) : (
          <>
            {activePage === "dashboard" && (
              <Dashboard
                monthLabel={monthLabel}
                budget={budget}
                usage={budgetUsage}
                totalSpent={totalSpent}
                transactionCount={monthTransactions.length}
                transactions={monthTransactions}
                categoryTotals={categoryTotals}
                dailyLimit={dailyLimit}
                onNavigate={navigate}
                onAddTransaction={startNewTransaction}
                onEdit={handleEdit}
                onDelete={handleDeleteExpense}
                deletingId={deletingId}
              />
            )}
            {activePage === "transaksi" && (
              <TransaksiPage
                transactions={monthTransactions}
                monthLabel={monthLabel}
                editingItem={editingItem}
                onEdit={handleEdit}
                onCancelEdit={() => setEditingItem(null)}
                onSubmit={handleSaveExpense}
                onDelete={handleDeleteExpense}
                isSubmitting={isSubmitting}
                deletingId={deletingId}
                isLoading={isLoading}
              />
            )}
            {activePage === "anggaran" && (
              <AnggaranPage
                budget={budget}
                usage={budgetUsage}
                monthLabel={monthLabel}
                onSave={handleSaveBudget}
                isSaving={isBudgetSaving}
              />
            )}
          </>
        )}

        <footer className="app-footer">
          <span>Receh © {new Date().getFullYear()}</span>
          <span>Kelola uang dengan lebih sadar.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
