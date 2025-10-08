import ProjectEditor from "../../components/ProjectEditor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProject } from "../../utils/api";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;
    getProject(id).then((res) => setProject(res.data));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return <ProjectEditor projectId={id} initialSRS={project.srs} />;
}
