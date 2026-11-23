import { request } from "./httpClient";

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
  remove: (id) => request(`/pengeluaran/${id}`, { method: "DELETE" }),
};
