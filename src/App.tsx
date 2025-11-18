import { useState, useEffect } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./components/ui/tooltip";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./components/ui/pagination";

import { Button } from "./components/ui/button";

import "./index.css";

type videoTypeT =
    | "liked"
    | "books"
    | "design"
    | "games"
    | "dev"
    | "goggins"
    | "jobs"
    | "movies"
    | "quran";

type dataT =
    | {
          img: string;
          link: string;
          title: string;
      }[]
    | null;

export default function App() {
    const [videoType, setVideoType] = useState<videoTypeT>("liked");
    const videoOptions: videoTypeT[] = [
        "liked",
        "books",
        "design",
        "dev",
        "games",
        "goggins",
        "jobs",
        "movies",
        "quran",
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const isPaginated = videoType === "liked";
    const totalPages = isPaginated ? 7 : 1;

    const [data, setData] = useState<dataT>(null);

    const fetchData = async (page: number) => {
        setData(null);
        let filePath: string | null = null;

        switch (videoType) {
            case "liked":
                filePath = `./data/liked_part_${page}.json`;
                break;
            case "books":
                filePath = `./data/savedBooks.json`;
                break;
            case "design":
                filePath = `./data/savedDesign.json`;
                break;
            case "dev":
                filePath = `./data/savedDev.json`;
                break;
            case "games":
                filePath = `./data/savedGames.json`;
                break;
            case "goggins":
                filePath = `./data/savedGoggins.json`;
                break;
            case "jobs":
                filePath = `./data/savedJobs.json`;
                break;
            case "movies":
                filePath = `./data/savedMovies.json`;
                break;
            case "quran":
                filePath = `./data/savedQuran.json`;
                break;
            default:
                filePath = `./data/liked_part_${page}.json`;
        }

        try {
            if (filePath) {
                const module = await import(filePath);
                setData(module.default);
            }
        } catch (error) {
            console.error(error);
            setData(null);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, videoType]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

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
            <div className="w-full p-6 flex gap-3 flex-wrap">
                {videoOptions.map((type) => (
                    <Button
                        key={type}
                        variant={videoType === type ? "default" : "outline"}
                        onClick={() => {
                            setVideoType(type);
                        }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}
            </div>
            <div className="w-full py-6 flex items-center justify-center">
                <Pagination
                    className={
                        videoType !== "liked"
                            ? "pointer-events-none opacity-50"
                            : undefined
                    }
                >
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                size="default"
                                aria-disabled={currentPage === 1}
                                tabIndex={currentPage === 1 ? -1 : undefined}
                                className={
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        href="#"
                                        size="default"
                                        isActive={currentPage === pageNum}
                                        onClick={() =>
                                            handlePageChange(pageNum)
                                        }
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                aria-disabled={currentPage === totalPages}
                                tabIndex={
                                    currentPage === totalPages ? -1 : undefined
                                }
                                size="default"
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="Container grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {data?.map((item, i) => (
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
