"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "お名前を入力してください。";
    if (!email.trim()) e.email = "メールアドレスを入力してください。";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "正しいメールアドレスを入力してください。";
    if (!message.trim()) e.message = "お問い合わせ内容を入力してください。";
    else if (message.trim().length < 10) e.message = "10文字以上入力してください。";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setState("submitting");
    const sub = encodeURIComponent(`【カロリー計算機】お問い合わせ: ${name}`);
    const bod = encodeURIComponent(`お名前: ${name}\nメール: ${email}\n\n${message}`);
    window.location.href = `mailto:dora06290@gmail.com?subject=${sub}&body=${bod}`;
    setTimeout(() => { setState("success"); setName(""); setEmail(""); setMessage(""); }, 500);
  }

  if (state === "success") return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-green-800 font-bold mb-1">メールアプリが開きました</p>
      <p className="text-green-700 text-sm">内容を確認の上、送信してください。</p>
      <button onClick={() => setState("idle")} className="mt-4 text-sm text-green-600 hover:underline">フォームに戻る</button>
    </div>
  );

  const cls = (e?: string) => `w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition ${e ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {[
        { label: "お名前", type: "text", val: name, set: setName, ph: "山田 太郎", err: errors.name },
        { label: "メールアドレス", type: "email", val: email, set: setEmail, ph: "example@email.com", err: errors.email },
      ].map(({ label, type, val, set, ph, err }) => (
        <div key={label}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{label} <span className="text-red-500 text-xs">必須</span></label>
          <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={ph} className={cls(err)} />
          {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">お問い合わせ内容 <span className="text-red-500 text-xs">必須</span></label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="ご意見・ご要望・不具合報告など" className={`${cls(errors.message)} resize-y`} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        <p className="text-xs text-gray-400 mt-1 text-right">{message.length}文字</p>
      </div>
      <button type="submit" disabled={state === "submitting"} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-lg text-sm shadow-sm transition disabled:opacity-60">
        {state === "submitting" ? "送信中..." : "送信する（メールアプリが開きます）"}
      </button>
      <p className="text-xs text-gray-400 text-center">直接の連絡先: dora06290@gmail.com</p>
    </form>
  );
}
