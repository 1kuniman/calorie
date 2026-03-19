import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "運営者情報 | カロリー計算機",
  description: "カロリー計算機の運営者情報ページです。",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">運営者情報</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm sm:text-base">
          <tbody>
            {[
              { label: "サイト名", value: "カロリー計算機 - 食品のカロリーを無料で計算・記録" },
              { label: "サイトURL", value: "https://calorie-keisan.vercel.app" },
              { label: "運営者名", value: "Kunimoto Ikkei" },
              { label: "メールアドレス", value: <a href="mailto:dora06290@gmail.com" className="text-rose-600 hover:underline">dora06290@gmail.com</a> },
              { label: "開設年", value: "2025年" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <th className="text-left px-5 py-4 font-medium text-gray-600 w-36 sm:w-44 border-b border-gray-100 align-top">{row.label}</th>
                <td className="px-5 py-4 text-gray-800 border-b border-gray-100">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">サイトについて</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>「カロリー計算機」は、食品のカロリーを手軽に計算・記録できる無料のオンラインツールです。</p>
          <p>よく使う食品20種類をワンタップで選択でき、カスタム入力にも対応。1日の合計カロリーをリアルタイムで確認できます。入力データはサーバーに送信されず、ブラウザ上のみで処理されます。</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">主な機能</h2>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          {[
            "よく使う食品20種類からワンタップで選択",
            "カテゴリ（主食・肉魚・野菜・乳製品・お菓子）でフィルタ",
            "食品名とカロリーの手動入力（カスタム入力）",
            "1日の合計カロリーをプログレスバーで表示",
            "目標カロリー（2,000kcal）に対する残り・超過を表示",
            "記録の削除・全クリア機能",
            "スマートフォン対応・完全無料",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">免責事項</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>当サイトのカロリー値は参考値です。実際の値は製品・調理方法により異なります。健康管理・ダイエットの具体的な計画は医師・栄養士にご相談ください。当サイトの利用によって生じたいかなる損害についても運営者は責任を負いかねます。</p>
        </div>
      </section>
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 text-center">
        <p className="text-gray-700 text-sm mb-3">ご意見・ご要望・ご質問はお気軽にどうぞ。</p>
        <Link href="/contact" className="inline-block bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          お問い合わせはこちら
        </Link>
      </div>
    </SiteLayout>
  );
}
