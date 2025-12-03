// src/pages/uc11_manajemen_lowongan.spec.js
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Lowongan from "./Lowongan";
import { LowonganAPI } from "../services/lowonganAPI";

// Mock API
jest.mock("../services/lowonganAPI");

const mockLowongans = [
  { id: 1, posisi: "Developer", lokasi: "Jakarta", deskripsi: "Membuat aplikasi" },
  { id: 2, posisi: "Designer", lokasi: "Bandung", deskripsi: "Mendesain UI/UX" },
];

describe("UC_11 Manajemen Lowongan", () => {
  beforeEach(() => {
    LowonganAPI.fetchAll.mockResolvedValue(mockLowongans);
    LowonganAPI.create.mockResolvedValue({});
    LowonganAPI.update.mockResolvedValue({});
    LowonganAPI.delete.mockResolvedValue({});
  });

  test("render halaman dan tampilkan daftar lowongan", async () => {
    await act(async () => render(<Lowongan />));

    expect(screen.getByText(/Manajemen Lowongan/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Developer")).toBeInTheDocument();
      expect(screen.getByText("Designer")).toBeInTheDocument();
    });
  });

  test("tambah lowongan baru", async () => {
    await act(async () => render(<Lowongan />));

    // tunggu tombol "Tambah" muncul
    await waitFor(() => expect(screen.getByText("Tambah")).toBeInTheDocument());

    // isi form
    fireEvent.change(screen.getByPlaceholderText("Posisi"), { target: { value: "Tester" } });
    fireEvent.change(screen.getByPlaceholderText("Lokasi"), { target: { value: "Surabaya" } });
    fireEvent.change(screen.getByPlaceholderText("Deskripsi pekerjaan"), { target: { value: "Menguji aplikasi" } });

    // klik tombol submit dengan act
    await act(async () => {
      fireEvent.click(screen.getByText("Tambah"));
    });

    await waitFor(() => {
      expect(LowonganAPI.create).toHaveBeenCalledWith({
        posisi: "Tester",
        lokasi: "Surabaya",
        deskripsi: "Menguji aplikasi",
      });
    });
  });

  test("edit lowongan", async () => {
    await act(async () => render(<Lowongan />));
    await waitFor(() => screen.getByText("Developer"));

    fireEvent.click(screen.getAllByTitle("Edit")[0]);

    const posisiInput = screen.getByPlaceholderText("Posisi");
    fireEvent.change(posisiInput, { target: { value: "Developer Edited" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Update"));
    });

    await waitFor(() => {
      expect(LowonganAPI.update).toHaveBeenCalledWith(1, {
        posisi: "Developer Edited",
        lokasi: "Jakarta",
        deskripsi: "Membuat aplikasi",
      });
    });
  });

  test("hapus lowongan", async () => {
    window.confirm = jest.fn(() => true); // otomatis konfirmasi yes
    await act(async () => render(<Lowongan />));
    await waitFor(() => screen.getByText("Developer"));

    await act(async () => {
      fireEvent.click(screen.getAllByTitle("Hapus")[0]);
    });

    await waitFor(() => {
      expect(LowonganAPI.delete).toHaveBeenCalledWith(1);
    });
  });
});
