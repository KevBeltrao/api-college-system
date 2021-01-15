import { Schema } from 'mongoose';

export interface IScheduleSubschema {
  startHour: number;
  endHour: number;
  day: number;
}

const ScheduleSubschema = new Schema({
  startHourInMinutes: {
    type: Number,
    required: true,
  },
  endHourInMinutes: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
});

export default ScheduleSubschema;
