import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useTranslation } from 'next-i18next'
const getStaticProps = makeStaticProps(['landing_page', "common"])
export { getStaticPaths, getStaticProps }
export default function Privacy() {
    const { i18n } = useTranslation('landing_page')
    const {locale} = useRouter();
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
    }, [locale]);

    return (
        <Layout>
            <Header />
            <Container>
                <h2>{(locale == "zh_hant")?"隱私":"Privacy"}</h2>
                {data && data.content?
                    <>
                        <p>{data.title}</p>
                        {console.log(data.content)}
                        {data.content.map((item) => {
                            console.log(data.content)
                            switch (item.type) {
                                case "string":
                                    return <TypeStr title={item.title} content={item.content} />
                                case "string list":
                                    return <TypeStrList title={item.title} content={item.content} type={"li"}/>
                                case "string paragraph":
                                    return <TypeStrList title={item.title} content={item.content} type={"p"}/>
                                case "object":
                                    return <TypeObj title={item.title} content={item.content} />
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
                {props.content.map((item) => (props.type == "p")?<p>{item}</p>:<li>{item}</li>)}
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
