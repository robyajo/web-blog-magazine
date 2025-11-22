"use client";
import FeaturedStory from "./featured-story";
import CategoryFilter from "./category-filter";
import ArticleGrid from "./article-grid";
import { useState } from "react";

export default function VPageHome() {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  return (
    <>
      <FeaturedStory />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ArticleGrid category={selectedCategory} />
      </main>
    </>
  );
}
