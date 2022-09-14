import { Container, Row, Col, Table, Button } from "react-bootstrap";

export default function LogTable({logs}){
return(<>    {
        logs? <>
        <h3>Logs</h3>
        <br/>
        <Row>
            <Col>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>action</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log, index)=>{
                    let detail = log.attributes
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{detail.event}</td>
                            <td>{detail.created_at}</td>
                        </tr>
                    )
                })}
            </tbody>
            </Table>
            </Col>
        </Row>
        </>: <></>
    }
    </>
)
}