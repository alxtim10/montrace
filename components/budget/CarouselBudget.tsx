import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BudgetType } from "@/interface/budget"
import { formatToRupiah } from "@/lib/utils"
import { Wallet } from "lucide-react"

interface CarouselBudgetProps {
    data: BudgetType[]
}

const CarouselBudget = ({ data }: CarouselBudgetProps) => {
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
                {data.map((item, index) => (
                    <CarouselItem key={index} className="pt-1 min-w-[70%] flex-shrink-0">
                        <div className="border rounded-xl p-3 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Wallet className="bg-blue-500 text-white rounded-full p-1 w-5 h-5" />
                                <h1>{item.name}</h1>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <h1 className="text-sm text-gray-800">{formatToRupiah(Number(item.spent))}</h1>
                                <h1 className="text-sm text-gray-800">{formatToRupiah(Number(item.nominal))}</h1>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                                <div
                                    className="bg-base h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${Number(item.nominal) > 0
                                                ? Math.min((Number(item.spent) / Number(item.nominal)) * 100, 100)
                                                : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </CarouselItem>

                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default CarouselBudget