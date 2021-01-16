import { Schema } from 'mongoose';

export interface ISemesterSubschema {
  year: number;
  unity: number;
}

const SemesterSubschema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  unity: {
    type: Number,
    required: true,
  },
});

export default SemesterSubschema;
