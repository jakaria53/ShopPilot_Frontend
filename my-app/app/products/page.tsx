"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Star,
  ArrowUpDown,
  X,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  color?: string;
  description?: string;
  images?: string[];
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Air Motion Pro",
    category: "Running",
    price: 125,
    oldPrice: 160,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    color: "Red",
  },
  {
    id: 2,
    name: "Urban Street Low",
    category: "Lifestyle",
    price: 95,
    oldPrice: 120,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    color: "White",
  },
  {
    id: 3,
    name: "Cloud Runner X",
    category: "Running",
    price: 145,
    oldPrice: 180,
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800",
    color: "Black",
  },
  {
    id: 4,
    name: "Classic Court",
    category: "Classic",
    price: 85,
    oldPrice: 100,
    rating: 4.5,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    color: "Cream",
  },
  {
    id: 5,
    name: "Velocity Sport",
    category: "Sports",
    price: 135,
    oldPrice: 155,
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    color: "Blue",
  },
  {
    id: 6,
    name: "Street Flex",
    category: "Lifestyle",
    price: 110,
    oldPrice: 140,
    rating: 4.8,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800",
    color: "Black",
  },
];

const categories = ["All", "Running", "Lifestyle", "Sports", "Classic"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = localStorage.getItem("shoppilot-products");

      if (savedProducts) {
        try {
          const parsedProducts: Product[] = JSON.parse(savedProducts);
          setProducts(parsedProducts);
        } catch (error) {
          console.error("Failed to load products:", error);
        }
      } else {
        localStorage.setItem(
          "shoppilot-products",
          JSON.stringify(initialProducts)
        );
        setProducts(initialProducts);
      }
    };

    loadProducts();
    window.addEventListener("storage", loadProducts);

    return () => {
      window.removeEventListener("storage", loadProducts);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort, maxPrice]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] text-[#172d50] antialiased selection:bg-[#4778b9] selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#051b64] via-[#000000] to-[#3868b6] px-5 pb-28 pt-28 sm:px-6 md:pb-44 md:pt-32">
        {/* Decorative layers */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px] md:[background-size:56px_56px]" />
        <div className="pointer-events-none absolute -right-32 -top-40 h-[340px] w-[340px] rounded-full bg-[#4778b9]/30 blur-[100px] md:h-[520px] md:w-[520px] md:blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[280px] w-[280px] rounded-full bg-[#7aa7e8]/20 blur-[100px] md:h-[420px] md:w-[420px] md:blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-10 hidden h-[380px] w-[380px] rounded-full border border-white/10 md:block" />
        <div className="pointer-events-none absolute right-8 top-24 hidden h-[240px] w-[240px] rounded-full border border-white/10 md:block" />

        <div className="relative mx-auto max-w-[1400px]">
          {/* Back to Home */}
          <Link
            href="/"
            className="group/back mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-2 pl-2 pr-5 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#172d50]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#172d50] transition group-hover/back:-translate-x-0.5 group-hover/back:bg-[#172d50] group-hover/back:text-white">
              <ArrowLeft size={14} />
            </span>
            Back to Home
          </Link>

          <div className="mb-6 flex md:mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md sm:px-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7aa7e8] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7aa7e8]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-[12px] sm:tracking-[0.3em]">
                The footwear collection
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-12">
            <div>
              <h1 className="text-[44px] font-black leading-[1.05] tracking-[-0.055em] text-white min-[380px]:text-5xl sm:text-6xl md:text-7xl lg:text-[92px]">
                Find Your
                <br />
                <span className="bg-gradient-to-r from-[#9cc2f5] via-[#7aa7e8] to-[#c7dcf8] bg-clip-text font-serif font-normal italic text-transparent">
                  Next Step.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base md:mt-8 md:text-lg md:leading-8">
                Discover sneakers that bring together everyday comfort,
                effortless style, and performance. Find the pair that moves
                with you.
              </p>

              <a
                href="#shop-products"
                className="group/cta mt-8 inline-flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#172d50] shadow-xl shadow-black/20 transition hover:bg-[#e9edf3] sm:pl-7 sm:text-xs md:mt-10"
              >
                Explore collection
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#172d50] text-white transition group-hover/cta:translate-x-1 group-hover/cta:bg-[#4778b9]">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>

            <div className="flex items-center justify-around gap-6 rounded-3xl border border-white/15 bg-white/10 px-6 py-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:justify-start sm:gap-8 sm:px-8 sm:py-6">
              <div>
                <p className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                  {filteredProducts.length}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Products
                </p>
              </div>

              <div className="h-12 w-px bg-white/15 sm:h-14" />

              <div>
                <p className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                  04
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks strip overlapping hero */}
      <div className="relative z-10 mx-auto -mt-10 max-w-[1400px] px-5 sm:px-6 md:-mt-16">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-[#e3e8f0] shadow-[0_20px_60px_rgba(23,45,80,0.12)] ring-1 ring-[#172d50]/5 md:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              text: "On every order over $100",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              text: "30 days, no questions asked",
            },
            {
              icon: ShieldCheck,
              title: "Secure Checkout",
              text: "Protected payments, always",
            },
          ].map((perk) => (
            <div
              key={perk.title}
              className="flex items-center gap-4 bg-white px-5 py-4 sm:px-7 sm:py-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef3fb] text-[#4778b9] sm:h-12 sm:w-12">
                <perk.icon size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#172d50]">
                  {perk.title}
                </p>
                <p className="mt-0.5 text-xs text-[#8290a3]">{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section
        id="shop-products"
        className="mx-auto max-w-[1400px] scroll-mt-6 px-5 py-12 sm:px-6 md:py-24"
      >
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-3 md:mb-12 md:flex-row md:items-end md:gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3 md:mb-4">
              <span className="h-[2px] w-9 bg-[#4778b9]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4778b9]">
                Curated for you
              </p>
            </div>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#172d50] sm:text-4xl md:text-5xl">
              Explore the{" "}
              <span className="font-serif font-normal italic text-[#4778b9]">
                collection
              </span>
            </h2>
          </div>

          <p className="text-sm text-[#8290a3]">
            Find your perfect pair, your way.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col gap-3 md:mb-7 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8290a3]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your favorite sneakers..."
              className="w-full rounded-full border border-[#e3e8f0] bg-white py-3.5 pl-12 pr-12 text-sm text-[#172d50] shadow-sm outline-none transition placeholder:text-[#a3acb8] focus:border-[#4778b9] focus:shadow-lg focus:shadow-[#4778b9]/10 focus:ring-4 focus:ring-[#4778b9]/10 md:py-4"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8290a3] transition hover:bg-[#eef3fb] hover:text-[#172d50]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-xs font-bold shadow-sm transition sm:px-6 lg:flex-none ${
                showFilters
                  ? "border-[#172d50] bg-[#172d50] text-white shadow-lg shadow-[#172d50]/20"
                  : "border-[#e3e8f0] bg-white text-[#172d50] hover:border-[#4778b9] hover:text-[#4778b9]"
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <div className="flex min-w-0 flex-[1.3] items-center gap-2 rounded-full border border-[#e3e8f0] bg-white px-4 shadow-sm transition focus-within:border-[#4778b9] focus-within:ring-4 focus-within:ring-[#4778b9]/10 sm:px-5 lg:flex-none">
              <ArrowUpDown size={15} className="shrink-0 text-[#8290a3]" />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full min-w-0 cursor-pointer bg-transparent py-3.5 text-xs font-semibold text-[#172d50] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-[#e3e8f0] bg-white shadow-[0_16px_50px_rgba(23,45,80,0.08)]">
            <div className="h-1 w-full bg-gradient-to-r from-[#172d50] via-[#4778b9] to-[#9cc2f5]" />

            <div className="p-5 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-3 md:mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4778b9]">
                    Refine your search
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-tight text-[#172d50] md:text-xl">
                    Filter Products
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setCategory("All");
                    setMaxPrice(200);
                    setSearch("");
                  }}
                  className="shrink-0 rounded-full bg-[#eef3fb] px-4 py-2 text-xs font-bold text-[#4778b9] transition hover:bg-[#172d50] hover:text-white md:px-5"
                >
                  Reset Filters
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8290a3]">
                    Category
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((item) => (
                      <button
                        key={item}
                        onClick={() => setCategory(item)}
                        className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 ${
                          category === item
                            ? "bg-[#172d50] text-white shadow-md shadow-[#172d50]/20"
                            : "bg-[#f3f5f8] text-[#68768a] hover:bg-[#e3e8f0] hover:text-[#172d50]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8290a3]">
                      Maximum Price
                    </p>
                    <span className="rounded-full bg-[#eef3fb] px-4 py-1 text-sm font-black text-[#4778b9]">
                      ${maxPrice}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[#4778b9]"
                  />

                  <div className="mt-2 flex justify-between text-[11px] font-medium text-[#a3acb8]">
                    <span>$50</span>
                    <span>$200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="-mx-5 mb-8 flex gap-2.5 overflow-x-auto border-b border-[#e3e8f0] px-5 pb-4 [scrollbar-width:none] sm:-mx-6 sm:gap-3 sm:px-6 md:mb-12 md:pb-5 [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition sm:px-7 sm:py-3 ${
                category === item
                  ? "bg-[#172d50] text-white shadow-lg shadow-[#172d50]/20"
                  : "border border-[#e3e8f0] bg-white text-[#8290a3] hover:border-[#4778b9] hover:text-[#4778b9]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-[20px] bg-white p-2 ring-1 ring-[#172d50]/5 transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(23,45,80,0.14)] sm:rounded-[28px] sm:p-3"
              >
                <div className="relative overflow-hidden rounded-[16px] bg-[#edf0f4] sm:rounded-[22px]">
                  <div className="relative aspect-[4/4.5]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover transition duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b33]/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>

                  <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.08em] text-[#4778b9] shadow-md backdrop-blur sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-[9px] sm:tracking-[0.12em]">
                    -{Math.round(
                      ((product.oldPrice - product.price) /
                        product.oldPrice) *
                        100
                    )}
                    % OFF
                  </span>

                  <button
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#172d50] shadow-md backdrop-blur transition hover:scale-110 hover:bg-[#172d50] hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
                  >
                    <Heart size={15} />
                  </button>

                  <Link
                    href={`/products/${product.id}`}
                    aria-label={`Select size for ${product.name}`}
                    className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#172d50] text-white shadow-xl transition duration-300 hover:bg-[#4778b9] sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                  >
                    <ShoppingBag size={16} />
                  </Link>
                </div>

                <div className="px-1.5 pb-2 pt-3 sm:px-3 sm:pb-3 sm:pt-5">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5 sm:mb-3">
                    <span className="rounded-full bg-[#eef3fb] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#4778b9] sm:px-3 sm:text-[10px] sm:tracking-[0.16em]">
                      {product.category}
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#172d50] sm:gap-1.5 sm:text-xs">
                      <Star
                        size={12}
                        fill="#e5a847"
                        className="text-[#e5a847]"
                      />
                      {product.rating}
                      <span className="font-normal text-[#a3acb8]">
                        ({product.reviews})
                      </span>
                    </span>
                  </div>

                  <h3 className="text-sm font-black leading-snug tracking-tight text-[#172d50] transition group-hover:text-[#4778b9] sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-[#9aa3b0] sm:mt-1.5 sm:text-xs">
                    Color:{" "}
                    <span className="font-semibold text-[#68768a]">
                      {product.color || "Not specified"}
                    </span>
                  </p>

                  <div className="mt-3 flex items-baseline gap-2 sm:mt-4 sm:gap-3">
                    <span className="text-lg font-black tracking-tight text-[#172d50] sm:text-2xl">
                      ${product.price}
                    </span>

                    <span className="text-xs text-[#a3acb8] line-through sm:text-sm">
                      ${product.oldPrice}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 flex items-center justify-between rounded-full bg-[#f3f5f8] py-1.5 pl-3.5 pr-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#172d50] transition hover:bg-[#172d50] hover:text-white sm:mt-5 sm:py-3 sm:pl-6 sm:pr-3 sm:text-[10px] sm:tracking-[0.2em]"
                  >
                    View Details
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#172d50] transition group-hover:translate-x-0.5 sm:h-8 sm:w-8">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#cbd5e2] bg-white px-6 py-16 text-center sm:rounded-[32px] sm:py-24">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3fb] sm:mb-6 sm:h-20 sm:w-20">
              <Search size={28} className="text-[#4778b9]" />
            </div>

            <h3 className="text-2xl font-black tracking-tight text-[#172d50] sm:text-3xl">
              No sneakers found
            </h3>

            <p className="mt-3 text-sm text-[#8290a3]">
              Try changing your search or filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMaxPrice(200);
              }}
              className="mt-8 rounded-full bg-[#172d50] px-8 py-4 text-xs font-bold text-white shadow-lg shadow-[#172d50]/20 transition hover:-translate-y-0.5 hover:bg-[#4778b9]"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}