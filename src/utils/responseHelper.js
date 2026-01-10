/**
 * Response Helper
 * 
 * Standardized API response handling
 * Can be used across multiple projects
 */

/**
 * Check if response is successful
 * 
 * @param {object} response
 * @returns {boolean}
 */
export function isSuccessResponse(response) {
  return response?.data?.success === true || response?.status >= 200 && response?.status < 300
}

/**
 * Extract data from response
 * 
 * @param {object} response
 * @returns {any}
 */
export function extractData(response) {
  if (response?.data?.data !== undefined) {
    return response.data.data
  }
  return response?.data
}

/**
 * Extract error message from response
 * 
 * @param {Error|object} error
 * @returns {string}
 */
export function extractErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors
    if (typeof errors === 'string') {
      return errors
    }
    if (Array.isArray(errors)) {
      return errors.join(', ')
    }
    if (typeof errors === 'object') {
      return Object.values(errors).flat().join(', ')
    }
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'An error occurred'
}

/**
 * Handle API error
 * 
 * @param {Error|object} error
 * @param {Function} toast - Toast notification function (optional)
 * @returns {object}
 */
export function handleApiError(error, toast = null) {
  const message = extractErrorMessage(error)
  const status = error?.response?.status
  
  if (toast && typeof toast === 'function') {
    toast.error(message)
  }
  
  return {
    success: false,
    message,
    status,
    error
  }
}

/**
 * Handle API success
 * 
 * @param {object} response
 * @param {Function} toast - Toast notification function (optional)
 * @param {string} successMessage - Custom success message (optional)
 * @returns {object}
 */
export function handleApiSuccess(response, toast = null, successMessage = null) {
  const data = extractData(response)
  const message = successMessage || response?.data?.message || 'Operation successful'
  
  if (toast && typeof toast === 'function') {
    toast.success(message)
  }
  
  return {
    success: true,
    data,
    message,
    response
  }
}
