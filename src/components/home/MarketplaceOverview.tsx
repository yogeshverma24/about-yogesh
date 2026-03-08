import React from "react";

type StatCardProps = {
    value: string;
    label: string;
  };

  const StatCard = ({ value, label }: StatCardProps) => {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
          {value}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {label}
        </p>
      </div>
    );
  };

const MarketplaceOverview = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-8">

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-slate-900 leading-tight">
            Powering India’s <br />
            <span className="text-purple-500">Construction & Hardware</span> <br />
            Marketplace
          </h2>

          <p className="text-gray-600 max-w-xl text-base leading-relaxed">
            A unified B2B & B2C platform connecting manufacturers, distributors,
            retailers, contractors, and homeowners — enabling bulk procurement,
            verified vendors, smart logistics, and GST-compliant billing.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">

            <StatCard value="10K+" label="Verified Vendors & Shops" />
            <StatCard value="50K+" label="Hardware Products Listed" />
            <StatCard value="1M+" label="Monthly Order Volume" />
            <StatCard value="100+" label="Cities Served Pan-India" />

          </div>

          <div className="pt-4">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-7 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
              Explore Marketplace
              <span className="text-lg">→</span>
            </button>
          </div>

        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border bg-white">
            <img
              src="/images/marketplace-overview.png"
              alt="Construction Marketplace"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-xl border">
            <p className="text-sm font-semibold text-slate-900">Trusted by</p>
            <p className="text-xs text-gray-500 mt-1">
              Contractors • Builders • Retailers
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketplaceOverview;
