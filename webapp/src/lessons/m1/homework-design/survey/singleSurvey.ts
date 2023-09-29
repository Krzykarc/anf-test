import { QUESTION_TYPES } from "./questionTypes";

export interface Survey {
    id: string;
    title: string;
    questions: Question;
}

type Question = SingleChoiceQuestion | MultipleChoiceQuestion | OpenQuestion;

interface SingleChoiceQuestion extends QuestionCommon {
    type: QUESTION_TYPES.SINGLE;
    answers: SingleChoiceAnswerOption[];
}

interface SingleChoiceAnswerOption {
    type: QUESTION_TYPES.MULTIPLE;
    id: string;
    label: string;
}

interface MultipleChoiceQuestion extends QuestionCommon {
    type: QUESTION_TYPES.MULTIPLE;
    answers: MultipleChoiceAnswerOption[];
}

interface MultipleChoiceAnswerOption {
    type: QUESTION_TYPES.MULTIPLE;
    id: string;
    label: string;
}

interface OpenQuestion extends QuestionCommon {
    type: QUESTION_TYPES.OPEN;
    answer: OpenQuestionAnswer;
}

export interface OpenQuestionAnswer {
    type: QUESTION_TYPES.OPEN;
    answer: string;
}

interface QuestionCommon {
    id: string;
    type: QUESTION_TYPES;
    question: string;
}