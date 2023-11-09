import React from "react";
import Layout from "../../components/Layout";
import "./style.css";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { scheduleData } from "../../data/dummy";
import Header from "../Kanban/headerKanban";

export const Calendar = () => {
  return (
    <Layout sidebar>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3x1">
        <Header category="App" title="Calendar"></Header>
        <ScheduleComponent
          className="schedule"
          eventSettings={{ dataSource: scheduleData }}
          selectedDate={new Date(2021, 0, 10)}
          height="75vh"
          width="75vw"
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>
    </Layout>
  );
};
