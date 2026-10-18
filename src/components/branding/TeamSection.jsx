import React from 'react';
import { Code, BarChart3, Database, Shield, Award, Sparkles } from 'lucide-react';
import IndianFlag from './IndianFlag';

/**
 * TeamSection Component
 * Displays the verified project team members and their exact project responsibilities.
 * Conforms to project documentation (MIT-VPU Solapur, B.Tech Sem III Integrated Project).
 */
export default function TeamSection({ className = '' }) {
  const TEAM_MEMBERS = [
    {
      name: 'Furqan Bagwan',
      id: 'SCFU425004',
      role: 'Frontend Development & UI Integration',
      badge: 'Frontend Lead',
      badgeColor: 'text-primary bg-primary/10 border-primary/30',
      icon: Code,
      iconColor: 'text-primary',
      description:
        'Architected the responsive telemetry interface, interactive Leaflet heat mapping, multi-region exploration controls, and real-time sensor dashboards.',
      tags: ['React', 'Vite', 'Leaflet', 'Recharts', 'Design System'],
    },
    {
      name: 'Aman Shaikh',
      id: 'SCFU425013',
      role: 'Exploratory Data Analysis, Data Visualization, and Temperature-Data Analysis',
      badge: 'EDADV Lead',
      badgeColor: 'text-secondary bg-secondary/10 border-secondary/30',
      icon: BarChart3,
      iconColor: 'text-secondary',
      description:
        'Conducted exploratory temperature distributions, correlation analysis (NDVI vs. LST r = -0.307), diurnal variance profiling, and mathematical QA validation.',
      tags: ['EDA', 'Data Profiling', 'Correlation Matrices', 'Visualization'],
    },
    {
      name: 'Bhavin Shankur',
      id: 'SCFU425014',
      role: 'Backend Development & Database Integration',
      badge: 'DBMS & Backend Lead',
      badgeColor: 'text-tertiary bg-tertiary/10 border-tertiary/30',
      icon: Database,
      iconColor: 'text-tertiary',
      description:
        'Engineered 3NF relational schemas, PostgreSQL & MySQL DDL pipelines, 150,000-record ingestion optimization, and database query indexing.',
      tags: ['PostgreSQL', 'MySQL', '3NF Relational Model', 'ETL Pipeline'],
    },
  ];

  return (
    <section
      className={`bg-surface-container rounded-2xl p-6 lg:p-8 border border-outline-variant/30 flex flex-col gap-6 shadow-lg ${className}`}
      id="team"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-5">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
            <Sparkles size={14} />
            <span>Academic Project Governance — TF-141</span>
            <span className="text-outline">•</span>
            <span className="text-on-surface-variant flex items-center gap-1">
              Team: <strong className="text-on-surface">HeatShield</strong>
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Meet the Team Behind HeatShield
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Collaborating to explore India's temperature patterns through data, technology, and visualization.
          </p>
        </div>

        {/* Institutional & Team Identity Badge */}
        <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-mono">
          <IndianFlag size="xs" />
          <span className="text-on-surface font-medium">MIT-VPU Solapur</span>
          <span className="text-outline">|</span>
          <span className="text-secondary font-bold">TF-141</span>
        </div>
      </div>

      {/* 3 Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TEAM_MEMBERS.map((member) => {
          const Icon = member.icon;
          return (
            <div
              key={member.name}
              className="bg-surface-container-low/90 rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-outline-variant/60 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex flex-col gap-3">
                {/* Header: Icon & Role Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon size={20} className={member.iconColor} />
                  </div>
                  <span
                    className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${member.badgeColor}`}
                  >
                    {member.badge}
                  </span>
                </div>

                {/* Name & Academic ID */}
                <div className="flex flex-col">
                  <h3 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-outline font-mono mt-0.5">
                    <span>Roll No:</span>
                    <span className="text-on-surface-variant font-semibold">
                      {member.id}
                    </span>
                  </div>
                </div>

                {/* Responsibility Title */}
                <div className="text-xs font-medium text-primary/90 bg-surface-container/60 px-2.5 py-1.5 rounded border border-outline-variant/20 leading-snug">
                  {member.role}
                </div>

                {/* Short Description */}
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Competency Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-outline-variant/20">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Subtext */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-outline pt-2 border-t border-outline-variant/20">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-secondary shrink-0" />
          <span>
            Project responsibilities verified in official repository documentation.
          </span>
        </div>
        <div className="font-mono text-center sm:text-right">
          MIT Vishwaprayag University • Department of Computer Science & Engineering
        </div>
      </div>
    </section>
  );
}
