<template>
  <div class="generate-event-page modern-card">
    <h2 class="page-title">Create New Event</h2>
    <el-form :model="event" label-width="120px" class="event-form">
      <el-form-item label="Event Name">
        <el-input v-model="event.name" placeholder="Enter event name" />
      </el-form-item>
      <el-form-item label="Type">
        <el-select v-model="event.type" placeholder="Select type">
          <el-option label="Birthday" value="birthday" />
          <el-option label="Reminder" value="reminder" />
          <el-option label="Holiday" value="holiday" />
          <el-option label="Task" value="task" />
        </el-select>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker v-model="event.date" type="date" placeholder="Pick a date" />
      </el-form-item>
      <el-form-item label="Time">
        <el-time-picker v-model="event.time" placeholder="Pick a time" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="event.description" type="textarea" placeholder="Event description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEvent">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
const event = ref({
  name: '',
  type: '',
  date: '',
  time: '',
  description: ''
})

function saveEvent() {
  // Placeholder: emit or store event, show message
  toast.success('Event created!')
}
</script>

<style scoped>
.generate-event-page {
  max-width: 420px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}
.event-form {
  margin-top: 12px;
}
</style> 