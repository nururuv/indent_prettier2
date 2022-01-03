import Head from "next/head";

export default function Popup() {
  return (
    <div className="z-50 absolute top-1/2 w-full h-16 bg-green-100 bg-opacity-90 text-gray-600 text-xl font-mono flex flex-col justify-center items-center">
      整形した文字列をクリップボードにコピーしました！
    </div>
  );
}
