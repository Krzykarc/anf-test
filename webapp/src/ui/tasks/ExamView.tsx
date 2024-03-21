import React, { useCallback, useState } from 'react';

import { Button, Typography } from 'ui/atoms';
import { ButtonList } from 'ui/molecules';
import { Panel } from 'ui/layout';

import { Exam, ExamTask, TextTask } from "api/exams";
import { WelcomeView } from './WelcomeView';
import { ExitView } from './ExitView';
import { ChoiceTaskView } from './ChoiceTaskView';
import { TextTaskView } from './TextTaskView';
import { RichtextTaskView } from './RichtextTaskView';

import { ExamViewProvider, useExamViewContext } from './ExamViewProvider';

const ExamPanel = ({ exam }: { exam: Exam }) => {
  const { setAnswers } = useExamViewContext();
  return (
    <Panel>
    <Typography variant="body">Praca domowa do zaimplementowania tutaj.</Typography>
    <Typography variant="h1">Question 1 of 3</Typography>

    <TextTaskView task={exam.tasks.find(task => task.type === "TEXT")! as TextTask} onAnswerChange={(questionId, answer) => setAnswers(questionId, answer)} />

    <ButtonList align="center">
      <Button variant="PRIMARY">Start exam</Button>
      <Button variant="PRIMARY">Next task</Button>
      <Button variant="PRIMARY">Finish exam</Button>
    </ButtonList>
  </Panel>
  )
}

export const ExamView = ({ exam }: { exam: Exam }) => {
  return (
    <ExamViewProvider questions={exam.tasks}>
      <ExamPanel exam={exam} />
    </ExamViewProvider>
  );
}
