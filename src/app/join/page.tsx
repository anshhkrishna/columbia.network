"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ROLE_OPTIONS, VERTICAL_OPTIONS } from "@/data/members";

const INITIAL_FORM = {
  name: "",
  email: "",
  website: "",
  program: "",
  year: "",
  roles: [] as string[],
  verticals: [] as string[],
  notes: "",
};

export default function JoinPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMultiSelect = (key: "roles" | "verticals", value: string) => {
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
      const res = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
              fill out this form to apply to join the webring. this just
              replaces the old pull request flow.
            </p>
            <p>
              we&apos;ll review submissions and add new members manually to
              keep the graph and directory curated.
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
                <span>columbia email</span>
                <input
                  type="email"
                  required
                  placeholder="uni@columbia.edu"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
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
                <span>program</span>
                <input
                  type="text"
                  placeholder="cs, se(a), econ-math, etc."
                  value={form.program}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, program: e.target.value }))
                  }
                />
              </label>

              <label className="join-field">
                <span>year</span>
                <input
                  type="text"
                  placeholder="2026"
                  value={form.year}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, year: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="filters-panel join-filters">
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

