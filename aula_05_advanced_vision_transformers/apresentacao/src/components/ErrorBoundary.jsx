import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Slide ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF5F5',
          border: '2px dashed #FEB2B2',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#FED7D7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E53E3E'
          }}>
            <AlertTriangle size={32} />
          </div>
          <h3 style={{ fontSize: '16px', color: '#9B2C2C', margin: 0, fontFamily: 'var(--font-title)' }}>
            Ocorreu um erro ao renderizar este slide
          </h3>
          <p style={{ fontSize: '11px', color: '#742A2A', maxWidth: '500px', margin: 0, fontFamily: 'var(--font-code)' }}>
            {this.state.error?.message || 'Erro inesperado'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            <RefreshCw size={14} /> Tentar Novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
