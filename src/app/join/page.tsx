'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import AsciiBackground from '@/components/AsciiBackground';
import { ROLE_OPTIONS, VERTICAL_OPTIONS } from '@/data/members';
import { ACADEMIC_OPTIONS } from '@/data/academics';

type JoinPayload = {
  name: string;
  uni: string;
  website?: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  majors?: string[];
  minors?: string[];
  clubs?: string[];
  profilePic?: string;
  connections?: string[];
  email?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
};

type JoinFormData = {
  name: string;
  uni: string;
  website: string;
  year: string;
  roles: string[];
  verticals: string[];
  majors: string[];
  minors: string[];
  clubs: string;
  profilePic: string;
  profileFile: File | null;
  connections: string;
  email: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
};

const parseList = (value: string) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

export default function JoinPage() {
  const [formData, setFormData] = useState<JoinFormData>({
    name: '',
    uni: '',
    website: '',
    year: '',
    roles: [],
    verticals: [],
    majors: [],
    minors: [],
    clubs: '',
    profilePic: '/photos/your-name.jpg',
    profileFile: null as File | null,
    connections: '',
    email: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    github: '',
  });
  const [majorQuery, setMajorQuery] = useState('');
  const [minorQuery, setMinorQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [pullRequestUrl, setPullRequestUrl] = useState('');

  const joinIssueUrl = useMemo(() => {
    const body = [
      'please add me to columbia.network',
      '',
      '**name**:',
      '**uni**:',
      '**email**:',
      '**website**:',
      '**majors**:',
      '**minors**:',
      '**year**:',
      '**roles**:',
      '**verticals**:',
      '**clubs**:',
      '**profile pic path**: /photos/your-name.jpg',
      '**connections**:',
      '',
      'optional socials:',
      '- instagram:',
      '- twitter/x:',
      '- linkedin:',
      '- github:',
      '',
      'if the form fails, this issue will still reach the maintainers.',
    ].join('\n');

    const params = new URLSearchParams({
      title: 'add me to columbia.network',
      body,
    });

    return `https://github.com/anshhkrishna/columbia.network/issues/new?${params.toString()}`;
  }, []);

  const handleInputChange = <K extends keyof JoinFormData>(field: K, value: JoinFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (field: 'roles' | 'verticals', tag: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
      return { ...prev, [field]: next };
    });
  };

  const toggleAcademicTag = (field: 'majors' | 'minors', tag: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.uni.trim() || !formData.year.trim() || formData.majors.length === 0) {
      setStatus('error');
      setMessage('name, UNI, email, major(s), and year are required.');
      return;
    }
    if (!formData.email.trim()) {
      setStatus('error');
      setMessage('email is required.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    setPullRequestUrl('');

    const program = formData.majors.join(' + ');

    const payload: JoinPayload = {
      name: formData.name.trim(),
      uni: formData.uni.trim(),
      website: formData.website.trim() || undefined,
      program,
      year: formData.year.trim(),
      roles: formData.roles.length ? formData.roles : undefined,
      verticals: formData.verticals.length ? formData.verticals : undefined,
      majors: formData.majors,
      minors: formData.minors,
      clubs: parseList(formData.clubs),
      profilePic: formData.profilePic.trim() || undefined,
      connections: parseList(formData.connections),
      email: formData.email.trim(),
      instagram: formData.instagram.trim() || undefined,
      twitter: formData.twitter.trim() || undefined,
      linkedin: formData.linkedin.trim() || undefined,
      github: formData.github.trim() || undefined,
    };

    // If a file was uploaded, include a placeholder note in the PR body via profilePic
    if (formData.profileFile) {
      payload.profilePic = payload.profilePic || '/photos/uploaded-via-form.jpg';
    }

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || 'failed to create pull request.');
      }
      setStatus('success');
      setMessage('pull request created!');
      setPullRequestUrl(result.pullRequestUrl);
      setFormData({
        name: '',
        uni: '',
        website: '',
        year: '',
        roles: [],
        verticals: [],
        majors: [],
        minors: [],
        clubs: '',
        profilePic: '/photos/your-name.jpg',
        profileFile: null,
        connections: '',
        email: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        github: '',
      });
      setMajorQuery('');
      setMinorQuery('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'something went wrong.');
    }
  };

  return (
    <div className="join-page">
      <AsciiBackground />
      <div className="join-page-card">
        <div className="join-page-header">
          <h1>
            join <span className="cu-accent">columbia</span>.network
          </h1>
          <p className="join-page-subtext">
            fill this form and we will open a pull request for you. need to bail?{' '}
            <a className="join-link join-link-blue" href={joinIssueUrl} target="_blank" rel="noopener noreferrer">
              file an issue instead
            </a>
          </p>
          <div className="join-spacer" />
        </div>

        <form className="join-form" onSubmit={handleSubmit}>
          <div className="join-row">
            <label>name*</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="your full name"
              required
            />
          </div>

          <div className="join-row">
            <label>UNI*</label>
            <input
              type="text"
              value={formData.uni}
              onChange={(e) => handleInputChange('uni', e.target.value)}
              placeholder="abc1234"
              required
            />
          </div>

          <div className="join-row">
            <label>email*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="uni@columbia.edu"
              autoComplete="email"
              required
            />
          </div>

          <div className="join-row">
            <label>website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="join-row">
            <label>major(s)*</label>
            <input
              type="text"
              value={majorQuery}
              onChange={(e) => setMajorQuery(e.target.value)}
              placeholder="search majors/minors..."
            />
            {formData.majors.length > 0 && (
              <div className="filter-tags join-tags join-selected-tags">
                {formData.majors.map((major) => (
                  <button
                    key={major}
                    type="button"
                    className="filter-tag filter-tag-active join-selected-tag"
                    onClick={() => toggleAcademicTag('majors', major)}
                    aria-label={`remove major ${major}`}
                  >
                    {major} <span className="join-selected-x">x</span>
                  </button>
                ))}
              </div>
            )}
            <div className="filter-tags join-tags join-tags-scroll">
              {ACADEMIC_OPTIONS.filter((option) => {
                const q = majorQuery.trim().toLowerCase();
                if (!q) return true;
                return option.toLowerCase().includes(q);
              })
                .filter((option) => !formData.majors.includes(option))
                .map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-tag ${formData.majors.includes(option) ? 'filter-tag-active' : ''}`}
                  onClick={() => toggleAcademicTag('majors', option)}
                  aria-pressed={formData.majors.includes(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="join-row">
            <label>minor(s)</label>
            <input
              type="text"
              value={minorQuery}
              onChange={(e) => setMinorQuery(e.target.value)}
              placeholder="search minors..."
            />
            {formData.minors.length > 0 && (
              <div className="filter-tags join-tags join-selected-tags">
                {formData.minors.map((minor) => (
                  <button
                    key={minor}
                    type="button"
                    className="filter-tag filter-tag-active join-selected-tag"
                    onClick={() => toggleAcademicTag('minors', minor)}
                    aria-label={`remove minor ${minor}`}
                  >
                    {minor} <span className="join-selected-x">x</span>
                  </button>
                ))}
              </div>
            )}
            <div className="filter-tags join-tags join-tags-scroll">
              {ACADEMIC_OPTIONS.filter((option) => {
                const q = minorQuery.trim().toLowerCase();
                if (!q) return true;
                return option.toLowerCase().includes(q);
              })
                .filter((option) => !formData.minors.includes(option))
                .map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-tag ${formData.minors.includes(option) ? 'filter-tag-active' : ''}`}
                  onClick={() => toggleAcademicTag('minors', option)}
                  aria-pressed={formData.minors.includes(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="join-row">
            <label>year*</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="2027"
              required
            />
          </div>

          <div className="join-row">
            <label>roles</label>
            {formData.roles.length > 0 && (
              <div className="filter-tags join-tags join-selected-tags">
                {formData.roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    className="filter-tag filter-tag-active join-selected-tag"
                    onClick={() => toggleTag('roles', role)}
                    aria-label={`remove role ${role}`}
                  >
                    {role} <span className="join-selected-x">x</span>
                  </button>
                ))}
              </div>
            )}
            <div className="filter-tags join-tags">
              {ROLE_OPTIONS.filter((role) => !formData.roles.includes(role)).map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`filter-tag ${formData.roles.includes(role) ? 'filter-tag-active' : ''}`}
                  onClick={() => toggleTag('roles', role)}
                  aria-pressed={formData.roles.includes(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="join-row">
            <label>verticals</label>
            {formData.verticals.length > 0 && (
              <div className="filter-tags join-tags join-selected-tags">
                {formData.verticals.map((vertical) => (
                  <button
                    key={vertical}
                    type="button"
                    className="filter-tag filter-tag-active join-selected-tag"
                    onClick={() => toggleTag('verticals', vertical)}
                    aria-label={`remove vertical ${vertical}`}
                  >
                    {vertical} <span className="join-selected-x">x</span>
                  </button>
                ))}
              </div>
            )}
            <div className="filter-tags join-tags">
              {VERTICAL_OPTIONS.filter((vertical) => !formData.verticals.includes(vertical)).map((vertical) => (
                <button
                  key={vertical}
                  type="button"
                  className={`filter-tag ${formData.verticals.includes(vertical) ? 'filter-tag-active' : ''}`}
                  onClick={() => toggleTag('verticals', vertical)}
                  aria-pressed={formData.verticals.includes(vertical)}
                >
                  {vertical}
                </button>
              ))}
            </div>
          </div>

          <div className="join-row">
            <label>clubs (comma separated)</label>
            <input
              type="text"
              value={formData.clubs}
              onChange={(e) => handleInputChange('clubs', e.target.value)}
              placeholder="columbia data science society"
            />
          </div>

          <div className="join-row">
            <label>profile picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange('profileFile', e.target.files?.[0] || null)}
            />
          </div>

          <div className="join-row">
            <label>connections (comma separated ids)</label>
            <input
              type="text"
              value={formData.connections}
              onChange={(e) => handleInputChange('connections', e.target.value)}
              placeholder="ansh-krishna, alex-jerpelea"
            />
          </div>

          <div className="join-row">
              <label>instagram</label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="https://instagram.com/you"
              />
          </div>

          <div className="join-row">
              <label>twitter/x</label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="https://x.com/you"
              />
          </div>

          <div className="join-row">
              <label>linkedin</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/you"
              />
          </div>

          <div className="join-row">
              <label>github</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                placeholder="https://github.com/you"
              />
          </div>

          <button type="submit" className="join-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'submitting…' : 'create pull request'}
          </button>

          {status === 'success' && (
            <p className="join-success">
              pull request created!{' '}
              {pullRequestUrl && (
                <a
                  href={pullRequestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="join-link"
                >
                  view pr
                </a>
              )}
            </p>
          )}
          {status === 'error' && <p className="join-error">{message || 'something went wrong.'}</p>}
          {status === 'idle' && <p className="join-hint">we will generate a branch and open a pr with your info.</p>}
        </form>

        <div className="join-page-footer">
          <Link href="/" className="join-link">
            back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
