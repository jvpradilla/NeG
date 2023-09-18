const API_URL = process.env.NEXT_PUBLIC_HOST;

export const readAnswerdByCharacterId = async (pCharacterId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/answer/${pCharacterId}`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const answers = await response.json();
    //console.log(answers);
    return answers;
  }
};