import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Header />

            <main className="flex-1">
                <section className="h-1/6 container flex items-center justify-center gap-8 py-20">
                    <div className="flex-1 space-y-8">
                        <h1 className="text-6xl font-bold tracking-tight">Your Projects, Prioritized and Simplified!</h1>

                        <p className="text-xl text-gray-600"> Plan. Write. Collaborate.</p>

                        <div className="flex gap-4">
                            <Button size="lg" className="h-12 px-6">
                                Get TaskFlow free
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-6">
                                Request a demo
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex-1">
                        <img src="../assets/product-screenshot-board-gantt-views.avif" alt="Collaboration illustration" width={600} height={500} className="object-contain" />
                    </div>
                </section>

                <section className="border-t bg-gray-50"></section>
            </main>
        </div>
    );
}
