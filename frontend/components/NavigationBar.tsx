import Link from "next/link";

const links = [{
  label: "Home",
  route: "/"
}, {
  label: "User",
  route: "/user"
}, {
  label: "Info",
  route: "/info"
}];

export default function NavigationBar () {
  return (
    <nav>
      <ul>
        {links.map(({label, route}) => (
          <li key={route}>
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}