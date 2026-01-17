"use client";

import { useState } from "react";
import GenerateSummary from "@/Components/GenerateSummary";
import Loading from "@/Components/Loading";
import ButtonLoader from "@/Components/ButtonLoader";
import toast from "react-hot-toast";

const PDFForm = () => {
  //for handle pdf
  let [PdfFile, SetPdfFile] = useState(null);
  //for other opton
  let [options, SetOptions] = useState({
    Language: "English",
    Format: "Paragraph",
    Length: "Short",
  });

  let [summary, setSummary] = useState("");

  //show and hide option
  let [ShowOptions, SetShowOptions] = useState(false);
  let [loading, setloading] = useState(false);

  //handlae pdf
  let HandlePdfFile = (e) => {
    SetPdfFile(e.target.files[0]);
    SetShowOptions(true);
  };
  //handle dropdown
  let HandleDropDown = (values) => {
    SetOptions((previous) => ({
      ...previous,
      [values.target.name]: values.target.value,
    }));
  };

  //handleform or handlebutton
  let handleForm = async (event) => {
    setloading(true);
    event.preventDefault();

    //alert for file size
    if (PdfFile.size >= 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      setloading(false);
      return;
    }

    //apend files
    let data = new FormData();
    data.append("pdf", PdfFile);
    data.append("Language", options.Language);
    data.append("Format", options.Format);
    data.append("Length", options.Length);
    //data send to a backend
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_Backend_URL}/SummaryRoute/`,
        {
          method: "POST",
          body: data,
        },
      );
      if (response.status === 429) {
        toast.error("AI has heavy load. Please try again after 24 hours");
        return;
      }
      if (!response.ok) {
        toast.error("AI has heavy load. Please try again after some time");
        return;
      }
      let result = await response.json();
      setSummary(result.Summary);
    } catch (error) {
      console.log("Error while sending data to server ", error);
    } finally {
      setloading(false);
    }
  };

  const FileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <div className=" mt-10 2xl:mt-20 w-80 sm:w-96 xl:w-[40vw] 2xl:w-[30vw] bg-white p-10 rounded-3xl ">
        <p className="mb-4 text-gray-400 text-sm sm:text-lg lg:text-xl text-center">
          Supports PDF up to 5MB
        </p>

        {PdfFile && (
          <p className="text-gray-700 my-2 text-sm max-w-[90vw] text-center">
            {PdfFile.name}
          </p>
        )}

        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          onChange={HandlePdfFile}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-300 hover:bg-blue-300 hover:border-blue-400 transition-all duration-200 h-14 sm:h-20"
        >
          <span className="text-sm font-semibold sm:text-lg lg:text-xl text-gray-700">
            {PdfFile ? "Change PDF File" : "Choose PDF File"}
          </span>
        </label>
        {PdfFile && (
          <p className="mt-5 text-gray-600 font-medium  text-[12px] sm:text-lg lg:text-xl text-center">
            {FileSize(PdfFile.size)}
          </p>
        )}
      </div>

      {ShowOptions && PdfFile && (
        <div
          className="mt-10 2xl:mt-20 w-72 sm:w-96 xl:w-[40vw] 2xl:w-[30vw] bg-white p-10 
   rounded-3xl text-black opacity-100"
        >
          <h1 className="font-bold text-xl mb-5">Summary options </h1>
          Language{" "}
          <select
            onChange={HandleDropDown}
            value={options.Language}
            name="Language"
            className="border-2 border-solid broder-black mb-5 mt-2 p-3 rounded-xl bg-gray-100 w-full "
          >
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
            <option value="Hindi">Hindi</option>
            <option value="Balochi">Balochi</option>
            <option value="Pashto">Pashto</option>
          </select>
          Format{" "}
          <select
            onChange={HandleDropDown}
            value={options.Format}
            name="Format"
            className="border-2 border-solid broder-black mt-2 mb-5 p-3 rounded-xl bg-gray-100 w-full "
          >
            <option value="Paragraph">Paragraph</option>
            <option value="Bullet Points">Bullet Points</option>
          </select>
          Length{" "}
          <select
            onChange={HandleDropDown}
            value={options.Length}
            name="Length"
            className="border-2 border-solid broder-black mt-2 p-3 rounded-xl bg-gray-100 w-full "
          >
            <option value="Short">Short</option>
            <option value="Detail">Detail</option>
          </select>
          <button
            onClick={handleForm}
            className={` mt-10 p-4 rounded-xl   w-full font-bold 
        ${loading ? "opacity-30 bg-linear-to-r  from-blue-400 to-purple-400" : "opacity-100 bg-linear-to-r  from-blue-500 to-purple-500 hover:cursor-pointer  duration-300 transition"}
        `}
          >
            {loading ? <ButtonLoader /> : "Generate Summary"}
          </button>
        </div>
      )}

      {summary && !loading && <GenerateSummary summary={summary} />}
      {loading && <Loading />}
    </div>
  );
};
export default PDFForm;
