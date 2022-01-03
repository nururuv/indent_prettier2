import Layout from "../components/Layout";
import Popup from "../components/popup";
import React, { useState, useRef } from "react";
import { FiChevronsDown } from "react-icons/fi";
import { AiOutlineCopy } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [jsonResult, setJsonResult] = useState({ text: "", errMsg: "" });
  const [displayPopup, setDisplayPopup] = useState(false);

  const prettier = () => {
    let beforeJson = textRef.current?.value;
    if (beforeJson == "") {
      setJsonResult({
        text: "",
        errMsg: "Json文字列を入力してください",
      });
    } else if (typeof beforeJson === "string") {
      let json = null;
      try {
        json = JSON.parse(beforeJson);
        if (json != null) {
          let afterjson = JSON.stringify(json, null, 3);
          setJsonResult({
            text: afterjson,
            errMsg: "",
          });
          copyText(afterjson);
        }
      } catch (e) {
        setJsonResult({
          ...jsonResult,
          errMsg: "不正なJson文字列が入力されました",
        });
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonResult({ ...jsonResult, text: event.target.value });
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Enter") {
  //     prettier();
  //   }
  // };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setDisplayPopup(true);
    setTimeout(setDisplayPopup, 1000, false);
  };

  return (
    <Layout title="Json">
      <p className="text-3xl font-bold">Json整形</p>
      <textarea
        className="my-4 appearance-none border border-gray-300 w-10/12 h-1/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Json文字列を入力"
        ref={textRef}
        // onKeyDown={(e) => handleKeyDown(e)}
      ></textarea>
      {jsonResult.errMsg && (
        <p className="mt-2 mb-4 text-xl font-bold text-red-600">
          {jsonResult.errMsg}
        </p>
      )}
      <button
        type="button"
        className="py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-semibold shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 flex "
        onClick={prettier}
      >
        <IconContext.Provider value={{ color: "#ffffff", size: "2rem" }}>
          <FiChevronsDown className="animate-pulse" />
        </IconContext.Provider>
        整形する
      </button>
      <textarea
        className="mt-4 mb-2 appearance-none border border-gray-300 w-10/12 h-1/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="結果を表示"
        value={jsonResult.text}
        onChange={onChange}
      ></textarea>
      <button
        className="py-1 px-4 border shadow-md text-lg font-semibold flex float-left"
        onClick={() => copyText(jsonResult.text)}
      >
        <IconContext.Provider value={{ size: "2rem" }}>
          <AiOutlineCopy />
        </IconContext.Provider>
        Copy
      </button>
      {displayPopup && <Popup />}
    </Layout>
  );
}
