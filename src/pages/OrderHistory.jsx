
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  CalendarDays,
  ChevronRight,
  X,
  Receipt,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const orders = [
  {
    id: "ESM-1001",
    country: "United States",
    flag: "🇺🇸",
    plan: "5GB Data Plan",
    validity: "15 Days",
    price: "₦20,000",
    date: "November 16, 2026",
    payment: "Paid",
    activation: "Completed",
    method: "Paystack",
  },
  {
    id: "ESM-1002",
    country: "United Kingdom",
    flag: "🇬🇧",
    plan: "10GB Data Plan",
    validity: "30 Days",
    price: "₦35,000",
    date: "November 14, 2026",
    payment: "Paid",
    activation: "Processing",
    method: "Paystack",
  },
  {
    id: "ESM-1003",
    country: "France",
    flag: "🇫🇷",
    plan: "5GB Data Plan",
    validity: "15 Days",
    price: "₦25,000",
    date: "November 10, 2026",
    payment: "Pending",
    activation: "Pending",
    method: "Bank Transfer",
  },
  {
    id: "ESM-1004",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    plan: "3GB Data Plan",
    validity: "7 Days",
    price: "₦18,000",
    date: "November 5, 2026",
    payment: "Paid",
    activation: "Completed",
    method: "Paystack",
  },
];

export default function OrderHistory() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "All" || order.payment === filter;

    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.country.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const statusStyle = (status) => {
    if (status === "Paid" || status === "Completed") {
      return "bg-green-500/10 text-green-400";
    }

    if (status === "Processing") {
      return "bg-blue-500/10 text-blue-400";
    }

    return "bg-yellow-500/10 text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white lg:ml-64 lg:w-[calc(100%-16rem)]">
      <BottomNav />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 lg:px-10 lg:pb-10">
        <div className="mb-8">
          <p className="text-sm text-gray-400">Your purchases</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Order History
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Keep track of all your eSIM purchases and activations.
          </p>
        </div>

        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-[#17141F] p-4">
            <ShoppingBag className="mb-3 text-purple-400" size={21} />
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="mt-1 text-xs text-gray-400">Total orders</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#17141F] p-4">
            <Receipt className="mb-3 text-green-400" size={21} />
            <p className="text-2xl font-bold">
              {orders.filter((order) => order.payment === "Paid").length}
            </p>
            <p className="mt-1 text-xs text-gray-400">Paid orders</p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/5 bg-[#17141F] p-4 sm:col-span-1">
            <CalendarDays className="mb-3 text-blue-400" size={21} />
            <p className="text-2xl font-bold">
              {orders.filter((order) => order.activation === "Processing").length}
            </p>
            <p className="mt-1 text-xs text-gray-400">Processing</p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", "Paid", "Pending"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-[#17141F] text-gray-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#17141F] px-3 py-3 sm:w-64">
            <Search size={17} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/5 bg-[#17141F] p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl">
                    {order.flag}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{order.country}</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.id}
                    </p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${statusStyle(order.payment)}`}>
                  {order.payment}
                </span>
              </div>

              <div className="my-4 grid grid-cols-2 gap-3 border-y border-white/5 py-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">Plan</p>
                  <p className="mt-1 text-sm">{order.plan}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="mt-1 text-sm font-semibold">{order.price}</p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-500">Order date</p>
                  <p className="mt-1 text-sm">{order.date}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Activation:</span>
                  <span className={`rounded-full px-2.5 py-1 ${statusStyle(order.activation)}`}>
                    {order.activation}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-purple-300 transition hover:bg-purple-500/10"
                >
                  View details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="rounded-2xl border border-white/5 bg-[#17141F] px-5 py-12 text-center">
              <ShoppingBag className="mx-auto mb-3 text-gray-500" size={30} />
              <p className="font-medium">No orders found</p>
              <p className="mt-1 text-sm text-gray-500">
                Try searching with another order ID or country.
              </p>
            </div>
          )}
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Order details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">{selectedOrder.flag}</span>
                <div>
                  <p className="font-semibold">{selectedOrder.country}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.id}</p>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-white/5 bg-black/20 p-4">
                {[
                  ["Plan", selectedOrder.plan],
                  ["Validity", selectedOrder.validity],
                  ["Amount", selectedOrder.price],
                  ["Order date", selectedOrder.date],
                  ["Payment method", selectedOrder.method],
                  ["Payment status", selectedOrder.payment],
                  ["Activation status", selectedOrder.activation],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-5 w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold hover:bg-purple-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
