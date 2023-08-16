export default function CharacterType(props: { onCharacterTypeChange: (pCharacterType: number) => void }) {

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onCharacterTypeChange(e.currentTarget.value as unknown as number);
  };
 
  return (
    <div className="formContainer">
      <h1>Crea un nuevo personaje</h1>
      <h3>Escoge el tipo de personaje que quieres crear</h3>
      <div className="characterTypeContent">
        <button value={7} className="characterTypeButton" onClick={handleChange}>
          <i className="bi bi-person-down"/><br/>
          Sencillo
        </button>
      </div>
      <div className="characterTypeContent">
        <button value={70} className="characterTypeButton" onClick={handleChange}>
          <i className="bi bi-person-down"/><br/>
          Natural
        </button>
      </div>
      <div className="characterTypeContent">
        <button value={98} className="characterTypeButton" onClick={handleChange}>
          <i className="bi bi-person-down"/><br/>
          Complejo
        </button>
      </div>
    </div>
  );
}