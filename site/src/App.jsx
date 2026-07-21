import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function App() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateToken = (e) => {
    e.preventDefault();
    alert('اطلاعات دریافت شد. در اینجا می‌توانید اتصال به قرارداد هوشمند را قرار دهید.');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-sans">
      {/* هدر سایت */}
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-10 pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Token Factory
        </h1>
        <ConnectButton />
      </header>

      {/* فرم ساخت توکن */}
      <main className="max-w-xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-200">
          ساخت توکن جدید روی شبکه پلیگان
        </h2>

        <form onSubmit={handleCreateToken} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">نام توکن</label>
            <input
              type="text"
              placeholder="مثلا: MyToken"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">نماد (Ticker)</label>
            <input
              type="text"
              placeholder="مثلا: MTK"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">تعداد کل (Supply)</label>
            <input
              type="number"
              placeholder="مثلا: 1000000"
              value={tokenSupply}
              onChange={(e) => setTokenSupply(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* بخش انتخاب لوگو */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">لوگوی توکن (عکس)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
            />
            {preview && (
              <div className="mt-3 flex items-center gap-3">
                <img src={preview} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-purple-500" />
                <span className="text-xs text-gray-400">پیش‌نمایش لوگو</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold py-3 rounded-lg shadow-lg transition duration-200 mt-4"
          >
            ساخت و دیپلوی توکن
          </button>
        </form>
      </main>
    </div>
  );
}
