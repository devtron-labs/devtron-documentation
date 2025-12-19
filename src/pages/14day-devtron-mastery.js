/**
 * src/pages/learning-journey.js
 */

import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { journeyData } from '../data/journeyData';
import '../css/learning-journey.css';

const STORAGE_KEY = 'devtron-journey-progress';

/* Icons */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 496.2 496.2" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 248.1C0 111.1 111.1 0 248.1 0s248.1 111.1 248.1 248.1S385.1 496.2 248.1 496.2 0 385.1 0 248.1z" fill="#ea4949" />
    <path d="M315.3 194.1l22-93.3c-28.4-9.7-57-9.7-90-9.7s-61.6 0-90 9.7l22 93.3s10 46.7 42.7 74c0 0 14.7 28 10 46l-10.7 20.7 4 6.7s-10 22-30.7 32.7v7.3s14.7 8.8 51.2 9.3h3c36.5-.5 51.2-9.3 51.2-9.3v-7.4c-20.7-10.7-30.7-32.7-30.7-32.7l4-6.7-10.6-20.6c-4.7-18 10-46 10-46 32.7-27.3 42.7-74 42.7-74z" fill="#f2b408" />
  </svg>
);

/* Day Card */
function DayCard({ day, isExpanded, isCompleted, onToggle, onComplete }) {
  return (
    <div
      id={`day-${day.day}`}
      className={`journey-day-card ${isExpanded ? 'expanded' : ''} ${isCompleted ? 'completed' : ''}`}
    >
      <div className="journey-day-header" onClick={onToggle}>
        <div className={`journey-day-badge ${isCompleted ? 'completed' : ''}`}>
          {isCompleted && <CheckIcon />}
          Day {day.day}
        </div>

        <div className="journey-day-info">
          <h3 className="journey-day-title">{day.title}</h3>
          <p className="journey-day-description">{day.description}</p>
          <div className="journey-day-meta">
            <span className="journey-day-meta-item">
              <ClockIcon />
              {day.duration}
            </span>
          </div>
        </div>

        {isExpanded && !isCompleted && (
          <button
            className="journey-complete-inline-btn"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            Mark complete
          </button>
        )}

        <button className="journey-expand-toggle">
          <ChevronDownIcon />
        </button>
      </div>

      <div className="journey-day-content">
        <div className="journey-day-content-inner">
          {/* Targets */}
          <div className="journey-section">
            <h4 className="journey-section-title">
              <CheckIcon />
              Targets
            </h4>
            <ul className="journey-list journey-targets">
              {day.targets.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Videos */}
          {day.videos && day.videos.length > 0 && (
            <div className="journey-section">
              <h4 className="journey-section-title">
                <PlayIcon />
                Video Content
              </h4>
              <div className="journey-videos">
                {day.videos.map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="journey-video-item"
                  >
                    <span className="journey-video-icon">
                      <PlayIcon />
                    </span>
                    <span className="journey-video-info">
                      <span className="journey-video-title">{video.title}</span>
                      <span className="journey-video-duration">{video.duration}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {day.resources && day.resources.length > 0 && (
            <div className="journey-section">
              <h4 className="journey-section-title">
                <BookIcon />
                Resources
              </h4>
              <div className="journey-resources">
                {day.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="journey-resource-link"
                  >
                    <LinkIcon />
                    {resource.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Main Page */
export default function LearningJourney() {
  const [expandedDays, setExpandedDays] = useState(new Set([1]));
  const [completedDays, setCompletedDays] = useState(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCompletedDays(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedDays]));
  }, [completedDays, isClient]);

  const resetProgress = () => {
    const confirmed = window.confirm('This will reset your entire 14-day progress. Are you sure?');
    if (!confirmed) return;

    setCompletedDays(new Set());
    setExpandedDays(new Set([1]));
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleDay = (dayNum) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      next.has(dayNum) ? next.delete(dayNum) : next.add(dayNum);
      return next;
    });
  };

  const markDayComplete = (dayNum) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      next.add(dayNum);
      return next;
    });

    setExpandedDays((prev) => {
      const next = new Set(prev);
      next.delete(dayNum);
      next.add(dayNum + 1);
      return next;
    });
  };

  const nextIncompleteDay = journeyData.days.find(
    (d) => !completedDays.has(d.day)
  );

  const currentDay = nextIncompleteDay ? nextIncompleteDay.day : null;
  const allDaysCompleted = currentDay === null;

  return (
    <Layout title={journeyData.title} description={journeyData.description}>
      <div className="journey-container">
        <header className="journey-hero">
          <div className="journey-hero-content">
            <h1>{journeyData.title}</h1>
            <p className="journey-hero-subtitle">{journeyData.subtitle}</p>
            <p className="journey-hero-description">{journeyData.description}</p>

            <div className="journey-progress-checkboxes">
              {journeyData.days.map((day) => {
                const isCompleted = completedDays.has(day.day);
                const isCurrent = currentDay === day.day;

                return (
                  <div key={day.day} className="journey-progress-item">
                    <button
                      className={`journey-checkbox ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                      onClick={() => markDayComplete(day.day)}
                    >
                      {isCompleted && <CheckIcon />}
                    </button>
                    <button
                      className="journey-progress-label"
                      onClick={() =>
                        document
                          .getElementById(`day-${day.day}`)
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      Day {day.day}
                    </button>
                  </div>
                );
              })}
            </div>

            {completedDays.size > 0 && (
              <div className="journey-reset-wrapper">
                <button className="journey-reset-btn" onClick={resetProgress}>
                  Reset progress
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="journey-timeline">
          {journeyData.days.map((day) => (
            <DayCard
              key={day.day}
              day={day}
              isExpanded={expandedDays.has(day.day)}
              isCompleted={completedDays.has(day.day)}
              onToggle={() => toggleDay(day.day)}
              onComplete={() => markDayComplete(day.day)}
            />
          ))}
        </main>

        {allDaysCompleted && (
          <footer className="journey-completion">
            <div className="journey-completion-icon">
              <TrophyIcon />
            </div>
            <h2>You’re a Devtron Pro</h2>
            <p>
              All 14 days completed. You now have the fundamentals to build,
              deploy, govern, and operate at scale.
            </p>
          </footer>
        )}
      </div>
    </Layout>
  );
}
