/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CarList from "../pages/CarList";
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

const getLastRow = () => {
  const rows = screen.getAllByTestId(/car-row-/i);
  return rows[rows.length - 1];
};

describe("UC_09 Manajemen Mobil", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("render halaman dan tampilkan daftar mobil", () => {
    render(<CarList />, { wrapper: Wrapper });
    expect(screen.getByText(/Car List/i)).toBeInTheDocument();
  });

  test("search mobil berdasarkan brand", async () => {
    render(<CarList />, { wrapper: Wrapper });
    fireEvent.change(screen.getByPlaceholderText(/Search car by brand/i), { target: { value: "Toyota" } });

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      rows.slice(1).forEach(row => expect(row).toHaveTextContent(/Toyota/i));
    });
  });

  test("tambah mobil baru", async () => {
    render(<CarList />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText(/\+ Add Car/i));
    fireEvent.change(screen.getByTestId("brand-input"), { target: { value: "Honda" } });
    fireEvent.change(screen.getByTestId("model-input"), { target: { value: "Civic" } });
    fireEvent.change(screen.getByTestId("year-input"), { target: { value: "2023" } });
    fireEvent.change(screen.getByTestId("price-input"), { target: { value: "500000" } });
    fireEvent.change(screen.getByTestId("seats-input"), { target: { value: "4" } });
    fireEvent.change(screen.getByTestId("transmission-input"), { target: { value: "Automatic" } });
    
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      const lastRow = getLastRow();
      expect(lastRow).toHaveTextContent("Honda");
      expect(lastRow).toHaveTextContent("Civic");
      expect(lastRow).toHaveTextContent("2023");
    });
  });

  test("edit mobil", async () => {
    render(<CarList />, { wrapper: Wrapper });

    // tambah mobil dulu
    fireEvent.click(screen.getByText(/\+ Add Car/i));
    fireEvent.change(screen.getByTestId("brand-input"), { target: { value: "Mitsubishi" } });
    fireEvent.change(screen.getByTestId("model-input"), { target: { value: "Pajero" } });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      const lastRow = getLastRow();
      const editButton = lastRow.querySelector('[data-testid^="car-edit-"]');
      fireEvent.click(editButton);
    });

    fireEvent.change(screen.getByTestId("brand-input"), { target: { value: "Mitsubishi X" } });
    fireEvent.click(screen.getByText(/Update/i));

    await waitFor(() => {
      const lastRow = getLastRow();
      expect(lastRow).toHaveTextContent("Mitsubishi X");
      expect(lastRow).toHaveTextContent("Pajero");
    });
  });

  test("hapus mobil", async () => {
    render(<CarList />, { wrapper: Wrapper });

    // tambah mobil dulu
    fireEvent.click(screen.getByText(/\+ Add Car/i));
    fireEvent.change(screen.getByTestId("brand-input"), { target: { value: "Suzuki" } });
    fireEvent.change(screen.getByTestId("model-input"), { target: { value: "Swift" } });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      const lastRow = getLastRow();
      const deleteButton = lastRow.querySelector('[data-testid^="car-delete-"]');
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      const rows = screen.queryAllByTestId(/car-row-/i);
      rows.forEach(row => expect(row).not.toHaveTextContent("Swift"));
    });
  });
});
