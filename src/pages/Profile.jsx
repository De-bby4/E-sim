
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  CreditCard,
  Bell,
  Headphones,
  HelpCircle,
  Settings,
  ChevronRight,
  Camera,
  LogOut,
  Pencil,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const [name, setName] = useState("Debby");
  const [email, setEmail] = useState("debby@example.com");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const accountItems = [
    {
      icon: ShoppingBag,
      title: "Order History",
      description: "View and track your purchases",
      link: "/orders",
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your payment methods",
      link: "/payment-methods",
    },
  ];

  const helpItems = [
    {
      icon: Headphones,
      title: "Contact Support",
      description: "Get help from our support team",
      link: "/support",
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find answers to common questions",
      link: "/faq",
    },
  ];

  const MenuSection = ({ title, items }) => (
    <section className="mb-7">
      <h2 className="mb-3 text-sm font-semibold text-gray-400">
        {title}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#17141F]">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.link}
              className={`flex items-center gap-3 p-4 transition hover:bg-white/[0.04] ${
                index !== items.length - 1
                  ? "border-b border-white/5"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.description}
                </p>
              </div>

              <ChevronRight size={18} className="shrink-0 text-gray-500" />
            </Link>
          );
        })}
      </div>
    </section>
  );

  const saveProfile = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white lg:ml-64 lg:w-[calc(100%-16rem)]">
      <BottomNav />

      <main className="mx-auto max-w-5xl px-4 pb-28 pt-7 sm:px-6 lg:px-10 lg:pb-10">

        {/* Page heading */}
        <div className="mb-8">
          {/* <p className="text-sm text-gray-400">Account</p> */}
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile card */}
        <div className="mb-8 rounded-2xl border border-white/5 bg-[#17141F] p-5 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-5">
              {/* Larger avatar */}
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-purple-500/20 bg-purple-500/15 text-4xl font-bold text-purple-300 sm:h-28 sm:w-28 sm:text-5xl">
                {name.charAt(0).toUpperCase()}

                <button
                  type="button"
                  onClick={() =>
                    alert("Profile photo upload will be available soon.")
                  }
                  aria-label="Change profile picture"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#17141F] bg-purple-600 text-white transition hover:bg-purple-500"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold sm:text-2xl">
                  {name}
                </h2>
                <p className="mt-2 truncate text-sm text-gray-400">
                  {email}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  eSIMly Member
                </p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-gray-400">
            Personal Information
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">

            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#17141F] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Mail size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="mt-1 truncate text-sm font-medium">
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#17141F] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Phone size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="mt-1 text-sm font-medium">
                  {phone || "Not added yet"}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Account */}
        <MenuSection title="Account" items={accountItems} />

        {/* Preferences */}
        <section className="mb-7">
          <h2 className="mb-3 text-sm font-semibold text-gray-400">
            Preferences
          </h2>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#17141F]">

            <div className="flex items-center justify-between gap-4 border-b border-white/5 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Bell size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Notifications
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Receive updates about your eSIMs and orders
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                aria-label="Toggle notifications"
                aria-pressed={notifications}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <Link
              to="/settings"
              className="flex items-center gap-3 p-4 transition hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Settings size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">Settings</p>
                <p className="mt-1 text-xs text-gray-500">
                  Manage your account settings
                </p>
              </div>

              <ChevronRight size={18} className="text-gray-500" />
            </Link>
          </div>
        </section>

        {/* Help & Support */}
        <MenuSection title="Help & Support" items={helpItems} />

        {/* Logout */}
        <button
          onClick={() =>
            alert("Logout will be connected when authentication is implemented.")
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/5 py-3.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={17} />
          Log Out
        </button>

        {/* <div className="mt-7 text-center">
          <p className="text-xs text-gray-600">
            eSIMly · Version 1.0.0
          </p>
        </div> */}
      </main>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={saveProfile}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold">Edit Profile</h2>
              <p className="mt-1 text-sm text-gray-400">
                Update your personal information.
              </p>
            </div>

            <label className="mb-2 block text-sm text-gray-400">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-purple-500"
            />

            <label className="mb-2 block text-sm text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-purple-500"
            />

            <label className="mb-2 block text-sm text-gray-400">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="mb-6 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-purple-500"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-semibold transition hover:bg-purple-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
