import { HTMLAttributes, createElement } from "react";
import sanitize from "sanitize-html";

type SanitizeHTMLProps = {
  html: string;
  tag: string;
} & HTMLAttributes<HTMLElement>;

export const SanitizeHTML = ({ html, tag, ...rest }: SanitizeHTMLProps) => {
  const sanitizedHTML = sanitize(html, {
    // HTML tags that won't be sanitized/removed
    allowedTags: [],
  });

  return createElement(tag, { ...rest }, sanitizedHTML);
};
