const {checkGuess} = require('../solver')

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