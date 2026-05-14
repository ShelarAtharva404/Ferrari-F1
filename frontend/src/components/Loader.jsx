export default function Loader() {
  return (
    <div className="page-loader">
      <div className="loader-prancing-horse">🐎</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '4px', color: 'var(--ferrari-gray)', textTransform: 'uppercase' }}>
        Loading...
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  )
}
