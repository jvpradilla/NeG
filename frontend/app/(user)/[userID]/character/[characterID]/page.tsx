export default function CharacterReadId ({params}: {params: {characterID: string };}) {
  const {characterID} = params;
  return (
    <h1>Character - Read by ID: {characterID}</h1>
  );
}