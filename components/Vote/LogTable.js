import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useTranslation } from 'next-i18next';

export default function LogTable({logs}){
    const { t } = useTranslation('vote');
return(<>    {
        logs? <>
        <h3>{t('setting.logs.header')}</h3>
        <br/>
        <Row>
            <Col>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('setting.logs.column1')}</th>
                    <th>{t('setting.logs.column2')}</th>
                    <th>{t('setting.logs.column3')}</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log, index)=>{
                    let detail = log.attributes
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>admin</td>
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