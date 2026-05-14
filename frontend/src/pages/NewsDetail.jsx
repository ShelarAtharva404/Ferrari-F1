import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaArrowLeft, FaTwitter, FaFacebook } from 'react-icons/fa'

const articles = {
  1: { id: 1, category: 'Race Report', title: 'Leclerc Wins Miami: Ferrari\'s Fourth Victory of the Season', date: 'May 4, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80', content: `Charles Leclerc delivered a dominant performance in Miami, leading from pole position to take Ferrari's fourth victory of the 2025 season in front of a packed crowd at the Miami International Autodrome.\n\nLeclerc, who qualified on pole for the third time this year, made a perfect start and was never threatened at the front of the field. His teammate Lewis Hamilton came home in second place, completing a Ferrari 1-2 that sent the Scuderia's championship lead to 13 points.\n\n"I have no words," said Leclerc after the race. "The car was perfect today. The team did an amazing job, the strategy was flawless. This is for all the tifosi — they deserve this."\n\nHamilton, who himself had hoped to challenge for the lead, was gracious in his praise for his colleague: "Charles was simply incredible today. He had the edge on me all weekend. But a 1-2 for Ferrari — that's what we're here for."\n\nThe result extends Ferrari's lead in the Constructors' Championship to 48 points over Red Bull, with 18 races still to go.` },
  2: { id: 2, category: 'Technical', title: 'SF-25 Upgrade Delivers 0.3s Lap Time Improvement at Barcelona', date: 'Apr 28, 2025', author: 'Ferrari Technical', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80', content: `Ferrari's Barcelona upgrade package has delivered significant performance gains, with the team reporting a 0.3 second improvement per lap over their previous specification.\n\nThe package, which includes a redesigned front wing, revised sidepod inlets, and an upgraded diffuser, was first run on Thursday at Circuit de Barcelona-Catalunya ahead of the Spanish Grand Prix.\n\nChief Designer Enrico Cardile described the upgrade: "This is a significant step for the SF-25. We've improved downforce levels while maintaining our drag efficiency. The new front wing in particular opens up much better balance windows for the drivers."\n\nData from the first day of practice confirmed the team's predictions, with both Charles Leclerc and Lewis Hamilton consistently running at the front of the timing sheets.` },
}

export default function NewsDetail() {
  const { id } = useParams()
  const article = articles[id]

  if (!article) {
    return (
      <div style={{ padding: '200px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Article Not Found</h2>
        <Link to="/news" className="btn btn-primary">← Back to News</Link>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet><title>{article.title} | Ferrari F1 News</title></Helmet>

      {/* Hero */}
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden', marginBottom: '0' }}>
        <img src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--ferrari-black) 100%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <span className="badge badge-red" style={{ marginBottom: '16px', display: 'inline-block' }}>{article.category}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.2, maxWidth: '800px' }}>
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Body */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--ferrari-border)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--ferrari-gray)' }}>{article.date}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--ferrari-gray)' }}>By {article.author}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
              <a href="#" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.65rem' }}><FaTwitter /> Share</a>
              <a href="#" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.65rem' }}><FaFacebook /> Share</a>
            </div>
          </div>

          <div style={{ fontSize: '1.05rem', color: 'var(--ferrari-gray)', lineHeight: 2 }}>
            {article.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '24px' }}>{para}</p>
            ))}
          </div>

          <div style={{ marginTop: '60px' }}>
            <Link to="/news" className="btn btn-outline">
              <FaArrowLeft /> Back to News
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
