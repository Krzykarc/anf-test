import type { FilledAnswers } from './answers';
import type { Survey } from './singleSurvey';

interface Preview {
    totalAnswers: number;
    survey: Survey;
    answers: FilledAnswers[];
}

interface FilledSurvey extends Survey {
    submitDate: Date;
    submitterId: string;
    durationInSeconds: number;
}