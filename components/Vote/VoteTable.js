import { Container, Row, Col, Table, Button } from "react-bootstrap";

export default function VoteTable({votes, url, buttonName}){
    return (<>
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Vote</th>
                <th>Status</th>
                <th>number of voter</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
            {votes.map((vote, index)=>{
                let detail = vote.data.attributes
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{detail.title}</td>
                        <td>{detail.voting_status}</td>
                        <td>{detail.num_of_voters}</td>
                        <td><Button><a href={`${url}${detail.id}`} target="_blank" rel="noreferrer">{buttonName} </a></Button></td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
    </>)
}