import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import PostList from './components/posts';

export default function HomePage() {
  const samplePosts = [
    {
      id: 1,
      title: 'First Blog Post',
      subtitle: 'This is the subtitle of the first blog post.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
      id: 2,
      title: 'Second Blog Post',
      subtitle: 'This is the subtitle of the second blog post.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
      id: 3,
      title: 'Third Blog Post',
      subtitle: 'This is the subtitle of the third blog post.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
  ];

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <PostList posts={samplePosts}></PostList>
    </>
  );
}
