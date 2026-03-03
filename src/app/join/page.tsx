"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { ROLE_OPTIONS, VERTICAL_OPTIONS, members } from "@/data/members";

const INITIAL = {
  name: "",
  email: "",
  website: "",
  program: "",
  roles: [] as string[],
  verticals: [] as string[],
  profilePic: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  github: "",
  connections: [] as string[],
  notes: "",
};

export default function JoinPage() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [connSearch, setConnSearch] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const toggle = (key: "roles" | "verticals" | "connections", value: string) =>
    setForm((p) => {
      const s = new Set(p[key]);
      s.has(value) ? s.delete(value) : s.add(value);
      return { ...p, [key]: Array.from(s) };
    });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === "string" ? reader.result : "";
      set("profilePic", url);
      setPreview(url);
    };
    reader.readAsDataURL(file);
  };

  const filteredMembers = useMemo(() => {
    const selected = members.filter((m) => form.connections.includes(m.id));
    const rest = members.filter((m) => !form.connections.includes(m.id));
    const q = connSearch.toLowerCase().trim();
    const filtered = q ? rest.filter((m) => m.name.toLowerCase().includes(q)) : rest;
    return [...selected, ...filtered];
  }, [connSearch, form.connections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setPrUrl(null);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      if (data.prUrl) setPrUrl(data.prUrl);
      else setPrUrl("submitted");
      setForm(INITIAL);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (prUrl) {
    return (
      <main className="main-container">
        <div className="content-wrapper">
          <div className="jf-card">
            <h1 className="jf-title">you&apos;re in the queue</h1>
            <p className="jf-subtitle">
              we created a pull request with your info. once it&apos;s
              reviewed and merged you&apos;ll appear on the directory + graph.
            </p>
            {prUrl !== "submitted" && (
              <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="jf-pr-link"
              >
                view your pull request &rarr;
              </a>
            )}
            <Link href="/" className="jf-back">
              &larr; back to directory
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container">
      <div className="content-wrapper">
        <div className="jf-card">
          <h1 className="jf-title">
            join <strong>columbia.network</strong>
          </h1>
          <p className="jf-subtitle">
            fill this form and we will open a pull request for you.
          </p>
          <p className="jf-back-line">
            <Link href="/" className="jf-inline-link">&larr; back to directory</Link>
          </p>

          <form className="jf" onSubmit={handleSubmit}>
            {/* basics */}
            <div className="jf-group">
              <label className="jf-label">
                name<span className="jf-req">*</span>
              </label>
              <input
                className="jf-input"
                required
                placeholder="your full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>

            <div className="jf-group">
              <label className="jf-label">email</label>
              <input
                className="jf-input"
                type="email"
                placeholder="uni@columbia.edu"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <div className="jf-group">
              <label className="jf-label">website</label>
              <input
                className="jf-input"
                placeholder="https://yourwebsite.com"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            <div className="jf-group">
              <label className="jf-label">program</label>
              <input
                className="jf-input"
                placeholder="cs, econ-math, etc."
                value={form.program}
                onChange={(e) => set("program", e.target.value)}
              />
            </div>

            {/* socials */}
            <div className="jf-row">
              <div className="jf-group">
                <label className="jf-label">linkedin</label>
                <input
                  className="jf-input"
                  placeholder="linkedin.com/in/you"
                  value={form.linkedin}
                  onChange={(e) => set("linkedin", e.target.value)}
                />
              </div>
              <div className="jf-group">
                <label className="jf-label">twitter / x</label>
                <input
                  className="jf-input"
                  placeholder="x.com/you"
                  value={form.twitter}
                  onChange={(e) => set("twitter", e.target.value)}
                />
              </div>
            </div>

            <div className="jf-row">
              <div className="jf-group">
                <label className="jf-label">github</label>
                <input
                  className="jf-input"
                  placeholder="github.com/you"
                  value={form.github}
                  onChange={(e) => set("github", e.target.value)}
                />
              </div>
              <div className="jf-group">
                <label className="jf-label">instagram</label>
                <input
                  className="jf-input"
                  placeholder="instagram.com/you"
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                />
              </div>
            </div>

            {/* photo */}
            <div className="jf-group">
              <label className="jf-label">profile photo</label>
              <div className="jf-photo-row">
                {preview ? (
                  <img src={preview} alt="preview" className="jf-photo-thumb" />
                ) : (
                  <div className="jf-photo-placeholder" />
                )}
                <button
                  type="button"
                  className="jf-photo-btn"
                  onClick={() => fileRef.current?.click()}
                >
                  {preview ? "change" : "upload"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhoto}
                />
                <input
                  className="jf-input jf-input-grow"
                  placeholder="or paste image url"
                  value={form.profilePic.startsWith("data:") ? "" : form.profilePic}
                  onChange={(e) => { set("profilePic", e.target.value); setPreview(""); }}
                />
              </div>
            </div>

            {/* roles */}
            <div className="jf-group">
              <label className="jf-label">roles</label>
              <div className="jf-chips">
                {ROLE_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`jf-chip ${form.roles.includes(r) ? "jf-chip-on" : ""}`}
                    onClick={() => toggle("roles", r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* verticals */}
            <div className="jf-group">
              <label className="jf-label">verticals</label>
              <div className="jf-chips">
                {VERTICAL_OPTIONS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`jf-chip ${form.verticals.includes(v) ? "jf-chip-on" : ""}`}
                    onClick={() => toggle("verticals", v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* connections */}
            <div className="jf-group">
              <label className="jf-label">connections</label>
              <input
                className="jf-input"
                placeholder="search people..."
                value={connSearch}
                onChange={(e) => setConnSearch(e.target.value)}
              />
              <div className="jf-chips jf-chips-scroll">
                {filteredMembers.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`jf-chip ${form.connections.includes(m.id) ? "jf-chip-on" : ""}`}
                    onClick={() => toggle("connections", m.id)}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* notes */}
            <div className="jf-group">
              <label className="jf-label">what are you building?</label>
              <textarea
                className="jf-input jf-textarea"
                rows={3}
                placeholder="tell us what you're working on..."
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>

            {error && <p className="jf-error">{error}</p>}

            <button type="submit" className="jf-submit" disabled={submitting}>
              {submitting ? "creating pull request..." : "submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
