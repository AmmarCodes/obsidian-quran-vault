const fs = require("fs-extra");

const VAULT_PATH = "./Quran/";

const quranJsonPath = require.resolve("quran-json/dist/quran.json");

const surahs = fs.readJsonSync(quranJsonPath);

fs.cpSync(".obsidian", VAULT_PATH + "/.obsidian", { recursive: true });

surahs.forEach((surah) => {
  const surahTitle = surah.transliteration;
  const surahNumber = String(surah.id).padStart(3, "0");
  const surahNumberedTitle = surahNumber + " " + surahTitle;
  const surahPath = `${VAULT_PATH}${surahNumberedTitle}.md`;

  // Surah content
  let content = `---
tags:
 - quran
total_verses: ${surah.total_verses}
aliases:
 - "${surahTitle}"
 - "${surah.name}"
 - "${surahNumber} ${surah.name}"
 - "${surahNumberedTitle}"
---
`;

  // adding Ayahs to the surah's content
  surah.verses.forEach((verse) => {
    content += `# ${verse.id}
${verse.text}

`;
  });
  fs.outputFile(surahPath, content, (err) => {
    if (err) {
      console.log(err);
    }
  });

  // the following will create `index.md` file in each surah folder containing an internal link to each verse
  /**
    let indexContent = `# ${surahTitle}\n\n`;
    [...Array(surah.verses.length)].map((_, i) => {
      // since i will start at 0
      const verseId = i + 1;
      indexContent += `- [[${surahTitle}/${verseId}]]\n`;
    });

    fs.outputFile(`${VAULT_PATH}${surahTitle}/index.md`, indexContent);
    */
});
