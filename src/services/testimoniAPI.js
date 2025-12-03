
import axios from "axios"

const API_URL = "https://wkqsneacqedhizfjiaop.supabase.co/rest/v1/testimoni"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcXNuZWFjcWVkaGl6ZmppYW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzQ0MjAsImV4cCI6MjA2NDYxMDQyMH0.7wBYh--bWu4jCddcstASMj_RxnLsLo7WQjiZOGfcTZI"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const TestimoniAPI = {
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