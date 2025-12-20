<template>
  <div class="create-fee">
    <div class="page-header">
      <h2>Create New Fee</h2>
    </div>
    
    <div class="fee-form-container">
      <form @submit.prevent="submitFee" class="fee-form">
        <div class="form-group">
          <label for="feeName">Fee Name</label>
          <input 
            type="text" 
            id="feeName" 
            v-model="feeData.name" 
            placeholder="Enter fee name"
            required
          >
        </div>

        <div class="form-group">
          <label for="feeType">Fee Type</label>
          <select id="feeType" v-model="feeData.type" required>
            <option value="">Select fee type</option>
            <option value="tuition">Tuition Fee</option>
            <option value="examination">Examination Fee</option>
            <option value="library">Library Fee</option>
            <option value="transport">Transport Fee</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="amount">Amount</label>
          <input 
            type="number" 
            id="amount" 
            v-model="feeData.amount" 
            placeholder="Enter amount"
            required
          >
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input 
            type="date" 
            id="dueDate" 
            v-model="feeData.dueDate"
            required
          >
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description" 
            v-model="feeData.description" 
            placeholder="Enter fee description"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="class">Class</label>
          <select id="class" v-model="feeData.class" required>
            <option value="">Select class</option>
            <option v-for="class in classes" :key="class" :value="class">
              {{ class }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Create Fee</button>
          <button type="button" class="cancel-btn" @click="resetForm">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateFee',
  data() {
    return {
      feeData: {
        name: '',
        type: '',
        amount: '',
        dueDate: '',
        description: '',
        class: ''
      },
      classes: [
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
        'Class 11', 'Class 12'
      ]
    }
  },
  methods: {
    submitFee() {
      // TODO: Implement API call to create fee
      console.log('Fee data:', this.feeData)
      // Reset form after successful submission
      this.resetForm()
    },
    resetForm() {
      this.feeData = {
        name: '',
        type: '',
        amount: '',
        dueDate: '',
        description: '',
        class: ''
      }
    }
  }
}
</script>

<style scoped>
.create-fee {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  color: #1e293b;
  margin: 0;
}

.fee-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.fee-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #1e293b;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.submit-btn,
.cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #10b981;
  color: #ffffff;
}

.submit-btn:hover {
  background-color: #10b981;
}

.cancel-btn {
  background-color: #f8fafc;
  color: #1e293b;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #f1f5f9;
}
</style> 