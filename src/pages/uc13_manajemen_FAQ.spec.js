// src/pages/uc13_manajemen_faq.spec.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Faq from "./FAQ";
import { FaqAPI } from "../services/faqAPI";

// Mock API
jest.mock("../services/faqAPI");

const mockFaqs = [
  { id: 1, pertanyaan: "Apa itu Mie Ndower?", jawaban: "Produk mie pedas khas UMKM kami." },
  { id: 2, pertanyaan: "Apakah bisa pesan online?", jawaban: "Belum, hanya offline ya!" },
];

describe("UC_13 Manajemen FAQ", () => {
  beforeEach(() => {
    FaqAPI.fetchAll.mockResolvedValue(mockFaqs);
    FaqAPI.create.mockResolvedValue({});
    FaqAPI.update.mockResolvedValue({});
    FaqAPI.delete.mockResolvedValue({});
    jest.clearAllMocks();
  });

  test("render halaman dan tampilkan daftar FAQ", async () => {
    render(<Faq />);
    expect(screen.getByText(/Manajemen FAQ/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Apa itu Mie Ndower?")).toBeInTheDocument();
      expect(screen.getByText("Apakah bisa pesan online?")).toBeInTheDocument();
    });
  });

  test("tambah FAQ baru", async () => {
    render(<Faq />);
    await waitFor(() => screen.getByText("Apa itu Mie Ndower?"));

    fireEvent.change(screen.getByPlaceholderText("Pertanyaan"), {
      target: { value: "Apa bahan utama mie ini?" },
    });
    fireEvent.change(screen.getByPlaceholderText("Jawaban"), {
      target: { value: "Tepung terigu dan cabai pilihan." },
    });

    fireEvent.click(screen.getByText("Tambah"));

    await waitFor(() => {
      expect(FaqAPI.create).toHaveBeenCalledWith({
        pertanyaan: "Apa bahan utama mie ini?",
        jawaban: "Tepung terigu dan cabai pilihan.",
      });
    });
  });

  test("edit FAQ", async () => {
    render(<Faq />);
    await waitFor(() => screen.getByText("Apa itu Mie Ndower?"));

    // Klik tombol edit pertama
    fireEvent.click(screen.getAllByTitle("Edit")[0]);

    const pertanyaanInput = screen.getByPlaceholderText("Pertanyaan");
    fireEvent.change(pertanyaanInput, { target: { value: "Apa itu Mie Ndower Edited?" } });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(FaqAPI.update).toHaveBeenCalledWith(1, {
        pertanyaan: "Apa itu Mie Ndower Edited?",
        jawaban: "Produk mie pedas khas UMKM kami.",
      });
    });
  });

  test("hapus FAQ", async () => {
    window.confirm = jest.fn(() => true); // otomatis konfirmasi yes
    render(<Faq />);
    await waitFor(() => screen.getByText("Apa itu Mie Ndower?"));

    fireEvent.click(screen.getAllByTitle("Hapus")[0]);

    await waitFor(() => {
      expect(FaqAPI.delete).toHaveBeenCalledWith(1);
    });
  });


});
