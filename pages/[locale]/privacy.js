import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { Container } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useTranslation } from 'next-i18next'
const getStaticProps = makeStaticProps(['landing_page', "common"])
export { getStaticPaths, getStaticProps }
export default function Privacy() {
    const { i18n } = useTranslation('landing_page')
    const router = useRouter();
    const [data, setData] = useState([])

    useEffect(() => {
        async function init() {
            try {
                let result = (i18n.store.getResourceBundle(i18n.language, 'landing_page'))
                setData(result)
            } catch (e) {
                console.log(e.message)
            }
        }
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    return (
        <Layout>
            <Header />
            <Container>
                {data && data.content?
                    <>
                        <h2>{data.header}</h2>
                        <p>{data.title}</p>
                        {data.content.map((item, index) => {
                            switch (item.type) {
                                case "string":
                                    return (<div key={index}>
                                        <TypeStr index={index} title={item.title} content={item.content} />
                                    </div>)
                                case "string list":
                                    return (<div key={index}>
                                        <TypeStrList index={index} title={item.title} content={item.content} type={"li"}/>
                                    </div>)
                                case "string paragraph":
                                    return (<div key={index}>
                                        <TypeStrList index={index} title={item.title} content={item.content} type={"p"}/>
                                    </div>)
                                case "object":
                                    return (<div key={index}>
                                        <TypeObj index={index} title={item.title} content={item.content} />
                                    </div>)
                                default:
                                    return <></>
                            }
                        })}
                    </> : ""}
            </Container>
            <Footer />
        </Layout>
    )
}

function TypeStr(props) {
    return (
        <>
            <h3>{props.title}</h3>
            <ul>
            <p>{props.content}</p>
            </ul>
        </>)
}
function TypeStrList(props) {
    return (
        <>
            {(props.small)?<h5>{props.title}</h5>:<h3>{props.title}</h3>}
            <ul>
                {props.content.map((item, index) => (props.type == "p")?<p key={index}>{item}</p>:<li key={index}>{item}</li>)}
            </ul>
        </>)
}
function TypeObj(props) {
    return (
        <>
            {props.title?<h3>{props.title}</h3>:""}
            <ul>
                {props.content ?
                    (props.content.type == "string list"?
                        <TypeStrList small={true} title={props.content.title} content={props.content.content}/>:
                    props.content.type == "object list"?
                        <TypeObjList small={true} title={props.content.title} content={props.content.content}/>
                    :"")
                :""
                }
            </ul>
        </>)
}

function TypeObjList(props){
    return (<>
        <h5>{props.title}</h5>
        <ul>
        {props.content.map((item, index)=> <li key={index}><TypeObj small={true} title={null} content={item}/></li>)}
        </ul>
    </>)
}
