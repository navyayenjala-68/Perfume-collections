import { useContext, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import PerfumeCard from "../components/PerfumeCard";
import { PerfumeContext } from "../context/PerfumeContext";

const moods = [
  { name: "Luxury", hints: ["Creed", "MFK", "Tom Ford"] },
  { name: "Fresh", hints: ["Dior", "Jo Malone", "Chanel"] },
  { name: "Romantic", hints: ["Gucci", "Yves Saint Laurent"] },
  { name: "Signature", hints: ["Chanel", "Dior", "MFK"] },
];

function Recommendation() {
  const { perfumes } = useContext(PerfumeContext);
  const [mood, setMood] = useState("Luxury");

  const recommended = useMemo(() => {
    const selected = moods.find((item) => item.name === mood);
    const matches = perfumes.filter((perfume) =>
      selected?.hints.some((hint) => perfume.brand.includes(hint) || perfume.name.includes(hint))
    );

    return matches.length ? matches : perfumes.slice(0, 4);
  }, [mood, perfumes]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-300">AI style picker</p>
          <h1 className="mt-2 text-4xl font-black">Find a perfume for your mood</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Choose a vibe and get a ready-made shelf of matching scents from the collection.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {moods.map((item) => (
              <button
                key={item.name}
                onClick={() => setMood(item.name)}
                className={`rounded-md px-5 py-3 text-sm font-black ${
                  mood === item.name
                    ? "bg-amber-300 text-slate-950"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-black">{mood} Recommendations</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommended.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Recommendation;
