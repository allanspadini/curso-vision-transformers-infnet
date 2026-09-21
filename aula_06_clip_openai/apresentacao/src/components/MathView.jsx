import React, { useMemo } from 'react';
import katex from 'katex';

export default function MathView({ math, block = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-math ${block ? 'math-container' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
