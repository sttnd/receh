const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Tidak dapat terhubung ke backend. Pastikan server NestJS berjalan di http://localhost:3000.",
    );
  }

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(payload.message)
      ? payload.message.join(", ")
      : payload.message || "Terjadi kesalahan pada server.";
    throw new Error(message);
  }

  return payload;
}

export const pengeluaranApi = {
  findAll: () => request("/pengeluaran"),
  findOne: (id) => request(`/pengeluaran/${id}`),
  create: (data) =>
    request("/pengeluaran", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/pengeluaran/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id) =>
    request(`/pengeluaran/${id}`, {
      method: "DELETE",
    }),
};
