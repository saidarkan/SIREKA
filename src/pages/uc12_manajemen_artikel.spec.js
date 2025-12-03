import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Artikel from "./Artikel";

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("UC_12 Manajemen Artikel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("render halaman dan tampilkan daftar artikel", async () => {
    await act(async () => {
      render(<Artikel />);
    });

    expect(screen.getByText(/Daftar Artikel Rental/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/R001/i)).toBeInTheDocument();
    });
  });

  test("tambah artikel baru", async () => {
    await act(async () => {
      render(<Artikel />);
    });

    fireEvent.click(screen.getByText(/\+ Add Article/i));

    fireEvent.change(screen.getByPlaceholderText("Judul Artikel"), { target: { value: "Test Artikel" } });
    fireEvent.change(screen.getByPlaceholderText("Penulis"), { target: { value: "Arkan" } });
    fireEvent.change(screen.getByPlaceholderText("Kategori"), { target: { value: "Tech" } });

    const statusSelect = screen.getByRole("combobox");
    fireEvent.change(statusSelect, { target: { value: "Published" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    await waitFor(() => {
      expect(screen.getByText("Test Artikel")).toBeInTheDocument();
    });
  });

  test("edit artikel", async () => {
    await act(async () => {
      render(<Artikel />);
    });

    const editButtons = await screen.findAllByText("Edit");

    await act(async () => {
      fireEvent.click(editButtons[0]);
    });

    const titleInput = screen.getByPlaceholderText("Judul Artikel");
    fireEvent.change(titleInput, { target: { value: "Artikel Edited" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Update"));
    });

    await waitFor(() => {
      expect(screen.getByText("Artikel Edited")).toBeInTheDocument();
    });
  });

  test("hapus artikel", async () => {
    await act(async () => {
      render(<Artikel />);
    });

    const deleteButtons = await screen.findAllByText("Delete");

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(screen.queryByText(/R001/i)).not.toBeInTheDocument();
    });
  });


  });

