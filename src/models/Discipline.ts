import { Schema, model, Document } from 'mongoose';

import ScheduleSubschema, { IScheduleSubschema } from './utils/ScheduleSubschema';

export interface IDiscipline extends Document {
  name: string;
  professor: string;
  difficulty: number;
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
  difficulty: {
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
