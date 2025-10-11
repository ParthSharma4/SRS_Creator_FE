# Create a new index.jsx that uses our hook system
cat > pages/index.jsx << 'EOF'
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : user ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Your Projects</h1>
              <Link 
                href="/new" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                + New Project
              </Link>
            </div>
            <ProjectList />
          </div>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              SRS Creator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Turn client ideas into professional Software Requirements Specification documents with AI assistance.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 mb-6">
                Login with Google to start creating SRS documents for your clients.
              </p>
              <p className="text-sm text-gray-500">
                You'll be able to create projects, collaborate with AI, and export professional documents.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
EOF
