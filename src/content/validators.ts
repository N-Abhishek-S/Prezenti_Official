import type { ContentScores } from './blogs/blogTypes';

export interface ContentValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

export interface ContentValidationOptions {
  minTitleLength?: number;
  maxTitleLength?: number;
  minDescLength?: number;
  maxDescLength?: number;
  requireH1?: boolean;
  minWordCount?: number;
  requireSchema?: boolean;
}

export function validateContent(
  content: {
    title?: string;
    description?: string;
    h1?: string;
    bodyText?: string;
    schema?: any;
    faqs?: any[];
    internalLinks?: string[];
  },
  options: ContentValidationOptions = {}
): ContentValidationResult {
  const result: ContentValidationResult = {
    isValid: true,
    warnings: [],
    errors: [],
  };

  const {
    minTitleLength = 30,
    maxTitleLength = 60,
    minDescLength = 120,
    maxDescLength = 160,
    requireH1 = true,
    minWordCount = 300,
    requireSchema = true,
  } = options;

  // Title Validation
  if (!content.title) {
    result.errors.push("Missing SEO Title");
    result.isValid = false;
  } else {
    if (content.title.length < minTitleLength) result.warnings.push(`Title is too short (${content.title.length} chars). Aim for >${minTitleLength}.`);
    if (content.title.length > maxTitleLength) result.warnings.push(`Title is too long (${content.title.length} chars). Aim for <${maxTitleLength}.`);
  }

  // Description Validation
  if (!content.description) {
    result.errors.push("Missing Meta Description");
    result.isValid = false;
  } else {
    if (content.description.length < minDescLength) result.warnings.push(`Description is too short (${content.description.length} chars). Aim for >${minDescLength}.`);
    if (content.description.length > maxDescLength) result.warnings.push(`Description is too long (${content.description.length} chars). Aim for <${maxDescLength}.`);
  }

  // H1 Validation
  if (requireH1 && !content.h1) {
    result.errors.push("Missing H1 heading");
    result.isValid = false;
  }

  // Word Count Validation
  if (content.bodyText) {
    const wordCount = content.bodyText.split(/\s+/).length;
    if (wordCount < minWordCount) {
      result.warnings.push(`Thin content detected (${wordCount} words). Minimum recommended is ${minWordCount}.`);
    }
  }

  // Schema Validation
  if (requireSchema && !content.schema) {
    result.warnings.push("Missing structured data (Schema).");
  }

  // Internal Links
  if (!content.internalLinks || content.internalLinks.length === 0) {
    result.warnings.push("No internal links found (Potential orphan page issues).");
  }

  // FAQs
  if (!content.faqs || content.faqs.length === 0) {
    result.warnings.push("No FAQs provided. FAQs improve AI search visibility.");
  }

  return result;
}

export function calculateBlogScore(
  wordCount: number,
  hasFaq: boolean,
  internalLinksCount: number,
  entitiesCount: number,
  readabilityScore: number // 0-100
): ContentScores {
  // Simplified scoring algorithm
  const seo = Math.min(100, (wordCount / 1000) * 40 + (hasFaq ? 20 : 0) + (internalLinksCount * 5));
  const eeat = Math.min(100, (hasFaq ? 30 : 0) + 70); // Assume author/review adds to this
  const aiReadiness = Math.min(100, (hasFaq ? 40 : 0) + (entitiesCount * 5) + 20);
  
  return {
    seo,
    eeat,
    aiReadiness,
    localSeo: 50,
    conversion: 80,
    authority: 70,
    internalLinking: Math.min(100, internalLinksCount * 10),
    entityCoverage: Math.min(100, entitiesCount * 10),
    readability: readabilityScore,
    accessibility: 100,
    freshness: 100,
    uniqueness: 100
  };
}
