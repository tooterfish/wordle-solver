const {checkGuess, rankChars} = require('../solver')

describe('checkGuess', () => {
  //checkedguess object:
  test('return checkedGuess object with appropriate properties', () => {
    const expected = 
    {
      newGuess: [
        { 'char': expect.any(String), 'match': expect.any(String)},
        { 'char': expect.any(String), 'match': expect.any(String)},
        { 'char': expect.any(String), 'match': expect.any(String)},
        { 'char': expect.any(String), 'match': expect.any(String)},
        { 'char': expect.any(String), 'match': expect.any(String)}
      ],
      isCorrect: expect.any(Boolean)
    }
    const checkedGuess = checkGuess('abcde', 'pilum', true)
    expect(checkedGuess).toEqual(expected)
  })

  test('isWord === false: return a checkedGuess object with all flags set to not-a-word', () => {
    const expected = 
    {
      newGuess: [
        { 'char': expect.any(String), 'match': 'not-a-word'},
        { 'char': expect.any(String), 'match': 'not-a-word'},
        { 'char': expect.any(String), 'match': 'not-a-word'},
        { 'char': expect.any(String), 'match': 'not-a-word'},
        { 'char': expect.any(String), 'match': 'not-a-word'}
      ],
      isCorrect: expect.any(Boolean)
    }
    const checkedGuess = checkGuess('aaaaa', 'pilum', false)
    expect(checkedGuess).toEqual(expected);
  })

  test('isWord === true, perfect match: return a checkedGuess appropriate flags set to match and isCorrect set to true', () => {
    const expected = 
    {
      newGuess: [
        { 'char': 's', 'match': 'match'},
        { 'char': 'a', 'match': 'match'},
        { 'char': 'l', 'match': 'match'},
        { 'char': 'e', 'match': 'match'},
        { 'char': 't', 'match': 'match'}
      ],
      isCorrect: true
    }
    const checkedGuess = checkGuess('salet', 'salet', true)
    expect(checkedGuess).toEqual(expected);
  })

  test('isWord === true, some matches: return a checkedGuess with appropriate flags set to match', () => {
    let word
    let guess
    let expected
    let checkedGuess
    
    //test match at each index
    for (let i = 0; i < 5; i++)
    {
      word = 'aaaaa'
      guess = 'bbbbb'
      word = (word.substring(0,i) + 'c' + word.substring(i+1))
      guess = (guess.substring(0,i) + 'c' + guess.substring(i+1))
      expected = 
      {
        newGuess: [
          { 'char': guess[0], 'match': 'no-match'},
          { 'char': guess[1], 'match': 'no-match'},
          { 'char': guess[2], 'match': 'no-match'},
          { 'char': guess[3], 'match': 'no-match'},
          { 'char': guess[4], 'match': 'no-match'}
        ],
        isCorrect: false
      }
      expected.newGuess[i].match = 'match'
      
      checkedGuess = checkGuess(word, guess, true)
      expect(checkedGuess).toEqual(expected)  
    }

    //all but one match
    word = 'abcde'
    guess = 'abcdg'
    expected = 
    {
      newGuess: [
        { 'char': guess[0], 'match': 'match'},
        { 'char': guess[1], 'match': 'match'},
        { 'char': guess[2], 'match': 'match'},
        { 'char': guess[3], 'match': 'match'},
        { 'char': guess[4], 'match': 'no-match'}
      ],
      isCorrect: false
    }
    checkedGuess = checkGuess(word, guess, true)
    expect(checkedGuess).toEqual(expected)
  })

  test('isWord === true, some matches with repeated chars: return a checkedGuess with appropriate flags set to match', () => {
    let word
    let guess
    let expected
    let checkedGuess

    word = 'abcde'
    guess = 'abcab'
    expected = 
    {
      newGuess: [
        { 'char': guess[0], 'match': 'match'},
        { 'char': guess[1], 'match': 'match'},
        { 'char': guess[2], 'match': 'match'},
        { 'char': guess[3], 'match': 'no-match'},
        { 'char': guess[4], 'match': 'no-match'}
      ],
      isCorrect: false
    }
    checkedGuess = checkGuess(word, guess, true)
    expect(checkedGuess).toEqual(expected)
    
    word = 'abcde'
    guess = 'decde'
    expected = 
    {
      newGuess: [
        { 'char': guess[0], 'match': 'no-match'},
        { 'char': guess[1], 'match': 'no-match'},
        { 'char': guess[2], 'match': 'match'},
        { 'char': guess[3], 'match': 'match'},
        { 'char': guess[4], 'match': 'match'}
      ],
      isCorrect: false
    }
    checkedGuess = checkGuess(word, guess, true)
    expect(checkedGuess).toEqual(expected)
  })

  test('isWord === true, some partial-matches: return a checkedGuess with appropriate flags set to partial-match', () => {
    let word
    let guess
    let expected
    let checkedGuess
    
    //test partial match at each index
    for (let i = 0; i < 5; i++)
    {
      let offset = i + 1;
      if (offset === 5) offset = 0;
      word = 'aaaaa'
      guess = 'bbbbb'
      word = (word.substring(0,i) + 'c' + word.substring(i+1))
      guess = (guess.substring(0,offset) + 'c' + guess.substring(offset+1))
      expected = 
      {
        newGuess: [
          { 'char': guess[0], 'match': 'no-match'},
          { 'char': guess[1], 'match': 'no-match'},
          { 'char': guess[2], 'match': 'no-match'},
          { 'char': guess[3], 'match': 'no-match'},
          { 'char': guess[4], 'match': 'no-match'}
        ],
        isCorrect: false
      }
      expected.newGuess[offset].match = 'partial-match'
      
      checkedGuess = checkGuess(word, guess, true)
      expect(checkedGuess).toEqual(expected)  
    }

    word = 'abcde'
    guess = 'deabc'
    expected = 
    {
      newGuess: [
        { 'char': guess[0], 'match': 'partial-match'},
        { 'char': guess[1], 'match': 'partial-match'},
        { 'char': guess[2], 'match': 'partial-match'},
        { 'char': guess[3], 'match': 'partial-match'},
        { 'char': guess[4], 'match': 'partial-match'}
      ],
      isCorrect: false
    }
    checkedGuess = checkGuess(word, guess, true)
    expect(checkedGuess).toEqual(expected)  
    })
  })

  describe('rankChars', () => {
    test('given an array of words return a charRankings object', () => {
      const words = ['hello', 'there', 'general', 'kenobi']
      const expected = {
          'a' : expect.any(Array),
          'b' : expect.any(Array),
          'c' : expect.any(Array),
          'd' : expect.any(Array),
          'e' : expect.any(Array),
          'f' : expect.any(Array),
          'g' : expect.any(Array),
          'h' : expect.any(Array),
          'i' : expect.any(Array),
          'j' : expect.any(Array),
          'k' : expect.any(Array),
          'l' : expect.any(Array),
          'm' : expect.any(Array),
          'n' : expect.any(Array),
          'o' : expect.any(Array),
          'p' : expect.any(Array),
          'q' : expect.any(Array),
          'r' : expect.any(Array),
          's' : expect.any(Array),
          't' : expect.any(Array),
          'u' : expect.any(Array),
          'v' : expect.any(Array),
          'w' : expect.any(Array),
          'x' : expect.any(Array),
          'y' : expect.any(Array),
          'z' : expect.any(Array)
        }
        const charRankings = rankChars(words)
        expect(charRankings).toEqual(expected)
    })

    test('given an array of words return a charRank object with appropriate rankings', () => {
      let words
      let expected
      let charRankings

      words = ['abcde']
      expected = {
        'a' : [1,0,0,0,0,1],
        'b' : [0,1,0,0,0,1],
        'c' : [0,0,1,0,0,1],
        'd' : [0,0,0,1,0,1],
        'e' : [0,0,0,0,1,1],
        'f' : [0,0,0,0,0,0],
        'g' : [0,0,0,0,0,0],
        'h' : [0,0,0,0,0,0],
        'i' : [0,0,0,0,0,0],
        'j' : [0,0,0,0,0,0],
        'k' : [0,0,0,0,0,0],
        'l' : [0,0,0,0,0,0],
        'm' : [0,0,0,0,0,0],
        'n' : [0,0,0,0,0,0],
        'o' : [0,0,0,0,0,0],
        'p' : [0,0,0,0,0,0],
        'q' : [0,0,0,0,0,0],
        'r' : [0,0,0,0,0,0],
        's' : [0,0,0,0,0,0],
        't' : [0,0,0,0,0,0],
        'u' : [0,0,0,0,0,0],
        'v' : [0,0,0,0,0,0],
        'w' : [0,0,0,0,0,0],
        'x' : [0,0,0,0,0,0],
        'y' : [0,0,0,0,0,0],
        'z' : [0,0,0,0,0,0]
      }
      charRankings = rankChars(words)
      expect(charRankings).toEqual(expected)

      words = ['abcde', 'abcde', 'bcdef']
      expected = {
        'a' : [2,0,0,0,0,2],
        'b' : [1,2,0,0,0,3],
        'c' : [0,1,2,0,0,3],
        'd' : [0,0,1,2,0,3],
        'e' : [0,0,0,1,2,3],
        'f' : [0,0,0,0,1,1],
        'g' : [0,0,0,0,0,0],
        'h' : [0,0,0,0,0,0],
        'i' : [0,0,0,0,0,0],
        'j' : [0,0,0,0,0,0],
        'k' : [0,0,0,0,0,0],
        'l' : [0,0,0,0,0,0],
        'm' : [0,0,0,0,0,0],
        'n' : [0,0,0,0,0,0],
        'o' : [0,0,0,0,0,0],
        'p' : [0,0,0,0,0,0],
        'q' : [0,0,0,0,0,0],
        'r' : [0,0,0,0,0,0],
        's' : [0,0,0,0,0,0],
        't' : [0,0,0,0,0,0],
        'u' : [0,0,0,0,0,0],
        'v' : [0,0,0,0,0,0],
        'w' : [0,0,0,0,0,0],
        'x' : [0,0,0,0,0,0],
        'y' : [0,0,0,0,0,0],
        'z' : [0,0,0,0,0,0]
      }
      charRankings = rankChars(words)
      expect(charRankings).toEqual(expected)
    })

    test('given an array of words and an array of excluded chararacters return a charRank object with rankings of excluded characters at 0', () => {
      let words
      let expected
      let excluded
      let charRankings

      words = ['abcde']
      excluded = ['a']
      expected = {
        'a' : [0,0,0,0,0,0],
        'b' : [0,1,0,0,0,1],
        'c' : [0,0,1,0,0,1],
        'd' : [0,0,0,1,0,1],
        'e' : [0,0,0,0,1,1],
        'f' : [0,0,0,0,0,0],
        'g' : [0,0,0,0,0,0],
        'h' : [0,0,0,0,0,0],
        'i' : [0,0,0,0,0,0],
        'j' : [0,0,0,0,0,0],
        'k' : [0,0,0,0,0,0],
        'l' : [0,0,0,0,0,0],
        'm' : [0,0,0,0,0,0],
        'n' : [0,0,0,0,0,0],
        'o' : [0,0,0,0,0,0],
        'p' : [0,0,0,0,0,0],
        'q' : [0,0,0,0,0,0],
        'r' : [0,0,0,0,0,0],
        's' : [0,0,0,0,0,0],
        't' : [0,0,0,0,0,0],
        'u' : [0,0,0,0,0,0],
        'v' : [0,0,0,0,0,0],
        'w' : [0,0,0,0,0,0],
        'x' : [0,0,0,0,0,0],
        'y' : [0,0,0,0,0,0],
        'z' : [0,0,0,0,0,0]
      }
      charRankings = rankChars(words, excluded)
      expect(charRankings).toEqual(expected)

      words = ['abcde', 'abcde', 'bcdef']
      excluded = ['a', 'b']
      expected = {
        'a' : [0,0,0,0,0,0],
        'b' : [0,0,0,0,0,0],
        'c' : [0,1,2,0,0,3],
        'd' : [0,0,1,2,0,3],
        'e' : [0,0,0,1,2,3],
        'f' : [0,0,0,0,1,1],
        'g' : [0,0,0,0,0,0],
        'h' : [0,0,0,0,0,0],
        'i' : [0,0,0,0,0,0],
        'j' : [0,0,0,0,0,0],
        'k' : [0,0,0,0,0,0],
        'l' : [0,0,0,0,0,0],
        'm' : [0,0,0,0,0,0],
        'n' : [0,0,0,0,0,0],
        'o' : [0,0,0,0,0,0],
        'p' : [0,0,0,0,0,0],
        'q' : [0,0,0,0,0,0],
        'r' : [0,0,0,0,0,0],
        's' : [0,0,0,0,0,0],
        't' : [0,0,0,0,0,0],
        'u' : [0,0,0,0,0,0],
        'v' : [0,0,0,0,0,0],
        'w' : [0,0,0,0,0,0],
        'x' : [0,0,0,0,0,0],
        'y' : [0,0,0,0,0,0],
        'z' : [0,0,0,0,0,0]
      }
      charRankings = rankChars(words, excluded)
      expect(charRankings).toEqual(expected)
    })
  })