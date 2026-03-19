"use client";

export default function AdSpace({ label = "スポンサー", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">{label}</div>
      {/*
      <ins className="adsbygoogle" style={{ display: "block" }}
        data-ad-client="ca-pub-8297663476934392" data-ad-slot="xxxxxxxxxx"
        data-ad-format="auto" data-full-width-responsive="true" />
      */}
      <div className="w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm py-6 min-h-[90px]">
        広告スペース (レスポンシブ)
      </div>
    </div>
  );
}
