import { defineStore } from 'pinia'
import axios from 'axios'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    loading: false,
    error: null,
    currentStudent: null
  }),

  actions: {
    async getStudentById(id) {
      try {
        this.loading = true
        const response = await axios.get(`/students/${id}`)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchStudents(params = {}) {
      try {
        this.loading = true
        const response = await axios.get('/students', { params })
        this.students = response.data.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createStudent(studentData) {
      try {
        this.loading = true
        const response = await axios.post('/students', studentData)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateStudent(id, studentData) {
      try {
        this.loading = true
        const response = await axios.put(`/students/${id}`, studentData)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteStudent(id) {
      try {
        this.loading = true
        const response = await axios.delete(`/students/${id}`)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async generateStudentCard({ templateId, studentId }) {
      try {
        this.loading = true
        const response = await axios.get(`/students/${studentId}/card`, {
          params: { template: templateId },
          responseType: 'blob'
        })
        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 