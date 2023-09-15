'use client'

import styles from "./NavigationBar.module.css";

 
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { getLocation } from "@/services/LocationService";

const links = [{
    label: "Inicio",
    icon: `<svg width="24" height="24" viewBox="0 0 32 32" style="fill:none;stroke-width:2.5;stroke-dasharray:none">
            <path d="M 15.911349,1.4716123 1.25,10.665044 v 20.026458 h 9.836557 l 0.06094,-7.926073 h 8.637333 v 7.984628 h 10.965225 v -20.14357 z"/>
          </svg>`,
    route: "/",
    pattern: ["/home"]
  }, /* {
    label: "Buscar",
    icon: `<svg width="24" height="24" viewBox="0 0 32 32" style="fill:none;stroke-width:2.5;stroke-dasharray:none">
            <ellipse cx="15.0" cy="15.0" rx="13.749958" ry="13.749959" />
            <path d="m 24.970393,24.84234 6.082532,6.274612" />
          </svg>`,
    route: "/find",
    pattern: ["/find"]
  }, */{
    label: "",
    icon: `<svg width="64" height="48" viewBox="0 0 72 48" style="fill:none;stroke:#496727;stroke-width:2.5;stroke-dasharray:none;stroke-linecap:round">
            <rect width="72" height="48" x="0" y="0" rx="19.799999" ry="22" style="fill:#ffffff;stroke:none" />
            <g transform="translate(-3.9999995)">
              <path d="m 40,15.249787 v 5.500426" />
              <path d="m 40,27.249786 v 5.500427" />
              <path d="M 48.750213,24 H 43.249786" />
              <path d="M 36.750213,24 H 31.249786" />
            </g>
          </svg>`,
    route: "/new",
    pattern: ["/new"]
  }, /*{
    label: "Información",
    icon: `<svg width="24" height="24" viewBox="0 0 32 32" style="fill:none;stroke-width:2.5;stroke-dasharray:none">
            <ellipse cx="15.99996" cy="15.999961" rx="14.74996" ry="14.749961" />
            <circle cx="15.99996" cy="8.2648678" r="1.0002025" />
            <path d="m 15.99996,14.085863 v 12.03701" />
          </svg>`,
    route: "/info",
    pattern: ["/info"]
  }, */ {
    label: "Usuario",
    icon: `<svg width="24" height="24" viewBox="0 0 32 32" style="fill:none;stroke-width:2.5;stroke-dasharray:none">
            <circle cx="16" cy="7.4999576" r="6.2499576" />
            <path d="m -2.2498913,-30.75 a 13.750109,12.496143 0 0 1 -6.8750543,10.821978 13.750109,12.496143 0 0 1 -13.7501084,0 A 13.750109,12.496143 0 0 1 -29.750109,-30.75 H -16 Z" transform="scale(-1)" />
          </svg>`,
    route: "/signin",
    pattern: ["/signin", "/signup", "/user"]
}];

export default function NavigationBar () {
  const pathname = getLocation()!;

  /*
<div dangerouslySetInnerHTML={{ __html: icon }} style={{stroke:pattern.includes(pathname)?"#496727":"white"}}/>
                <span style={{color:pattern.includes(pathname)?"#496727":"white"}}>{label}</span>
  */

  return (
    <div className={styles.container} style={{display:pathname.endsWith("create") && pathname.includes("/character/")?"none":"flex"}}>
      <nav className={styles.navigation}>
        <ul>
          {links.map(({label, route, icon, pattern}) => (
            <li key={route} className={styles.navigation_item}>
              <Link href={route}>
                <div dangerouslySetInnerHTML={{ __html: icon }} style={{stroke:"white"}}/>
                <span style={{color:"white"}}>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}