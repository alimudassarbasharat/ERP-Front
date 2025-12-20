// Register Tabler Icons as global components
import { createApp } from 'vue'
import * as TablerIconsVue from '@tabler/icons-vue'

export default {
  install(app) {
    for (const [key, component] of Object.entries(TablerIconsVue)) {
      app.component(key, component)
    }
  }
}
