/**
 * Subtle mesh glow overlay for hero sections.
 * Two soft radial gradients -- absolute positioned within the hero.
 */
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
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-15%",
          width: "55%",
          height: "90%",
          background: "radial-gradient(ellipse at center, rgba(192,229,122,0.045) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          width: "45%",
          height: "75%",
          background: "radial-gradient(ellipse at center, rgba(53,120,170,0.035) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
