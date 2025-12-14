import { useMemo, useState } from "react";

interface UseExpandableTextOptions {
  maxLength?: number;
  maxLines?: number;
}

export const useExpandableText = (
  text: string,
  options: UseExpandableTextOptions = {}
) => {
  const { maxLength = 300 } = options;
  const [isExpanded, setIsExpanded] = useState(false);

  const { displayText, needsTruncation } = useMemo(() => {
    if (!text) {
      return { displayText: '', needsTruncation: false };
    }

    const shouldTruncate = text.length > maxLength;
    
    if (!shouldTruncate || isExpanded) {
      return { displayText: text, needsTruncation: shouldTruncate };
    }

    let truncateAt = maxLength;
    const substring = text.substring(0, maxLength);
    const lastSpace = substring.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      truncateAt = lastSpace;
    }

    return {
      displayText: text.substring(0, truncateAt) + '...',
      needsTruncation: true,
    };
  }, [text, maxLength, isExpanded]);

  const toggle = () => setIsExpanded(prev => !prev);

  return {
    displayText,
    isExpanded,
    needsTruncation,
    toggle,
  };
};