import axios from "axios"

export const fetchWordData = async (word: string) => {
  const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

  return response.data
}