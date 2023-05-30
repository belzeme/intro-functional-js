const array = ["oops", "gasp", "shout", "sun"];
{
  // Imperative
  const censor = (words: string[]): string[] => {
    const filtered: string[] = [];
    for (let i = 0; ({ length } = words); i += 1) {
      const word = words[i];
      if (word.length !== 4) filtered.push(word);
    }
    return filtered;
  };
  const startsWithS = (words: string[]) => {
    const filtered: string[] = [];
    for (let i = 0; ({ length } = words); i += 1) {
      const word = words[i];
      if (word.startsWith("s")) filtered.push(word);
    }
    return filtered;
  };
}

{
  // Functional
  const filter = (fn: (word: string) => boolean, words: string[]) => words.reduce((filtered, word) => fn(word) ? filtered.concat(word) : filtered, [] as string[]);
  const censor = (words: string[]) => filter((word: string) => word.length !== 4, words);
  const startsWithS = (words: string[]) => filter((word: string) => word.startsWith('s'), words);
}

{
  // Functional and types
  type FilterPredicate = (word: string) => boolean;
  const filter = (fn: FilterPredicate, words: string[]) => words.reduce((filtered, word) => fn(word) ? filtered.concat(word) : filtered, [] as string[]);
  const censor = (words: string[]) => filter((word: string) => word.length !== 4, words);
  const startsWithS = (words: string[]) => filter((word: string) => word.startsWith('s'), words);
}
