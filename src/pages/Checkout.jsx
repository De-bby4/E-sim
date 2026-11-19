
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Mail,
  UserRound,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const plan = location.state?.plan || {
    country: "United States",
    flag: "🇺🇸",
    data: "5GB",
    validity: "15 Days",
    price: 12.99,
    carrier: "Available carrier",
  };

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    device: "",
    model: "",
    imei: "",
    eid: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });

    if (form.imei && !/^\d{15}$/.test(form.imei)) {
      newErrors.imei = "IMEI must contain 15 digits";
    }

    if (form.eid && !/^\d{32}$/.test(form.eid)) {
      newErrors.eid = "EID must contain 32 digits";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Your details have been collected. Payment integration will be added next.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0B0B0F] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500";

  const Field = ({ label, name, placeholder, icon: Icon, type = "text" }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        )}
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${inputClass} ${Icon ? "pl-11" : ""}`}
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <BottomNav />

      <main className="min-h-screen w-full px-4 py-6 pb-28 sm:px-8 lg:ml-64 lg:w-[calc(100%-16rem)] lg:px-10 lg:py-10 lg:pb-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} /> Back to plans
        </button>

        <div className="mb-8">
          <p className="mb-2 text-sm text-purple-400">Almost there!</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Complete your order</h1>
          <p className="mt-2 text-sm text-gray-400">
            Provide your details so we can process your eSIM order.
          </p>
        </div>

        <div className="grid gap-7 xl:grid-cols-[1fr_350px]">

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-purple-500/15 p-3 text-purple-400">
                  <UserRound size={21} />
                </div>
                <div>
                  <h2 className="font-semibold">Your information</h2>
                  <p className="text-xs text-gray-500">Enter your contact details</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="fullName" placeholder="Enter your full name" icon={UserRound} />
                <Field label="Email address" name="email" placeholder="you@example.com" icon={Mail} type="email" />
                <Field label="WhatsApp number" name="phone" placeholder="+234 800 000 0000" icon={Smartphone} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-purple-500/15 p-3 text-purple-400">
                  <Smartphone size={21} />
                </div>
                <div>
                  <h2 className="font-semibold">Device details</h2>
                  <p className="text-xs text-gray-500">Make sure your device supports eSIM</p>
                </div>
              </div>

              <div className="mb-5 grid gap-5 sm:grid-cols-2">
                <Field label="Device brand" name="device" placeholder="e.g. Apple, Samsung" />
                <Field label="Phone model" name="model" placeholder="e.g. iPhone 15 Pro" />
              </div>

              <div className="space-y-5">
                <Field label="IMEI (15 digits)" name="imei" placeholder="Enter your IMEI" />
                <Field label="EID (32 digits)" name="eid" placeholder="Enter your EID" />
              </div>

              <div className="mt-5 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
                <p className="text-sm font-medium text-purple-300">Where can I find these details?</p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  Dial *#06# to view your device identifiers. On iPhone, check
                  Settings → General → About. On Android, check Settings →
                  About phone. Only provide identifiers required by your eSIM provider.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#17141F] p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 shrink-0 text-green-400" size={22} />
                <div>
                  <h3 className="font-semibold">Secure checkout</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Your information will be used to process your eSIM order.
                    We will protect your device details and only share necessary
                    information with the activation provider.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-4 font-semibold transition hover:bg-purple-700"
            >
              Continue to payment <CreditCard size={19} />
            </button>
          </form>

          {/* Order Summary */}
          <aside>
            <div className="rounded-2xl border border-white/10 bg-[#17141F] p-6 xl:sticky xl:top-8">
              <h2 className="mb-6 text-lg font-semibold">Order details</h2>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-3xl">
                  {plan.flag}
                </div>
                <div>
                  <p className="font-semibold">{plan.country}</p>
                  <p className="text-xs text-gray-500">{plan.carrier || "eSIM Data Plan"}</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/10 py-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plan</span>
                  <span>{plan.data}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Validity</span>
                  <span>{plan.validity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Carrier</span>
                  <span>{plan.carrier || "Available carrier"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold text-purple-300">
                  ${Number(plan.price).toFixed(2)}
                </span>
              </div>

              <div className="mt-5 flex gap-2 rounded-xl bg-white/5 p-3 text-xs leading-5 text-gray-400">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-400" />
                Review your details carefully before submitting your order.
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default Checkout;
