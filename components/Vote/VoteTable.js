import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useTranslation } from 'next-i18next';

export default function VoteTable({votes, url,urlEnd, buttonName, deleteapi}){
    const { t } = useTranslation('vote');
    
    return (<>
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>{t('votes.column1')}</th>
                <th>{t('votes.column2')}</th>
                <th>{t('votes.column3')}</th>
                <th>{t('votes.column4')}</th>
            </tr>
        </thead>
        <tbody>
            {votes && votes.map((vote, index)=>{
                let detail = vote.data.attributes
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{detail.title}</td>
                        <td>{detail.voting_status}</td>
                        <td>{detail.num_of_voters}</td>
                        <td>
                            <Button><a href={`${url}${detail.id}${urlEnd}`} target="_blank" rel="noreferrer">{buttonName == 'setting' ? t('votes.action1') : t('votes.action3') } </a></Button> &nbsp;
                            {buttonName === 'setting'? <Button variant="danger" onClick={()=>{deleteapi(detail.id)}}>{t('votes.action2')}</Button>:""}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
    </>)
}