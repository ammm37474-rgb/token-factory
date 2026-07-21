import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function App() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // انتخاب عکس و ایجاد پیش‌نمایش
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // تابع آپلود عکس روی IPFS (با استفاده از پیناتا)
  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: "YOUR_PINATA_API_KEY",          
        pinata_secret_api_key: "YOUR_PINATA_SECRET_KEY"  
      },
      body: formData,
    });

    const response = await res;
    const data = await response.json();
    if (data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    }
    throw new Error("خطا در آپلود عکس");
  };

  // هندلر کلیک روی دکمه ساخت توکن
  const handleCreateToken = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadToIPFS(imageFile);
      }

      alert(`توکن با موفقیت آماده شد! لینک عکس: ${imageUrl || "بدون عکس"}`);

    } catch (error) {
      console.error(error);
      alert("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    } finally {
      setUploading(false);
    }
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

      {/* فرم ساخت توکن و پیش‌نمایش */}
      <main className="max-w-xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-200">
          ساخت توکن جدید روی شبکه پلیگان
        </h2>

        {/* بخش کارت پیش‌نمایش (قبل از پرداخت) */}
        <div className="mb-8 p-4 bg-gray-950 border border-purple-500/30 rounded-xl">
          <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
            پیش‌نمایش اطلاعات توکن
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
              {preview ? (
                <img src={preview} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500">لوگو</span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-lg font-bold truncate">
                {tokenName || "نام توکن"} <span className="text-sm font-normal text-gray-400">({tokenSymbol || "SYM"})</span>
              </div>
              <div className="text-sm text-gray-400">
                تعداد کل: <span className="text-gray-200">{tokenSupply ? Number(tokenSupply).toLocaleString() : "0"}</span>
              </div>
            </div>
          </div>
        </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">لوگوی توکن (عکس)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold py-3 rounded-lg shadow-lg transition duration-200 mt-4 disabled:opacity-50"
          >
            {uploading ? "در حال آپلود و پرداخت..." : "تایید و ساخت توکن"}
          </button>
        </form>
      </main>
    </div>
  );
}
