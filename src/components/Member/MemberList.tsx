import { Dropdown, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Member } from '@models/member'
import { THSort } from '@components/TableSort'
import Image from 'next/image'

const typeColorMap: Record<string, string> = {
  normal: '#aa9',
  fighting: '#b54',
  flying: '#89f',
  poison: '#a59',
  ground: '#db5',
  rock: '#ba6',
  bug: '#ab2',
  ghost: '#66b',
  steel: '#aab',
  fire: '#f42',
  water: '#39f',
  grass: '#7c5',
  electric: '#fc3',
  psychic: '#f59',
  ice: '#6cf',
  dragon: '#76e',
  dark: '#754',
  fairy: '#e9e',
  unknown: '#aa9',
  shadow: '#aa9',
}

type TypeLabelProps = {
  type: string;
}

const TypeLabel = ({ type }: TypeLabelProps) => (
  <span
    className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
    style={{
      backgroundColor: typeColorMap[type],
      textShadow: '1px 1px 2px rgb(0 0 0 / 70%)',
      fontSize: '.7rem',
      width: '70px',
    }}
  >
    {type}
  </span>
)

type Props = {
  members: Member[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function MemberList(props: Props) {
  const { members, setSort, setOrder } = props

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="id" setSort={setSort} setOrder={setOrder}>#</THSort></th>
          <th aria-label="Photo" />
          <th><THSort name="name" setSort={setSort} setOrder={setOrder}>Name</THSort></th>
          <th>Type</th>
          <th className="text-center">Egg group</th>
          <th className="text-end"><THSort name="hp" setSort={setSort} setOrder={setOrder}>Hp</THSort></th>
          <th className="text-end"><THSort name="attack" setSort={setSort} setOrder={setOrder}>Atk</THSort></th>
          <th className="text-end"><THSort name="defense" setSort={setSort} setOrder={setOrder}>Def</THSort></th>
          <th className="text-end"><THSort name="special_attack" setSort={setSort} setOrder={setOrder}>SpA</THSort></th>
          <th className="text-end"><THSort name="special_defense" setSort={setSort} setOrder={setOrder}>SpD</THSort></th>
          <th className="text-end"><THSort name="speed" setSort={setSort} setOrder={setOrder}>Spd</THSort></th>
          <th className="text-end"><THSort name="total" setSort={setSort} setOrder={setOrder}>Total</THSort></th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.id}</td>
            <td>
              <div className="position-relative mx-auto" style={{ width: '70px', height: '70px' }}>
                <Image
                  fill
                  style={{ objectFit: 'contain' }}
                  alt={member.identifier}
                  src={`https://img.memberdb.net/sprites/sword-shield/icon/${member.identifier}.png`}
                />
              </div>
            </td>
            <td>{member.name}</td>
            <td>
              {member.types.map((type) => <TypeLabel key={type} type={type} />)}
            </td>
            <td className="text-center" style={{ whiteSpace: 'pre' }}>{member.egg_groups.join('\n')}</td>
            <td className="text-end">{member.hp}</td>
            <td className="text-end">{member.attack}</td>
            <td className="text-end">{member.defense}</td>
            <td className="text-end">{member.special_attack}</td>
            <td className="text-end">{member.special_defense}</td>
            <td className="text-end">{member.speed}</td>
            <td className="text-end">{member.total}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${member.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    href="#/action-3"
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
