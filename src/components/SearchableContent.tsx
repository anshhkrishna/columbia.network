'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Member, Connection, ROLE_OPTIONS, VERTICAL_OPTIONS } from '@/data/members';
import MembersTable from './MembersTable';
import NetworkGraph from './NetworkGraph';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

interface SearchableContentProps {
    members: Member[];
    connections: Connection[];
}

export default function SearchableContent({ members, connections }: SearchableContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [shuffledMembers, setShuffledMembers] = useState<Member[]>(members);
    const [activeRoles, setActiveRoles] = useState<Set<string>>(new Set());
    const [activeVerticals, setActiveVerticals] = useState<Set<string>>(new Set());
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    useEffect(() => {
        setShuffledMembers(shuffleArray(members));
    }, [members]);

    const hasActiveFilters = activeRoles.size > 0 || activeVerticals.size > 0;

    const toggleRole = (role: string) => {
        setActiveRoles(prev => {
            const next = new Set(prev);
            if (next.has(role)) next.delete(role);
            else next.add(role);
            return next;
        });
    };

    const toggleVertical = (vertical: string) => {
        setActiveVerticals(prev => {
            const next = new Set(prev);
            if (next.has(vertical)) next.delete(vertical);
            else next.add(vertical);
            return next;
        });
    };

    const clearAllFilters = () => {
        setActiveRoles(new Set());
        setActiveVerticals(new Set());
        setSearchQuery('');
    };

    const filteredMembers = useMemo(() => {
        let result = shuffledMembers;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(member =>
                member.name?.toLowerCase().includes(q) ||
                member.program?.toLowerCase().includes(q) ||
                member.website?.toLowerCase().includes(q) ||
                member.github?.toLowerCase().includes(q) ||
                member.email?.toLowerCase().includes(q) ||
                member.majors?.some(m => m.toLowerCase().includes(q)) ||
                member.minors?.some(m => m.toLowerCase().includes(q)) ||
                member.roles?.some(r => r.toLowerCase().includes(q)) ||
                member.verticals?.some(v => v.toLowerCase().includes(q)) ||
                member.year?.includes(q)
            );
        }

        if (activeRoles.size > 0) {
            result = result.filter(member =>
                member.roles?.some(r => activeRoles.has(r))
            );
        }

        if (activeVerticals.size > 0) {
            result = result.filter(member =>
                member.verticals?.some(v => activeVerticals.has(v))
            );
        }

        return result;
    }, [shuffledMembers, searchQuery, activeRoles, activeVerticals]);

    const filteredMemberIds = new Set(filteredMembers.map(m => m.id));
    const isFiltering = searchQuery || hasActiveFilters;
    const filteredConnections = isFiltering
        ? connections.filter(conn =>
            filteredMemberIds.has(conn.fromId) && filteredMemberIds.has(conn.toId)
        )
        : connections;


    return (
        <main className="main-container">
            <div className="content-wrapper">
                <div className="header-section">
                    <div className="title-row">
                        <h1 className="title">
                            <span className="cu-accent">columbia</span>.network
                            <span className="version-pill">v1.0</span>
                        </h1>
                    </div>
                    <div className="description">
                        <p>welcome to the webring for columbia university students.</p>
                        <p>
                            columbia packs an unusually high density of talented engineers, designers, 
                            creators, and researchers into one campus in the middle of new york city. 
                            this is the place to find people who are doing things.
                        </p>
                        <p>
                            want to join? <a 
                                href="https://github.com/anshhkrishna/columbia.network#join-the-webring" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="join-link join-link-blue"
                            >
                                submit a pull request
                            </a>{' '}
                            or <a
                                href="/join"
                                className="join-link join-link-blue"
                            >
                                fill the auto-pr form
                            </a>
                        </p>
                    </div>
                </div>

                <div className="table-section">
                    <MembersTable members={filteredMembers} searchQuery={searchQuery} />
                </div>
            </div>

            <div className="graph-section">
                <div className="search-wrapper">
                    <div className="search-bar-container">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="search-clear-btn"
                            >
                                Clear
                            </button>
                        )}
                        <button
                            className="filters-toggle"
                            onClick={() => setShowFilters(prev => !prev)}
                        >
                            <span>filters</span>
                            {hasActiveFilters && (
                                <span className="filter-count">
                                    {activeRoles.size + activeVerticals.size}
                                </span>
                            )}
                            {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>

                    {showFilters && (
                        <div className="filters-panel">
                            <div className="filter-group">
                                <span className="filter-label">roles</span>
                                <div className="filter-tags">
                                    {ROLE_OPTIONS.map(role => (
                                        <button
                                            key={role}
                                            className={`filter-tag ${activeRoles.has(role) ? 'filter-tag-active' : ''}`}
                                            onClick={() => toggleRole(role)}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <span className="filter-label">verticals</span>
                                <div className="filter-tags">
                                    {VERTICAL_OPTIONS.map(vertical => (
                                        <button
                                            key={vertical}
                                            className={`filter-tag ${activeVerticals.has(vertical) ? 'filter-tag-active' : ''}`}
                                            onClick={() => toggleVertical(vertical)}
                                        >
                                            {vertical}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                className={`clear-filters-btn ${!hasActiveFilters ? 'clear-filters-btn-disabled' : ''}`} 
                                onClick={clearAllFilters}
                                disabled={!hasActiveFilters}
                            >
                                <X size={14} />
                                clear all filters
                            </button>
                        </div>
                    )}
                </div>

            <NetworkGraph
                members={members}
                connections={connections}
                highlightedMemberIds={filteredMembers.map(m => m.id)}
                    searchQuery={searchQuery}
                    selectedMemberId={selectedMemberId}
                    onNodeClick={(memberId, firstName) => {
                        setSelectedMemberId(memberId);
                        setSearchQuery(firstName);
                    }}
                />
            </div>

        </main>
    );
}
