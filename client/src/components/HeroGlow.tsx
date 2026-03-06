export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Lime glow top-left */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60%",
          height: "80%",
          background: "radial-gradient(ellipse at center, rgba(192,229,122,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Blue glow bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(53,120,170,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
