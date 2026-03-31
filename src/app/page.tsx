export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      fontFamily: 'system-ui, sans-serif',
      color: 'var(--muted)'
    }}>
      <p style={{ fontSize: '1.125rem' }}>Not authorized</p>
    </div>
  );
}
