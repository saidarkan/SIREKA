import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tim from "./Tim";
import { TimAPI } from "../services/timAPI";
import { act } from "react-dom/test-utils";

// Mock API
jest.mock("../services/timAPI");

const mockDataTim = [
  { id: 1, nama: "Arkan", posisi: "Developer", gambar: "./img/1.jpeg" },
  { id: 2, nama: "Sari", posisi: "Designer", gambar: "" },
];

describe("UC_10 Manajemen Tim", () => {
  beforeEach(() => {
    TimAPI.fetchAll.mockResolvedValue(mockDataTim);
    TimAPI.create.mockResolvedValue({});
    TimAPI.update.mockResolvedValue({});
    TimAPI.delete.mockResolvedValue({});
  });

  test("render halaman dan tampilkan daftar tim", async () => {
    await act(async () => {
      render(<Tim />);
    });

    expect(screen.getByText(/Manajemen Tim/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Arkan")).toBeInTheDocument();
      expect(screen.getByText("Sari")).toBeInTheDocument();
    });
  });

  test("tambah tim baru", async () => {
    await act(async () => {
      render(<Tim />);
    });

    // Isi form
    fireEvent.change(screen.getByPlaceholderText("Nama"), { target: { value: "Teguh" } });
    fireEvent.change(screen.getByPlaceholderText("Posisi"), { target: { value: "Tester" } });
    fireEvent.change(screen.getByPlaceholderText(/Path Gambar/i), { target: { value: "./img/3.jpeg" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(TimAPI.create).toHaveBeenCalledWith({
        nama: "Teguh",
        posisi: "Tester",
        gambar: "./img/3.jpeg",
      });
    });
  });

  test("edit tim", async () => {
    await act(async () => {
      render(<Tim />);
    });

    await waitFor(() => screen.getByText("Arkan"));

    fireEvent.click(screen.getAllByTitle("Edit")[0]);

    const namaInput = screen.getByPlaceholderText("Nama");
    fireEvent.change(namaInput, { target: { value: "Arkan Edited" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(TimAPI.update).toHaveBeenCalledWith(1, {
        nama: "Arkan Edited",
        posisi: "Developer",
        gambar: "./img/1.jpeg",
      });
    });
  });

  test("hapus tim", async () => {
    window.confirm = jest.fn(() => true); // otomatis konfirmasi yes

    await act(async () => {
      render(<Tim />);
    });

    await waitFor(() => screen.getByText("Arkan"));

    fireEvent.click(screen.getAllByTitle("Hapus")[0]);

    await waitFor(() => {
      expect(TimAPI.delete).toHaveBeenCalledWith(1);
    });
  });
});
