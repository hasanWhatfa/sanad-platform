// src/components/LibraryPage.tsx
import { useState, useMemo } from 'react';
import { mediaData} from '../../data/media';
import MediaCard from '../../components/MediaCard/MediaCard';
import './Library.css'
import { useNavigate } from 'react-router-dom';

// Define types for better readability and safety
type MediaType = 'video' | 'image' | 'audio';
const MEDIA_TYPES: MediaType[] = ['video', 'image', 'audio'];
const TAGS = ['all', 'study', 'focus', 'calmness', 'sleep'];
// A simple map for Arabic labels
const typeLabels: Record<MediaType, string> = {
  video: 'فيديوهات 🎬',
  image: 'صور 🖼️',
  audio: 'صوتيات 🎧',
};

const tagLabels: Record<string, string> = {
  all: 'الكل',
  study: 'دراسة',
  focus: 'تركيز',
  calmness: 'هدوء',
  sleep: 'نوم',
};


const LibraryPage: React.FC = () => {
  // State for active filters
  const [activeType, setActiveType] = useState<MediaType>('video');
  const [activeTag, setActiveTag] = useState<string>('all');
  const navigate = useNavigate();

  // useMemo will re-calculate the filtered list only when data or filters change, which is a performance optimization.
  const filteredMedia = useMemo(() => {
    return mediaData.filter(item => {
      const typeMatch = item.type === activeType;
      const tagMatch = activeTag === 'all' || item.tags.includes(activeTag);
      return typeMatch && tagMatch;
    });
  }, [activeType, activeTag]);

  return (
    <main className="library-container">
      <header className="library-header">
        <h1>مكتبة الهدوء والتركيز</h1>
        <p className="library-subtitle">ابحث عن ما يناسب حالتك النفسية، سواء للدراسة، أو الاسترخاء، أو النوم العميق.</p>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          {MEDIA_TYPES.map(type => (
            <button
              key={type}
              className={`tab-button ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Tags Filter */}
        <div className="tags-container">
          {TAGS.map(tag => (
            <button
              key={tag}
              className={`tag-button ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tagLabels[tag]}
            </button>
          ))}
        </div>
      </header>

      {/* Media Grid */}
      <section className="media-grid">
        {filteredMedia.map(item => (
          <MediaCard key={item.id} item={item} onClick={()=>{navigate(`media-page/${item.id}`)}}/>
        ))}
      </section>
    </main>
  );
};

export default LibraryPage;