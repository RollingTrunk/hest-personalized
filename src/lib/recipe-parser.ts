export type DirectionBlock = {
  type: 'heading' | 'paragraph' | 'step';
  text: string;
  stepNumber?: number;
};

export function parseRecipeDirections(text: string): DirectionBlock[] {
  const lines = text.split('\n');
  const blocks: DirectionBlock[] = [];
  
  // Check if they use explicit Step/Method headings.
  // If they do, we shouldn't inject our own styling numbering badges for steps,
  // as that would result in redundant numbering.
  let hasStepHeadings = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^step\s*\d+/i.test(trimmed) || /^method\s*\d+/i.test(trimmed)) {
      hasStepHeadings = true;
      break;
    }
  }

  let inTipOrNoteSection = false;
  let stepCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Ignore stand-alone visual dividers
    if (/^[-=_]{3,}$/.test(line)) continue;

    const lower = line.toLowerCase();
    const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
    
    let isHeading = false;
    let isTipOrNoteHeading = false;

    // Detect if this line is acting as a heading
    if (/^[-=_]{3,}$/.test(nextLine)) {
      isHeading = true;
      lines[i + 1] = ''; // skip the underline line in the next iteration
      if (lower.includes('tip') || lower.includes('note')) {
        isTipOrNoteHeading = true;
      }
    } else if (/^step\s*\d+/i.test(line) || /^method\s*\d+/i.test(line)) {
      isHeading = true;
    } else if (lower.startsWith('tip:') || lower.startsWith('note:') || lower.startsWith('extra tip:')) {
      isHeading = true;
      isTipOrNoteHeading = true;
    } else if (line.length < 50 && line.endsWith(':')) {
      isHeading = true;
      if (lower.includes('tip') || lower.includes('note')) {
        isTipOrNoteHeading = true;
      }
    } else if (line.length < 50 && !/[.!?]$/.test(line) && /(instructions|directions|method|to serve)/i.test(lower)) {
      isHeading = true;
    }

    if (isHeading) {
      blocks.push({ type: 'heading', text: line });
      if (isTipOrNoteHeading) {
        inTipOrNoteSection = true;
      } else {
        inTipOrNoteSection = false; // Reset if we see a non-tip heading
      }
    } else {
      if (hasStepHeadings || inTipOrNoteSection) {
        // If the recipe provides its own step headings, or we are within a tip section,
        // we just render a regular paragraph.
        blocks.push({ type: 'paragraph', text: line });
      } else {
        // Otherwise, this is a normal step that should get the number badge 
        // (strip manual numbers they might have added to the list item start like "1. ")
        blocks.push({ type: 'step', text: line.replace(/^\d+[\.)]\s+/, ''), stepNumber: stepCounter++ });
      }
    }
  }

  return blocks;
}
