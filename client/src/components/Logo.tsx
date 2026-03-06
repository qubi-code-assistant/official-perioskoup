/**
 * PERIOSKOUP -- INLINE SVG LOGO COMPONENT
 * Colors: #C0E57A lime, #0A171E dark, #F5F9EA text
 * Font: Gabarito (brand wordmark)
 */

interface LogoProps {
  height?: number;
  color?: string;
  showWordmark?: boolean;
  className?: string;
}

// Just the P icon mark (circle + P shape)
export function LogoMark({ height = 32, color = '#C0E57A', className = '' }: { height?: number; color?: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 431.07 431.07"
      height={height}
      width={height}
      className={className}
      style={{ display: 'block' }}
    >
      <circle fill={color} cx="215.53" cy="215.53" r="215.53"/>
      <path fill="#0A171E" d="M323.17,100.36c-26.74-36.73-86.44-16.94-122.47-6.92-65.53,20.49-113.57,63.98-95.35,138.23,1.89,11.18,3.66,23.24,5.34,35.63-13-2.93-25.5-7.95-36.9-15.65,10.39,10.56,23.67,18.52,37.97,23.67,3.18,24.21,6.09,49.26,9.05,71.34,0,0,3.96,30.94,3.96,30.94,8.42-17.04,22.02-38.41,28.04-56.44,4.57-11.96,5.24-24.87,7.1-37.39,67.23,1.81,143.64-32.55,171.14-91.83,13.5-28.74,9.48-65.06-7.88-91.58ZM139.56,312.89c-.22-10.33-.49-20.65-.89-30.97,3.5.53,7.05.94,10.63,1.25-2.97,10.03-5.34,20.31-9.75,29.72ZM302.42,180.12c-21.76,51.99-85.42,81.82-139.45,89.17.98-3.28,2.2-6.5,3.77-9.62,4.36-8.93,12.41-17.1,23.16-16.72-10.98-2.95-22.15,4.78-28.36,13.48-3.24,4.31-5.71,8.93-7.72,13.73-5.2.36-10.42.5-15.63.38-.7-14.62-1.72-29.27-3.3-44.03-2.98-19.5-2.35-40.63,8.71-56.39,24.55-33.57,72.05-44.58,111.27-53.15,12.83-1.79,29.74-5.64,39.49,2.37,12.5,17.57,16.05,40.3,8.07,60.76Z"/>
    </svg>
  );
}

// Full logo: icon + wordmark
export function LogoFull({ height = 28, color = '#C0E57A', className = '' }: LogoProps) {
  const iconSize = height;
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <LogoMark height={iconSize} color={color} />
      <span style={{
        fontFamily: 'Gabarito, sans-serif',
        fontWeight: 700,
        fontSize: `${Math.round(height * 0.6)}px`,
        letterSpacing: '-0.01em',
        color: '#F5F9EA',
        lineHeight: 1,
      }}>
        Perioskoup
      </span>
    </div>
  );
}

// Lime version for dark backgrounds
export function LogoLime({ height = 32, className = '' }: { height?: number; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <LogoMark height={height} color="#C0E57A" />
      <span style={{
        fontFamily: 'Gabarito, sans-serif',
        fontWeight: 700,
        fontSize: `${Math.round(height * 0.6)}px`,
        letterSpacing: '-0.01em',
        color: '#F5F9EA',
        lineHeight: 1,
      }}>
        Perioskoup
      </span>
    </div>
  );
}

export default LogoFull;
