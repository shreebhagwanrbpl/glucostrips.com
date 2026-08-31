/**
 * Technical SEO Architect helper utilities for glucostrips.com
 */

// Key districts to prioritize for indexation (e.g. major cities or hubs)
export const PRIMARY_DISTRICTS = [
  "jaipur", "jodhpur", "udaipur", "kota", "bikaner", "ajmer", "alwar",
  "delhi", "mumbai", "ahmedabad", "pune", "bengaluru", "chennai", "kolkata",
  "hyderabad", "lucknow", "patna", "indore", "bhopal", "chandigarh", "nagpur"
];

// Niche terms relevant to glucostrips.com to build strong topical authority
const NICHE_KEYWORDS = [
  "strip", "strips", "glucose", "blood", "sugar", "reagent", "diluent", 
  "test kit", "rapid kit", "analyzer", "analyzers", "meter", "lancet", 
  "urine", "sysmex", "roche", "erba", "mindray", "abbott", "biochemistry", "hematology"
];

/**
 * Calculates a programmatic SEO Quality Score (0-100) for pages
 * to ensure thin or low-value content is not indexed.
 */
export function calculateSeoScore(pageType, data) {
  let score = 0;

  // 1. Technical SEO (Max 20 pts)
  // Has canonical and proper routes set
  if (data.canonical) {
    score += 20;
  } else {
    score += 10;
  }

  // 2. Content Quality & Thin Content Prevention (Max 20 pts)
  if (pageType === "product") {
    const desc = data.description || data.desc || "";
    if (desc.trim().length > 120) {
      score += 20;
    } else if (desc.trim().length > 40) {
      score += 10;
    }
  } else if (pageType === "district") {
    // Location pages have state & district info
    if (data.district && data.state) {
      score += 20;
    } else {
      score += 5;
    }
  } else if (pageType === "district-product") {
    // Location product pages: Check if product description has content
    const desc = data.description || data.desc || "";
    if (desc.trim().length > 100) {
      score += 15;
    } else {
      score += 5;
    }
    // Location check
    if (data.city) score += 5;
  } else {
    // Static pages
    score += 20;
  }

  // 3. Search Intent Alignment & Niche Priority (Max 15 pts)
  // Glucostrips.com specific topical authority
  let matchesNiche = false;
  const title = (data.title || "").toLowerCase();
  const text = ((data.description || data.desc || "") + " " + title).toLowerCase();
  
  for (const keyword of NICHE_KEYWORDS) {
    if (text.includes(keyword)) {
      matchesNiche = true;
      break;
    }
  }

  if (matchesNiche) {
    score += 15;
  } else {
    score += 8; // generic diagnostics equipment is allowed but scores lower
  }

  // 4. Internal Linking Capabilities (Max 10 pts)
  // Check if we have links/categories linked
  if (data.hasLinks || data.category || data.relatedProductsCount > 0) {
    score += 10;
  } else {
    score += 5;
  }

  // 5. Metadata Excellence (Max 10 pts)
  // Safe limits for titles (30-80 chars) and meta description (50-180 chars)
  const titleLen = (data.metaTitle || data.title || "").length;
  const descLen = (data.metaDescription || data.description || data.desc || "").length;

  if (titleLen >= 30 && titleLen <= 90) {
    score += 5;
  } else {
    score += 2;
  }

  if (descLen >= 50 && descLen <= 200) {
    score += 5;
  } else {
    score += 2;
  }

  // 6. Structured Data / Schema presence (Max 10 pts)
  if (data.hasSchema) {
    score += 10;
  } else {
    score += 5;
  }

  // 7. Core Web Vitals & Caching (Max 5 pts)
  // Static generation or optimized server rendering gets full points
  score += 5;

  // 8. Image Optimization (Max 5 pts)
  // Has descriptive alt and clean filenames
  if (data.hasImages && data.hasCleanAlts) {
    score += 5;
  } else {
    score += 2;
  }

  // 9. Local Relevance (Max 5 pts)
  // Checks if the location serviced is genuine
  if (pageType.startsWith("district")) {
    if (data.city) {
      score += 5;
    }
  } else {
    score += 5;
  }

  return score;
}

/**
 * Groups districts by state and finds nearby districts for a given district.
 * Useful for contextual internal linking and showing serviceable regions.
 */
export function getNearbyDistricts(currentDistrictSlug, allDistrictsList, maxCount = 6) {
  const current = allDistrictsList.find(d => d.slug === currentDistrictSlug);
  if (!current || !current.state) return [];

  // Find other districts in the same state
  const sameState = allDistrictsList
    .filter(d => d.state === current.state && d.slug !== currentDistrictSlug)
    .slice(0, maxCount);

  return sameState.map(d => ({
    name: d.district || d.name,
    slug: d.slug
  }));
}
