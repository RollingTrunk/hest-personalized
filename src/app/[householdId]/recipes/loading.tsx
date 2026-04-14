export default function RecipesLoading() {
  return (
    <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      {/* Profile header */}
      <div style={{ marginBottom: '40px' }}>
        <div 
          className="skeleton"
          style={{
            height: '2.5rem',
            width: '250px',
            marginBottom: '6px',
            borderRadius: '4px',
          }}
        />
        <div 
          className="skeleton"
          style={{
            height: '1.2rem',
            width: '350px',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '8px' }} />
      
      {/* Recipe list skeleton */}
      <div>
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="recipe-item"
            style={{
              display: 'flex',
              gap: '20px',
              padding: '24px 0',
              alignItems: 'flex-start',
            }}
          >
            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div 
                className="skeleton"
                style={{
                  height: '1.6rem',
                  width: '60%',
                  marginBottom: '12px',
                  borderRadius: '4px',
                }}
              />
              <div 
                className="skeleton"
                style={{
                  height: '1rem',
                  width: '90%',
                  marginBottom: '8px',
                  borderRadius: '4px',
                }}
              />
              <div 
                className="skeleton"
                style={{
                  height: '1rem',
                  width: '75%',
                  marginBottom: '16px',
                  borderRadius: '4px',
                }}
              />
              <div 
                className="skeleton"
                style={{
                  height: '0.8rem',
                  width: '200px',
                  borderRadius: '4px',
                }}
              />
            </div>

            {/* Thumbnail */}
            <div 
              className="skeleton"
              style={{
                flexShrink: 0,
                width: '120px',
                height: '80px',
                borderRadius: '6px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
