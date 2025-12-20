import Swal from 'sweetalert2'

// Reusable SweetAlert configurations
export const sweetAlertConfig = {
  // Default configuration for delete confirmations
  delete: (title, text, itemName) => {
    return Swal.fire({
      title: title || 'Delete Confirmation',
      text: text || `Are you sure you want to delete "${itemName}"?`,
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: false,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      width: '360px',
      padding: '1rem',
      background: 'var(--bg-card)',
      backdrop: 'var(--bg-overlay)',
      customClass: {
        popup: 'swal-modern',
        title: 'text-lg font-bold text-theme-primary mb-2',
        content: 'text-theme-secondary text-sm',
        confirmButton: 'swal-delete-btn',
        cancelButton: 'swal-cancel-btn',
        actions: 'gap-2 mt-3'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  },

  // Configuration for success messages
  success: (title, text, timer = 2500) => {
    return Swal.fire({
      title: title || 'Success!',
      text: text || 'Operation completed successfully.',
      icon: 'success',
      width: '380px',
      padding: '1rem',
      timer: timer,
      timerProgressBar: true,
      showConfirmButton: false,
      background: 'var(--bg-card)',
      customClass: {
        popup: 'swal-modern',
        title: 'text-lg font-bold text-green-600 mb-2',
        content: 'text-theme-secondary text-sm'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  },

  // Configuration for error messages
  error: (title, text) => {
    return Swal.fire({
      title: title || 'Error!',
      text: text || 'An error occurred.',
      icon: 'error',
      width: '380px',
      padding: '1rem',
      background: 'var(--bg-card)',
      customClass: {
        popup: 'swal-modern',
        title: 'text-lg font-bold text-red-600 mb-2',
        content: 'text-theme-secondary text-sm'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  },

  // Configuration for confirmation dialogs
  confirm: (title, text, confirmText = 'Confirm', cancelText = 'Cancel') => {
    return Swal.fire({
      title: title || 'Confirmation',
      text: text || 'Are you sure you want to proceed?',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: false,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      width: '360px',
      padding: '1rem',
      background: 'var(--bg-card)',
      backdrop: 'var(--bg-overlay)',
      customClass: {
        popup: 'swal-modern',
        title: 'text-lg font-bold text-theme-primary mb-2',
        content: 'text-theme-secondary text-sm',
        confirmButton: 'swal-delete-btn',
        cancelButton: 'swal-cancel-btn',
        actions: 'gap-2 mt-3'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  },

  // Configuration for info messages
  info: (title, text) => {
    return Swal.fire({
      title: title || 'Information',
      text: text || 'Please note this information.',
      icon: 'info',
      width: '380px',
      padding: '1rem',
      background: 'var(--bg-card)',
      customClass: {
        popup: 'swal-modern',
        title: 'text-lg font-bold text-blue-600 mb-2',
        content: 'text-theme-secondary text-sm'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}

// Export Swal for direct use if needed
export { Swal } 