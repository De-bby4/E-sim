
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Globe2,
  Wifi,
  Clock,
  ArrowRight,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const plans = [
  { id: 1, country: "United States", code: "US", flag: "🇺🇸", data: "1GB", validity: "7 Days", price: 4.99, type: "Regional", carrier: "AT&T" },
  { id: 2, country: "United States", code: "US", flag: "🇺🇸", data: "5GB", validity: "15 Days", price: 12.99, type: "Regional", carrier: "AT&T", popular: true },
  { id: 3, country: "United Kingdom", code: "UK", flag: "🇬🇧", data: "3GB", validity: "7 Days", price: 8.99, type: "Regional", carrier: "EE" },
  { id: 4, country: "United Kingdom", code: "UK", flag: "🇬🇧", data: "10GB", validity: "30 Days", price: 19.99, type: "Regional", carrier: "EE" },
  { id: 5, country: "France", code: "FR", flag: "🇫🇷", data: "5GB", validity: "15 Days", price: 11.99, type: "Regional", carrier: "Orange" },
  { id: 6, country: "France", code: "FR", flag: "🇫🇷", data: "10GB", validity: "30 Days", price: 18.99, type: "Regional", carrier: "Orange" },
  { id: 7, country: "United Arab Emirates", code: "UAE", flag: "🇦🇪", data: "3GB", validity: "7 Days", price: 9.99, type: "Regional", carrier: "Etisalat" },
  { id: 8, country: "Global", code: "GL", flag: "🌍", data: "5GB", validity: "30 Days", price: 24.99, type: "Global", carrier: "Multiple networks" },
];

function Plans() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch = plan.country.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || plan.type === filter;

    return matchesSearch && matchesFilter;
  });

  const handleBuyNow = (plan) => {
    navigate("/checkout", { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <BottomNav />

      <main className="min-h-screen w-full px-4 py-6 pb-28 sm:px-8 lg:ml-64 lg:w-[calc(100%-16rem)] lg:px-10 lg:py-10 lg:pb-10">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-purple-400">
            Stay connected anywhere
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Explore eSIM Plans
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Find the perfect data plan for your next destination.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17141F] px-4 py-4">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {["All", "Regional", "Global"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                filter === item
                  ? "bg-purple-600 text-white"
                  : "border border-white/10 bg-[#17141F] text-gray-400 hover:border-purple-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Plan Count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Available Plans
          </h2>

          <span className="text-sm text-gray-500">
            {filteredPlans.length} plans
          </span>
        </div>

        {/* Plans */}
        {filteredPlans.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="relative rounded-2xl border border-white/10 bg-[#17141F] p-5 transition hover:-translate-y-1 hover:border-purple-500/50"
              >
                {plan.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                    Popular
                  </span>
                )}

                {/* Country */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-3xl">
                    {plan.flag}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {plan.country}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {plan.carrier}
                    </p>
                  </div>
                </div>

                {/* Data */}
                <div className="mb-5 rounded-xl bg-purple-500/10 p-4">
                  <p className="text-sm text-gray-400">
                    Data allowance
                  </p>

                  <p className="mt-1 text-3xl font-bold text-purple-300">
                    {plan.data}
                  </p>
                </div>

                {/* Validity */}
                <div className="mb-5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    Validity
                  </div>

                  <span className="font-medium">
                    {plan.validity}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-gray-400">
                    Price
                  </span>

                  <span className="text-2xl font-bold">
                    ${plan.price.toFixed(2)}
                  </span>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handleBuyNow(plan)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold transition hover:bg-purple-700"
                >
                  Buy Now
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#17141F] px-5 py-14 text-center">
            <Globe2
              size={35}
              className="mx-auto mb-4 text-purple-400"
            />

            <h3 className="text-lg font-semibold">
              No plans found
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Try searching for another destination.
            </p>
          </div>
        )}

        {/* Information */}
        <div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Wifi
              size={24}
              className="mt-1 shrink-0 text-purple-400"
            />

            <div>
              <h3 className="font-semibold">
                Stay connected wherever you go
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Choose a destination, select your preferred data plan
                and enjoy seamless connectivity while travelling.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Plans;
