import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center mt-5">
      <Link href={'/todo-list'} className="btn btn-outline btn-success">Todo List</Link>
    </div>
  );
}
