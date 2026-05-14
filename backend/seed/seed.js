require('dotenv').config()
const mongoose = require('mongoose')
const Driver = require('../models/Driver')
const News = require('../models/News')

const drivers = [
  {
    number: 16,
    name: 'Charles Leclerc',
    nationality: 'Monegasque',
    dateOfBirth: new Date('1997-10-16'),
    championships: 0,
    wins: 8,
    podiums: 45,
    poles: 26,
    bio: 'Born in Monaco, Charles Leclerc is one of the most naturally gifted drivers of his generation.',
    imageUrl: 'https://images.unsplash.com/photo-1611329695518-1763fc1d5a46?w=600',
    teamSince: 2019,
    active: true,
  },
  {
    number: 44,
    name: 'Lewis Hamilton',
    nationality: 'British',
    dateOfBirth: new Date('1985-01-07'),
    championships: 7,
    wins: 104,
    podiums: 197,
    poles: 104,
    bio: 'The most decorated Formula 1 driver in history. Seven-time World Champion.',
    imageUrl: 'https://images.unsplash.com/photo-1536246860680-38e5b0b4f95c?w=600',
    teamSince: 2025,
    active: true,
  },
]

const newsArticles = [
  {
    title: "Leclerc Wins Miami: Ferrari's Fourth Victory",
    slug: 'leclerc-wins-miami-2025',
    category: 'Race Report',
    author: 'Ferrari Media',
    excerpt: "Charles Leclerc delivers a dominant performance in Miami.",
    content: "Charles Leclerc delivered a dominant performance in Miami, leading from pole to take Ferrari's fourth victory of 2025.",
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    publishedAt: new Date('2025-05-04'),
    featured: true,
    tags: ['Miami', 'Leclerc', 'Race Win'],
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    await Driver.deleteMany({})
    await Driver.insertMany(drivers)
    console.log(`✅ Seeded ${drivers.length} drivers`)

    await News.deleteMany({})
    await News.insertMany(newsArticles)
    console.log(`✅ Seeded ${newsArticles.length} news articles`)

    console.log('🌱 Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
