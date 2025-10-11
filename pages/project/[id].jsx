import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user) return;

    // Real-time listener for the project
    const projectRef = doc(db, 'projects', id);
    const unsubscribe = onSnapshot(projectRef, (docSnap) => {
      if (docSnap.exists()) {
        const projectData = docSnap.data();
        // Check if user owns this project
        if (projectData.userId !== user.uid) {
          alert('You do not have access to this project');
          router.push('/');
          return;
        }
        setProject({
          id: docSnap.id,
          ...projectData
        });
      } else {
        alert('Project not found');
        router.push('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, user, router]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center">Loading project...</div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {project?.title}
            </h1>
            <p className="text-gray-600 mb-6">{project?.description}</p>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">SRS Document</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap">{project?.content}</pre>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-4"
              >
                Back to Projects
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
