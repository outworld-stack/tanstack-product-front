import * as React from 'react';
import { cn } from '@/lib/utils';
type HexagonBackgroundProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode;
  hexagonProps?: React.ComponentProps<'div'>;
  hexagonSize?: number; // value greater than 50
  hexagonMargin?: number;
};
function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.1547;
  const rowSpacing = hexagonSize * 0.92;
  const horizontalOffset = hexagonWidth / 2 + 1;
  
  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const updateGridDimensions = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 4;
    const columns = Math.ceil(window.innerWidth / (hexagonWidth * 0.75)) + 4;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  return (
    <div
      data-slot="hexagon-background"
      className={cn(
        'relative size-full min-h-screen dark:bg-neutral-900 bg-neutral-100',
        className,
      )}
      {...props}
    >
      <style>{`:root { --hexagon-margin: ${hexagonMargin}px; }`}</style>
      <div className="fixed top-0 left-0 size-full overflow-hidden z-0">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => {
          // محاسبه موقعیت عمودی با درنظر گرفتن شروع از نصف پولیگان
          const topPosition = (rowIndex * rowSpacing) - (hexagonHeight / 2);
          
          // برای خطوط زوج، افست به چپ و ستون اضافی
          const isEvenRow = rowIndex % 2 === 0;
          const leftPosition = isEvenRow ? 0 : -horizontalOffset;
          const columnCount = isEvenRow ? gridDimensions.columns : gridDimensions.columns + 1;

          return (
            <div
              key={`row-${rowIndex}`}
              style={{
                position: 'absolute',
                top: topPosition,
                left: leftPosition,
                width: `calc(100% + ${horizontalOffset}px)`, // گسترش عرض برای پوشش بهتر
              }}
              className="flex"
            >
              {Array.from({ length: columnCount }).map(
                (_, colIndex) => (
                  <div
                    key={`hexagon-${rowIndex}-${colIndex}`}
                    {...hexagonProps}
                    style={{
                      width: hexagonWidth,
                      height: hexagonHeight,
                      marginRight: hexagonMargin,
                      ...hexagonProps?.style,
                    }}
                    className={cn(
                      'relative shrink-0',
                      '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]',
                      'border border-neutral-200 dark:border-neutral-800',
                      "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full dark:before:bg-neutral-950 before:bg-white before:opacity-100 before:transition-all before:duration-1000",
                      "after:content-[''] after:absolute after:inset-(--hexagon-margin) dark:after:bg-neutral-950 after:bg-white",
                      'after:[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]',
                      'hover:before:bg-neutral-200 dark:hover:before:bg-neutral-800 hover:before:opacity-100 hover:before:duration-0 dark:hover:after:bg-neutral-900 hover:after:bg-neutral-100 hover:after:opacity-100 hover:after:duration-0',
                      hexagonProps?.className,
                    )}
                  />
                ),
              )}
            </div>
          );
        })}
      </div>
      {/* <div className="relative z-10 ">
      </div> */}
      {children}
    </div>
  );
}

export { HexagonBackground, type HexagonBackgroundProps };