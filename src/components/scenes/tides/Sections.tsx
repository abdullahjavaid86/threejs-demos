const sections = [
  {
    numeral: "I",
    title: "Calm",
    body: "Three octaves of simplex noise displace every vertex. Normals are rebuilt in the vertex shader each frame so the light follows the water.",
    align: "items-end justify-start text-left",
  },
  {
    numeral: "II",
    title: "Swell",
    body: "The scroll position drives the camera through keyframes and raises the amplitude of the field. Nothing is pre-baked.",
    align: "items-center justify-end text-right",
  },
  {
    numeral: "III",
    title: "Surge",
    body: "Foam appears where elevation crosses a threshold. Fresnel and a single specular sun keep the surface legible in the dark.",
    align: "items-center justify-start text-left",
  },
  {
    numeral: "IV",
    title: "Stillness",
    body: "The rig rises out, the sea settles. Fog is matched to the horizon so the plane dissolves into sky.",
    align: "items-start justify-center text-center",
  },
];

export function Sections() {
  return (
    <div className="w-screen">
      {sections.map((s) => (
        <section key={s.numeral} className={`flex h-dvh flex-col px-6 py-28 sm:px-16 ${s.align}`}>
          <div className="max-w-sm">
            <p className="text-label" style={{ color: "#63c9d6" }}>
              {s.numeral}
            </p>
            <h2 className="mt-3 text-display text-5xl italic sm:text-6xl">{s.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">{s.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
