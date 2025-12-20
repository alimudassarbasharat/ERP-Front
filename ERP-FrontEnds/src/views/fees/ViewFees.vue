<template>
  <div class="view-fees">
    <div class="page-header">
      <h2>View Fees</h2>
    </div>

    <div class="filters-section">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search fees..."
          @input="filterFees"
        >
      </div>
      <div class="filter-options">
        <select v-model="selectedClass" @change="filterFees">
          <option value="">All Classes</option>
          <option v-for="class in classes" :key="class" :value="class">
            {{ class }}
          </option>
        </select>
        <select v-model="selectedType" @change="filterFees">
          <option value="">All Types</option>
          <option value="tuition">Tuition Fee</option>
          <option value="examination">Examination Fee</option>
          <option value="library">Library Fee</option>
          <option value="transport">Transport Fee</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div class="fees-table">
      <table>
        <thead>
          <tr>
            <th>Fee Name</th>
            <th>Type</th>
            <th>Class</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fee in filteredFees" :key="fee.id">
            <td>{{ fee.name }}</td>
            <td>{{ fee.type }}</td>
            <td>{{ fee.class }}</td>
            <td>₹{{ fee.amount }}</td>
            <td>{{ formatDate(fee.dueDate) }}</td>
            <td>
              <span :class="['status-badge', fee.status.toLowerCase()]">
                {{ fee.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="edit-btn" @click="editFee(fee)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" @click="deleteFee(fee)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'ViewFees',
  data() {
    return {
      searchQuery: '',
      selectedClass: '',
      selectedType: '',
      classes: [
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
        'Class 11', 'Class 12'
      ],
      fees: [
        {
          id: 1,
          name: 'Monthly Tuition Fee',
          type: 'tuition',
          class: 'Class 10',
          amount: 5000,
          dueDate: '2024-04-15',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Annual Examination Fee',
          type: 'examination',
          class: 'Class 12',
          amount: 2000,
          dueDate: '2024-05-01',
          status: 'Pending'
        }
      ]
    }
  },
  computed: {
    filteredFees() {
      return this.fees.filter(fee => {
        const matchesSearch = fee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesClass = !this.selectedClass || fee.class === this.selectedClass
        const matchesType = !this.selectedType || fee.type === this.selectedType
        return matchesSearch && matchesClass && matchesType
      })
    }
  },
  methods: {
    filterFees() {
      // Filtering is handled by computed property
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-IN')
    },
    editFee(fee) {
      // TODO: Implement edit functionality
      console.log('Edit fee:', fee)
    },
    deleteFee(fee) {
      // TODO: Implement delete functionality
      if (confirm('Are you sure you want to delete this fee?')) {
        console.log('Delete fee:', fee)
      }
    }
  }
}
</script>

<style scoped>
.view-fees {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  color: #1e293b;
  margin: 0;
}

.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.search-box input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filter-options {
  display: flex;
  gap: 15px;
}

.filter-options select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

.fees-table {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background-color: #f1f5f9;
  color: #10b981;
}

.status-badge.pending {
  background-color: #ffffff7e6;
  color: #f59e0b;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #f1f5f9;
  color: #3b82f6;
}

.delete-btn {
  background-color: #ffffff1f0;
  color: #ef4444;
}

.edit-btn:hover {
  background-color: #f1f5f9;
}

.delete-btn:hover {
  background-color: #f1f5f9;
}
</style> 