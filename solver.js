function checkGuess(w, g, isWord) {
  const word = [...w]
  const guess = [...g]
  const checkedGuess = []
  let isCorrect = false
  
  //if guess is not a word
  if (!isWord) {
    for (let i = 0; i < guess.length; i++) {
      checkedGuess[i] = {char: guess[i], match: 'not-a-word'}
    }
    return {newGuess: checkedGuess, isCorrect: isCorrect}
  }

  //check full matches
  let matches = 0
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      checkedGuess[i] = {char: guess[i], match: 'match'}
      guess[i] = ' '
      word[i] = ' '
      matches += 1
    }
  }

 // if all characters are full matches no need to check for partial-matches
 if (matches === word.length) {
  isCorrect = true
  return {newGuess: checkedGuess, isCorrect: isCorrect}
 }

 //check partial matches
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] !== ' ') {
     const partialMatchIndex = word.indexOf(guess[i])
     if (partialMatchIndex !== -1) {
       checkedGuess[i] = {char: guess[i], match: 'partial-match'}
       guess[i] = ' '
       word[partialMatchIndex] = ' '
     }
     else {
       checkedGuess[i] = {char: guess[i], match: 'no-match'}
     }
   }
 }
 return {newGuess: checkedGuess, isCorrect: isCorrect}
}

//iterates an array of strings of length 5 and
//ranks the appearance of each character at each position
//excluding characters in the passed in excludedArray
function rankChars(words, excludedArray = []) {

  excludedSet = new Set(excludedArray)

  const charRankings = {
    'a' : [0,0,0,0,0],
    'b' : [0,0,0,0,0],
    'c' : [0,0,0,0,0],
    'd' : [0,0,0,0,0],
    'e' : [0,0,0,0,0],
    'f' : [0,0,0,0,0],
    'g' : [0,0,0,0,0],
    'h' : [0,0,0,0,0],
    'i' : [0,0,0,0,0],
    'j' : [0,0,0,0,0],
    'k' : [0,0,0,0,0],
    'l' : [0,0,0,0,0],
    'm' : [0,0,0,0,0],
    'n' : [0,0,0,0,0],
    'o' : [0,0,0,0,0],
    'p' : [0,0,0,0,0],
    'q' : [0,0,0,0,0],
    'r' : [0,0,0,0,0],
    's' : [0,0,0,0,0],
    't' : [0,0,0,0,0],
    'u' : [0,0,0,0,0],
    'v' : [0,0,0,0,0],
    'w' : [0,0,0,0,0],
    'x' : [0,0,0,0,0],
    'y' : [0,0,0,0,0],
    'z' : [0,0,0,0,0]
  }
  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      charRankings[char][i] += 1
    }
  }
  return charRankings  
}

//assign a score to each word in word list based on charRankings
//return the top ranked words
function findTopWords(charRankings, words) {
  let topWord = ''
  let topRank = 0
  for (const word of words) {
    let currentRank = 0
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      // currentRank += charRankings[char][i]
      currentRank += Math.max(...charRankings[char])
    }
    if (currentRank > topRank) {
      topRank = currentRank
      topWord = word
    }
  }
  return topWord
}

module.exports = {checkGuess, rankChars, findTopWords}