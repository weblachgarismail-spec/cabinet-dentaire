import { intents, type Intent } from "@/data/chatbot-knowledge";

const DETAILS_MAP: Record<string, string> = {
  whitening: "whitening_details",
  implants: "implants_details",
  orthodontics: "orthodontics_details",
  dental_cleaning: "dental_cleaning_details",
  emergency: "emergency_details",
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter(Boolean);
}

function stem(word: string): string {
  return word.replace(/(?:ment|tion|sion|eur|euse|age|ure|ette|ien|ienne|able|ible)$/, "")
             .replace(/[sz]$/, "")
             .replace(/ant$/, "")
             .replace(/[ei]r$/, "")
             .replace(/[eè]s$/, "")
             .replace(/e$/, "");
}

function isFollowUp(message: string): boolean {
  const followUps = ["plus", "encore", "détails", "detail", "davantage", "autre", "aussi", "et", "alors", "suivant", "oui", "d accord", "ok", "d'accord"];
  const tokens = tokenize(message);
  return tokens.length <= 3 && tokens.some((t) => followUps.includes(t));
}

function matchIntent(message: string, locale: string, lastIntentId?: string): Intent {
  const tokens = tokenize(message);
  if (tokens.length === 0) return getDefault(locale);

  if (isFollowUp(message) && lastIntentId) {
    const detailId = DETAILS_MAP[lastIntentId];
    if (detailId) {
      const detailIntent = intents.find((i) => i.id === detailId);
      if (detailIntent) return detailIntent;
    }
    const lastIntent = intents.find((i) => i.id === lastIntentId);
    if (lastIntent) return lastIntent;
  }

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    if (intent.id === "default") continue;
    const keywords = locale === "ar" ? intent.keywordsAr : intent.keywords;
    let score = 0;
    for (const kw of keywords) {
      const kwTokens = tokenize(kw);
      for (const token of tokens) {
        const tokenStem = stem(token);
        if (kwTokens.some((kt) => {
          const ktStem = stem(kt);
          return token.includes(kt) || kt.includes(token) ||
                 tokenStem.includes(ktStem) || ktStem.includes(tokenStem);
        })) {
          score++;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (best && bestScore > 0) return best;
  return getDefault(locale);
}

function getDefault(locale: string): Intent {
  return intents.find((i) => i.id === "default")!;
}

export type ChatContext = {
  lastIntentId?: string;
};

export function getResponse(
  message: string,
  locale: string,
  context?: ChatContext,
): {
  response: string;
  suggestions: string[];
  context: ChatContext;
} {
  const intent = matchIntent(message, locale, context?.lastIntentId);
  return {
    response: locale === "ar" ? intent.responseAr : intent.response,
    suggestions: locale === "ar" ? intent.suggestionsAr ?? [] : intent.suggestions ?? [],
    context: { lastIntentId: intent.id },
  };
}
