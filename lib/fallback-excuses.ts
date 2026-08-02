import type { Category, Tone } from "./types";
import { pickRandom } from "./utils";

type FallbackLibrary = Record<Category, Record<Tone, readonly string[]>>;

const SHARED_BY_TONE: Record<Tone, readonly string[]> = {
  believable: [
    "Something unexpected has come up at home, and I need to stay here to deal with it. I’m sorry for the late notice.",
    "I won’t be able to join as planned. A timing conflict appeared this afternoon and I need to sort it out first.",
    "I have to bow out today. A household matter needs attention and I can’t leave it hanging.",
    "I’m afraid I need to cancel. An unexpected errand has taken longer than expected and I’m still tied up.",
    "I can’t make it after all. Something came up that I need to handle in person this evening.",
  ],
  corporate: [
    "Due to an unforeseen scheduling conflict involving several competing priorities, I’ll need to step back from today’s commitment.",
    "I’m unable to proceed as planned owing to a cross-priority dependency that requires my immediate attention.",
    "Please accept my regrets. I need to reallocate capacity to an urgent internal matter and will be unavailable.",
    "A last-minute alignment issue has emerged on my side. I’ll need to decline and reconnect once it’s resolved.",
    "I’m stepping out of today’s plan to address a time-sensitive operational conflict. Appreciate your understanding.",
  ],
  dramatic: [
    "I had every intention of attending, but the day has taken a sharp and deeply personal turn involving the ceiling.",
    "I cannot proceed. What began as an ordinary afternoon has become a quiet domestic crisis of considerable weight.",
    "Fate intervened with unusual firmness. I must remain where I am and confront what the hallway has become.",
    "I am unable to join you. The afternoon has rearranged itself into something I cannot responsibly ignore.",
    "I must withdraw. Events at home have assumed a gravity that would make my presence elsewhere unthinkable.",
  ],
  unnecessarily_detailed: [
    "The technician arrived at 16:52, looked at the appliance, sighed, and returned to his vehicle for what he described only as “the other cable.”",
    "I spent twenty minutes locating the correct screwdriver, nine minutes discovering it was the wrong size, and the remainder realising the hinge was never the issue.",
    "I had packed my bag, locked the door, unlocked it again for a charger, and then discovered the hallway light switch had entered a philosophical disagreement with itself.",
    "At 14:10 I attempted a quick household fix. By 14:37 I was holding a part I cannot name and reading a manual printed in 2009.",
    "I measured twice, cut once, and somehow still ended up with a piece of furniture that faces the wrong direction with quiet conviction.",
  ],
  completely_unhinged: [
    "I can’t attend today. A pigeon has identified me as its emergency contact.",
    "I won’t make it. My kettle has begun issuing soft policy statements and I feel obliged to hear them out.",
    "I have to cancel. The hallway has developed a weather system and I’m currently under advisory.",
    "I’m unavailable. A houseplant has called an emergency meeting and attendance appears mandatory.",
    "I can’t join. My shadow is running approximately four minutes behind and I’d rather not leave without it.",
  ],
};

const CATEGORY_BY_TONE: FallbackLibrary = {
  meeting: {
    believable: [
      "I won’t be able to make the meeting. Something unexpected has come up at home and I need to stay put.",
      "Please go ahead without me. A last-minute conflict means I can’t join as planned.",
      ...SHARED_BY_TONE.believable.slice(0, 3),
    ],
    corporate: [
      "Due to an unforeseen scheduling conflict, I’ll need to step back from today’s meeting and catch up asynchronously.",
      "I’m unable to attend owing to a competing priority that requires immediate focus. Please circulate notes if useful.",
      ...SHARED_BY_TONE.corporate.slice(0, 3),
    ],
    dramatic: [
      "I cannot face the meeting. The day has taken a sharp turn involving furniture that refuses to remain furniture.",
      ...SHARED_BY_TONE.dramatic,
    ],
    unnecessarily_detailed: [
      "I had opened the calendar invite, selected a shirt, and then discovered the printer had jammed in a way that somehow involved the Wi-Fi.",
      ...SHARED_BY_TONE.unnecessarily_detailed,
    ],
    completely_unhinged: [
      "I can’t join the meeting. My stapler has declared independence and is demanding recognition.",
      ...SHARED_BY_TONE.completely_unhinged,
    ],
  },
  deadline: {
    believable: [
      "I’m going to miss the deadline. An unexpected issue came up that I need to resolve before I can finish properly.",
      ...SHARED_BY_TONE.believable,
    ],
    corporate: [
      "I’ll need to request a short extension due to an unforeseen dependency that is blocking completion.",
      ...SHARED_BY_TONE.corporate,
    ],
    dramatic: [
      "The deadline and I have reached an impasse. Domestic events have claimed the remaining hours with unusual force.",
      ...SHARED_BY_TONE.dramatic,
    ],
    unnecessarily_detailed: [
      "I drafted the outline, saved three versions, and then spent forty minutes recovering a file that had renamed itself in protest.",
      ...SHARED_BY_TONE.unnecessarily_detailed,
    ],
    completely_unhinged: [
      "I can’t meet the deadline. The document keeps rearranging its own paragraphs when I’m not looking.",
      ...SHARED_BY_TONE.completely_unhinged,
    ],
  },
  social_event: {
    believable: [
      "I won’t be able to make it tonight. Something unexpected has come up at home and I need to stay here.",
      ...SHARED_BY_TONE.believable,
    ],
    corporate: [
      "Regrettably I need to decline. A last-minute personal scheduling conflict has removed my availability for this evening.",
      ...SHARED_BY_TONE.corporate,
    ],
    dramatic: [
      "I had every intention of attending, but the evening has become a matter of quiet domestic consequence.",
      ...SHARED_BY_TONE.dramatic,
    ],
    unnecessarily_detailed: [
      "I ironed a shirt, packed a gift bag, and then spent twenty-two minutes negotiating with a latch that has chosen this night to reinvent the concept of closed.",
      ...SHARED_BY_TONE.unnecessarily_detailed,
    ],
    completely_unhinged: [
      "I can’t make dinner. My hallway has developed a weather system.",
      ...SHARED_BY_TONE.completely_unhinged,
    ],
  },
  exercise: {
    believable: [
      "I’m going to skip today’s session. Something unexpected came up and I need to stay home to deal with it.",
      ...SHARED_BY_TONE.believable,
    ],
    corporate: [
      "I’ll need to deprioritise today’s workout due to an unforeseen personal operational issue.",
      ...SHARED_BY_TONE.corporate,
    ],
    dramatic: [
      "I cannot exercise today. The body is willing, but the household has staged a decisive intervention.",
      ...SHARED_BY_TONE.dramatic,
    ],
    unnecessarily_detailed: [
      "I found my trainers, filled a water bottle, and then spent eighteen minutes untangling headphones that appear to have nested overnight.",
      ...SHARED_BY_TONE.unnecessarily_detailed,
    ],
    completely_unhinged: [
      "I can’t work out today. My yoga mat has filed for emotional leave.",
      ...SHARED_BY_TONE.completely_unhinged,
    ],
  },
  phone_call: {
    believable: [
      "I can’t take the call right now. Something unexpected has come up and I need a few minutes to sort it out.",
      ...SHARED_BY_TONE.believable,
    ],
    corporate: [
      "I’ll need to reschedule the call due to an unforeseen conflict that requires my attention immediately.",
      ...SHARED_BY_TONE.corporate,
    ],
    dramatic: [
      "I cannot speak just now. The afternoon has assumed a tone that makes conversation elsewhere inappropriate.",
      ...SHARED_BY_TONE.dramatic,
    ],
    unnecessarily_detailed: [
      "I answered on the second ring earlier, put the phone down carefully, and then discovered the charger cable had entered a long-standing dispute with the socket.",
      ...SHARED_BY_TONE.unnecessarily_detailed,
    ],
    completely_unhinged: [
      "I can’t talk. My ringtone has begun composing replies on my behalf and they are getting ambitious.",
      ...SHARED_BY_TONE.completely_unhinged,
    ],
  },
  something_else: {
    believable: SHARED_BY_TONE.believable,
    corporate: SHARED_BY_TONE.corporate,
    dramatic: SHARED_BY_TONE.dramatic,
    unnecessarily_detailed: SHARED_BY_TONE.unnecessarily_detailed,
    completely_unhinged: SHARED_BY_TONE.completely_unhinged,
  },
};

export function getFallbackExcuse(category: Category, tone: Tone): string {
  const options = CATEGORY_BY_TONE[category][tone];
  return pickRandom(options);
}

export function getFallbackLibraryStats(): {
  total: number;
  perToneMinimum: number;
} {
  const tones: Tone[] = [
    "believable",
    "corporate",
    "dramatic",
    "unnecessarily_detailed",
    "completely_unhinged",
  ];

  let total = 0;
  let perToneMinimum = Number.POSITIVE_INFINITY;

  for (const tone of tones) {
    let toneCount = 0;
    for (const category of Object.keys(CATEGORY_BY_TONE) as Category[]) {
      toneCount += CATEGORY_BY_TONE[category][tone].length;
    }
    total += toneCount;
    perToneMinimum = Math.min(perToneMinimum, toneCount);
  }

  return { total, perToneMinimum };
}

export { CATEGORY_BY_TONE, SHARED_BY_TONE };
