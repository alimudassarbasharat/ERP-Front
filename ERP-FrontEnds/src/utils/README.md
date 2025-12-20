# SweetAlert Configuration

This project uses a standardized SweetAlert configuration for consistent UI/UX across all dialogs.

## Usage

### Import the configuration
```javascript
import { sweetAlertConfig } from '@/utils/sweetalert'
```

### Available Methods

#### 1. Delete Confirmation
```javascript
const result = await sweetAlertConfig.delete(
  'Delete Item?', 
  'Are you sure you want to delete this item?', 
  'Item Name'
)
if (result.isConfirmed) {
  // Handle deletion
}
```

#### 2. Success Message
```javascript
await sweetAlertConfig.success('Success!', 'Operation completed successfully.')
```

#### 3. Error Message
```javascript
sweetAlertConfig.error('Error!', 'Something went wrong.')
```

#### 4. Confirmation Dialog
```javascript
const result = await sweetAlertConfig.confirm(
  'Confirm Action', 
  'Are you sure you want to proceed?',
  'Yes, Proceed',
  'Cancel'
)
```

#### 5. Info Message
```javascript
sweetAlertConfig.info('Information', 'Please note this information.')
```

## Features

- **Consistent Design**: All dialogs use the same styling
- **Compact Size**: Optimized for smaller screens
- **Modern Buttons**: Purple-pink gradient for actions, gray for cancel
- **Smooth Animations**: Fade in/out effects
- **Responsive**: Works on all screen sizes
- **No "No" Button**: Only shows Delete and Cancel buttons

## Button Styles

- **Delete/Confirm Button**: Purple-pink gradient (`#8b5cf6` to `#ec4899`)
- **Cancel Button**: Gray gradient (`#6b7280` to `#4b5563`)
- **Size**: 100px min-width, 32px height
- **Border Radius**: Fully rounded (9999px)
- **Hover Effects**: Scale up with enhanced shadows

## CSS Classes

The configuration uses these CSS classes defined in `base.css`:
- `.swal-modern` - Main popup styling
- `.swal-delete-btn` - Delete button styling
- `.swal-cancel-btn` - Cancel button styling 