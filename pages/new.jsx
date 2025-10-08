import { useState } from "react";
import { useRouter } from "next/router";
import { createProject } from "../utils/api";

export default function New() {
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const startProject = async () => {
    const res = await createProject(desc);
    router.push(`/project/${res.data.projectId}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-2">Create New SRS Project</h2>
      <textarea
        className="w-full border p-2 h-40"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter project description or client email text..."
      />
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={startProject}>
        Start SRS
      </button>
    </div>
  );
}
