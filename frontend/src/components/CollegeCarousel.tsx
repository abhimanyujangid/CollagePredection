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
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // 1.5 = scroll speed factor
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

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
        <div className="p-4 bg-muted rounded-lg shadow-md w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                    {title}
                </h2>
                {viewAllRoute && (
                    <Button
                        variant="link"
                        className="text-primary hover:text-primary/80"
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => scroll("left")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto pb-2 py-4 px-4 flex space-x-4 snap-x scrollbar-hide cursor-grab active:cursor-grabbing"
                    onScroll={checkScrollPosition}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >

                    {children}
                </div>

                {showRightArrow && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-background shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => scroll("right")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}