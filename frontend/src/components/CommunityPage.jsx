import React, { useState, useMemo, useEffect } from 'react';
import { Search, ThumbsUp, ChevronLeft, ChevronRight, SearchX, SlidersHorizontal } from 'lucide-react';
import { communityPostsData } from '../data/communityPosts.js';

// --- Helper functions for managing liked posts in localStorage ---
const getLikedPosts = () => {
  const liked = localStorage.getItem('likedCommunityPosts');
  return liked ? JSON.parse(liked) : [];
};

const addLikedPost = (postId) => {
  const liked = getLikedPosts();
  if (!liked.includes(postId)) {
    localStorage.setItem('likedCommunityPosts', JSON.stringify([...liked, postId]));
  }
};

const PostCard = ({ post, onLike, isInitiallyLiked }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // Initialize liked state based on localStorage
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);

    const handleLike = () => {
        if (!isLiked) {
            onLike(post.id);
            setIsLiked(true);
        }
    };

    const displayContent = isExpanded && post.fullContent ? post.fullContent : post.content;
    const isTruncated = post.fullContent && post.fullContent.length > post.content.length;

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img src={post.authorLogo} alt={post.author} className="w-10 h-10 rounded-full bg-white object-contain group-hover:ring-2 group-hover:ring-accent transition-all" />
                    <div>
                        <h3 className="font-semibold text-primary dark:text-primary-300 group-hover:text-accent transition-colors">{post.title}</h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{post.author}</p>
                    </div>
                </div>
                <span className="text-xs text-text-secondary/80 dark:text-dark-text-secondary/80">{post.timestamp}</span>
            </div>
            <p className="text-sm text-text/90 dark:text-dark-text/90 mt-4 whitespace-pre-line">{displayContent}</p>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border dark:border-dark-border">
                <button onClick={handleLike} disabled={isLiked} className={`flex items-center gap-2 text-sm transition-colors ${isLiked ? 'text-accent font-semibold' : 'text-text-secondary dark:text-dark-text-secondary hover:text-accent'}`}>
                    <ThumbsUp size={16}/> {post.likes}
                </button>
                {isTruncated && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-accent font-semibold hover:underline">
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                )}
            </div>
        </div>
    );
};

const PaginationControls = ({ currentPage, onPageChange, itemsPerPage, onItemsPerPageChange, totalPages }) => (
    // ... PaginationControls component remains the same
    <div/>
);

const CommunityPage = () => {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('communityPosts');
        return savedPosts ? JSON.parse(savedPosts) : communityPostsData;
    });

    useEffect(() => {
        localStorage.setItem('communityPosts', JSON.stringify(posts));
    }, [posts]);

    const handleLikePost = (postId) => {
        setPosts(currentPosts => 
            currentPosts.map(post => 
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
        addLikedPost(postId); // Save the liked status
    };

    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const likedPosts = getLikedPosts(); // Get liked posts on each render

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const tabMatch = activeTab === 'All' || post.type === activeTab;
            const q = searchTerm.trim().toLowerCase();
            const textMatch = !q || post.title.toLowerCase().includes(q) || (post.fullContent || post.content).toLowerCase().includes(q);
            return tabMatch && textMatch;
        });
    }, [activeTab, searchTerm, posts]);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const currentPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [filteredPosts, currentPage, totalPages]);

    const tabs = [{ label: 'All', value: 'All' }, { label: 'Announcements', value: 'Announcement' }, { label: 'Resources', value: 'Resource' }];

    return (
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Community</h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mt-1 mb-6">Explore the most recent updates, announcements, and resources.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 p-1 bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border self-start shadow-sm">
                        {tabs.map(t => (
                            <button key={t.value} onClick={() => { setActiveTab(t.value); setCurrentPage(1); }} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === t.value ? 'bg-primary/10 text-primary shadow-sm' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-primary/5'}`}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {currentPosts.length > 0 ? (
                            currentPosts.map(post => <PostCard key={post.id} post={post} onLike={handleLikePost} isInitiallyLiked={likedPosts.includes(post.id)} />)
                        ) : (
                            <div className="text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl">
                                <SearchX size={48} className="mx-auto text-text-secondary dark:text-dark-text-secondary" strokeWidth={1.5} />
                                <p className="mt-4 text-lg font-semibold text-text dark:text-dark-text">No posts found</p>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Try a different search term or filter.</p>
                            </div>
                        )}
                    </div>
                    {filteredPosts.length > 0 && <PaginationControls currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} onPageChange={setCurrentPage} />}
                </div>
                <aside className="lg:sticky lg:top-20">
                    <div className="bg-gradient-to-b from-surface to-primary-50/50 dark:from-dark-surface dark:to-primary-900/20 border border-border dark:border-dark-border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-primary dark:text-primary-300 flex items-center gap-2"><SlidersHorizontal size={18} /> Filters</h3>
                            <button onClick={() => setSearchTerm('')} className="text-xs text-danger hover:bg-danger/10 p-1 rounded transition-colors">Clear all</button>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text/90 dark:text-dark-text/90">Search Posts</label>
                            <div className="relative mt-2">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-dark-text-secondary"/>
                                <input type="text" placeholder="Search by keyword..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none"/>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CommunityPage;
