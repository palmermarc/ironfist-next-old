import React, {
  PropsWithChildren, useCallback, useEffect, useState,
} from 'react'
import { useResizeDetector } from 'react-resize-detector'
import Head from 'next/head'
import Sidebar, { SidebarOverlay } from '@layout/AdminLayout/Sidebar/Sidebar'
import Footer from '@layout/AdminLayout/Footer/Footer'
import { Container } from 'react-bootstrap'

export default function AdminLayout({ children }: PropsWithChildren) {
  // Show status for xs screen
  const [isShowSidebar, setIsShowSidebar] = useState(false)

  // Show status for md screen and above
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true)

  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar)
  }

  // Clear and reset sidebar
  const resetIsShowSidebar = () => {
    setIsShowSidebar(false)
  }

  const onResize = useCallback(() => {
    resetIsShowSidebar()
  }, [])

  const { ref } = useResizeDetector({ onResize })

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isShowSidebarMd')) {
      setIsShowSidebarMd(localStorage.getItem('isShowSidebarMd') === 'true')
    }
  }, [setIsShowSidebarMd])

  return (
    <>
      <Head>
        <title>IRONFIST Guild Portal</title>
        <meta name="description" content="IRONFIST-Illidan gaming portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={ref} className="position-absolute w-100" />

      <Sidebar isShow={isShowSidebar} isShowMd={isShowSidebarMd} />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="body flex-grow-1 px-3">
          <Container fluid="lg">
            {children}
          </Container>
        </div>
        <Footer />
      </div>

      <SidebarOverlay isShowSidebar={isShowSidebar} toggleSidebar={toggleIsShowSidebar} />
    </>
  )
}
