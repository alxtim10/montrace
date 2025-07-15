import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Wallet } from "lucide-react"

const CarouselBudget = () => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true
            }}
            orientation="horizontal"
            className="w-full px-3 pt-1"
        >
            <CarouselContent className="w-[70%]">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 min-w-[70%] flex-shrink-0">
                        <div className="border rounded-xl p-3 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Wallet className="bg-blue-500 text-white rounded-full p-1 w-5 h-5" />
                                <h1>Holiday</h1>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <h1 className="text-sm text-gray-800">Rp. 500.000</h1>
                                <h1 className="text-sm text-gray-800">Rp. 1.000.000</h1>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className="bg-base h-2 rounded-full w-1/2" ></div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default CarouselBudget