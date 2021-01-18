import { Schema, model, Document } from 'mongoose';
import { statusEnum } from './utils/statusEnum';

import SemesterSubschema, { ISemesterSubschema } from './utils/SemesterSubschema';

export interface IUserDiscipline extends Document {
  userId: string;
  disciplineId: string;
  status: string;
  finalScore: number;
  semester: ISemesterSubschema;
}

const UserDiscipline = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  disciplineId: {
    type: Schema.Types.ObjectId,
    ref: 'Discipline',
  },
  status: {
    type: String,
    enum: statusEnum,
    default: 'em andamento',
  },
  finalScore: Number,
  semester: SemesterSubschema,
}, {
  timestamps: true,
});

export default model<IUserDiscipline>('UserDiscipline', UserDiscipline);
