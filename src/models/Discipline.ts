import { Schema, model, Document } from 'mongoose';

import ScheduleSubschema, { IScheduleSubschema } from './utils/ScheduleSubschema';

interface IDiscipline extends Document {
  professor: string;
  dificulty: number;
  schedule: Array<IScheduleSubschema>;
}

const Discipline = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  schedule: [ScheduleSubschema],
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default model<IDiscipline>('Discipline', Discipline);
