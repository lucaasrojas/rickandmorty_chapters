"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCharacterById, getCharacters } from "./api";

export default function Home() {
  const [charactersList, setCharactersList] = useState([]);
  const [characterOneSelection, setCharacterOneSelection] = useState();
  const [characterTwoSelection, setCharacterTwoSelection] = useState();
  const [characterOneEpisodes, setCharacterOneEpisodes] = useState([]);
  const [characterTwoEpisodes, setCharacterTwoEpisodes] = useState([]);
  const getCharactersList = () => {
    getCharacters().then((res) => {
      setCharactersList(res.data.results);
    });
  };
  const getCharacterEpisodes = async (id) => {
    const characterInfo = await getCharacterById(id);
    console.log("character info", characterInfo);
    return characterInfo.episodes;
  };
  useEffect(() => {
    getCharactersList();
  }, []);
  const handleSelectCharacter = async (characterId, isOne) => {
    const episodes = await getCharacterEpisodes(characterId);
    if (isOne) {
      setCharacterOneSelection(characterId);
      setCharacterOneEpisodes(episodes);
    } else {
      setCharacterTwoEpisodes(episodes);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-auto">
          <h1>Character #1</h1>
          <div>
            <ul>
              {charactersList.map((character) => (
                <li
                  onClick={() => handleSelectCharacter(character.id, true)}
                  style={{
                    backgroundColor:
                      characterOneSelection === character.id
                        ? "red"
                        : "transparent",
                  }}
                >
                  {character.id} - {character.name} - {character.status} -{" "}
                  {character.alive}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-auto">
          <h1>Character #2</h1>
          <div>
            <ul>
              {charactersList.map((character) => (
                <li
                  onClick={() => setCharacterTwoSelection(character.id)}
                  style={{
                    backgroundColor:
                      characterTwoSelection === character.id
                        ? "red"
                        : "transparent",
                  }}
                >
                  {character.id} - {character.name} - {character.status} -{" "}
                  {character.alive}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-auto">
          <h1>Character #1 - Only episodes</h1>
          <div>
            <ul>
              {characterOneEpisodes.map((episode) => (
                <li>{episode.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-auto">
          <h1>Character #1 & #2 - Shared episodes</h1>

          <div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
        </div>
        <div className="col-auto">
          <h1>Character #2 - Only episodes</h1>
          <div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
