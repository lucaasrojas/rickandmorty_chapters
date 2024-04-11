import axios from "axios";
const baseUrl = "https://rickandmortyapi.com/api";
const instance = axios.create({ baseURL: baseUrl });
export const getCharacters = async () => {
  return await instance.get("/character");
};

export const getCharacterById = async (id: number) => {
  return instance.get(`/character/${id}`).then(async (res) => {
    const episodes = await axios.all(
      res.data.episode.map((episodeLink) => axios.get(episodeLink))
    );
    res.data["episodes"] = episodes.map((el) => el.data);
    return res.data;
  });
};
