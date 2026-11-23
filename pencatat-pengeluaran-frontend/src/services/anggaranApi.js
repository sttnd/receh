import { request } from "./httpClient";

export const anggaranApi = {
  findOne: async (bulan) => {
    const result = await request(`/anggaran/${bulan}`);
    return result?.configured === false ? null : result;
  },
  save: (bulan, data) =>
    request(`/anggaran/${bulan}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
