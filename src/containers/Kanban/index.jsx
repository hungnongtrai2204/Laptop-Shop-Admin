import React from 'react'
import Layout from '../../components/Layout'
import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-kanban'
import { kanbanData, kanbanGrid } from './dummy'
import Header from './headerKanban'


const Kanban = () => {
    return (
        <Layout sidebar>
            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3x1'>
                <Header category='App' title='Kanban'></Header>
                <KanbanComponent
                    id='kanban'
                    dataSource={kanbanData}
                    cardSettings={{
                        contentField: 'Summary',
                        headerField: 'Id'
                    }}
                    keyField="Status"
                >
                    <ColumnsDirective>
                        {kanbanGrid.map((item, index) =>
                            <ColumnDirective key={index} {...item}
                            />
                        )}
                    </ColumnsDirective>
                </KanbanComponent>
            </div>

        </Layout>
    )
}

export default Kanban