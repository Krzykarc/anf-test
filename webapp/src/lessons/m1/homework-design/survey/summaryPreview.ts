import { QUESTION_TYPES } from "./questionTypes";
import type { Survey } from './singleSurvey';

interface PreviewAnswers {
    survey: Survey;
    statistics: Summarise;
}

type Summarise = SingleChoiceSummarise | MultipleChoiceSummarise | OpenQuestionSummarise;

interface SingleChoiceSummarise {
    type: QUESTION_TYPES.SINGLE;
    options: {
        answerId: string;
        selectedCount: string;
    }[];
    answersCount: number;
}

interface MultipleChoiceSummarise {
    type: QUESTION_TYPES.MULTIPLE;
    options: {
        answerId: string;
        selectedCount: string;
    }[];
    answersCount: number;
}

interface OpenQuestionSummarise {
    type: QUESTION_TYPES.OPEN;
    answer: string;
    submitDate: Date;
    answersCount: number;
}