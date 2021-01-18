import { Schema, model, Document } from 'mongoose';

import ScheduleSubschema, { IScheduleSubschema } from './utils/ScheduleSubschema';

interface IDiscipline extends Document {
  name: string;
  professor: string;
  dificulty: number;
  schedule: Array<IScheduleSubschema>;
}

const Discipline = new Schema({
  name: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  dificulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  schedule: [ScheduleSubschema],
}, {
  timestamps: true,
});

export default model<IDiscipline>('Discipline', Discipline);
