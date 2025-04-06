import { Clock, Users, BarChart2, Star, ArrowRight, Calendar, ListTodo, MessageSquare } from "lucide-react";
import { Header } from "@/components/Header";

function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Tasks, Your Way</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Streamline your workflow, boost productivity, and collaborate seamlessly with TaskFlow's intuitive task management platform.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                Get started for free
                            </button>
                            <button className="flex items-center text-sm font-semibold leading-6 text-gray-900">
                                Watch demo <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to manage tasks effectively</h2>
                    </div>
                    <div className="mx-auto mt-16 max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: <ListTodo className="h-8 w-8 text-green-600" />,
                                    title: "Task Organization",
                                    description: "Create, organize, and prioritize tasks with intuitive drag-and-drop interfaces.",
                                },
                                {
                                    icon: <Calendar className="h-8 w-8 text-green-600" />,
                                    title: "Smart Scheduling",
                                    description: "Plan your work with intelligent scheduling and deadline management.",
                                },
                                {
                                    icon: <Users className="h-8 w-8 text-green-600" />,
                                    title: "Team Collaboration",
                                    description: "Work together seamlessly with real-time updates and team assignments.",
                                },
                                {
                                    icon: <BarChart2 className="h-8 w-8 text-green-600" />,
                                    title: "Progress Tracking",
                                    description: "Monitor project progress with visual analytics and reporting.",
                                },
                                {
                                    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
                                    title: "Integrated Chat",
                                    description: "Discuss tasks and share updates without leaving the platform.",
                                },
                                {
                                    icon: <Clock className="h-8 w-8 text-green-600" />,
                                    title: "Time Management",
                                    description: "Track time spent on tasks and optimize your productivity.",
                                },
                            ].map((feature, index) => (
                                <div key={index} className="relative rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                                    {feature.icon}
                                    <h3 className="mt-6 text-lg font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="mt-2 text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Loved by teams worldwide</h2>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                content: "TaskFlow has transformed how our team collaborates. It's intuitive and powerful.",
                                author: "Sarah Johnson",
                                role: "Product Manager at TechCorp",
                            },
                            {
                                content: "The best task management tool we've used. Clean interface and great features.",
                                author: "Michael Chen",
                                role: "Team Lead at StartupX",
                            },
                            {
                                content: "Incredible tool for keeping our remote team organized and productive.",
                                author: "Emma Davis",
                                role: "CEO at RemoteFirst",
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                                <div className="flex gap-2 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate overflow-hidden bg-green-600 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to transform your workflow?</h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">Join thousands of teams already using TaskFlow to boost their productivity.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50">Start free trial</button>
                            <button className="text-sm font-semibold leading-6 text-white">
                                Contact sales <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
