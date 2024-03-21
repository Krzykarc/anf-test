import React, { createContext, useContext, useState } from "react";

import type { ExamTask } from "api/exams";

type TextAnswer = string
type ChoiceAnswer = string[]

type Answer = TextAnswer | ChoiceAnswer

interface IExamViewContext {
    answers: {
        [questionId: string]: Answer | null
    }
    setAnswers: (questionId: string, answer: Answer) => void;
}

const ExamViewContext = createContext<IExamViewContext | null>(null)

export const useExamViewContext = () => {
    const context = useContext(ExamViewContext)

    if(!context) {
        throw new Error('Context not provided!')
    }

    return context
}

export const ExamViewProvider = (props: React.PropsWithChildren<{questions: ExamTask[]}>) => {
    const { children, questions } = props;

    const initialAnswers: IExamViewContext['answers'] = {};
    questions.forEach(({ id }) => {
        initialAnswers[id] = null
    })

    const [answers, setNewAnswers] = useState(initialAnswers)
    
    const value = {
        answers,
        setAnswers: (questionId: string, answer: Answer) => {
            setNewAnswers({...answers, [questionId]: answer})
        }
    };

    return <ExamViewContext.Provider value={value}>
        {children}
    </ExamViewContext.Provider>
}