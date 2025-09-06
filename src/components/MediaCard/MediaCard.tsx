// src/components/MediaCard.tsx
import React from 'react';
import {type MediaItem } from '../../data/media';
import '../../pages/Library/Library.css'
interface MediaCardProps {
  item: MediaItem;
  onClick : ()=>void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item ,onClick}) => {
  return (
    <div className="media-card" onClick={onClick}>
      <div className="card-image">
        <img src={item.itemImage} alt={item.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.shortDescription}</p>
        <button className="card-button">افتح الآن</button>
      </div>
    </div>
  );
};

export default MediaCard;