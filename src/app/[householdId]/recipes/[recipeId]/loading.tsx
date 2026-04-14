export default function RecipeDetailLoading() {
  return (
    <article style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      {/* Title */}
      <div 
        className="skeleton"
        style={{
          height: '2.5rem',
          width: '70%',
          marginBottom: '16px',
          borderRadius: '4px',
        }}
      />
      <div 
        className="skeleton"
        style={{
          height: '2.5rem',
          width: '40%',
          marginBottom: '24px',
          borderRadius: '4px',
        }}
      />

      {/* Meta bar */}
      <div style={{
        display: 'flex',
        gap: '20px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '32px',
      }}>
        <div className="skeleton" style={{ height: '1.2rem', width: '80px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '1.2rem', width: '80px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '1.2rem', width: '80px', borderRadius: '4px' }} />
      </div>

      {/* Image removed from skeleton since it falls back gracefully */}

      {/* Ingredients */}
      <section style={{ marginBottom: '40px' }}>
        <div 
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '120px',
            marginBottom: '24px',
            borderRadius: '4px',
          }}
        />
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}>
          {[1, 2, 3, 4, 5].map((idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div className="skeleton" style={{ height: '1rem', width: '40%', borderRadius: '4px' }} />
              <div className="skeleton" style={{ height: '1rem', width: '20%', borderRadius: '4px' }} />
            </li>
          ))}
        </ul>
      </section>

      {/* Directions */}
      <section style={{ marginBottom: '40px' }}>
        <div 
          className="skeleton"
          style={{
            height: '1.5rem',
            width: '120px',
            marginBottom: '28px',
            borderRadius: '4px',
          }}
        />
        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}>
          {[1, 2, 3].map((idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div 
                className="skeleton"
                style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                }}
              />
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div className="skeleton" style={{ height: '1rem', width: '100%', marginBottom: '8px', borderRadius: '4px' }} />
                <div className="skeleton" style={{ height: '1rem', width: '90%', marginBottom: '8px', borderRadius: '4px' }} />
                <div className="skeleton" style={{ height: '1rem', width: '60%', borderRadius: '4px' }} />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
