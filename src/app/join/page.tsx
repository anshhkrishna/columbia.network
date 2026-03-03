'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import AsciiBackground from '@/components/AsciiBackground';

type JoinPayload = {
  name: string;
  uni: string;
  website?: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  clubs?: string[];
  profilePic?: string;
  connections?: string[];
  instagram?: string;
  twitter?: string;
  linkedin?: string;
};

const parseList = (value: string) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    uni: '',
    website: '',
    program: '',
    year: '',
    roles: '',
    verticals: '',
    clubs: '',
    profilePic: '/photos/your-name.jpg',
    profileFile: null as File | null,
    connections: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [pullRequestUrl, setPullRequestUrl] = useState('');

  const joinIssueUrl = useMemo(() => {
    const body = [
      'please add me to columbia.network',
      '',
      '**name**:',
      '**uni**:',
      '**website**:',
      '**program**:',
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
      '',
      'if the form fails, this issue will still reach the maintainers.',
    ].join('\n');

    const params = new URLSearchParams({
      title: 'add me to columbia.network',
      body,
    });

    return `https://github.com/anshhkrishna/columbia.network/issues/new?${params.toString()}`;
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.uni.trim() || !formData.program.trim() || !formData.year.trim()) {
      setStatus('error');
      setMessage('name, UNI, program, and year are required.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    setPullRequestUrl('');

    const payload: JoinPayload = {
      name: formData.name.trim(),
      uni: formData.uni.trim(),
      website: formData.website.trim() || undefined,
      program: formData.program.trim(),
      year: formData.year.trim(),
      roles: parseList(formData.roles),
      verticals: parseList(formData.verticals),
      clubs: parseList(formData.clubs),
      profilePic: formData.profilePic.trim() || undefined,
      connections: parseList(formData.connections),
      instagram: formData.instagram.trim() || undefined,
      twitter: formData.twitter.trim() || undefined,
      linkedin: formData.linkedin.trim() || undefined,
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
        program: '',
        year: '',
        roles: '',
        verticals: '',
        clubs: '',
        profilePic: '/photos/your-name.jpg',
        connections: '',
        instagram: '',
        twitter: '',
        linkedin: '',
      });
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
            <label>website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              required
            />
          </div>

          <div className="join-row">
            <label>program*</label>
            <input
              type="text"
              value={formData.program}
              onChange={(e) => handleInputChange('program', e.target.value)}
              placeholder="computer science"
              required
            />
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
            <label>roles (comma separated)</label>
            <input
              type="text"
              value={formData.roles}
              onChange={(e) => handleInputChange('roles', e.target.value)}
              placeholder="engineering, design"
            />
          </div>

          <div className="join-row">
            <label>verticals (comma separated)</label>
            <input
              type="text"
              value={formData.verticals}
              onChange={(e) => handleInputChange('verticals', e.target.value)}
              placeholder="ai, fintech"
            />
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
