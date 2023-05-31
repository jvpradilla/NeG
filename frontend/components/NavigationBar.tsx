import Link from "next/link";

const links = [{
    label: "Home",
    icon: "",
    route: "/"
  }, {
    label: "Find",
    icon: "",
    route: "/find"
  }, {
    label: "New",
    icon: "",
    route: "/new"
  }, {
    label: "Info",
    icon: "",
    route: "/info"
  }, {
    label: "User",
    icon: "",
    route: "/user"
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