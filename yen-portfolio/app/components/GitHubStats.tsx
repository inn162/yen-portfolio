"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { GitBranch, Star, GitFork, Code } from "lucide-react";

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

const GITHUB_USERNAME = "inn162";

const langColors = ["#6A4D67", "#8D6289", "#BE8099", "#C9BECA", "#DDD7DA"];

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
  });
  const langData = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-[#BE8099] tracking-widest">05</span>
        <h2 className="text-3xl font-bold text-[#1A1517] tracking-tight flex items-center gap-3">
          GitHub Activity
          <GitBranch size={20} className="text-[#C9BECA]" />
        </h2>
      </div>
      <div className="w-8 h-px bg-[#BE8099] mb-12 ml-10" />

      {loading && (
        <div className="flex items-center gap-3 text-[#B0AAB2] text-sm ml-10">
          <div className="w-4 h-4 border-2 border-[#6A4D67] border-t-transparent rounded-full animate-spin" />
          Loading GitHub data...
        </div>
      )}

      {error && (
        <p className="text-[#B0AAB2] text-sm ml-10">
          Could not load GitHub data. Visit{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            className="text-[#6A4D67] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            github.com/{GITHUB_USERNAME}
          </a>{" "}
          directly.
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Public Repos", value: repos.length, icon: Code },
              { label: "Total Stars",  value: totalStars,   icon: Star },
              { label: "Total Forks",  value: totalForks,   icon: GitFork },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#FDFCFA] rounded-xl p-5 border border-[#EDE9EB] text-center"
              >
                <Icon size={16} className="text-[#BE8099] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#1A1517]">{value}</p>
                <p className="text-xs text-[#B0AAB2] mt-1 font-mono">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Language bar chart */}
            {langData.length > 0 && (
              <div className="bg-[#FDFCFA] rounded-xl p-6 border border-[#EDE9EB]">
                <p className="text-[#79747A] text-xs font-mono tracking-wide uppercase mb-4">Languages used</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={langData}>
                    <XAxis dataKey="name" tick={{ fill: "#79747A", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#B0AAB2", fontSize: 11 }} allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#FDFCFA", border: "1px solid #DDD7DA", borderRadius: 8 }}
                      labelStyle={{ color: "#1A1517" }}
                      itemStyle={{ color: "#6A4D67" }}
                      formatter={(v) => [v, "repos"]}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {langData.map((_, i) => (
                        <Cell key={i} fill={langColors[i % langColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Top repos */}
            <div className="space-y-3">
              {repos.slice(0, 4).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-[#FDFCFA] rounded-lg px-4 py-3 border border-[#EDE9EB] hover:border-[#C9BECA] transition-all group"
                >
                  <div className="min-w-0">
                    <p className="text-[#1A1517] text-sm font-medium group-hover:text-[#6A4D67] transition-colors truncate">
                      {repo.name}
                    </p>
                    {repo.language && (
                      <p className="text-[11px] text-[#B0AAB2] mt-0.5 font-mono">{repo.language}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[#C9BECA] text-xs shrink-0 ml-4">
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
