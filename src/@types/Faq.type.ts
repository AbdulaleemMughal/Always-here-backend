import { Document } from 'mongoose';

export interface FaqType extends Document {
    question: string;
    answer: string;
}