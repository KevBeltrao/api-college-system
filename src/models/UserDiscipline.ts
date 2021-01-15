import { Schema, model, Document } from 'mongoose';

interface IUserDiscipline extends Document {
  userId: string;
  disciplineId: string;
  status: string;
  finalScore: number;
  year: Number;
  semester: Number;
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
    enum: ['aprovado', 'reprovado', 'em andamento'],
    required: true,
    default: 'em andamento',
  },
  finalScore: Number,
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default model<IUserDiscipline>('UserDiscipline', UserDiscipline);
