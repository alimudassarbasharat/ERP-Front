# Utils Directory

This directory contains reusable utility functions that can be used across multiple projects.

## Structure

### dateHelper.js
- `formatDatePk()` - Format date to Pakistan standard (DD-MM-YYYY)
- `formatDateIso()` - Format date to ISO format (YYYY-MM-DD)
- `formatDateTime()` - Format date with time
- `formatHumanReadable()` - Format date to human readable (e.g., "2 days ago")
- `getDateRange()` - Get date range for a period
- `isWithinRange()` - Check if date is within range
- `getCurrentDate()` - Get current date in ISO format
- `getCurrentDateTime()` - Get current datetime in ISO format

### stringHelper.js
- `snakeToTitle()` - Convert snake_case to Title Case
- `camelToTitle()` - Convert camelCase to Title Case
- `capitalizeWords()` - Capitalize all words
- `getInitials()` - Generate initials from full name
- `truncate()` - Truncate string with ellipsis
- `sanitize()` - Sanitize string (remove HTML, trim, etc.)
- `extractMentions()` - Extract mentions from text
- `slugify()` - Generate slug from string
- `formatFileSize()` - Format file size

### responseHelper.js
- `isSuccessResponse()` - Check if response is successful
- `extractData()` - Extract data from response
- `extractErrorMessage()` - Extract error message from response
- `handleApiError()` - Handle API error
- `handleApiSuccess()` - Handle API success

### axios.js
- Centralized Axios instance with interceptors
- Automatic token attachment
- Token refresh logic
- Error handling

## Usage

```javascript
import { formatDatePk, getDateRange } from '@/utils/dateHelper'
import { getInitials, truncate } from '@/utils/stringHelper'
import { handleApiError, handleApiSuccess } from '@/utils/responseHelper'
import api from '@/utils/axios'

// Date formatting
const formatted = formatDatePk(new Date(), true)

// String manipulation
const initials = getInitials('John Doe', 2)

// API calls
try {
  const response = await api.get('/users')
  handleApiSuccess(response, toast)
} catch (error) {
  handleApiError(error, toast)
}
```

## Best Practices

1. **Keep utilities generic** - Don't add project-specific logic
2. **Single responsibility** - Each utility should have one clear purpose
3. **Reusability** - Write functions that can be used across multiple projects
4. **Documentation** - Always document parameters and return types
5. **Type safety** - Use JSDoc comments for better IDE support
