# Narration for "The story, told" (video summary)

The video summary plays recorded narration when it finds audio files for a book, and falls back to the browser voice when it doesn't. This folder has the exact script, split one line per audio file.

- `scripts/<book>.txt`: one book's lines, each with its file name.
- `all-lines.csv`: every line for all 31 books (215 lines), for batch generation.
- `scripts.json`: the same data, machine-readable.

## Where the audio goes

```
assets/narration/<book-folder>/01.mp3
assets/narration/<book-folder>/02.mp3
…
```

For example: `assets/narration/what-we-did-to-survive/01.mp3`. The folder name is listed at the top of each script file and in the `folder` column of the CSV. The video plays each file in order, times the subtitles to the real audio, and keeps the background video and cast in step. Refresh the page after adding files; to update the single shareable file, run `python3 build-standalone.py`.

## Voice direction (what to aim for)

A soft, warm, intimate storytelling voice, as if telling a friend about a book you loved late in the evening.

- **Tone:** gentle, close to the mic, a little breathy, with a smile in the voice. Calm rather than "presenter".
- **Pace:** unhurried, around 140–150 words per minute. Let commas breathe; rest at full stops.
- **Emotion:** subtle. Lean in slightly for the tense moments and lift a little on "How does it end?". No dramatic acting.
- **Consistency:** the same voice and settings for every line and every book.

## Generating with ElevenLabs (recommended)

1. In the **Voice Library**, search for terms like *soft narration*, *calm storytelling*, *audiobook*, *warm* or *intimate*, and preview a few with line 03 of a book. Pick a stock or library voice you're licensed to use. Don't clone or imitate a real person's voice.
2. Use the **Eleven Multilingual v2** model (most natural for narration).
3. Suggested settings: **Stability 35–45%** (more expressive), **Similarity 70–80%**, **Style 0–15%** (keep it subtle), **Speaker boost on**.
4. Generate each line from the script and download it as **MP3**, named exactly as listed (`01.mp3`, `02.mp3`…). For lots of books, ElevenLabs' Studio/Projects or the API can batch from `all-lines.csv`.
5. Drop the files into `assets/narration/<book-folder>/`.

Check that your ElevenLabs plan allows commercial use before using the audio publicly.

## Other services

Microsoft Azure, Google Cloud and OpenAI text-to-speech also work; any MP3 per line, named and placed as above, will play. In Azure, a neural voice such as *Ava* or *Jenny* with a slightly slower rate (`<prosody rate="-8%">`) gives a similar soft read.
