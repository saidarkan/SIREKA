
import axios from "axios"

const API_URL = "https://ecjiwuwsgtkbgcxgofpa.supabase.co/rest/v1/booking"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjaml3dXdzZ3RrYmdjeGdvZnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTE2MDgsImV4cCI6MjA2NDUyNzYwOH0.KHuyGERH6EzfNxyXwqWgcCwJCzbj0kNtAsztME-_qoE"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};


export const BookingAPI = {
  async fetchAll() {
    const response = await axios.get(API_URL, { headers })
    return response.data
  },

  async create(data) {
    const response = await axios.post(API_URL, data, { headers })
    return response.data
  },

  async update(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
    return response.data
  },

  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
  }
}