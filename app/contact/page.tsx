import type { Metadata } from "next";
import SiteLayout from "../components/SiteLayout";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | カロリー計算機",
  description: "カロリー計算機へのお問い合わせページです。ご意見・ご要望・不具合報告などはこちらからご連絡ください。",
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
      <p className="text-gray-500 text-sm mb-8">ご意見・ご要望・不具合のご報告などは、下記フォームまたはメールにてご連絡ください。3営業日以内を目安にご返信いたします。</p>
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-8 flex items-center gap-3 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-gray-700">メールでのお問い合わせ：<a href="mailto:dora06290@gmail.com" className="text-rose-600 hover:underline font-medium ml-1">dora06290@gmail.com</a></span>
      </div>
      <ContactForm />
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-700 mb-2">お問い合わせの前にご確認ください</h3>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>返信にお時間をいただく場合がございます。</li>
          <li>営業・広告に関するお問い合わせにはお答えできない場合があります。</li>
          <li>いただいた個人情報は返答のみに使用し、第三者には提供しません。</li>
        </ul>
      </div>
    </SiteLayout>
  );
}
