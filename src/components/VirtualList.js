import { useState, useRef, useEffect } from 'react';

const  VirtualList = () => {
  const [items] = useState(Array.from({ length: 100000 }, (_, i) => `Item ${i + 1}`));
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  const itemHeight = 80;
  const containerHeight = 400;
  const overscan = 5;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const start = Math.floor(scrollTop / itemHeight);
        const visibleCount = Math.ceil(containerHeight / itemHeight);
        
        setStartIndex(Math.max(0, start - overscan));
        setVisibleItems(
          items.slice(
            Math.max(0, start - overscan),
            Math.min(items.length, start + visibleCount + overscan)
          )
        );
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); 
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Virtual List ({items.length.toLocaleString()} Items)</h2>
      <div
        ref={containerRef}
        className="card"
        style={{
          height: containerHeight,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <div style={{ height: `${items.length * itemHeight}px`, position: 'relative' }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              className="card-body border-bottom py-2"
              style={{
                height: `${itemHeight}px`,
                position: 'absolute',
                top: `${(startIndex + index) * itemHeight}px`,
                left: 0,
                right: 0
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualList;