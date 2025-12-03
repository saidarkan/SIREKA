// Artikel.test.jsx
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Artikel from "./pages/Artikel"; // ✅ sesuaikan path sesuai folder kamu
import MainLayout from "./layouts/MainLayout";

// ✅ Mock data JSON biar gak load file asli
jest.mock("./pages/artikels.json", () => [
  {
    id: 1,
    judul: "Tips Merawat Mobil",
    kategori: "Perawatan",
    tanggal: "2024-06-10",
    gambar: "mobil.jpg",
    kutipan: "Cara mudah menjaga performa mobil Anda.",
  },
  {
    id: 2,
    judul: "Liburan dengan Mobil Keluarga",
    kategori: "Perjalanan",
    tanggal: "2024-07-05",
    gambar: "keluarga.jpg",
    kutipan: "Nikmati liburan nyaman dengan tips berikut.",
  },
]);

describe("📰 Komponen Artikel (dalam routing asli)", () => {
  const renderWithRouter = (initialRoute = "/artikel") => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/artikel" element={<Artikel />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test("menampilkan banner dan daftar artikel", () => {
    renderWithRouter();

    expect(screen.getByText(/DAFTAR ARTIKEL/i)).toBeInTheDocument();
    expect(screen.getByText("Tips Merawat Mobil")).toBeInTheDocument();
    expect(screen.getByText("Liburan dengan Mobil Keluarga")).toBeInTheDocument();
  });

  test("bisa memfilter artikel berdasarkan kategori", () => {
    renderWithRouter();

    const perjalananButtons = screen.getAllByText("Perjalanan");
    fireEvent.click(perjalananButtons[0]);

    expect(screen.queryByText("Tips Merawat Mobil")).not.toBeInTheDocument();
    expect(screen.getByText("Liburan dengan Mobil Keluarga")).toBeInTheDocument();
  });

  test("navigasi halaman berfungsi (pagination)", () => {
    renderWithRouter();

    const nextButton = screen.queryByText(/Selanjutnya/i);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
