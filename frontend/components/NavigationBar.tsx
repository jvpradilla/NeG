import styles from "./NavigationBar.module.css";

import Link from "next/link";

const links = [{
    label: "Home",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="48px" height="48px" fill-rule="nonzero"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M39.5,43h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-9c0,-1.105 -0.895,-2 -2,-2h-4c-1.105,0 -2,0.895 -2,2v9c0,1.381 -1.119,2.5 -2.5,2.5h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-19.087c0,-2.299 1.054,-4.471 2.859,-5.893l14.212,-11.199c0.545,-0.428 1.313,-0.428 1.857,0l14.214,11.199c1.805,1.422 2.858,3.593 2.858,5.891v19.089c0,1.381 -1.119,2.5 -2.5,2.5z"></path></g></g></svg>',
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