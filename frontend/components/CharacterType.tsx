export default function CharacterType(props: { onCharacterTypeChange: (pCharacterType: number) => void }) {


  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onCharacterTypeChange(e.currentTarget.value as unknown as number);
  };

 
  return (
    <div>
     <button value={1} onClick={handleChange}>Sencillo</button>
     <button value={2} onClick={handleChange}>Natural</button>
     <button value={3} onClick={handleChange}>Complejo</button>
    </div>
  );
}