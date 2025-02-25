// import { Button } from "@/components/ui/button";
// import { useTasks } from "@/contexts/TaskContext";

// export function TaskPagination() {
//     const { tasks, currentPage, tasksPerPage, setCurrentPage } = useTasks();
//     const totalPages = Math.ceil(tasks.length / tasksPerPage);

//     return (
//         <div className="flex items-center justify-center gap-2 py-4">
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//                 Previous
//             </Button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)}>
//                     {page}
//                 </Button>
//             ))}
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//                 Next
//             </Button>
//         </div>
//     );
// }
