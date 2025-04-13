import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface HorizontalCarouselProps {
    title: string;
    viewAllRoute?: string;
    children: ReactNode;
}

export function HorizontalCarousel({
    title,
    viewAllRoute,
    children,
}: HorizontalCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const navigate = useNavigate();

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener("resize", checkScrollPosition);
        return () => window.removeEventListener("resize", checkScrollPosition);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
                {viewAllRoute && (
                    <Button
                        variant="link"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                        onClick={() => navigate(viewAllRoute)}
                    >
                        View all
                    </Button>
                )}
            </div>

            <div className="relative group">
                {showLeftArrow && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white dark:bg-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => scroll("left")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto pb-2 px-4 flex space-x-4 snap-x scrollbar-hide"
                    onScroll={checkScrollPosition}
                >
                    {children}
                </div>

                {showRightArrow && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white dark:bg-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => scroll("right")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
