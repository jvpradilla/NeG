import styles from "./NavigationBar.module.css";

import Link from "next/link";

const links = [{
    label: "Home",
    icon: '',
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
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul>
          {links.map(({label, route, icon}) => (
            <li key={route} className={styles.navigation_item}>
              <Link href={route}>otro</Link>
              {icon}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}