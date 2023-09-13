export const readAnswerdByCharacterId = async (pCharacterId: string): Promise<any> => {
  const response = await fetch(`http://localhost:5000/answer/${pCharacterId}`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const answers = await response.json();
    console.log(answers);
    return answers;
  }
};