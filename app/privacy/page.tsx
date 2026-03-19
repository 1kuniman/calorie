import type { Metadata } from "next";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー | カロリー計算機",
  description: "カロリー計算機のプライバシーポリシーページです。個人情報の取り扱い、Cookie、Google AdSenseについて説明しています。",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
      <p className="text-sm text-gray-500 mb-8">最終更新日：2025年3月19日</p>
      <Section title="はじめに">
        <p>カロリー計算機（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。</p>
      </Section>
      <Section title="収集する情報">
        <ul>
          <li>アクセスログ（IPアドレス、ブラウザの種類、参照元URL、アクセス日時など）</li>
          <li>Cookieおよびこれに類する技術を通じて収集される情報</li>
          <li>お問い合わせフォームを通じてご入力いただいた情報（氏名・メールアドレス・内容）</li>
        </ul>
        <p>なお、当サイトのカロリー計算機能に入力された食品・量等のデータはサーバーへ送信・保存されず、ブラウザ上のみで処理されます。</p>
      </Section>
      <Section title="情報の利用目的">
        <ul>
          <li>サービス提供・維持・改善のため</li>
          <li>お問い合わせへの対応のため</li>
          <li>不正アクセス防止のため</li>
          <li>アクセス解析によるサービス改善のため</li>
        </ul>
      </Section>
      <Section title="Cookieについて">
        <p>当サイトでは以下の目的でCookieを使用しています。</p>
        <ul>
          <li>アクセス解析（Google Analytics）</li>
          <li>広告配信（Google AdSense）</li>
        </ul>
        <p>ブラウザの設定によりCookieを無効にできますが、一部サービスが正常に動作しない場合があります。</p>
      </Section>
      <Section title="Google AdSenseについて">
        <p>当サイトではGoogle合同会社が提供する「Google AdSense」を利用しています。Cookieを使用してユーザーの興味に基づいた広告を表示します。</p>
        <p>オプトアウトは<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Googleのポリシーと規約</a>よりご確認ください。</p>
      </Section>
      <Section title="Google Analyticsについて">
        <p>アクセス解析のため「Google Analytics」を利用することがあります。Cookieを使用しますが、個人を特定する情報は収集しません。</p>
      </Section>
      <Section title="第三者への情報提供">
        <p>以下の場合を除き、収集した個人情報を第三者に提供しません。</p>
        <ul>
          <li>ユーザー本人の同意がある場合</li>
          <li>法令に基づく開示が必要な場合</li>
          <li>人の生命・身体・財産の保護のために必要な場合</li>
        </ul>
      </Section>
      <Section title="プライバシーポリシーの変更">
        <p>必要に応じて本ポリシーを変更することがあります。変更後は本ページ掲載時点から効力を生じます。</p>
      </Section>
      <Section title="お問い合わせ">
        <ul>
          <li>運営者：Kunimoto Ikkei</li>
          <li>メール：<a href="mailto:dora06290@gmail.com" className="text-rose-600 hover:underline">dora06290@gmail.com</a></li>
        </ul>
      </Section>
    </SiteLayout>
  );
}
