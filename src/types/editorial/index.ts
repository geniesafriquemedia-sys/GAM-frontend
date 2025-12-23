/**
 * Module Editorial
 * Export centralisé des types éditoriaux
 */

// Author
export type {
  Author,
  AuthorSummary,
  AuthorQueryParams,
  AuthorSocialLinks,
} from './author';

export {
  getAuthorSocialLinks,
  getAuthorPhotoUrl,
  getAuthorUrl,
} from './author';

// Category
export type {
  Category,
  CategorySummary,
  CategoryWithChildren,
  CategoryQueryParams,
} from './category';

export {
  getCategoryUrl,
  getCategoryStyle,
  getCategoryBadgeClass,
  CATEGORY_ICONS,
} from './category';

// Article
export type {
  PublicationStatus,
  ArticleBlockType,
  TextBlockValue,
  ImageBlockValue,
  QuoteBlockValue,
  VideoBlockValue,
  TweetBlockValue,
  HeadingBlockValue,
  ListBlockValue,
  CodeBlockValue,
  CtaBlockValue,
  ArticleBlockValue,
  ArticleBlock,
  Article,
  ArticleSummary,
  ArticleWithRelated,
  ArticleQueryParams,
} from './article';

export {
  getArticleUrl,
  getArticleTags,
  formatReadingTime,
  getArticleImageUrl,
  isTextBlock,
  isImageBlock,
  isQuoteBlock,
  isVideoBlock,
  isHeadingBlock,
} from './article';

// Video
export type {
  VideoType,
  Video,
  VideoSummary,
  VideoWithRelated,
  VideoQueryParams,
  YouTubePlayerOptions,
} from './video';

export {
  VIDEO_TYPE_LABELS,
  getVideoUrl,
  getVideoTags,
  getVideoTypeLabel,
  getVideoThumbnailUrl,
  getVideoEmbedUrl,
  extractYoutubeId,
  getYoutubeThumbnail,
  formatDuration,
  buildEmbedUrl,
} from './video';
