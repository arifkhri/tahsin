'use client';

import { useState, useEffect } from 'react';
import { Container, Card, Typography, Button } from '@/components/ui';
import {
  CaretLeftIcon,
  CheckIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface EssayQuestion {
  id: number;
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  essayQuestions?: EssayQuestion[];
  onBack: () => void;
}

// Utility function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz({
  title,
  questions,
  essayQuestions = [],
  onBack,
}: QuizProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [shuffledEssayQuestions, setShuffledEssayQuestions] = useState<
    EssayQuestion[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEssaySection, setIsEssaySection] = useState(false);
  const [currentEssayIndex, setCurrentEssayIndex] = useState(0);
  const [essayScores, setEssayScores] = useState<number[]>([]);

  // Initialize shuffled questions on component mount
  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
    if (essayQuestions.length > 0) {
      setShuffledEssayQuestions(shuffleArray(essayQuestions));
    }
  }, [questions, essayQuestions]);

  // Function to score essay answer based on key points
  const scoreEssayAnswer = (answer: string, keyPoints: string[]): number => {
    if (!answer.trim()) return 0;

    let score = 0;
    const lowerAnswer = answer.toLowerCase();

    keyPoints.forEach(point => {
      const lowerPoint = point.toLowerCase();
      // Check if the answer contains key concepts from the point
      const words = lowerPoint.split(' ').filter(word => word.length > 3);
      const matchedWords = words.filter(word => lowerAnswer.includes(word));

      if (matchedWords.length > 0) {
        score += matchedWords.length / words.length;
      }
    });

    // Normalize score to 0-1 range
    return Math.min(score / keyPoints.length, 1);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else if (shuffledEssayQuestions.length > 0 && !isEssaySection) {
      // Move to essay section
      setIsEssaySection(true);
      setCurrentEssayIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setEssayAnswer('');
    } else if (
      isEssaySection &&
      currentEssayIndex < shuffledEssayQuestions.length - 1
    ) {
      // Next essay question
      const newEssayAnswers = [...essayAnswers];
      newEssayAnswers[currentEssayIndex] = essayAnswer;
      setEssayAnswers(newEssayAnswers);
      setCurrentEssayIndex(currentEssayIndex + 1);
      setEssayAnswer('');
    } else {
      // Finish quiz
      if (isEssaySection) {
        const newEssayAnswers = [...essayAnswers];
        newEssayAnswers[currentEssayIndex] = essayAnswer;
        setEssayAnswers(newEssayAnswers);

        // Calculate essay scores
        const newEssayScores = newEssayAnswers.map((answer, index) =>
          scoreEssayAnswer(answer, shuffledEssayQuestions[index].keyPoints)
        );
        setEssayScores(newEssayScores);

        // Add essay scores to total score
        const essayTotalScore = newEssayScores.reduce(
          (sum, score) => sum + score,
          0
        );
        setScore(score + essayTotalScore);
      }
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setCurrentEssayIndex(0);
    setSelectedAnswer(null);
    setEssayAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setEssayAnswers([]);
    setEssayScores([]);
    setShowExplanation(false);
    setIsEssaySection(false);
    // Reshuffle questions
    setShuffledQuestions(shuffleArray(questions));
    if (essayQuestions.length > 0) {
      setShuffledEssayQuestions(shuffleArray(essayQuestions));
    }
  };

  if (showResult) {
    const totalQuestions =
      shuffledQuestions.length + shuffledEssayQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const mcCorrect =
      score - essayScores.reduce((sum, score) => sum + score, 0);
    const essayTotalScore = essayScores.reduce((sum, score) => sum + score, 0);

    return (
      <div className="min-h-screen bg-neutral-100">
        <Container size="lg" className="py-6">
          <div className="flex items-center justify-between mb-8 w-full">
            <Button size="icon" variant="ghost" onClick={onBack}>
              <CaretLeftIcon size={25} />
            </Button>
            <Typography
              variant="h3"
              className="text-gray-900 text-right flex-1"
            >
              Hasil Quiz
            </Typography>
            <div className="w-24"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card variant="elevated" className="p-8 text-center mb-6">
              <div className="mb-6">
                <div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-bold ${
                    percentage >= 80
                      ? 'bg-green-100 text-green-600'
                      : percentage >= 60
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                  }`}
                >
                  {percentage}%
                </div>
              </div>

              <Typography variant="h4" className="text-gray-900 mb-4">
                {percentage >= 80
                  ? 'Excellent!'
                  : percentage >= 60
                    ? 'Good Job!'
                    : 'Keep Learning!'}
              </Typography>

              <Typography variant="body" className="text-gray-600 mb-6">
                Anda menjawab {Math.round(mcCorrect)} dari{' '}
                {shuffledQuestions.length} pertanyaan pilihan ganda dengan benar
                {shuffledEssayQuestions.length > 0 && (
                  <span className="block mt-2">
                    + {essayTotalScore.toFixed(1)} dari{' '}
                    {shuffledEssayQuestions.length} poin essay (Total:{' '}
                    {score.toFixed(1)} dari {totalQuestions})
                  </span>
                )}
              </Typography>

              <div className="flex flex-col gap-3 justify-center">
                <Button
                  className="grow"
                  variant="outline"
                  onClick={handleRestart}
                >
                  Ulangi Quiz
                </Button>
                <Button className="grow" variant="primary" onClick={onBack}>
                  Kembali ke Materi
                </Button>
              </div>
            </Card>

            {/* Review Multiple Choice Answers */}
            <Card variant="elevated" className="p-6 mb-6">
              <Typography variant="h4" className="text-gray-900 mb-4">
                Review Jawaban Pilihan Ganda
              </Typography>
              <div className="space-y-4">
                {shuffledQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <Typography variant="body" className="text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </Typography>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          answers[index] === question.correctAnswer
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {answers[index] === question.correctAnswer ? (
                          <CheckIcon size={16} className="text-white" />
                        ) : (
                          <XIcon size={16} className="text-white" />
                        )}
                      </div>
                      <Typography
                        variant="body"
                        className={
                          answers[index] === question.correctAnswer
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        Anda memilih: {question.options[answers[index]]}
                      </Typography>
                    </div>
                    {answers[index] !== question.correctAnswer && (
                      <Typography
                        variant="body"
                        className="text-green-600 mb-2"
                      >
                        Jawaban benar:{' '}
                        {question.options[question.correctAnswer]}
                      </Typography>
                    )}
                    <Typography variant="caption" className="text-gray-600">
                      {question.explanation}
                    </Typography>
                  </div>
                ))}
              </div>
            </Card>

            {/* Review Essay Answers */}
            {shuffledEssayQuestions.length > 0 && (
              <Card variant="elevated" className="p-6">
                <Typography variant="h4" className="text-gray-900 mb-4">
                  Review Jawaban Essay
                </Typography>
                <div className="space-y-6">
                  {shuffledEssayQuestions.map((question, index) => {
                    const essayScore = essayScores[index] || 0;
                    const scorePercentage = Math.round(essayScore * 100);

                    return (
                      <div
                        key={question.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Typography
                            variant="body"
                            className="text-gray-900 font-semibold"
                          >
                            {index + 1}. {question.question}
                          </Typography>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              scorePercentage >= 70
                                ? 'bg-green-100 text-green-700'
                                : scorePercentage >= 40
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            Skor: {scorePercentage}%
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-3">
                          <Typography
                            variant="caption"
                            className="text-indigo-800 font-semibold mb-2 block"
                          >
                            Jawaban Anda:
                          </Typography>
                          <Typography variant="body" className="text-gray-700">
                            {essayAnswers[index] || 'Tidak dijawab'}
                          </Typography>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg mb-3">
                          <Typography
                            variant="caption"
                            className="text-green-800 font-semibold mb-2 block"
                          >
                            Contoh Jawaban:
                          </Typography>
                          <Typography variant="body" className="text-gray-700">
                            {question.sampleAnswer}
                          </Typography>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Typography
                            variant="caption"
                            className="text-gray-800 font-semibold mb-2 block"
                          >
                            Poin-poin Penting:
                          </Typography>
                          <ul className="list-disc list-inside space-y-1">
                            {question.keyPoints.map((point, idx) => (
                              <li key={idx}>
                                <Typography
                                  variant="body"
                                  className="text-gray-700 inline"
                                >
                                  {point}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </Container>
      </div>
    );
  }

  // Show loading if questions not yet shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Typography variant="body" className="text-gray-600">
          Memuat quiz...
        </Typography>
      </div>
    );
  }

  // Multiple Choice Section
  if (!isEssaySection) {
    const currentQ = shuffledQuestions[currentQuestion];
    const totalQuestions =
      shuffledQuestions.length + shuffledEssayQuestions.length;
    const currentQuestionNum = currentQuestion + 1;

    return (
      <div className="min-h-screen bg-neutral-100">
        <Container size="lg" className="py-6">
          <div className="flex items-center mb-8 w-full">
            <Button
              className="flex-none"
              size="icon"
              variant="ghost"
              onClick={onBack}
            >
              <CaretLeftIcon size={25} />
            </Button>
            <Typography
              variant="h3"
              className="text-gray-900 text-center flex-1 grow"
            >
              Quiz: {title}
            </Typography>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <Card variant="elevated" className="p-4 mb-6">
              <div className="flex justify-between mb-2">
                <Typography variant="body" className="text-gray-600">
                  <strong>
                    Pilihan Ganda {currentQuestionNum} dari{' '}
                    {shuffledQuestions.length}
                  </strong>
                  <br />
                  {shuffledEssayQuestions.length > 0 && (
                    <span className="text-gray-500">
                      {' '}
                      Essay: {shuffledEssayQuestions.length} soal
                    </span>
                  )}
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  <strong>
                    Skor: {score}/{shuffledQuestions.length}
                  </strong>
                </Typography>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentQuestionNum / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </Card>

            {/* Question */}
            <Card variant="elevated" className="p-6 mb-6">
              <Typography variant="h5" className="text-gray-900 mb-6">
                {currentQ.question}
              </Typography>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedAnswer === null
                        ? 'outline'
                        : selectedAnswer === index
                          ? index === currentQ.correctAnswer
                            ? 'default'
                            : 'danger'
                          : index === currentQ.correctAnswer
                            ? 'default'
                            : 'outline'
                    }
                    className={`w-full text-left text-sm justify-start p-2 h-auto break-all whitespace-normal ${
                      selectedAnswer !== null &&
                      selectedAnswer !== index &&
                      index !== currentQ.correctAnswer
                        ? 'opacity-50'
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="mr-3 font-bold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Explanation */}
            {showExplanation && (
              <Card variant="elevated" className="p-6 mb-6">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === currentQ.correctAnswer
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <CheckIcon size={16} className="text-white" />
                    ) : (
                      <XIcon size={16} className="text-white" />
                    )}
                  </div>
                  <div>
                    <Typography
                      variant="body"
                      className={`font-semibold mb-2 ${
                        selectedAnswer === currentQ.correctAnswer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {selectedAnswer === currentQ.correctAnswer
                        ? 'Benar!'
                        : 'Salah!'}
                    </Typography>
                    <Typography variant="body" className="text-gray-700">
                      {currentQ.explanation}
                    </Typography>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation */}
            {showExplanation && (
              <div className="flex justify-center">
                <Button size="sm" variant="primary" onClick={handleNext}>
                  {currentQuestion < shuffledQuestions.length - 1
                    ? 'Selanjutnya'
                    : shuffledEssayQuestions.length > 0
                      ? 'Lanjut ke Essay'
                      : 'Lihat Hasil'}
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }

  // Essay Section
  const currentEssayQ = shuffledEssayQuestions[currentEssayIndex];
  const totalQuestions =
    shuffledQuestions.length + shuffledEssayQuestions.length;
  const currentQuestionNum = shuffledQuestions.length + currentEssayIndex + 1;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Container size="lg" className="py-6">
        <div className="flex items-center mb-8 w-full">
          <Button
            className="flex-none"
            size="icon"
            variant="ghost"
            onClick={onBack}
          >
            <CaretLeftIcon size={25} />
          </Button>
          <Typography
            variant="h3"
            className="text-gray-900 text-center flex-1 grow"
          >
            Quiz Essay: {title}
          </Typography>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <Card variant="elevated" className="p-4 mb-6">
            <div className="flex justify-between mb-2">
              <Typography variant="body" className="text-gray-600">
                <strong>
                  Essay {currentEssayIndex + 1} dari{' '}
                  {shuffledEssayQuestions.length}
                </strong>
              </Typography>
              <br />
              <Typography variant="body" className="text-gray-500">
                Pilihan Ganda: {score}/{shuffledQuestions.length} ✓
              </Typography>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentQuestionNum / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </Card>

          {/* Essay Question */}
          <Card variant="elevated" className="p-6 mb-6">
            <Typography variant="h4" className="text-gray-900 mb-6">
              {currentEssayQ.question}
            </Typography>

            <div className="space-y-4">
              <Typography variant="body" className="text-gray-600">
                Tuliskan jawaban Anda dengan lengkap dan jelas:
              </Typography>

              <textarea
                value={essayAnswer}
                onChange={e => setEssayAnswer(e.target.value)}
                placeholder="Ketik jawaban Anda di sini..."
                className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              {/* Key Points Hint */}
              <Card
                variant="outlined"
                className="bg-blue-50 border-blue-200 p-4"
              >
                <Typography
                  variant="caption"
                  className="text-indigo-800 font-semibold mb-2 block"
                >
                  💡 Poin-poin yang harus dibahas:
                </Typography>
                <ul className="list-disc list-inside space-y-1">
                  {currentEssayQ.keyPoints.map((point, idx) => (
                    <li key={idx}>
                      <Typography
                        variant="body"
                        className="text-indigo-700 inline"
                      >
                        {point}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={essayAnswer.trim().length < 10}
            >
              {currentEssayIndex < shuffledEssayQuestions.length - 1
                ? 'Selanjutnya'
                : 'Lihat Nilai'}
            </Button>
          </div>

          {essayAnswer.trim().length < 10 && (
            <Typography
              variant="caption"
              className="text-gray-500 text-center block mt-2"
            >
              Minimal 10 karakter untuk melanjutkan
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}
