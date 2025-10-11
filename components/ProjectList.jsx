// components/ProjectList.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Real-time listener for user's projects
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching projects:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading projects...</div>;
  }

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-500 mb-4">No projects yet.</div>
          <Link 
            href="/new" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-block transition duration-200"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow duration-200"
          >
            <Link href={`/project/${project.id}`}>
              <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer mb-2">
                {project.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : project.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status || 'draft'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
