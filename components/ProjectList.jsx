import Link from "next/link";

export default function ProjectList({ projects }) {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p) => (
        <Link key={p.id} href={`/project/${p.id}`}>
          <div className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="font-bold">{p.name || "Untitled Project"}</h2>
            <p>Created at: {new Date(p.createdAt).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
