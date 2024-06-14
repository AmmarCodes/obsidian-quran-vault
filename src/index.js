const fs = require("fs-extra");

const VAULT_PATH = "./Quran/";

const quranJsonPath = require.resolve("quran-json/dist/quran.json");

const surahs = fs.readJsonSync(quranJsonPath);

surahs.forEach((surah) => {
  const surahTitle = surah.transliteration;
  const surahFolderPath = `${VAULT_PATH}${surahTitle}`;
  fs.ensureDir(surahFolderPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    // creating files inside directory
    surah.verses.forEach((verse) => {
      const verseFilePath = `${surahFolderPath}/${verse.id}.md`;
      const content = `---
tags:
 - quran
aliases:
 - "${surahTitle}"
---

> ${verse.text}
`;
      fs.outputFile(verseFilePath, content, (err) => {
        if (err) {
          console.log(err);
        }
      });
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
});
