import { Link } from "react-router-dom";
import {
  Globe2,
  Bell,
  ArrowUpRight,
  Wifi,
  Smartphone,
  Plus,
  ChevronRight,
  Plane,
  Package,
  Signal,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const destinations = [
    { country: "United States", flag: "🇺🇸", price: "$4.99", code: "US" },
    { country: "United Kingdom", flag: "🇬🇧", price: "$3.99", code: "UK" },
    { country: "France", flag: "🇫🇷", price: "$3.49", code: "FR" },
    { country: "United Arab Emirates", flag: "🇦🇪", price: "$5.99", code: "AE" },
  ];

  const plans = [
    {
      data: "1 GB",
      validity: "7 Days",
      price: "$4.99",
      country: "United States",
    },
    {
      data: "5 GB",
      validity: "15 Days",
      price: "$12.99",
      country: "United Kingdom",
    },
    {
      data: "10 GB",
      validity: "30 Days",
      price: "$19.99",
      country: "France",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <BottomNav />

      <main className="min-h-screen px-4 py-6 pb-28 text-left sm:px-8 lg:ml-64 lg:px-10 lg:py-10 lg:pb-10">

        {/* Header */}
        <header className="flex items-center justify-between mb-9">
          <div>
            <p className="text-gray-400 text-sm mb-1">
              Welcome back 👋
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Hello, Debby!
            </h1>
          </div>

          <button
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-xl bg-[#17141F] border border-white/10 flex items-center justify-center hover:border-purple-500 transition"
          >
            <Bell size={20} className="text-gray-300" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500" />
          </button>
        </header>

        {/* Active eSIM */}
        <section className="mb-9">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Active eSIM</h2>
            <Link
              to="/my-esims"
              className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-600 to-[#34205D] p-6 sm:p-8">
            <div className="absolute -right-12 -top-16 w-56 h-56 rounded-full border-[35px] border-white/10" />
            <div className="absolute right-20 -bottom-28 w-56 h-56 rounded-full border-[35px] border-white/10" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-sm text-purple-100">
                  <Signal size={17} />
                  Active Connection
                </div>

                <span className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🇺🇸</span>
                <div>
                  <h3 className="text-xl font-bold">United States</h3>
                  <p className="text-purple-100 text-sm">
                    Travel eSIM
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-purple-100 text-sm mb-1">
                    Data Remaining
                  </p>
                  <p className="text-3xl font-bold">
                    3.5 GB
                    <span className="text-base font-normal text-purple-100">
                      {" "} / 5 GB
                    </span>
                  </p>
                </div>

                <Wifi size={32} className="text-white/70" />
              </div>

              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-white rounded-full" />
              </div>

              <div className="flex justify-between text-xs text-purple-100 mt-3">
                <span>70% remaining</span>
                <span>Expires in 12 days</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              to="/plans"
              className="bg-[#17141F] border border-white/5 hover:border-purple-500/50 rounded-2xl p-5 transition group"
            >
              <div className="w-11 h-11 bg-purple-500/15 rounded-xl flex items-center justify-center text-purple-400 mb-4">
                <Plus size={23} />
              </div>
              <h3 className="font-semibold text-sm">Buy eSIM</h3>
              <p className="text-xs text-gray-500 mt-1">
                Find a data plan
              </p>
            </Link>

            <Link
              to="/my-esims"
              className="bg-[#17141F] border border-white/5 hover:border-purple-500/50 rounded-2xl p-5 transition group"
            >
              <div className="w-11 h-11 bg-purple-500/15 rounded-xl flex items-center justify-center text-purple-400 mb-4">
                <Smartphone size={22} />
              </div>
              <h3 className="font-semibold text-sm">My eSIMs</h3>
              <p className="text-xs text-gray-500 mt-1">
                Manage your eSIMs
              </p>
            </Link>

            <Link
              to="/profile"
              className="bg-[#17141F] border border-white/5 hover:border-purple-500/50 rounded-2xl p-5 transition group col-span-2 sm:col-span-1"
            >
              <div className="w-11 h-11 bg-purple-500/15 rounded-xl flex items-center justify-center text-purple-400 mb-4">
                <Package size={22} />
              </div>
              <h3 className="font-semibold text-sm">My Account</h3>
              <p className="text-xs text-gray-500 mt-1">
                Manage your account
              </p>
            </Link>
          </div>
        </section>

        {/* Recommended Plans */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Recommended Plans</h2>
              <p className="text-gray-500 text-xs mt-1">
                Data plans you might like
              </p>
            </div>

            <Link
              to="/plans"
              className="text-purple-400 text-sm flex items-center gap-1"
            >
              See all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.country}
                className="bg-[#17141F] border border-white/5 rounded-2xl p-5 hover:border-purple-500/40 transition"
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      {plan.country}
                    </p>
                    <h3 className="text-2xl font-bold">{plan.data}</h3>
                  </div>

                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                    <Globe2 size={21} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-5">
                  <span className="text-gray-500">
                    Validity: {plan.validity}
                  </span>
                  <span className="font-semibold text-white">
                    {plan.price}
                  </span>
                </div>

                <Link
                  to="/plans"
                  className="block text-center w-full py-3 rounded-xl bg-purple-600/15 text-purple-400 hover:bg-purple-600 hover:text-white text-sm font-semibold transition"
                >
                  View Plan
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Popular Destinations</h2>
              <p className="text-gray-500 text-xs mt-1">
                Stay connected wherever you go
              </p>
            </div>

            <Link
              to="/plans"
              className="text-purple-400 text-sm flex items-center gap-1"
            >
              Explore <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {destinations.map((destination) => (
              <Link
                to="/plans"
                key={destination.code}
                className="bg-[#17141F] border border-white/5 rounded-2xl p-4 hover:border-purple-500/40 transition"
              >
                <span className="text-3xl">{destination.flag}</span>
                <h3 className="text-sm font-medium mt-3">
                  {destination.country}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  From{" "}
                  <span className="text-purple-400 font-semibold">
                    {destination.price}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Travel Banner */}
        <section className="rounded-2xl bg-[#17141F] border border-white/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Plane size={19} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Travel smarter
              </span>
            </div>

            <h2 className="text-xl font-bold">
              Your next adventure starts here.
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Get connected before you land. No roaming stress.
            </p>
          </div>

          <Link
            to="/plans"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl text-sm font-semibold transition shrink-0"
          >
            Browse Plans <ArrowUpRight size={17} />
          </Link>
        </section>

      </main>
    </div>
  );
}