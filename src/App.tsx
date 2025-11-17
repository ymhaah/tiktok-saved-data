import { useState } from "react";

import liked from "./data/liked.json";
import saved from "./data/saved.json";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./components/ui/tooltip";

import "./index.css";

export default function App() {
    function getSnippet(text: string, snippetLength = 40) {
        let cleanedText = text
            .split(" ")
            .filter((word) => !word.startsWith("#"))
            .join(" ");

        cleanedText = cleanedText
            .replace(/created by [^ ]+(\s[^ ]+)*/i, "")
            .trim();

        if (cleanedText.length <= snippetLength) return cleanedText + " ...";

        return cleanedText.slice(0, snippetLength) + "...";
    }

    return (
        <main className="bg-black text-white min-h-screen">
            <div className="Container grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {liked.map((item, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger asChild>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <div
                                    className="w-full h-[300px] max-sm:h-[600px] overflow-hidden rounded-xl shadow-lg bg-[#ffffff1f]"
                                    style={{
                                        backgroundImage: `url(${item.img})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <span className="sr-only">
                                        {item.title}
                                    </span>
                                </div>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{getSnippet(item.title, 40)}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </main>
    );
}
