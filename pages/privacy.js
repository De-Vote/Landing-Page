import Layout from '../components/Layout';
import Header from '../components/Header'
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Privacy() {
    const { query, locale } = useRouter();
    const [data, setData] = useState([])

    useEffect(() => {
        init()
    }, [locale]);

    async function init() {
        try {
            let result = await fetch(`/locales/${locale}/landing_page.json`)
            result = await result.json();
            console.log(result)
            setData(result)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <Layout>
            <Header />
            <Container>
                <br /><br /><br /><br />
                <h1>{(locale == "zh_hant")?"隱私":"Privacy"}</h1>
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