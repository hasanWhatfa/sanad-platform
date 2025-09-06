// src/components/pages/MediaPage/MediaPage.tsx
import React,{ useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mediaData } from '../../data/media';

// Import custom icons (you can use an icon library like react-icons)
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import './MediaPage.css';
import type { MediaItem } from '../../data/media';

const MediaPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // --- State and Refs for Media Controls ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
    const progressRef = useRef<HTMLInputElement>(null);

    // --- Find the current media item ---
    const media = mediaData.find((med : MediaItem) => med.id === id);

    // --- Recommendation Logic ---
    const recommendedMedia = useMemo(() => {
        if (!media) return [];
        // Find items that share at least one tag, are not the current item, and shuffle them.
        return mediaData
            .filter(item => 
                item.id !== media.id && 
                item.tags.some(tag => media.tags.includes(tag))
            )
            .sort(() => 0.5 - Math.random()) // Simple shuffle
            .slice(0, 4); // Get the first 4 recommendations
    }, [media]);

    // --- Effect for Media Event Listeners ---
    useEffect(() => {
        const mediaElement = mediaRef.current;
        if (!mediaElement) return;

        const handleTimeUpdate = () => setCurrentTime(mediaElement.currentTime);
        const handleLoadedMetadata = () => setDuration(mediaElement.duration);
        const handleEnded = () => setIsPlaying(false);

        mediaElement.addEventListener('timeupdate', handleTimeUpdate);
        mediaElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        mediaElement.addEventListener('ended', handleEnded);

        // Cleanup function
        return () => {
            mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
            mediaElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            mediaElement.removeEventListener('ended', handleEnded);
        };
    }, [media]);
    
    // --- Control Handlers ---
    const togglePlayPause = () => {
        if (mediaRef.current) {
            if (isPlaying) {
                mediaRef.current.pause();
            } else {
                mediaRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        if (mediaRef.current) {
            mediaRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (mediaRef.current) {
            mediaRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (mediaRef.current) {
            mediaRef.current.currentTime = newTime;
        }
    };


    // --- Render Component ---
    if (!media) {
        return (
            <div className="media-page-not-found">
                <h2>المحتوى غير موجود</h2>
                <button onClick={() => navigate(-1)}>العودة للخلف</button>
            </div>
        );
    }
    
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className='media-page'>
            <div className={`media-player-container ${media.type === 'audio' ? 'is-audio' : ''}`}>
                {media.type === 'video' && (
                    <video
                        ref={mediaRef as React.RefObject<HTMLVideoElement>}
                        className="media-visual"
                        src={media.src}
                        onClick={togglePlayPause}
                    />
                )}
                {media.type === 'audio' && (
                    <>
                        <img src={media.itemImage} alt={media.title} className="media-visual" />
                        <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={media.src} />
                    </>
                )}
                {media.type === 'image' && (
                    <img src={media.itemImage} alt={media.title} className="media-visual" />
                )}

                {/* --- Custom Media Controls --- */}
                {(media.type === 'video' || media.type === 'audio') && (
                    <div className="media-controls-overlay">
                        <div className="progress-bar-container">
                             <input
                                type="range"
                                ref={progressRef}
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleProgressChange}
                                className="progress-bar"
                                style={{
                                background: `linear-gradient(to right, var(--color-accent) ${progressPercentage}%, #e0e0e0 ${progressPercentage}%)`
                                }}
                            />
                        </div>
                        <div className="controls-main">
                            <button onClick={togglePlayPause} className="control-btn play-pause-btn" aria-label="Play/Pause">
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>
                            <div className="volume-control">
                                <button onClick={toggleMute} className="control-btn" aria-label="Mute/Unmute">
                                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="volume-slider"
                                    style={{ backgroundSize: `${isMuted ? 0 : volume * 100}% 100%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="media-content px-162">
                <h1 className="media-title">{media.title}</h1>
                <div className="tags-list">
                    {media.tags.map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                </div>
                <p className="media-description">{media.description}</p>
            </div>
            
            {recommendedMedia.length > 0 && (
                <div className="recommendations-section">
                    <h2 className='recommendations-title'>قد يعجبك أيضاً</h2>
                    <div className="recommendations-grid">
                        {recommendedMedia.map(recItem => (
                            <Link to={`/library/media-page/${recItem.id}`} key={recItem.id} className="rec-card">
                                <img src={recItem.itemImage || recItem.src} alt={recItem.title} />
                                <div className="rec-card-overlay">
                                    <h4>{recItem.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPage;