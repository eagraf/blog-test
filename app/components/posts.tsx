'use client';

import './posts.css';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface PostListProps {
  posts: BlogPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const router = useRouter();
    return (
        <>
        <div className="blog-posts">
            {posts.map(post => (
            <div key={post.id} className="blog-post">
                <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
                <div className="blog-post-content">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-subtitle">{post.subtitle}</p>
                    <button type="button" className="blog-post-edit-button" onClick={() => router.push(`/edit/${post.id}`)}>
                        Edit
                    </button>
                </div>
            </div>
            ))}
        </div>
        </>
    );
};

export default PostList;
