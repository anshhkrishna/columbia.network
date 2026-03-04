"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Member,
  Connection,
  ROLE_OPTIONS,
  VERTICAL_OPTIONS,
} from "@/data/members";
import MembersTable from "./MembersTable";
import NetworkGraph from "./NetworkGraph";
import AsciiBackground from "./AsciiBackground";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";

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
    const [connectedToMemberId, setConnectedToMemberId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setShuffledMembers(shuffleArray(members));
    }, [members]);

    const hasActiveFilters = activeRoles.size > 0 || activeVerticals.size > 0 || connectedToMemberId != null;

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
        setConnectedToMemberId(null);
        setSearchQuery('');
    };

    const filteredMembers = useMemo(() => {
        let result = shuffledMembers;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(member =>
                member.name?.toLowerCase().includes(q)
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

        if (connectedToMemberId) {
            const connectedIds = new Set<string>();
            connections.forEach(({ fromId, toId }) => {
                if (fromId === connectedToMemberId) connectedIds.add(toId);
                if (toId === connectedToMemberId) connectedIds.add(fromId);
            });
            connectedIds.add(connectedToMemberId);
            result = result.filter(member => connectedIds.has(member.id));
        }

        return result;
    }, [shuffledMembers, searchQuery, activeRoles, activeVerticals, connectedToMemberId, connections]);

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
                        <h1 className="title">columbia.network</h1>
                    </div>
                    <div className="description">
                        <p>welcome to the webring for columbia university students.</p>
                        <p>
                            columbia packs an unusually high density of talented engineers, designers, 
                            creators, and researchers into one campus in the middle of new york city. 
                            this is the place to find the people doing things.
                        </p>
                        <p>
                            want to join?{" "}
                            <a
                                href="/join"
                                className="join-cta"
                            >
                                fill out the form
                            </a>
                        </p>
                    </div>
                </div>

                <div className="table-section">
                    <MembersTable
                  members={filteredMembers}
                  searchQuery={searchQuery}
                  totalMembers={members.length}
                  isFiltered={hasActiveFilters}
                />
                </div>
            </div>

            <div className="graph-section">
                <div className="search-wrapper">
                    <div className="search-bar-container">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="search by name..."
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
                                    {activeRoles.size + activeVerticals.size + (connectedToMemberId ? 1 : 0)}
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

                            <div className="filter-group">
                                <span className="filter-label">connected to</span>
                                <select
                                    className="filter-select"
                                    value={connectedToMemberId ?? ""}
                                    onChange={(e) => setConnectedToMemberId(e.target.value || null)}
                                >
                                    <option value="">All members</option>
                                    {[...members].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")).map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
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
                    onNodeClick={(_, firstName) => setSearchQuery(firstName ?? "")}
                />
            </div>

        <AsciiBackground />

            <a
                href="https://uwaterloo.network"
                target="_blank"
                rel="noopener noreferrer"
                className="inspired-by"
            >
                inspired by uwaterloo.network
            </a>
        </main>
    );
}
