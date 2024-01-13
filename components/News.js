import { Container, Table, Row, Col } from 'react-bootstrap'
import YouTube from "react-youtube";
import { useTranslation } from 'next-i18next'

const News = () => {
  const { t } = useTranslation('landing_page_index')

  const opts = {
    height: 'auto',
    width: 'auto',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <section className="section" id="news">

    <Container>
        <Row className="justify-content-center">
            <div className="title text-center mb-5">
              <h3 className="font-weight-bold ubuntu text-dark"><span className="text-warning">{t('newsTitle')}</span></h3>
            </div>
        </Row>
      <Row>
        <Col xs={12} md={7}>
            <p>* <a href="https://www.zeczec.com/projects/de-vote"><strong>De.Vote 上嘖嘖募資啦! 讓每個聲音都被真實聽見</strong></a></p>
            <p>* <a href="https://100.adi.gov.tw/post1?id=15"><strong>塊區投入選公益創新．徵案100-第二階段50案!</strong></a></p>
            <p>* <a href="https://www.thehubnews.net/archives/206035"><strong>公益創新的起點，入選公益100第一階段!</strong></a></p>
		</Col>
        <Col xs={12} md={5}>
            <YouTube  containerClassName="video-container" className="iframe" videoId={'F6R0Pc92YH0'} rel="0" opts={opts}/>
        </Col>
      </Row>
    </Container>
    </section>
  )
}

export default News