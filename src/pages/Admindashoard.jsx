
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Clock,
  CheckCircle2,
  Wallet,
  ChevronRight,
  Eye,
} from "lucide-react";

const initialOrders = [
  {
    id: "ESM-1001",
    customer: "John Smith",
    email: "john@gmail.com",
    country: "United States",
    flag: "🇺🇸",
    plan: "5GB",
    price: 20000,
    date: "Nov 18, 2026",
    status: "Pending",
  },
  {
    id: "ESM-1002",
    customer: "Sarah Johnson",
    email: "sarah@gmail.com",
    country: "United Kingdom",
    flag: "🇬🇧",
    plan: "10GB",
    price: 35000,
    date: "Nov 18, 2026",
    status: "Paid",
  },
  {
    id: "ESM-1003",
    customer: "David Brown",
    email: "david@gmail.com",
    country: "France",
    flag: "🇫🇷",
    plan: "5GB",
    price: 25000,
    date: "Nov 17, 2026",
    status: "Processing",
  },
  {
    id: "ESM-1004",
    customer: "Mary Wilson",
    email: "mary@gmail.com",
    country: "United States",
    flag: "🇺🇸",
    plan: "10GB",
    price: 40000,
    date: "Nov 17, 2026",
    status: "Completed",
  },
  {
    id: "ESM-1005",
    customer: "Daniel Adams",
    email: "daniel@gmail.com",
    country: "UAE",
    flag: "🇦🇪",
    plan: "3GB",
    price: 18000,
    date: "Nov 16, 2026",
    status: "Pending",
  },
];

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Orders", icon: ShoppingBag },
  { name: "eSIM Plans", icon: Smartphone },
  { name: "Customers", icon: Users },
  { name: "Settings", icon: Settings },
];

function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatPrice = (price) =>
    `₦${price.toLocaleString("en-NG")}`;

  const updateStatus = (id, status) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalRevenue = orders
    .filter((order) =>
      ["Paid", "Processing", "Completed"].includes(order.status)
    )
    .reduce((total, order) => total + order.price, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const statusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Paid: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Processing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Completed: "bg-green-500/10 text-green-400 border-green-500/20",
      Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return styles[status] || "bg-gray-500/10 text-gray-400";
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-xl font-bold">
            e
          </div>
          <div>
            <h1 className="text-xl font-bold">
              eSIM<span className="text-purple-400">ly</span>
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pt-7">
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Main menu
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveNav(item.name);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                  activeNav === item.name
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="mb-4 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
          <p className="text-sm font-semibold">Need assistance?</p>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            Manage your store and keep your customers connected.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/auth")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={19} />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0B0F] text-white">

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-[#111015] lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <aside className="absolute left-0 top-0 flex h-full w-[min(280px,85vw)] flex-col border-r border-white/10 bg-[#111015] shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="min-h-screen w-full px-4 pb-10 pt-5 sm:px-7 sm:pt-7 lg:ml-64 lg:w-[calc(100%-16rem)] lg:px-10 lg:pt-9">

        {/* Header */}
        <header className="mb-8 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#17141F] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                Welcome back,
              </p>
              <h1 className="truncate text-xl font-bold sm:text-2xl">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#17141F] text-gray-300 hover:text-white">
            <Bell size={19} />
            {pendingOrders > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />
            )}
          </button>
        </header>

        {activeNav !== "Dashboard" && (
          <div className="mb-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
            <p className="text-sm text-purple-300">
              {activeNav} management will be added in its own section.
            </p>
          </div>
        )}

        {/* Overview */}
        <section className="mb-7">
          <h2 className="text-lg font-semibold sm:text-xl">Overview</h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Here's what's happening with your store.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-9 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 sm:text-sm">
                Total Orders
              </span>
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <ShoppingBag size={17} />
              </div>
            </div>
            <h3 className="text-2xl font-bold sm:text-3xl">
              {orders.length}
            </h3>
            <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
              All customer orders
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 sm:text-sm">
                Revenue
              </span>
              <div className="rounded-lg bg-green-500/10 p-2 text-green-400">
                <Wallet size={17} />
              </div>
            </div>
            <h3 className="break-words text-xl font-bold sm:text-2xl">
              {formatPrice(totalRevenue)}
            </h3>
            <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
              From paid demo orders
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 sm:text-sm">
                Pending
              </span>
              <div className="rounded-lg bg-yellow-500/10 p-2 text-yellow-400">
                <Clock size={17} />
              </div>
            </div>
            <h3 className="text-2xl font-bold sm:text-3xl">
              {pendingOrders}
            </h3>
            <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
              Awaiting review
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 sm:text-sm">
                Completed
              </span>
              <div className="rounded-lg bg-green-500/10 p-2 text-green-400">
                <CheckCircle2 size={17} />
              </div>
            </div>
            <h3 className="text-2xl font-bold sm:text-3xl">
              {completedOrders}
            </h3>
            <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
              Successfully completed
            </p>
          </div>

        </section>

        {/* Orders */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#17141F]">

          <div className="border-b border-white/10 p-4 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Keep track of customer purchases.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-3">
                <Search size={17} className="shrink-0 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-600"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B0B0F] px-3 py-3 text-sm text-gray-300 outline-none sm:w-40"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Mobile Order Cards */}
          <div className="space-y-3 p-3 sm:p-5 md:hidden">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-white/10 bg-[#0F0E14] p-4"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                      {order.flag}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-500">
                        {order.id}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="shrink-0 rounded-lg border border-white/10 p-2 text-gray-400 hover:text-purple-400"
                  >
                    <Eye size={17} />
                  </button>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white/[0.03] p-3">
                  <div>
                    <p className="text-[10px] text-gray-500">Destination</p>
                    <p className="mt-1 text-xs font-medium">
                      {order.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Data plan</p>
                    <p className="mt-1 text-xs font-medium">
                      {order.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Order date</p>
                    <p className="mt-1 text-xs font-medium">
                      {order.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Amount</p>
                    <p className="mt-1 text-xs font-semibold text-purple-300">
                      {formatPrice(order.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">Order status</span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className={`max-w-[145px] rounded-lg border px-3 py-2 text-xs font-medium outline-none ${statusStyle(order.status)} bg-[#17141F]`}
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <p className="py-10 text-center text-sm text-gray-500">
                No orders found.
              </p>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-5 text-sm">{order.id}</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm">{order.flag} {order.country}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.plan}</p>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold">
                      {formatPrice(order.price)}
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs outline-none ${statusStyle(order.status)} bg-[#0B0B0F]`}
                      >
                        <option>Pending</option>
                        <option>Paid</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <p className="py-12 text-center text-sm text-gray-500">
                No orders found.
              </p>
            )}
          </div>
        </section>

        {/* <p className="mt-8 text-center text-xs text-gray-600">
          © 2026 eSIMly. All rights reserved.
        </p> */}
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Order Details</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["Customer", selectedOrder.customer],
                ["Email", selectedOrder.email],
                ["Destination", `${selectedOrder.flag} ${selectedOrder.country}`],
                ["Data plan", selectedOrder.plan],
                ["Order date", selectedOrder.date],
                ["Amount", formatPrice(selectedOrder.price)],
                ["Status", selectedOrder.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 text-sm"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold transition hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
