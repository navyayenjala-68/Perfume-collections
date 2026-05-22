import { useContext, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { PerfumeContext } from "../context/PerfumeContext";

const emptyForm = {
  name: "",
  brand: "",
  price: "",
  mrp: "",
  image: "",
  category: "Luxury",
  concentration: "EDP",
  size: "100 ml",
  tag: "New",
  description: "",
  notes: "",
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price || 0));

function Admin() {
  const { perfumes, addPerfume, deletePerfume, editPerfume } = useContext(PerfumeContext);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const totalBrands = new Set(perfumes.map((perfume) => perfume.brand)).size;
  const averagePrice = perfumes.length
    ? perfumes.reduce((total, perfume) => total + Number(perfume.price), 0) / perfumes.length
    : 0;

  const handleChange = (event) => {
    setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const perfume = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.mrp || formData.price),
      rating: 4.4,
      reviews: 0,
      notes: formData.notes
        .split(",")
        .map((note) => note.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await editPerfume({ id: editingId, ...perfume });
        setEditingId(null);
        toast.success("Product updated");
      } else {
        await addPerfume(perfume);
        toast.success("Product added");
      }

      setFormData(emptyForm);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (perfume) => {
    setEditingId(perfume.id);
    setFormData({
      name: perfume.name || "",
      brand: perfume.brand || "",
      price: perfume.price || "",
      mrp: perfume.mrp || "",
      image: perfume.image || "",
      category: perfume.category || "Luxury",
      concentration: perfume.concentration || "EDP",
      size: perfume.size || "100 ml",
      tag: perfume.tag || "New",
      description: perfume.description || "",
      notes: perfume.notes?.join(", ") || "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
          <p className="mt-1 text-slate-600">Manage the perfume collection shown on the storefront.</p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-600">Products</p>
            <p className="mt-2 text-3xl font-black">{perfumes.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-600">Brands</p>
            <p className="mt-2 text-3xl font-black">{totalBrands}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-600">Average Price</p>
            <p className="mt-2 text-3xl font-black">{formatPrice(averagePrice)}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <form onSubmit={handleSubmit} className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <FaPlus className="text-rose-700" />
              <h2 className="text-xl font-black">{editingId ? "Edit Product" : "Add Product"}</h2>
            </div>

            <div className="grid gap-3">
              <input name="name" placeholder="Perfume name" value={formData.name} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="price" type="number" placeholder="Sale price" value={formData.price} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
                <input name="mrp" type="number" placeholder="MRP" value={formData.mrp} onChange={handleChange} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              </div>
              <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select name="category" value={formData.category} onChange={handleChange} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400">
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                  <option>Luxury</option>
                </select>
                <input name="size" placeholder="Size" value={formData.size} onChange={handleChange} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              </div>
              <input name="tag" placeholder="Product tag" value={formData.tag} onChange={handleChange} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="3" className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              <input name="notes" placeholder="Notes, comma separated" value={formData.notes} onChange={handleChange} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
            </div>

            <button className="mt-4 w-full rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Products</h2>
            <div className="mt-5 space-y-4">
              {perfumes.map((perfume) => (
                <article key={perfume.id} className="grid gap-4 rounded-md border border-slate-200 p-3 md:grid-cols-[90px_1fr_auto]">
                  <img src={perfume.image} alt={perfume.name} className="h-24 w-full rounded-md object-cover md:w-24" />
                  <div>
                    <p className="text-sm font-bold uppercase text-slate-500">{perfume.brand}</p>
                    <h3 className="font-black">{perfume.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{perfume.category} | {perfume.size}</p>
                    <p className="mt-2 font-bold">{formatPrice(perfume.price)}</p>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <button onClick={() => handleEdit(perfume)} className="grid h-10 w-10 place-items-center rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100" aria-label="Edit product">
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await deletePerfume(perfume.id);
                          toast.success("Product deleted");
                        } catch (error) {
                          toast.error(error.message);
                        }
                      }}
                      className="grid h-10 w-10 place-items-center rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100"
                      aria-label="Delete product"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
