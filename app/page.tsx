import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "./components/CalorieCalculator";
import AdSpace from "./components/AdSpace";

export const metadata: Metadata = {
  title: "カロリー計算機 - 食品のカロリーを無料で計算・記録",
  description:
    "食品名と量を入力するだけでカロリーを即座に計算。よく使う食品20種類をワンタップで選択でき、1日の摂取カロリーを記録できる無料ツールです。ダイエット・健康管理にご活用ください。",
};

const navLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-rose-500 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🔥</div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">カロリー計算機</h1>
                <p className="text-xs text-gray-500">食品カロリーを無料で計算・記録</p>
              </div>
            </div>
            <nav className="flex gap-4 text-sm text-gray-600 flex-wrap">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-rose-600 transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">食品を選んでカロリーを記録</h2>
          <p className="text-sm text-gray-500">
            よく使う食品から素早く選択するか、食品名・カロリーを直接入力して1日の摂取カロリーを管理できます。
          </p>
        </div>

        <CalorieCalculator />

        <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">カロリーの目安</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
            {[
              { label: "成人男性（目安）", kcal: "2,200〜2,650 kcal", note: "活動量による" },
              { label: "成人女性（目安）", kcal: "1,700〜2,000 kcal", note: "活動量による" },
              { label: "このツールの目標", kcal: "2,000 kcal",        note: "参考値" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="font-bold text-gray-800">{item.kcal}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">※ 目標カロリーは年齢・体重・活動量により個人差があります。正確な数値は医師・栄養士にご相談ください。</p>
        </section>
      </main>

      <div className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-rose-600 transition-colors">{l.label}</Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} カロリー計算機 - 食品のカロリーを無料で計算・記録
          </p>
        </div>
      </footer>
    </div>
  );
}
