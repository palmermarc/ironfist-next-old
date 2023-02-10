import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faGauge,
  faRepeat,
  faPenRuler,
  faWheatAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import React, {
  PropsWithChildren,
} from 'react'
import {
  Badge, Nav,
} from 'react-bootstrap'
import Link from 'next/link'

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const {
    icon,
    children,
    href,
  } = props

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
            : <span className="nav-icon ms-n3" />}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  )
}

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        Dashboard
        <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faUserGroup} href="/roster">
        Roster
        <small className="ms-auto"><Badge bg="danger" className="ms-auto">Guild</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faRepeat} href="/flipping/">
        Flipping
        <small className="ms-auto"><Badge bg="danger" className="ms-auto">Gold Making</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faPenRuler} href="/crafting/">
        Crafting
        <small className="ms-auto"><Badge bg="danger" className="ms-auto">Gold Making</Badge></small>
      </SidebarNavItem>
      <SidebarNavItem icon={faWheatAlt} href="/farming/">
        Farming
        <small className="ms-auto"><Badge bg="danger" className="ms-auto">Gold Making</Badge></small>
      </SidebarNavItem>
    </ul>
  )
}
