"use client";

import { ReactNode } from "react";

interface FormattedTextProps {
  text: string;
  containerClassName?: string;
}

/**
 * FormattedText
 *
 * A simple component for rendering paragraphs and bullet lists with
 * per-word reveal effects and Markdown-style bold formatting.
 *
 * Usage:
 * <FormattedText
 *   text="This is a paragraph with **bold** text.\n\n&bull; First item\n&bull; Second item"
 *   containerClassName="custom-wrapper"
 * />
 *
 * Notes:
 * - Pass plain text in the `text` prop.
 * - Use `**bold**` to wrap text that should render in a `<strong>` tag.
 * - Use `&bull;` at the start of each line to render a bullet list.
 * - Separate paragraphs with a blank line (`\n\n`).
 */
export function FormattedText({
  text,
  containerClassName = "add-24-margin-not-last fast-stagger-reveal-container",
}: FormattedTextProps) {
  // Function to split to per-word fast-stagger reveal with bold support
  const formatToFastWords = (textContent: string): ReactNode[] => {
    const tokens = textContent.match(/(\*\*.*?\*\*|[^\s]+)/g) || [];

    return tokens.map((token, tokenIndex) => {
      const isBold = token.startsWith("**") && token.endsWith("**");
      const textValue = isBold ? token.slice(2, -2) : token;

      return (
        <span key={tokenIndex} className="paragraph-text">
          <span className="fastword">
            {isBold ? (
              <strong className="text-white">{textValue}</strong>
            ) : (
              textValue
            )}
            &nbsp;
          </span>
        </span>
      );
    });
  };

  return (
    <div className={containerClassName}>
      {text.split("\n\n").map((para, index) => {
        if (para.includes("&bull;")) {
          // It's a bullet list
          const items = para.split("\n").filter((item) => item.trim());
          return (
            <ul key={index} className="space-y-2 pl-9">
              {items.map((item, itemIndex) => {
                const cleanItem = item.replace(/^&bull;\s*/, "");
                return (
                  <li key={itemIndex} className="relative pl-4">
                    <span className="absolute left-0 top-0 fastword">
                      &bull;
                    </span>
                    &nbsp;&nbsp;{formatToFastWords(cleanItem)}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          return <p key={index}>{formatToFastWords(para)}</p>;
        }
      })}
    </div>
  );
}
