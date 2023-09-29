import { QUESTION_TYPES } from "./questionTypes";

type Answer = SingleChoiceAnswer | MultipleChoiceAnswer | OpenQuestionAnswer;

interface SingleChoiceAnswer {
    type: QUESTION_TYPES.SINGLE;
    answerId: string;
}

interface MultipleChoiceAnswer {
    type: QUESTION_TYPES.MULTIPLE;
    answerIds: string[];
}

interface OpenQuestionAnswer {
    type: QUESTION_TYPES.OPEN;
    answer: string;
}

export interface FilledAnswers {
    [questionId: string]: Answer;
}