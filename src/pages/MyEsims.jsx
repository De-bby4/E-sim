
import { useState } from "react";
import { Smartphone, Wifi, CalendarDays, Copy, QrCode, Signal, ArrowDownToLine, Search } from "lucide-react";
import BottomNav from "../components/BottomNav";

const esimData = [
  {
    id: "ESM-1001",
    country: "United States",
    code: "US",
    flag: "🇺🇸",
    plan: "5GB Data Plan",
    data: 5,
    used: 2.4,
    validity: "15 Days",
    expires: "December 3, 2026",
    status: "Active",
    iccid: "8944501234567890123",
  },
  {
    id: "ESM-1002",
    country: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    plan: "10GB Data Plan",
    data: 10,
    used: 10,
    validity: "30 Days",
    expires: "November 10, 2026",
    status: "Expired",
    iccid: "8944509876543210987",
  },
];

export default function MyEsims() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredEsims = esimData.filter((esim) => {
    const matchesFilter = filter === "All" || esim.status === filter;
    const matchesSearch =
      esim.country.toLowerCase().includes(search.toLowerCase()) ||
      esim.id.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const copyICCID = (iccid) => {
    navigator.clipboard.writeText(iccid);
    alert("ICCID copied!");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white lg:ml-64 lg:w-[calc(100%-16rem)]">
      <BottomNav />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-7 sm:px-6 lg:px-10 lg:pb-10">
        <div className="mb-8">
          <p className="text-sm text-gray-400">Your connectivity</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My eSIMs</h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your eSIM plans and activation details.
          </p>
        </div>

        <div className="mb-7 grid grid-cols-2 gap-3 sm:gap-5">
          <div className="rounded-2xl border border-white/5 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <Smartphone size={20} />
            </div>
            <p className="text-2xl font-bold">{esimData.length}</p>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">Total eSIMs</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#17141F] p-4 sm:p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
              <Signal size={20} />
            </div>
            <p className="text-2xl font-bold">
              {esimData.filter((item) => item.status === "Active").length}
            </p>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">Active eSIMs</p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {["All", "Active", "Expired"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-[#17141F] text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#17141F] px-3 py-2.5 sm:w-64">
            <Search size={17} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search eSIMs..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredEsims.map((esim) => (
            <div
              key={esim.id}
              className="rounded-2xl border border-white/5 bg-[#17141F] p-4 sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl">
                    {esim.flag}
                  </div>
                  <div>
                    <h2 className="font-semibold">{esim.country}</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      {esim.id} · {esim.plan}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    esim.status === "Active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {esim.status}
                </span>
              </div>

              <div className="my-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">Data usage</span>
                  <span className="font-medium">
                    {esim.used}GB / {esim.data}GB
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${Math.min((esim.used / esim.data) * 100, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {Math.max(esim.data - esim.used, 0).toFixed(1)}GB remaining
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">Validity</p>
                  <p className="mt-1 text-sm">{esim.validity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expires</p>
                  <p className="mt-1 text-sm">{esim.expires}</p>
                </div>
                <div className="col-span-2 flex items-end sm:col-span-1 sm:justify-end">
                  <button
                    onClick={() => setSelected(esim)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium transition hover:bg-purple-500 sm:w-auto"
                  >
                    <QrCode size={16} />
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredEsims.length === 0 && (
            <div className="rounded-2xl border border-white/5 bg-[#17141F] px-5 py-12 text-center">
              <Wifi size={30} className="mx-auto mb-3 text-gray-500" />
              <p className="font-medium">No eSIMs found</p>
              <p className="mt-1 text-sm text-gray-500">
                Your purchased eSIMs will appear here.
              </p>
            </div>
          )}
        </div>

        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">eSIM details</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xl text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mb-5 rounded-2xl bg-purple-500/10 p-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
                  <QrCode size={34} />
                </div>
                <p className="font-semibold">{selected.country}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {selected.plan}
                </p>
                <p className="mt-3 text-xs text-purple-300">
                  QR code will appear here after activation
                </p>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-xs text-gray-500">ICCID</p>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
                  <span className="break-all text-xs">{selected.iccid}</span>
                  <button
                    onClick={() => copyICCID(selected.iccid)}
                    className="shrink-0 text-purple-400"
                  >
                    <Copy size={17} />
                  </button>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays size={16} />
                Expires: {selected.expires}
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold hover:bg-purple-500"
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
