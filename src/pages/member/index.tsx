import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '@layout'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import { Member } from '@models/member'
import React from 'react'
import { MemberList } from '@components/Member'
import { transformResponseWrapper, useSWRAxios } from '@hooks'

const Members: NextPage = () => {
  const roster = [{"character_name":"eyorsmash","server":"illidan"},{"character_name":"loryon","server":"illidan"},{"character_name":"anthuant","server":"stormrage"},{"character_name":"barkamedes","server":"illidan"},{"character_name":"clushy","server":"illidan"},{"character_name":"itram","server":"illidan"},{"character_name":"jooblee","server":"illidan"},{"character_name":"julietee","server":"stormrage"},{"character_name":"mikona","server":"magtheridon"},{"character_name":"xorn","server":"echo-isles"},{"character_name":"blackdrágon","server":"illidan"},{"character_name":"filrager","server":"illidan"},{"character_name":"flashmonks","server":"illidan"},{"character_name":"gripandchill","server":"illidan"},{"character_name":"hydronics","server":"illidan"},{"character_name":"krymoore","server":"illidan"},{"character_name":"meoph","server":"illidan"},{"character_name":"promfist","server":"illidan"},{"character_name":"seabohr","server":"illidan"},{"character_name":"sollanessh","server":"illidan"},{"character_name":"thamhayn","server":"illidan"},{"character_name":"drakpixel","server":"illidan"},{"character_name":"dynolla","server":"illidan"},{"character_name":"kerree","server":"illidan"},{"character_name":"redfyrn","server":"illidan"},{"character_name":"souichirou","server":"illidan"},{"character_name":"toljaar","server":"illidan"}]
  const urls = [];
  console.log(roster)
    roster.map((member) => {
      console.log(`${member.character_name}, ${member.server}`)
      let equipmentUrl = `https://us.api.blizzard.com/profile/wow/character/${member.server}/${member.character_name}/equipment?namespace=profile-us&locale=en_US&access_token=US3MUMrKP5nUrRivG3dm9xd41uBliCp01j`
      urls.push(equipmentUrl)
    })
  const requests = urls.map((url) => axios.get(url));

  axios.all(requests).then((responses) => {
    responses.forEach((resp) => {
      let msg = {
        server: resp.headers.server,
        status: resp.status,
        fields: Object.keys(resp.data).toString(),
      };
      console.info(resp.config.url);
      console.table(msg);
    });
  });


  /*
  const memberListURL = `${process.env.NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL}members` || ''

  // swr: data -> axios: data -> resource: data
  const { data: { data: resource } } = useSWRAxios<Resource<Member>>({
    url: memberListURL,
    params: {
      _sort: sort,
      _order: order,
    },
    transformResponse: transformResponseWrapper((d: Member[], h) => {
      const total = h ? parseInt(h['x-total-count'], 10) : 0
      return newResource(d, total)
    }),
  }, {
    data: memberResource,
    headers: {
      'x-total-count': memberResource.meta.total.toString(),
    },
  })*/

  return (
    <AdminLayout>
      <Card>
        <Card.Header>Raid Members</Card.Header>
        <Card.Body>

        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

export default Members
