const getWord = async (/** @type {any} */ word)=>{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();
  return data;
}

export default getWord;