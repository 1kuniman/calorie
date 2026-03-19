"use client";

import { useState, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────
// 食品データベース（100gあたりのkcal）
// ─────────────────────────────────────────────────────────
interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  kcalPer100g: number;
  defaultAmount: number; // よく使う量(g)
  unit: string;          // 単位表示
  category: "主食" | "肉・魚" | "野菜" | "乳製品・卵" | "お菓子・飲料";
}

const FOOD_DB: FoodItem[] = [
  // 主食
  { id: "rice",        name: "白ご飯",         emoji: "🍚", kcalPer100g: 168,  defaultAmount: 150, unit: "g", category: "主食" },
  { id: "bread",       name: "食パン(6枚切)",  emoji: "🍞", kcalPer100g: 264,  defaultAmount: 60,  unit: "g", category: "主食" },
  { id: "ramen",       name: "ラーメン(醤油)", emoji: "🍜", kcalPer100g: 100,  defaultAmount: 450, unit: "g", category: "主食" },
  { id: "pasta",       name: "パスタ(ゆで)",   emoji: "🍝", kcalPer100g: 165,  defaultAmount: 200, unit: "g", category: "主食" },
  { id: "udon",        name: "うどん(ゆで)",   emoji: "🍜", kcalPer100g: 105,  defaultAmount: 250, unit: "g", category: "主食" },
  // 肉・魚
  { id: "chicken",     name: "鶏むね肉",       emoji: "🍗", kcalPer100g: 116,  defaultAmount: 100, unit: "g", category: "肉・魚" },
  { id: "beef",        name: "牛肉(もも)",     emoji: "🥩", kcalPer100g: 209,  defaultAmount: 100, unit: "g", category: "肉・魚" },
  { id: "pork",        name: "豚肉(ロース)",   emoji: "🥩", kcalPer100g: 263,  defaultAmount: 100, unit: "g", category: "肉・魚" },
  { id: "salmon",      name: "鮭",             emoji: "🐟", kcalPer100g: 133,  defaultAmount: 80,  unit: "g", category: "肉・魚" },
  { id: "tuna",        name: "ツナ缶(水煮)",   emoji: "🐟", kcalPer100g: 71,   defaultAmount: 70,  unit: "g", category: "肉・魚" },
  // 野菜
  { id: "tomato",      name: "トマト",         emoji: "🍅", kcalPer100g: 20,   defaultAmount: 150, unit: "g", category: "野菜" },
  { id: "broccoli",    name: "ブロッコリー",   emoji: "🥦", kcalPer100g: 37,   defaultAmount: 100, unit: "g", category: "野菜" },
  { id: "spinach",     name: "ほうれん草",     emoji: "🥬", kcalPer100g: 25,   defaultAmount: 80,  unit: "g", category: "野菜" },
  { id: "carrot",      name: "にんじん",       emoji: "🥕", kcalPer100g: 39,   defaultAmount: 60,  unit: "g", category: "野菜" },
  // 乳製品・卵
  { id: "egg",         name: "卵(Mサイズ)",    emoji: "🥚", kcalPer100g: 151,  defaultAmount: 55,  unit: "g", category: "乳製品・卵" },
  { id: "milk",        name: "牛乳",           emoji: "🥛", kcalPer100g: 67,   defaultAmount: 200, unit: "ml", category: "乳製品・卵" },
  { id: "yogurt",      name: "ヨーグルト(無糖)",emoji: "🫙", kcalPer100g: 62,  defaultAmount: 100, unit: "g", category: "乳製品・卵" },
  { id: "cheese",      name: "スライスチーズ", emoji: "🧀", kcalPer100g: 339,  defaultAmount: 18,  unit: "g", category: "乳製品・卵" },
  // お菓子・飲料
  { id: "banana",      name: "バナナ",         emoji: "🍌", kcalPer100g: 93,   defaultAmount: 90,  unit: "g", category: "お菓子・飲料" },
  { id: "cola",        name: "コーラ(350ml)",  emoji: "🥤", kcalPer100g: 45,   defaultAmount: 350, unit: "ml", category: "お菓子・飲料" },
];

const CATEGORIES = ["主食", "肉・魚", "野菜", "乳製品・卵", "お菓子・飲料"] as const;
type Category = typeof CATEGORIES[number];

const CATEGORY_COLORS: Record<Category, string> = {
  "主食":       "bg-amber-100 text-amber-800 border-amber-200",
  "肉・魚":     "bg-red-100 text-red-800 border-red-200",
  "野菜":       "bg-green-100 text-green-800 border-green-200",
  "乳製品・卵": "bg-blue-100 text-blue-800 border-blue-200",
  "お菓子・飲料":"bg-purple-100 text-purple-800 border-purple-200",
};

// ─────────────────────────────────────────────────────────
// 1日の目標カロリー
// ─────────────────────────────────────────────────────────
const DAILY_GOAL = 2000;

// ─────────────────────────────────────────────────────────
// 記録アイテム
// ─────────────────────────────────────────────────────────
interface LogItem {
  id: number;
  name: string;
  emoji: string;
  amount: number;
  unit: string;
  kcal: number;
  time: string;
}

let logIdSeq = 1;

function calcKcal(kcalPer100g: number, amount: number): number {
  return Math.round(kcalPer100g * amount / 100);
}

function nowTime(): string {
  return new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

// ─────────────────────────────────────────────────────────
// カスタム入力パネル
// ─────────────────────────────────────────────────────────
function CustomInput({ onAdd }: { onAdd: (item: Omit<LogItem, "id" | "time">) => void }) {
  const [name, setName] = useState("");
  const [kcalPer100g, setKcalPer100g] = useState("");
  const [amount, setAmount] = useState("");

  const kcal = useMemo(() => {
    const k = parseFloat(kcalPer100g);
    const a = parseFloat(amount);
    return !isNaN(k) && !isNaN(a) && k >= 0 && a >= 0 ? calcKcal(k, a) : null;
  }, [kcalPer100g, amount]);

  function handleAdd() {
    if (!name.trim() || kcal === null) return;
    onAdd({ name: name.trim(), emoji: "🍽️", amount: parseFloat(amount), unit: "g", kcal });
    setName(""); setKcalPer100g(""); setAmount("");
  }

  const inputCls = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span className="bg-gray-100 rounded-md px-2 py-0.5 text-xs">カスタム入力</span>
        食品名とカロリーを手入力
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">食品名</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="例：おにぎり" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">100gあたりkcal</label>
          <div className="relative">
            <input type="number" min="0" value={kcalPer100g} onChange={(e) => setKcalPer100g(e.target.value)} placeholder="168" className={`${inputCls} pr-14`} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">kcal</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">量 (g / ml)</label>
          <div className="relative">
            <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className={`${inputCls} pr-6`} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">g</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`text-sm font-semibold tabular-nums transition-opacity ${kcal !== null ? "text-rose-600 opacity-100" : "text-gray-400 opacity-50"}`}>
          {kcal !== null ? `${kcal} kcal` : "— kcal"}
        </div>
        <button
          onClick={handleAdd}
          disabled={!name.trim() || kcal === null}
          className="ml-auto px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          + 追加
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// メインコンポーネント
// ─────────────────────────────────────────────────────────
export default function CalorieCalculator() {
  const [log, setLog] = useState<LogItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | "すべて">("すべて");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [inputAmount, setInputAmount] = useState("");

  const totalKcal = useMemo(() => log.reduce((s, i) => s + i.kcal, 0), [log]);
  const progress = Math.min(100, (totalKcal / DAILY_GOAL) * 100);
  const progressColor = progress >= 100 ? "bg-red-500" : progress >= 80 ? "bg-orange-400" : "bg-rose-400";

  const addToLog = useCallback((item: Omit<LogItem, "id" | "time">) => {
    setLog((prev) => [...prev, { ...item, id: logIdSeq++, time: nowTime() }]);
  }, []);

  const removeFromLog = useCallback((id: number) => {
    setLog((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearLog = useCallback(() => setLog([]), []);

  // クイック選択食品のフィルタ
  const filteredFoods = activeCategory === "すべて"
    ? FOOD_DB
    : FOOD_DB.filter((f) => f.category === activeCategory);

  // 食品選択時
  function handleSelectFood(food: FoodItem) {
    setSelectedFood(food);
    setInputAmount(String(food.defaultAmount));
  }

  // 選択食品を追加
  function handleAddSelected() {
    if (!selectedFood) return;
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) return;
    const kcal = calcKcal(selectedFood.kcalPer100g, amount);
    addToLog({ name: selectedFood.name, emoji: selectedFood.emoji, amount, unit: selectedFood.unit, kcal });
    setSelectedFood(null);
    setInputAmount("");
  }

  return (
    <div className="space-y-5">
      {/* 合計カロリーバー */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">本日の合計カロリー</div>
            <div className="text-4xl font-bold tabular-nums text-gray-800">
              {totalKcal.toLocaleString()}
              <span className="text-lg font-medium text-gray-500 ml-1">kcal</span>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>目標 {DAILY_GOAL.toLocaleString()} kcal</div>
            <div className={`font-semibold ${totalKcal > DAILY_GOAL ? "text-red-500" : "text-gray-600"}`}>
              {totalKcal > DAILY_GOAL
                ? `+${(totalKcal - DAILY_GOAL).toLocaleString()} kcal 超過`
                : `残り ${(DAILY_GOAL - totalKcal).toLocaleString()} kcal`}
            </div>
          </div>
        </div>
        {/* プログレスバー */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">{Math.round(progress)}%</div>
      </div>

      {/* クイック選択 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="bg-rose-100 text-rose-700 rounded-md px-2 py-0.5 text-xs">クイック選択</span>
          よく使う食品から選ぶ
        </h3>

        {/* カテゴリタブ */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {(["すべて", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 食品ボタン一覧 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {filteredFoods.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all text-sm ${
                selectedFood?.id === food.id
                  ? "bg-rose-50 border-rose-300 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="text-xl flex-shrink-0">{food.emoji}</span>
              <div className="min-w-0">
                <div className="font-medium text-gray-800 text-xs leading-tight truncate">{food.name}</div>
                <div className="text-gray-500 text-xs">{food.kcalPer100g}kcal/100g</div>
              </div>
            </button>
          ))}
        </div>

        {/* 選択食品の量入力 */}
        {selectedFood && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{selectedFood.emoji}</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{selectedFood.name}</div>
                <div className="text-xs text-gray-500">{selectedFood.kcalPer100g} kcal / 100g</div>
              </div>
              <button
                onClick={() => { setSelectedFood(null); setInputAmount(""); }}
                className="ml-auto text-gray-400 hover:text-gray-600 p-1"
                aria-label="選択解除"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">{selectedFood.unit}</span>
              </div>
              <div className="text-rose-600 font-bold text-lg tabular-nums whitespace-nowrap">
                {!isNaN(parseFloat(inputAmount)) && parseFloat(inputAmount) > 0
                  ? `${calcKcal(selectedFood.kcalPer100g, parseFloat(inputAmount))} kcal`
                  : "— kcal"}
              </div>
              <button
                onClick={handleAddSelected}
                disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-all shadow-sm disabled:opacity-40 active:scale-95 whitespace-nowrap"
              >
                + 追加
              </button>
            </div>
          </div>
        )}
      </div>

      {/* カスタム入力 */}
      <CustomInput onAdd={addToLog} />

      {/* 記録リスト */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700">
            今日の記録
            {log.length > 0 && <span className="ml-2 text-xs text-gray-400">({log.length}件)</span>}
          </h3>
          {log.length > 0 && (
            <button
              onClick={clearLog}
              className="text-xs text-red-400 hover:text-red-600 transition-colors border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg"
            >
              すべて削除
            </button>
          )}
        </div>

        {log.length === 0 ? (
          <div className="text-center text-gray-400 py-8 text-sm">
            <div className="text-4xl mb-3">🍽️</div>
            <p>食品を追加すると記録が表示されます</p>
          </div>
        ) : (
          <div className="space-y-2">
            {log.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.amount}{item.unit} · {item.time}</div>
                </div>
                <div className="font-bold text-rose-600 tabular-nums text-sm whitespace-nowrap">
                  {item.kcal.toLocaleString()} kcal
                </div>
                <button
                  onClick={() => removeFromLog(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 flex-shrink-0"
                  aria-label="削除"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {/* 合計行 */}
            <div className="flex items-center justify-between px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl mt-2">
              <span className="text-sm font-bold text-rose-700">合計</span>
              <span className="text-xl font-bold text-rose-700 tabular-nums">
                {totalKcal.toLocaleString()} <span className="text-base">kcal</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
