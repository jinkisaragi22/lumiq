import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function Products() {
  return (
    <section id="products" style={{ padding: '100px 2rem', background: 'var(--navy-deep)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.12em' }}>OUR COLLECTION</span>
          <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em' }}>
            Find your light.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
