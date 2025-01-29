import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddFormSkeleton() {
    return (
        <div className="space-y-8 overflow-y-scroll no-scrollbar max-h-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>

            {["Tire Pressures", "Aero", "Differential", "Camber", "Toe"].map((section, index) => (
                <div key={section} className="space-y-4">
                    <Skeleton className="h-6 w-40" />
                    {[...Array(index === 1 ? 2 : 4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            ))}

            <Skeleton className="h-10 w-full" />
        </div>
    )
}
