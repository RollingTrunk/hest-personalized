export default function HouseholdLoading() {
  return (
    <div style={{
      padding: '80px 0',
      textAlign: 'center',
    }}>
      <div 
        className="skeleton"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          margin: '0 auto 20px',
        }}
      />
      <div 
        className="skeleton"
        style={{
          height: '2rem',
          width: '200px',
          margin: '0 auto 8px',
          borderRadius: '4px',
        }}
      />
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <div 
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '120px',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}
