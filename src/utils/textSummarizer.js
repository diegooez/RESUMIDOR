const natural = require('natural');
const compromise = require('compromise');

// Configurar el Tokenizer de la biblioteca natural
const tokenizer = new natural.WordTokenizer();

const summarizeText = (text) => {
  // Tokenizar el texto en palabras
  const words = tokenizer.tokenize(text);

  // Calcular la frecuencia de cada palabra
  const wordFreq = {};
  words.forEach((word) => {
    const lowerWord = word.toLowerCase();
    if (!stopwords.includes(lowerWord)) {
      wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
    }
  });

  // Obtener las oraciones del texto
  const sentences = compromise(text).sentences().out('array');

  // Calcular la puntuación de cada oración basada en la frecuencia de palabras
  const sentenceScores = sentences.map((sentence) => {
    const wordsInSentence = tokenizer.tokenize(sentence);
    const sentenceScore = wordsInSentence.reduce((acc, word) => {
      const lowerWord = word.toLowerCase();
      return acc + (wordFreq[lowerWord] || 0);
    }, 0);
    return { sentence, score: sentenceScore };
  });

  // Ordenar las oraciones por puntuación de mayor a menor
  const sortedSentences = sentenceScores.sort((a, b) => b.score - a.score);

  // Seleccionar las oraciones más relevantes (puedes ajustar este valor según tus necesidades)
  const relevantSentences = sortedSentences.slice(0, Math.min(sortedSentences.length, 2));

  // Unir las oraciones seleccionadas para obtener el resumen
  const summarizedText = relevantSentences.map((sentenceObj) => sentenceObj.sentence).join(' ');

  return summarizedText;
};

// Lista de palabras comunes que no aportan mucho significado al resumen
const stopwords = ['a', 'an', 'the', 'is', 'are', 'and', 'of', 'in', 'to', 'for', 'on', 'with', 'as', 'by', 'at', 'from', 'it', 'that'];

module.exports = { summarizeText };
