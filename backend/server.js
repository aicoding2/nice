import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { Sequelize, DataTypes } from 'sequelize'

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173','http://localhost:3000'], credentials: true }))
app.use(express.json({ limit: '1mb' }))

// Database
const sequelize = new Sequelize(process.env.MYSQL_DATABASE || 'oksystem', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || '', {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  dialect: 'mysql',
  logging: false
})

// Models
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(12,0), allowNull: false, defaultValue: 0 },
  imageUrl: { type: DataTypes.STRING }
}, { tableName: 'products' })

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'posts' })

// Simple admin middleware using header key
const requireAdmin = (req, res, next) => {
  const key = req.header('x-admin-key') || ''
  if(key && key === (process.env.ADMIN_KEY || 'changeme')) return next()
  return res.status(401).json({ message: 'Unauthorized' })
}

// Routes
app.get('/api/health', (req,res)=> res.json({ ok: true }))

// Products
app.get('/api/products', async (req,res)=> {
  const items = await Product.findAll({ order: [['id','DESC']] })
  res.json(items)
})

app.post('/api/products', requireAdmin, async (req,res)=> {
  const item = await Product.create(req.body)
  res.status(201).json(item)
})

app.put('/api/products/:id', requireAdmin, async (req,res)=> {
  const item = await Product.findByPk(req.params.id)
  if(!item) return res.sendStatus(404)
  await item.update(req.body)
  res.json(item)
})

app.delete('/api/products/:id', requireAdmin, async (req,res)=> {
  const item = await Product.findByPk(req.params.id)
  if(!item) return res.sendStatus(404)
  await item.destroy()
  res.sendStatus(204)
})

// Posts (board)
app.get('/api/posts', async (req,res)=> {
  const items = await Post.findAll({ order: [['id','DESC']] })
  res.json(items)
})

app.get('/api/posts/:id', async (req,res)=> {
  const item = await Post.findByPk(req.params.id)
  if(!item) return res.sendStatus(404)
  res.json(item)
})

app.post('/api/posts', async (req,res)=> {
  const { title, content } = req.body
  if(!title || !content) return res.status(400).json({ message: 'title, content required' })
  const item = await Post.create({ title, content })
  res.status(201).json(item)
})

app.put('/api/posts/:id', requireAdmin, async (req,res)=> {
  const item = await Post.findByPk(req.params.id)
  if(!item) return res.sendStatus(404)
  await item.update({ title: req.body.title, content: req.body.content })
  res.json(item)
})

app.delete('/api/posts/:id', requireAdmin, async (req,res)=> {
  const item = await Post.findByPk(req.params.id)
  if(!item) return res.sendStatus(404)
  await item.destroy()
  res.sendStatus(204)
})

const start = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  const port = Number(process.env.PORT || 4000)
  app.listen(port, ()=> console.log(`API listening on ${port}`))
}

start().catch(err=> {
  console.error(err)
  process.exit(1)
})


