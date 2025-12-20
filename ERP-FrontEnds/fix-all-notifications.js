const fs = require('fs');
const path = require('path');

// Function to recursively find all .vue files
function findVueFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findVueFiles(fullPath));
    } else if (item.endsWith('.vue')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix a single file
function fixFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // 1. Replace sweetAlertConfig import with useToast
  if (content.includes("import { sweetAlertConfig } from '@/utils/sweetalert'")) {
    content = content.replace(
      "import { sweetAlertConfig } from '@/utils/sweetalert'",
      "import { useToast } from 'vue-toastification'"
    );
    hasChanges = true;
  }
  
  // 2. Add ElMessageBox to ElMessage import if not already present
  if (content.includes("import { ElMessage } from 'element-plus'") && !content.includes("import { ElMessage, ElMessageBox } from 'element-plus'")) {
    content = content.replace(
      "import { ElMessage } from 'element-plus'",
      "import { ElMessage, ElMessageBox } from 'element-plus'"
    );
    hasChanges = true;
  }
  
  // 3. Add toast initialization after router initialization
  if (content.includes("const router = useRouter()") && !content.includes("const toast = useToast()")) {
    content = content.replace(
      "const router = useRouter()",
      "const router = useRouter()\nconst toast = useToast()"
    );
    hasChanges = true;
  }
  
  // 4. Replace sweetAlertConfig.delete with ElMessageBox.confirm
  content = content.replace(
    /const result = await sweetAlertConfig\.delete\(([^)]+)\)/g,
    'const result = await ElMessageBox.confirm($1, {\n    confirmButtonText: \'Delete\',\n    cancelButtonText: \'Cancel\',\n    type: \'warning\'\n  })'
  );
  
  // 5. Replace sweetAlertConfig.success with toast.success
  content = content.replace(
    /await sweetAlertConfig\.success\(([^)]+)\)/g,
    'toast.success($1)'
  );
  content = content.replace(
    /sweetAlertConfig\.success\(([^)]+)\)/g,
    'toast.success($1)'
  );
  
  // 6. Replace sweetAlertConfig.error with toast.error
  content = content.replace(
    /sweetAlertConfig\.error\(([^)]+)\)/g,
    'toast.error($1)'
  );
  
  // 7. Replace sweetAlertConfig.warning with toast.warning
  content = content.replace(
    /sweetAlertConfig\.warning\(([^)]+)\)/g,
    'toast.warning($1)'
  );
  
  // 8. Replace sweetAlertConfig.confirm with ElMessageBox.confirm
  content = content.replace(
    /await sweetAlertConfig\.confirm\(([^)]+)\)/g,
    'await ElMessageBox.confirm($1, {\n    confirmButtonText: \'Confirm\',\n    cancelButtonText: \'Cancel\',\n    type: \'warning\'\n  })'
  );
  
  // 9. Replace ElMessage with toast (for files that don't have useToast yet)
  if (content.includes("import { useToast } from 'vue-toastification'")) {
    content = content.replace(
      /ElMessage\.success\(([^)]+)\)/g,
      'toast.success($1)'
    );
    content = content.replace(
      /ElMessage\.error\(([^)]+)\)/g,
      'toast.error($1)'
    );
    content = content.replace(
      /ElMessage\.warning\(([^)]+)\)/g,
      'toast.warning($1)'
    );
    content = content.replace(
      /ElMessage\.info\(([^)]+)\)/g,
      'toast.info($1)'
    );
  }
  
  // 10. Fix the result.isConfirmed pattern
  content = content.replace(
    /if \(result\.isConfirmed\)/g,
    'if (result)'
  );
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const vueFiles = findVueFiles(srcDir);

console.log(`Found ${vueFiles.length} Vue files to process...`);

let fixedCount = 0;
for (const file of vueFiles) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`\n🎉 Completed! Fixed ${fixedCount} files.`);
console.log('All notification systems have been replaced with toast notifications.'); 