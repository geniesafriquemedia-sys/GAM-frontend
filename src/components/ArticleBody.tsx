"use client";

import Image from "next/image";
import type { ArticleBlock } from "@/types";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="prose prose-zinc prose-2xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[3rem] prose-strong:text-foreground prose-strong:font-black">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <div
          dangerouslySetInnerHTML={{ __html: (block.value as { content: string }).content }}
        />
      );

    case 'heading':
      const headingValue = block.value as { heading: string; level: 'h2' | 'h3' | 'h4' };
      const HeadingTag = headingValue.level;
      return (
        <HeadingTag className="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">
          {headingValue.heading}
        </HeadingTag>
      );

    case 'image':
      const imageValue = block.value as {
        image: { url: string; alt: string; width: number; height: number };
        caption: string;
        attribution: string;
      };
      return (
        <figure className="my-12">
          <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src={imageValue.image.url}
              alt={imageValue.image.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {(imageValue.caption || imageValue.attribution) && (
            <figcaption className="text-center mt-4 text-sm text-muted-foreground">
              {imageValue.caption}
              {imageValue.attribution && (
                <span className="text-primary/60"> — {imageValue.attribution}</span>
              )}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      const quoteValue = block.value as { quote: string; author: string; source: string };
      return (
        <blockquote className="relative p-12 my-12 overflow-hidden rounded-[3rem] bg-card border border-border text-foreground not-prose">
          <div className="relative z-10">
            <p className="text-3xl font-black leading-tight mb-6">"{quoteValue.quote}"</p>
            {quoteValue.author && (
              <cite className="text-primary font-bold uppercase tracking-widest text-sm not-italic">
                — {quoteValue.author}
                {quoteValue.source && <span className="text-muted-foreground">, {quoteValue.source}</span>}
              </cite>
            )}
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl font-black serif">"</span>
          </div>
        </blockquote>
      );

    case 'video':
      const videoValue = block.value as { video: { url: string; html: string }; caption: string };
      return (
        <figure className="my-12">
          <div
            className="aspect-video rounded-[3rem] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: videoValue.video.html }}
          />
          {videoValue.caption && (
            <figcaption className="text-center mt-4 text-sm text-muted-foreground">
              {videoValue.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list':
      const listValue = block.value as { items: string[]; list_type: 'ul' | 'ol' };
      const ListTag = listValue.list_type;
      return (
        <ListTag className="my-6">
          {listValue.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ListTag>
      );

    case 'code':
      const codeValue = block.value as { language: string; code: string };
      return (
        <pre className="my-8 p-6 bg-zinc-900 text-zinc-100 rounded-2xl overflow-x-auto">
          <code className={`language-${codeValue.language}`}>{codeValue.code}</code>
        </pre>
      );

    case 'cta':
      const ctaValue = block.value as { text: string; url: string; style: 'primary' | 'secondary' | 'success' };
      const ctaStyles = {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
        success: 'bg-green-600 text-white hover:bg-green-700',
      };
      return (
        <div className="my-8 text-center not-prose">
          <a
            href={ctaValue.url}
            className={`inline-block px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all ${ctaStyles[ctaValue.style]}`}
          >
            {ctaValue.text}
          </a>
        </div>
      );

    case 'tweet':
      const tweetValue = block.value as { tweet_url: string };
      return (
        <div className="my-8 flex justify-center">
          <blockquote className="twitter-tweet">
            <a href={tweetValue.tweet_url}>Voir le tweet</a>
          </blockquote>
        </div>
      );

    default:
      return null;
  }
}
