"use client";
import {
    FiUploadCloud,
    FiDownload,
    FiFile,
    FiAlertCircle,
    FiCheckCircle,
    FiGrid,
} from "react-icons/fi";
import { parseStatement } from "@/utils/parseStatement";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { sendGTMEvent } from "@next/third-parties/google";

export function FileConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [csvData, setCsvData] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [transactions, setTransactions] = useState<any[]>([]);
    const adsInitialized = useRef(false);

    useEffect(() => {
        if (typeof window !== "undefined" && !adsInitialized.current) {
            try {
                if (
                    window.adsbygoogle &&
                    document.querySelectorAll(".adsbygoogle").length > 0
                ) {
                    const uninitializedAds = document.querySelectorAll(
                        ".adsbygoogle:not([data-ad-status])"
                    );

                    if (uninitializedAds.length > 0) {
                        (window.adsbygoogle = window.adsbygoogle || []).push(
                            {}
                        );
                    }
                }

                adsInitialized.current = true;
            } catch (error) {
                console.error("AdSense error:", error);
            }
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        sendGTMEvent({ event: "file_selected" });
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setError(null);
        setCsvData(null);
        setTransactions([]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setError(null);
            setCsvData(null);
            setTransactions([]);
        }
    };

    const convertToCsv = async () => {
        sendGTMEvent({ event: "convert_statement" });

        if (!file) {
            setError("Please select a file first");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const statement = await parseStatement(await file.arrayBuffer());
            const parsedTransactions = statement.transactions.map(
                (transaction) => {
                    const row = {
                        date: transaction.date,
                        details:
                            `${transaction.details} ${transaction.descriptions.join(" ")}`
                                .trim()
                                .replace(/\s+/g, " "),
                        amount: `${transaction.sign}${transaction.amount}`,
                        balance: transaction.balance,
                    };
                    return row;
                }
            );

            setTransactions(parsedTransactions);

            const csvRows = parsedTransactions
                .map((row) =>
                    Object.values(row)
                        .map((value) => `"${value}"`)
                        .join(",")
                )
                .join("\n");

            const header = `"Date","Details","Amount","Balance"`;
            setCsvData(`${header}\n${csvRows}`);
            sendGTMEvent({ event: "conversion_success" });
        } catch (err) {
            setError(
                "Failed to process the file. Please make sure it's a valid Maybank statement."
            );
            console.error(err);
            sendGTMEvent({ event: "conversion_error", error: err });
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCsv = () => {
        sendGTMEvent({ event: "download_csv" });

        if (!csvData || !file) return;

        const fileNameWithoutExtension = file.name
            .split(".")
            .slice(0, -1)
            .join(".");

        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `maybankconverter_${fileNameWithoutExtension}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadExcel = () => {
        sendGTMEvent({ event: "download_excel" });

        if (transactions.length === 0 || !file) return;

        const fileNameWithoutExtension = file.name
            .split(".")
            .slice(0, -1)
            .join(".");

        const ws = XLSX.utils.json_to_sheet(transactions);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");

        XLSX.writeFile(wb, `maybankconverter_${fileNameWithoutExtension}.xlsx`);
    };

    return (
        <>
            <div className="p-8">
                <div
                    className={`mb-8 border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ease-in-out ${
                        isDragging
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 scale-[1.02]"
                            : "border-gray-300 dark:border-gray-600 hover:border-yellow-400 dark:hover:border-yellow-600 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? "bg-yellow-100 dark:bg-yellow-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
                            <FiUploadCloud className={`w-10 h-10 ${isDragging ? "text-yellow-600" : "text-yellow-500"}`} />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {file
                                ? "File ready to convert"
                                : "Upload your Maybank Statement"}
                        </h3>

                        {file && (
                            <div className="flex items-center mt-2 mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-sm shadow-sm">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                                    <FiFile className="text-red-500 w-5 h-5 flex-shrink-0" />
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setFile(null)}
                                    className="text-xs font-medium text-gray-400 hover:text-red-500 px-2 py-1"
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                        {!file && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                                Drag and drop your PDF here, or click the button below
                            </p>
                        )}

                        <div className="mt-2">
                            <label
                                className={`relative inline-flex items-center px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                                    file
                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600"
                                        : "bg-yellow-400 hover:bg-yellow-500 text-black transform hover:-translate-y-0.5"
                                } cursor-pointer`}
                            >
                                <span className="z-10 relative">
                                    {file
                                        ? "Choose a different file"
                                        : "Select PDF Statement"}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>

                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            PDF only
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <button
                        onClick={convertToCsv}
                        disabled={!file || isProcessing}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-200 ${
                            !file || isProcessing
                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                : "bg-yellow-400 hover:bg-yellow-500 text-black hover:-translate-y-0.5"
                        }`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center">
                                Processing...
                            </span>
                        ) : (
                            "Convert Statement"
                        )}
                    </button>

                    {csvData && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={downloadCsv}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                            >
                                <FiDownload />
                                <span className="text-sm">CSV</span>
                            </button>

                            <button
                                onClick={downloadExcel}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                            >
                                <FiGrid />
                                <span className="text-sm">Excel</span>
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl flex items-start animate-fade-in">
                        <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                            {error}
                        </p>
                    </div>
                )}

                {csvData && !error && (
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                        <div className="flex items-center mb-4 text-green-600 dark:text-green-400">
                            <FiCheckCircle className="w-5 h-5 mr-2" />
                            <h3 className="font-bold text-sm uppercase tracking-wide">Conversion Successful</h3>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Preview</span>
                                <span className="text-xs text-gray-400">{csvData.split('\n').length - 1} transactions found</span>
                            </div>
                            <div className="p-4 overflow-x-auto">
                                <pre className="text-xs font-mono text-gray-600 dark:text-gray-300 whitespace-pre">
                                    {csvData.split("\n").slice(0, 6).join("\n")}
                                    {csvData.split("\n").length > 6 ? "\n..." : ""}
                                </pre>
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                            Your files are processed locally in your browser and are never uploaded to any server.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
