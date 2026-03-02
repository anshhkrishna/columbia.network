"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ROLE_OPTIONS, VERTICAL_OPTIONS, members } from "@/data/members";

const INITIAL_FORM = {
  name: "",
  website: "",
  program: "",
  roles: [] as string[],
  verticals: [] as string[],
  notes: "",
  profilePic: "",
  linkedin: "",
  twitter: "",
  github: "",
  connections: [] as string[],
};

export default function JoinPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleMultiSelect = (
    key: "roles" | "verticals" | "connections",
    value: string
  ) => {
    setForm((prev) => {
      const current = new Set(prev[key]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      return {
        ...prev,
        [key]: Array.from(current),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        website: form.website.trim() || "",
        linkedin: form.linkedin.trim(),
        twitter: form.twitter.trim(),
        github: form.github.trim(),
        profilePic: form.profilePic.trim(),
      };

      const res = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setProfilePreview(null);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      setForm((prev) => ({ ...prev, profilePic: dataUrl }));
      setProfilePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="main-container">
      <div className="content-wrapper">
        <div className="header-section">
          <div className="title-row">
            <h1 className="title">join columbia.network</h1>
          </div>
          <div className="description">
            <p>
              this should take about a minute. once you submit, we&apos;ll
              review and add you to the graph + directory.
            </p>
            <p>
              we try to keep columbia.network high-signal and curated, so share
              the best links and context you have.
            </p>
            <p>
              <Link href="/" className="join-link">
                ← back to directory
              </Link>
            </p>
          </div>
        </div>

        <div className="table-section">
          <form className="join-form" onSubmit={handleSubmit}>
            <section className="join-section">
              <p className="join-section-label">what do you do?</p>
              <div className="join-filters">
                <div className="filter-group">
                  <span className="filter-label">roles</span>
                  <div className="filter-tags">
                    {ROLE_OPTIONS.map((role) => (
                      <button
                        key={role}
                        type="button"
                        className={`filter-tag ${
                          form.roles.includes(role) ? "filter-tag-active" : ""
                        }`}
                        onClick={() => toggleMultiSelect("roles", role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <span className="filter-label">verticals</span>
                  <div className="filter-tags">
                    {VERTICAL_OPTIONS.map((vertical) => (
                      <button
                        key={vertical}
                        type="button"
                        className={`filter-tag ${
                          form.verticals.includes(vertical)
                            ? "filter-tag-active"
                            : ""
                        }`}
                        onClick={() => toggleMultiSelect("verticals", vertical)}
                      >
                        {vertical}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="join-section">
              <div className="join-form-grid">
                <label className="join-field">
                  <span>full name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </label>

                <label className="join-field">
                  <span>website / portfolio</span>
                  <input
                    type="url"
                    placeholder="https://"
                    value={form.website}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, website: e.target.value }))
                    }
                  />
                </label>

                <label className="join-field">
                  <span>linkedin</span>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    value={form.linkedin}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, linkedin: e.target.value }))
                    }
                  />
                </label>

                <label className="join-field">
                  <span>twitter / x</span>
                  <input
                    type="url"
                    placeholder="https://x.com/you"
                    value={form.twitter}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, twitter: e.target.value }))
                    }
                  />
                </label>

                <label className="join-field">
                  <span>github</span>
                  <input
                    type="url"
                    placeholder="https://github.com/you"
                    value={form.github}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, github: e.target.value }))
                    }
                  />
                </label>

                <label className="join-field">
                  <span>profile photo</span>
                  <div className="join-avatar-row">
                    <button
                      type="button"
                      className="join-upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      upload image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfileUpload}
                    />
                    <input
                      type="url"
                      placeholder="or paste image url"
                      value={form.profilePic.startsWith("data:")
                        ? ""
                        : form.profilePic}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          profilePic: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {profilePreview && (
                    <div className="join-avatar-preview">
                      <img src={profilePreview} alt="profile preview" />
                    </div>
                  )}
                </label>

                <label className="join-field">
                  <span>program</span>
                  <input
                    type="text"
                    placeholder="cs, econ-math, etc."
                    value={form.program}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, program: e.target.value }))
                    }
                  />
                </label>
              </div>
            </section>

            <section className="join-section join-connections">
              <p className="join-section-label">who do you already know?</p>
              <div className="join-filters">
                <div className="filter-group">
                  <span className="filter-label">connections</span>
                  <div className="filter-tags">
                    {members.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        className={`filter-tag ${
                          form.connections.includes(member.id)
                            ? "filter-tag-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleMultiSelect("connections", member.id)
                        }
                      >
                        {member.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <label className="join-field join-notes">
              <span>what are you building / working on?</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </label>

            {error && <p className="join-error">{error}</p>}
            {submitted && !error && (
              <p className="join-success">
                thanks for submitting. we&apos;ll review and get back to you.
              </p>
            )}

            <button
              type="submit"
              className="join-submit-btn"
              disabled={submitting}
            >
              {submitting ? "submitting…" : "submit application"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

