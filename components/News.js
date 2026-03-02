import { Container, Row, Col } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useTranslation } from 'next-i18next';

const newsItems = [
  {
    href: 'https://www.zeczec.com/projects/de-vote',
    label: 'Zeczec Crowdfunding',
    text: 'De.Vote 上嘖嘖募資啦! 讓每個聲音都被真實聽見',
  },
  {
    href: 'https://100.adi.gov.tw/post1?id=15',
    label: 'ADI Public Innovation 100',
    text: '塊區投入選公益創新徵案100 — 第二階段50案!',
  },
  {
    href: 'https://www.thehubnews.net/archives/206035',
    label: 'The Hub News',
    text: '公益創新的起點，入選公益100第一階段!',
  },
];

const opts = {
  playerVars: { autoplay: 0 },
};

const News = () => {
  const { t } = useTranslation('landing_page_index');

  return (
    <section style={{ background: '#fff', padding: '80px 0' }} id="news">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-badge">{t('newsTitle')}</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#0f0f0f', marginTop: '12px' }}>
            De.Vote in the Media
          </h2>
        </div>

        <Row className="align-items-center">
          <Col xs={12} md={7} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {newsItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card"
                >
                  <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>↗</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                      {item.label}
                    </div>
                    <div>{item.text}</div>
                  </div>
                </a>
              ))}
            </div>
          </Col>

          <Col xs={12} md={5}>
            <YouTube
              containerClassName="video-container"
              videoId="F6R0Pc92YH0"
              opts={opts}
              style={{ borderRadius: '12px', overflow: 'hidden' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default News;
