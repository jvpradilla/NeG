export default function UserReadId ({ params}: {params: { userID: string };}) {
  const {userID} = params;
  return (
    <h1>User - Read by ID: {userID}</h1>
  );
}