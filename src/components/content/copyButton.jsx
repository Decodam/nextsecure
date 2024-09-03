"use client";

import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { useState } from 'react';

const CopyButton = ({ textToCopy, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (title) {
    return (
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-x-2 transition border hover:bg-muted/40 text-sm p-1 ps-3 rounded-full"
      >
        {title}
        <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
          {copied ? <ClipboardCheckIcon className="flex-shrink-0 w-4 h-4" /> : <ClipboardIcon className="flex-shrink-0 w-4 h-4" />}
        </span>
      </button>
    );
  } else {
    return (
      <button
        onClick={copyToClipboard}
        className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/15 transition font-semibold text-sm"
      >
        <span className="">
          {copied ? <ClipboardCheckIcon className="flex-shrink-0 w-4 h-4" /> : <ClipboardIcon className="flex-shrink-0 w-4 h-4" />}
        </span>
      </button>
    )
  }
};

export default CopyButton;
