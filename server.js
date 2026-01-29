import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const distPath = path.join(__dirname, 'dist')

// index.html MUST NOT be cached (prevents build mismatch / old JS chunks)
app.use((req, res, next) => {
  if (req.path === '/' || req.path.endsWith('index.html')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  }
  next()
})

// Static assets (hashed filenames → safe to cache)
app.use(express.static(distPath, {
  maxAge: '1y',
  index: false
}))

// SPA fallback
app.get('*', (_, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => {
  console.log(`ERP Front listening on port ${port}`)
})
