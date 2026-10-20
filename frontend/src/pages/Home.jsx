import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">CRAFTED WITH PASSION</span>
          <h1 className="hero-title">Culinary Perfection, Delivered to Your Table</h1>
          <p className="hero-description">
            Experience our curated menu featuring authentic flavors, farm-fresh ingredients, 
            and seasonal specialties prepared by top chefs.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">
              Explore Our Menu &rarr;
            </Link>
          </div>
        </div>
      </section>
      <section className="features-grid">
        <div className="feature-card">
          <h3>Fresh Ingredients</h3>
          <p>Sourced locally every morning for peak flavor and nutrition.</p>
        </div>
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Hot, fresh meals delivered straight to your doorstep in minutes.</p>
        </div>
        <div className="feature-card">
          <h3>Handcrafted Dishes</h3>
          <p>Every dish is crafted with precision, balancing classic and modern tastes.</p>
        </div>
      </section>
    </div>
  );
}