import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'

const Login: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    const res = await axios.post('api/mock/login')
    if (res.status === 200) {
      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  const rand = Math.floor(1 + (Math.random() * 4))
  const background = `login-background-${rand}`

  return (
    <div id={background} className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent login-bg-{background}">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Login data is sent to Battle.net only. No data is stored on the server.</p>

                  <form onSubmit={login}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faUser}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        required
                        disabled={submitting}
                        placeholder="Username"
                        aria-label="Username"
                        defaultValue="Username"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faLock}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                        defaultValue="Password"
                      />
                    </InputGroup>

                    <Row>
                      <Col className="text-center">
                        <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Import Battle.net Profile</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <p>
                    I don&apos;t care about my own profile, just give me the guild info
                  </p>
                  <Link href="/register">
                    <button className="btn btn-lg btn-outline-light mt-3" type="button">
                      Load Guild Info
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
