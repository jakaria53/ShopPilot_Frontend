"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  DollarSign,
  Clock,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  Eye,
  RefreshCw,
} from "lucide-react";

type Order = {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items: {
    productId: number;
    name: string;
    quantity: number;
  }[];
};

// Styling helper only: picks badge colors for an order status
const statusStyle = (status: string) => {
  const value = status.toLowerCase();

  if (value === "pending") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }
  if (value === "cancelled") {
    return "bg-red-50 text-red-600 ring-red-200";
  }
  if (value === "delivered" || value === "completed") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }
  return "bg-orange-50 text-[#e66b3d] ring-orange-200";
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("shoppilot-orders");

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="flex items-center gap-3 rounded-full border border-[#eee6da] bg-white px-6 py-3 text-sm font-semibold text-[#171717] shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#e66b3d] border-t-transparent" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  // Dashboard Statistics
  const validOrders = orders.filter(
    (order) => order.status !== "Cancelled"
  );

  const totalRevenue = validOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const totalItemsSold = validOrders.reduce(
    (total, order) =>
      total +
      order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  // Last 7 days sales
  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    const dayRevenue = validOrders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);

        return (
          orderDate.getDate() === date.getDate() &&
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((total, order) => total + order.total, 0);

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      revenue: dayRevenue,
    };
  });

  const maxRevenue = Math.max(
    ...lastSevenDays.map((day) => day.revenue),
    1
  );

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      description: "Excluding cancelled orders",
      icon: DollarSign,
      gradient: "from-[#e66b3d] to-[#ffa600]",
    },
    {
      title: "Total Orders",
      value: orders.length.toString(),
      description: "All customer orders",
      icon: ShoppingBag,
      gradient: "from-[#171717] to-[#4a4540]",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      description: "Waiting for processing",
      icon: Clock,
      gradient: "from-[#f28a3a] to-[#f5c04a]",
    },
    {
      title: "Items Sold",
      value: totalItemsSold.toString(),
      description: "Units in active orders",
      icon: Package,
      gradient: "from-[#d9534f] to-[#f08a6b]",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf7f2] text-[#171717] antialiased">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col overflow-hidden bg-gradient-to-b from-[#121212] via-[#171717] to-[#241811] p-6 text-white md:flex">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e66b3d]/25 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#ffa600]/15 blur-[80px]" />

        <Link href="/" className="relative mb-12 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e66b3d] to-[#ffa600] shadow-lg shadow-[#e66b3d]/30">
            <ShoppingBag size={19} strokeWidth={2.3} />
          </span>
          <span className="text-2xl font-black tracking-[-0.05em]">
            Shop
            <span className="bg-gradient-to-r from-[#e66b3d] to-[#ffa600] bg-clip-text text-transparent">
              Pilot.
            </span>
          </span>
        </Link>

        <p className="relative mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
          Management
        </p>

        <Link
          href="/admin"
          className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#e66b3d] to-[#f28a3a] p-3.5 text-sm font-bold shadow-lg shadow-[#e66b3d]/30"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
            <LayoutDashboard size={17} />
          </span>
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className="relative mt-2 flex items-center gap-3 rounded-2xl p-3.5 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <ShoppingBag size={17} />
          </span>
          Orders
        </Link>

        <Link
          href="/admin/products"
          className="relative mt-2 flex items-center gap-3 rounded-2xl p-3.5 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <Package size={17} />
          </span>
          Products
        </Link>

        <div className="relative mt-auto">
          <Link
            href="/"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-[#171717]"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Dashboard */}
      <section className="px-5 py-6 md:ml-64 md:px-10 md:py-9">
        {/* Mobile top navigation (sidebar is hidden on phones) */}
        <div className="-mx-5 mb-6 flex items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          <Link
            href="/admin"
            className="shrink-0 rounded-full bg-gradient-to-r from-[#e66b3d] to-[#f28a3a] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#e66b3d]/30"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="shrink-0 rounded-full border border-[#eee6da] bg-white px-5 py-2.5 text-xs font-bold text-[#6b645c]"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="shrink-0 rounded-full border border-[#eee6da] bg-white px-5 py-2.5 text-xs font-bold text-[#6b645c]"
          >
            Products
          </Link>
          <Link
            href="/"
            className="shrink-0 rounded-full border border-[#eee6da] bg-white px-5 py-2.5 text-xs font-bold text-[#6b645c]"
          >
            ← Store
          </Link>
        </div>

        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#171717] via-[#241811] to-[#4a2616] p-6 text-white shadow-[0_20px_50px_rgba(23,23,23,0.18)] md:mb-9 md:p-9">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#e66b3d]/40 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#ffa600]/20 blur-[90px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur sm:text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffa600] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffa600]" />
                </span>
                ShopPilot Administration
              </p>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Dashboard{" "}
                <span className="bg-gradient-to-r from-[#ffa600] to-[#ffd27a] bg-clip-text font-serif font-normal italic text-transparent">
                  Overview
                </span>
              </h1>

              <p className="mt-3 text-sm text-white/60 md:text-base">
                Here&apos;s what&apos;s happening with your store.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur sm:self-auto">
                <CalendarDays size={15} />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e66b3d] to-[#f28a3a] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#e66b3d]/40 transition hover:-translate-y-0.5 hover:from-white hover:to-white hover:text-[#171717]"
              >
                <RefreshCw size={16} />
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-3xl border border-[#eee6da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(230,107,61,0.14)]"
              >
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 transition duration-500 group-hover:scale-150`}
                />

                <div className="relative flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#6b645c]">
                    {stat.title}
                  </p>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="relative mt-6 text-3xl font-black tracking-tight text-[#171717] md:text-4xl">
                  {stat.value}
                </h2>

                <p className="relative mt-2 text-xs text-[#a39c93]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sales Overview */}
        <div className="mb-8 grid gap-5 sm:gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-[#eee6da] bg-white p-5 sm:p-7 xl:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight">
                  Sales Overview
                </h2>

                <p className="mt-1 text-sm text-[#8f877e]">
                  Revenue from the last 7 days
                </p>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-[#072846]">
                <TrendingUp size={21} />
              </span>
            </div>

            <div className="relative">
              {/* Grid lines */}
              <div className="pointer-events-none absolute inset-x-0 bottom-7 top-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="border-t border-dashed border-[#eee6da]"
                  />
                ))}
              </div>

              <div className="relative flex h-52 items-end justify-between gap-2 sm:gap-3">
                {lastSevenDays.map((day) => (
                  <div
                    key={day.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="text-[10px] font-bold text-[#e78d27] sm:text-xs">
                      {day.revenue > 0
                        ? `$${day.revenue.toFixed(0)}`
                        : ""}
                    </div>

                    <div
                      className="w-full max-w-12 rounded-t-xl bg-gradient-to-t from-[#082a46] to-[#07354b] shadow-lg shadow-[#e66b3d]/20 transition-all duration-300 hover:from-[#171717] hover:to-[#4a4540]"
                      style={{
                        height: `${Math.max(
                          (day.revenue / maxRevenue) * 100,
                          3
                        )}%`,
                      }}
                    />

                    <span className="text-[11px] font-semibold text-[#a39c93] sm:text-xs">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#171717] via-[#241811] to-[#4a2616] p-7 text-white shadow-[0_20px_50px_rgba(23,23,23,0.20)]">
            <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#e66b3d]/40 blur-[70px]" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full border border-white/10" />

            <div className="relative">
              <p className="text-sm font-semibold text-white/60">
                Store Performance
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                {orders.length}{" "}
                <span className="font-serif text-3xl font-normal italic text-[#ffa600] md:text-4xl">
                  Orders
                </span>
              </h2>

              <p className="mt-3 text-sm text-white/60">
                You have received {orders.length} orders so far.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="group/btn relative mt-8 flex items-center justify-between rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold text-[#171717] transition hover:bg-[#fff1e8]"
            >
              Manage Orders
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e66b3d] to-[#ffa600] text-white transition group-hover/btn:scale-110">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="overflow-hidden rounded-3xl border border-[#eee6da] bg-white">
          <div className="flex items-center justify-between gap-3 p-5 sm:p-7">
            <div>
              <h2 className="text-xl font-black tracking-tight">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-[#8f877e]">
                Latest customer purchases
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-[#e66b3d] transition hover:bg-[#e66b3d] hover:text-white"
            >
              View All <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-y border-[#f1ebe2] bg-[#fcfaf6] text-[11px] uppercase tracking-[0.15em] text-[#8f877e]">
                <tr>
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f1ebe2]">
                {recentOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="transition hover:bg-[#fcfaf6]"
                  >
                    <td className="px-6 py-5 text-sm font-bold text-[#171717]">
                      {order.orderId}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e66b3d] to-[#ffa600] text-xs font-bold uppercase text-white">
                          {order.customer.fullName.charAt(0)}
                        </span>
                        <span className="font-semibold">
                          {order.customer.fullName}
                        </span>
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#8f877e]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 text-sm font-black text-[#171717]">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 ring-inset ${statusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-[#e66b3d] transition hover:bg-[#e66b3d] hover:text-white"
                      >
                        <Eye size={17} />
                      </Link>
                    </td>
                  </tr>
                ))}

                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center text-sm text-[#8f877e]"
                    >
                      No orders available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-[#a39c93]">
          ShopPilot Admin Dashboard · Demo Version
        </p>
      </section>
    </main>
  );
}