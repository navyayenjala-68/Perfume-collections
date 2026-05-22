import { useContext, useMemo, useState } from "react";
import { FaBolt, FaFilter, FaShieldAlt, FaTruck } from "react-icons/fa";

import Navbar from "../components/Navbar";
import PerfumeCard from "../components/PerfumeCard";
import { PerfumeContext } from "../context/PerfumeContext";

const categories = ["All", "Men", "Women", "Unisex", "Luxury"];
function Home() {
  const { perfumes } = useContext(PerfumeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filteredPerfumes = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return perfumes
      .filter((perfume) => {
        const matchesSearch =
          !query ||
          [perfume.name, perfume.brand, perfume.category, ...(perfume.notes || [])]
            .join(" ")
            .toLowerCase()
            .includes(query);
        const matchesCategory = category === "All" || perfume.category === category;
        const matchesBrand = brand === "All" || perfume.brand === brand;

        return matchesSearch && matchesCategory && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews;
      });
  }, [brand, category, perfumes, searchTerm, sortBy]);

  const brands = useMemo(
    () => ["All", ...new Set(perfumes.map((perfume) => perfume.brand).filter(Boolean).sort())],
    [perfumes]
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <main>
        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
            <div className="flex flex-col justify-center py-4">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-amber-300">
                Weekend fragrance sale
              </p>
              <h1 className="max-w-2xl text-4xl font-black leading-tight md:text-6xl">
                Perfume collection for every mood, moment, and budget.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Shop luxury, fresh, floral, woody, and unisex perfumes with quick filters,
                authentic picks, and cart-ready checkout.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-md px-4 py-3 text-sm font-bold ${
                      category === item
                        ? "bg-amber-300 text-slate-950"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-lg bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury perfume bottles"
                className="h-full min-h-80 w-full object-cover opacity-90"
              />
              <div className="absolute bottom-5 left-5 rounded-lg bg-white p-5 text-slate-950 shadow-2xl">
                <p className="text-sm font-bold text-rose-700">Up to 25% off</p>
                <p className="mt-1 text-2xl font-black">Luxury picks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-3 lg:px-6">
            <div className="flex items-center gap-3">
              <FaTruck className="text-amber-500" />
              <span className="text-sm font-bold">Fast delivery on all orders</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-amber-500" />
              <span className="text-sm font-bold">Authenticity checked products</span>
            </div>
            <div className="flex items-center gap-3">
              <FaBolt className="text-amber-500" />
              <span className="text-sm font-bold">Fresh deals updated daily</span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr] lg:px-6">
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <FaFilter className="text-slate-500" />
              <h2 className="text-lg font-black">Filters</h2>
            </div>

            <label className="text-sm font-bold text-slate-700">Brand</label>
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-amber-400"
            >
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-5 block text-sm font-bold text-slate-700">Sort by</label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-amber-400"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Customer Rating</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

            <div className="mt-5 rounded-md bg-amber-50 p-4">
              <p className="text-sm font-black text-slate-950">Today only</p>
              <p className="mt-1 text-sm text-slate-600">Free gift wrap on premium perfumes.</p>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-black">Perfume Collection</h2>
                <p className="text-sm text-slate-600">
                  Showing {filteredPerfumes.length} of {perfumes.length} products
                </p>
              </div>
              <p className="rounded-md bg-white px-4 py-2 text-sm font-bold text-green-700 shadow-sm">
                Bank offer: 10% instant discount
              </p>
            </div>

            {filteredPerfumes.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredPerfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
                <h3 className="text-2xl font-black">No perfumes found</h3>
                <p className="mt-2 text-slate-600">Try a different search, brand, or category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
