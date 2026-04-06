import React from "react";
import { Member } from "@/data/members";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface MembersTableProps {
  members: Member[];
  searchQuery?: string;
  totalMembers?: number;
  isFiltered?: boolean;
}

export default function MembersTable({ members, searchQuery, totalMembers, isFiltered }: MembersTableProps) {

  const highlightText = (text: string | null | undefined) => {
    if (!text || !searchQuery) return text || "";

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} style={{ background: "#ffd54f", padding: "0 2px" }}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const getWebsiteLabel = (website: string, memberId?: string) => {
    if (memberId === "abhinav-goel") return "abhigoel.com";
    try {
      const normalized = website.startsWith("http") ? website : `https://${website}`;
      return new URL(normalized).hostname.replace(/^www\./, "");
    } catch {
      return website
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
    }
  };

  const normalizeUrl = (value: string) =>
    value.startsWith("http") ? value : `https://${value}`;

  return (
    <div className="members-table-container">
      <div className="search-results-info">
        {searchQuery ? (
          members.length === 0
            ? `No results found for "${searchQuery}"`
            : `Found ${members.length} of ${totalMembers ?? members.length} member${members.length !== 1 ? "s" : ""}`
        ) : isFiltered && totalMembers != null ? (
          members.length === 0
            ? "No members match the selected filters"
            : `Found ${members.length} of ${totalMembers} member${members.length !== 1 ? "s" : ""}`
        ) : totalMembers != null ? (
          `${totalMembers} member${totalMembers === 1 ? "" : "s"}`
        ) : (
          <span className="search-results-placeholder">&nbsp;</span>
        )}
      </div>
      <table className="members-table">
        <thead>
          <tr>
            <th>name</th>
            <th>program</th>
            <th>site</th>
            <th>links</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            const programDisplay = member.program?.trim()
              ? member.program
              : member.majors && member.majors.length
              ? member.majors.join(" + ")
              : "";

            const allLinks: Array<{
              key: string;
              href: string;
              title: string;
              icon: React.ReactNode;
              external?: boolean;
            }> = [];

            if (member.instagram) {
              allLinks.push({
                key: "instagram",
                href: member.instagram,
                title: "Instagram",
                icon: <FaInstagram size={16} />,
                external: true,
              });
            }
            if (member.twitter) {
              allLinks.push({
                key: "twitter",
                href: member.twitter,
                title: "Twitter/X",
                icon: <FaXTwitter size={16} />,
                external: true,
              });
            }
            if (member.linkedin) {
              allLinks.push({
                key: "linkedin",
                href: member.linkedin,
                title: "LinkedIn",
                icon: <FaLinkedin size={16} />,
                external: true,
              });
            }
            if (member.email && member.email.trim()) {
              allLinks.push({
                key: "email",
                href: `mailto:${member.email.trim()}`,
                title: "Email",
                icon: <FaEnvelope size={16} />,
              });
            }
            if (member.github && member.github.trim()) {
              allLinks.push({
                key: "github",
                href: normalizeUrl(member.github),
                title: "GitHub",
                icon: <FaGithub size={16} />,
                external: true,
              });
            }

            const visibleLinks = allLinks;

            return (
              <tr key={member.id}>
                <td className="user-cell">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.name || "Member"}
                      className={`avatar ${
                        searchQuery && index === 0 ? "avatar-highlighted" : ""
                      }`}
                    />
                  ) : (
                    <div
                      className={`avatar avatar-initials ${
                        searchQuery && index === 0 ? "avatar-highlighted" : ""
                      }`}
                    >
                      {(member.name || "?")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  {member.website && member.website.trim() ? (
                    <a
                      href={normalizeUrl(member.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="name-link"
                    >
                      {highlightText(member.name) || "No name"}
                    </a>
                  ) : (
                    <span className="name-text">
                      {highlightText(member.name) || "No name"}
                    </span>
                  )}
                </td>
                <td>{highlightText(programDisplay) || "\u2014"}</td>
                <td>
                  {member.website && member.website.trim() ? (
                    <a
                      href={
                        member.website.startsWith("http")
                          ? member.website
                          : `https://${member.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-link"
                    >
                      {getWebsiteLabel(member.website, member.id)}
                    </a>
                  ) : (
                    <span className="table-placeholder">{"\u2014"}</span>
                  )}
                </td>
                <td>
                  <div className="social-icons">
                    {visibleLinks.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="social-icon-link"
                        title={link.title}
                      >
                        {link.icon}
                      </a>
                    ))}
                    {visibleLinks.length === 0 && (
                      <span className="table-placeholder">{"\u2014"}</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
