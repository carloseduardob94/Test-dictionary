import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); //1h de cache

export class DictionaryService {
  async fetchWord(term: string) {
    const cacheKey = `word:${term}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);

    if (!response.ok) {
      throw new Error("Failed to fetch word");
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  }
}

export const dictionaryService = new DictionaryService();