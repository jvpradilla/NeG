export const saveLocation = async (pLocation: string) => {
  localStorage.setItem("location", pLocation);
}

export const getLocation = () => {
  const location = localStorage.getItem("location");
  if (location) {
    return location;
  }
  return "";
}