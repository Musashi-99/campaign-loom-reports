type WordItem = { word: string; count: number };

type Props = {
  words: WordItem[];
  minFontPx?: number;
  maxFontPx?: number;
};

export default function WordCloud({ words, minFontPx = 12, maxFontPx = 36 }: Props) {
  if (!Array.isArray(words) || words.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No words available</div>
    );
  }

  const counts = words.map((w) => w.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  const scale = (count: number) => {
    if (maxCount === minCount) return (minFontPx + maxFontPx) / 2;
    const ratio = (count - minCount) / (maxCount - minCount);
    return Math.round(minFontPx + ratio * (maxFontPx - minFontPx));
  };

  const sorted = [...words].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-wrap gap-3">
      {sorted.map((w, idx) => (
        <span
          key={`${w.word}-${idx}`}
          className="select-none"
          style={{
            fontSize: `${scale(w.count)}px`,
            lineHeight: 1.2,
          }}
        >
          {w.word}
        </span>
      ))}
    </div>
  );
}


