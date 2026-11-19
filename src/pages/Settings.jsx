
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Globe,
  Coins,
  FileText,
  Shield,
  ChevronRight,
  LogOut,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Settings() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("NGN (₦)");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const updatePassword = (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 8) {
      alert("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("Your new passwords do not match.");
      return;
    }

    alert("Password change will be connected to your authentication system.");
    setShowPasswordModal(false);
    setPasswords({ current: "", newPassword: "", confirm: "" });
  };

  const SettingItem = ({ icon: Icon, title, description, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      <ChevronRight size={18} className="shrink-0 text-gray-500" />
    </button>
  );

  const Section = ({ title, children }) => (
    <section className="mb-7">
      <h2 className="mb-3 text-sm font-semibold text-gray-400">{title}</h2>
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#17141F] divide-y divide-white/5">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white lg:ml-64 lg:w-[calc(100%-16rem)]">
      <BottomNav />

      <main className="mx-auto max-w-5xl px-4 pb-28 pt-7 sm:px-6 lg:px-10 lg:pb-10">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/profile"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Profile
          </Link>

          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your security, preferences and privacy.
          </p>
        </div>

        {/* Security */}
        <Section title="Security">
          <SettingItem
            icon={LockKeyhole}
            title="Change Password"
            description="Update your account password"
            onClick={() => setShowPasswordModal(true)}
          />

          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Account Security</p>
              <p className="mt-1 text-xs text-gray-500">
                Keep your account and personal information safe.
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
              Protected
            </span>
          </div>
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Globe size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Language</p>
              <p className="mt-1 text-xs text-gray-500">
                Choose your preferred language
              </p>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="max-w-[120px] rounded-lg border border-white/10 bg-[#211C2B] px-2 py-2 text-xs text-white outline-none focus:border-purple-500"
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Coins size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Currency</p>
              <p className="mt-1 text-xs text-gray-500">
                Choose your preferred currency
              </p>
            </div>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="max-w-[130px] rounded-lg border border-white/10 bg-[#211C2B] px-2 py-2 text-xs text-white outline-none focus:border-purple-500"
            >
              <option>NGN (₦)</option>
              <option>USD ($)</option>
              <option>GBP (£)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </Section>

        {/* Privacy */}
        <Section title="Privacy & Legal">
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            description="Learn how we handle your information"
            onClick={() => alert("Privacy Policy page will be added soon.")}
          />

          <SettingItem
            icon={FileText}
            title="Terms & Conditions"
            description="Read our terms of service"
            onClick={() => alert("Terms and Conditions page will be added soon.")}
          />
        </Section>

        {/* Account */}
        <section className="mb-7">
          <h2 className="mb-3 text-sm font-semibold text-gray-400">
            Account
          </h2>

          <button
            onClick={() =>
              alert("Logout will be connected when authentication is implemented.")
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/5 py-3.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </section>

        {/* <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">eSIMly · Version 1.0.0</p>
        </div> */}
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={updatePassword}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold">Change Password</h2>
              <p className="mt-1 text-sm text-gray-400">
                Enter your current password and choose a new one.
              </p>
            </div>

            {[
              ["current", "Current Password"],
              ["newPassword", "New Password"],
              ["confirm", "Confirm New Password"],
            ].map(([field, label]) => (
              <div key={field} className="mb-4">
                <label className="mb-2 block text-sm text-gray-400">
                  {label}
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={field === "current" ? undefined : 8}
                    value={passwords[field]}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-sm outline-none focus:border-purple-500"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-semibold transition hover:bg-purple-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
