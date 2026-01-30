# Services Layer

This directory contains service modules that handle API communication with the backend.

## Available Services

### ticketService.js
Handles all ticket-related API calls including:
- Ticket CRUD operations
- Subtask management
- Comments
- Time tracking (start/stop timer)
- File attachments
- Workspace management
- User assignments

## Usage Example

```javascript
import ticketService from '@/services/ticketService'

// Get a ticket
const ticket = await ticketService.getTicket(123)

// Update a ticket
await ticketService.updateTicket(123, {
  status: 'in-progress',
  priority: 'high'
})

// Add a comment
await ticketService.addComment(123, 'This is a comment')

// Start/stop timer
await ticketService.startTimer(123)
await ticketService.stopTimer(123)
```

## API Endpoints

All services use the axios instance configured in `@/utils/axios.js` which:
- Automatically adds authentication tokens
- Handles 401 redirects
- Provides error handling
- Sets base URL from environment variables

### Base URL
Default: `https://erp-back-f0xb.onrender.com/api`  
Configure via: `VITE_API_URL` environment variable

## Error Handling

All service methods wrap API calls in try-catch blocks and log errors to the console. Services throw errors to allow calling components to handle them appropriately.

## Adding New Services

When creating new service modules:

1. Import the axios instance: `import api from '@/utils/axios'`
2. Create an object with methods for each endpoint
3. Use async/await for API calls
4. Add proper JSDoc comments
5. Export as default

Example:
```javascript
import api from '@/utils/axios'

const myService = {
  async getData() {
    try {
      const response = await api.get('/my-endpoint')
      return response.data
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }
}

export default myService
```

